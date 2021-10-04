import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  // @IsNotEmpty()
  // @Type(() => Date)
  // @IsDate()
  // dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  maritalStatus: string;

  @IsNotEmpty()
  @IsString()
  gender: string;
  _id: string;
}
