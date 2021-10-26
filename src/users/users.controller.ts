import { Body, Controller, Delete, Get, Header,
  HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import {AddTask, CreateUserDto} from './dtos/create-user.dto';
import {UsersService} from './user.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";


@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
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

  @Put('todo/:id')
  @HttpCode(HttpStatus.OK)
  async updateTodo(@Body() body: AddTask, @Param('id') id: string) {
    console.log(id)
    return await this.userService.updateTodo(id, body);
  }
}
