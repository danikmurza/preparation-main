import {Body, Controller, HttpCode, HttpStatus, Post, Put} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto, Login} from "../users/dtos/create-user.dto";
import {AuthService} from "./auth.service";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    @HttpCode(HttpStatus.ACCEPTED)
    login(@Body() userDto: Login) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @HttpCode(HttpStatus.CREATED)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
