import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto, Login} from "../users/dtos/create-user.dto";
import { UsersService } from "../users/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: Login) {
        console.log(userDto+"LOGIN")
        const user = await this.validateUser(userDto)
        console.log(user+ "AFTER VALIDATE")
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

    private async validateUser(userDto: Login) {
        console.log(userDto+ " VALIDATE")
        const user = await this.userService.getUserByEmail(userDto.email);
        console.log(user + " AFTER GET USER BY EMAIL")
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        console.log(passwordEquals + " PASSWORD EQUAL")
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
}
