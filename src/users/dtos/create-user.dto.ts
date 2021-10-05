import {Type} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    @IsString({message: 'Password must be string'})
    @IsEmail({}, {message: "Incorrect email"})
    email: string;

    @ApiProperty({example: 'qazxsde12345', description: 'Password'})
    @IsString({message: 'Password must be string'})
    @Length(4, 16, {message: 'Not less 4 and not more 16'})
    password: string

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

    _id: string
}

export class Login {

    email: string;
    password: string

}
