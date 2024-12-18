import { Module } from '@nestjs/common';
import { UserServicesController } from './user-services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserServices, UserServicesSchema } from './user-services.model';
import { UserServicesService } from './user-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserServices.name, schema: UserServicesSchema },
    ]),
  ],
  controllers: [UserServicesController],
  providers: [UserServicesService],
})
export class UserServicesModule {}
