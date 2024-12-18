import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserServices, UserServicesDocument } from './user-services.model';
import { Model } from 'mongoose';
import { CreateUserServicesDto } from './dto/create-user-services.dto';
import { UpdateUserServicesDto } from './dto/update-user-services.dto';

@Injectable()
export class UserServicesService {
  logger: Logger;
  constructor(
    @InjectModel(UserServices.name)
    private userServiceModel: Model<UserServicesDocument>,
  ) {
    this.logger = new Logger(UserServicesService.name);
  }

  async findAll(): Promise<UserServices[]> {
    return this.userServiceModel.find().exec();
  }

  async findOne(id: string): Promise<UserServices> {
    return this.userServiceModel.findOne({ _id: id }).exec();
  }

  async create(
    createUserServicesDto: CreateUserServicesDto,
  ): Promise<UserServices> {
    const createdUserService = await this.userServiceModel.create(
      createUserServicesDto,
    );
    return createdUserService;
  }

  async update(
    id: string,
    updateUserServicesDto: UpdateUserServicesDto,
  ): Promise<UserServices> {
    return this.userServiceModel
      .findByIdAndUpdate({ _id: id }, updateUserServicesDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<UserServices> {
    const deletedUserServices = await this.userServiceModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedUserServices;
  }
}
