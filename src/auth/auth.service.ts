import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto, Login} from "../users/dtos/create-user.dto";
import { UsersService } from "../users/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: Login) {
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
        const payload = {email: user.email, id: user._id}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: Login) {
        const user = await this.userService.getUserByEmail(userDto.email);
        // Compare password
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Incorrect email or password'})
    }
}
