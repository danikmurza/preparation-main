import { Body, Controller, Delete, Get, Header,
  HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import {CreateUserDto} from './dtos/create-user.dto';
import {UsersService} from './user.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  // @Roles('admin')
  // @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'none')
  async findAll() {
    return await this.userService.findAll()
  }

  @Get('find/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
     return await this.userService.findById(id)
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') _id: string) {
      return await this.userService.deleteById(_id);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: CreateUserDto, @Param('id') id: string) {
      return await this.userService.update(id, body);
  }


}
