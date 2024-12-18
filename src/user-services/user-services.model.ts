import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserServicesDocument = HydratedDocument<UserServices>;

@Schema()
export class UserServices {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  time: number;
}

export const UserServicesSchema = SchemaFactory.createForClass(UserServices);
