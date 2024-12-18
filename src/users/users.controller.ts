import {
  ConflictException,
  Controller,
  Logger,
  NotFoundException,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDocument } from './users.model';
import { UserProfilDto } from 'src/auth/dto/user-profil.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  logger: Logger;
  constructor(private readonly usersServices: UsersService) {
    this.logger = new Logger(UsersController.name);
  }

  @Post('signup')
  async create(@Request() req): Promise<UserProfilDto> {
    const newUser = req.body;
    try {
      const query = { email: newUser.email };
      const isUser = await this.usersServices.findOne(query);
      if (isUser) throw new ConflictException('User Already Exist');
      const user = await this.usersServices.create(newUser);
      return user;
    } catch (err) {
      this.logger.error('Something went wrong in signup: ', err);
      throw err;
    }
  }

  @Patch('signup')
  @UseGuards(AuthGuard('jwt'))
  async update(@Request() req): Promise<UsersDocument> {
    const updatedUser = await this.usersServices.findOneAndUpdate(
      { email: req.user.email },
      req.body,
    );
    if (!updatedUser) throw new NotFoundException('User not founded.');

    return updatedUser;
  }
}
