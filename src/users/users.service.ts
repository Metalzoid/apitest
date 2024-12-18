import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './users.model';
import { FilterQuery, Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserProfilDto } from 'src/auth/dto/user-profil.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  logger: Logger;

  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    this.logger = new Logger(UsersService.name);
  }

  async findOne(query: any): Promise<UsersDocument | null> {
    return await this.usersModel.findOne(query).select('+password');
  }

  async find(usersFilterQuery: FilterQuery<Users>): Promise<UsersDocument[]> {
    return this.usersModel.find({ usersFilterQuery });
  }

  async create(user: any): Promise<UserProfilDto> {
    this.logger.log('Creating user.');
    const hashedPassword = await this.authService.getHashedPassword(
      user.password,
    );
    user.password = hashedPassword;
    const newUser = this.usersModel.create(user);

    const userDto = plainToInstance(UserProfilDto, (await newUser).toObject());
    return userDto;
  }

  async findOneAndUpdate(query: any, payload: any): Promise<UsersDocument> {
    this.logger.log('Updating User.');
    if (payload.password) {
      const hashedPassword = await this.authService.getHashedPassword(
        payload.password,
      );
      payload.password = hashedPassword;
    }
    return this.usersModel.findOneAndUpdate(query, payload, {
      new: true,
      upsert: false,
    });
  }

  async findOneAndRemove(query: any): Promise<any> {
    return this.usersModel.findOneAndDelete(query);
  }
}
