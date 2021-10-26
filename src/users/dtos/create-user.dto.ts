import {Type} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';
import {ObjectId} from "mongoose";

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

    _id: string

}

export class Login {

    email: string;
    password: string

}

export class AddTask {

    todo:string
    _id: ObjectId

    title: string;

    description: string;

    priority: string

    duration: string

    done: boolean

}
