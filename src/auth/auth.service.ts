import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dtos/create-user.dto";
import { UsersService } from "../users/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../users/schema/user.schema";
import {Model} from "mongoose";


@Injectable()
export class AuthService {

    constructor(

        private userService: UsersService,
                private jwtService: JwtService,
    ) {}

    async login(userDto: CreateUserDto) {
        console.log(userDto+"LOGIN")
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(data: CreateUserDto) {
        const userList = await this.userService.findByEmail(data.email)
        if (userList.length) {
            throw new BadRequestException(
                `${data.email} has already been registered`,
            );
        }
        return this.userService.add(data)
    }



    private async generateToken(user: CreateUserDto) {
        const payload = {email: user.email, id: user._id, roles: 'admin'}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        console.log(userDto+ "VALIDATE")
        const user = await this.userService.getUserByEmail(userDto.email);
        console.log(user)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
}
