import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ select: false })
  password: string;
}

export type UsersDocument = Users & Document;
export const UsersSchema = SchemaFactory.createForClass(Users);
