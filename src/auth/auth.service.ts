import {
  Injectable,
  forwardRef,
  Inject,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersDocument } from 'src/users/users.model';
import { plainToInstance } from 'class-transformer';
import { UserProfilDto } from './dto/user-profil.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UsersDocument> {
    const query = { email: email };
    const user = await this.usersService.findOne(query);
    if (!user) throw new NotFoundException('Email Does not exist');
    const isMatched = await this.comparePasswords(pass, user.password);
    if (!isMatched) throw new UnauthorizedException('Invalid Password');
    return user;
  }

  async generateJwtToken(user: any) {
    const payload = {
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getHashedPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt
      .compare(password, hashedPassword)
      .then((isMatch: boolean) => {
        if (isMatch) return true;
        return false;
      })
      .catch((err: any) => err);
  }

  async userProfile(query: any): Promise<any> {
    const user = this.usersService.findOne(query);

    if (!user) return null;

    const userDto = plainToInstance(UserProfilDto, (await user).toObject());
    return userDto;
  }
}
