import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserServicesService } from './user-services.service';
import { UserServices } from './user-services.model';
import { CreateUserServicesDto } from './dto/create-user-services.dto';
import { UpdateUserServicesDto } from './dto/update-user-services.dto';
import { Types } from 'mongoose';

@Controller('user-services')
export class UserServicesController {
  logger: Logger;
  constructor(private readonly userServicesService: UserServicesService) {
    this.logger = new Logger(UserServices.name);
  }

  @Get()
  async findAll(): Promise<UserServices[] | string> {
    const userServices = await this.userServicesService.findAll();
    if (userServices.length > 0) {
      return userServices;
    } else {
      return 'No user services founded';
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserServices> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID Format invalid.');
    }
    const userService = await this.userServicesService.findOne(id);
    if (!userService) {
      throw new NotFoundException(`Aucun Service trouvé avec l'id: ${id}`);
    }
    return userService;
  }

  @Post()
  async create(@Body() createUserServicesDto: CreateUserServicesDto) {
    return this.userServicesService.create(createUserServicesDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserServicesDto: UpdateUserServicesDto,
  ): Promise<UserServices> {
    return this.userServicesService.update(id, updateUserServicesDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserServices> {
    return this.userServicesService.delete(id);
  }
}
