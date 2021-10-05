import {Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CreateUserDto} from './dtos/create-user.dto';
import {UsersService} from './user.service';

@Controller('users')
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


}
