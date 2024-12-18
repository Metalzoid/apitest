import { Exclude } from 'class-transformer';

export class UserProfilDto {
  readonly _id: string;
  readonly email: string;
  readonly lastName: string;
  readonly firstName: string;

  @Exclude()
  password?: string;

  @Exclude()
  __v?: any;
}
