import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserServicesDto {
  @IsNotEmpty({ message: 'Le champ title est requis.' })
  @IsString({ message: 'Le champ title doit être au format string.' })
  readonly title: string;

  @IsNotEmpty({ message: 'Le champ time est requis.' })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  readonly time: number;
}
