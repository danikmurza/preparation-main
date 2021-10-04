import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('/addUser')
  async addVehicle(@Body() body: CreateUserDto) {
    const user = await this.userService.add(body);
    return user;
  }

  @Get(':_id')
  async getById(@Param('_id') _id: string) {
    console.log(' User Controller ' + _id);
    const user = await this.userService.getById(_id);
    return user;
  }

  @Post('find:_id')
  async findById(@Param('_id') _id: string, @Body() body: CreateUserDto) {
    console.log(' User Controller ' + _id);
    const user = await this.userService.getById(_id);
    return user;
  }
}
