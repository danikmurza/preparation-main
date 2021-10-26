import {
  BadRequestException, HttpException, HttpStatus,
  Injectable, UnauthorizedException,
  // NotFoundException,
  // ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {AddTask, CreateUserDto} from './dtos/create-user.dto';
import { User, UserDocument } from './schema/user.schema';



@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findAll() {
    return this.userModel.find().populate('todos').exec();
  }

  async findByEmail(email: string) {
    if (!email) {
      return null;
    }
    const userList = await this.userModel.find({ email: email }).populate({path: 'todos', model: "Todo"}).exec();
    return userList
  }

  async findById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async add(data: CreateUserDto) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = new this.userModel({...data, password: hashPassword});
    return newUser.save();
  }

  async deleteById(id: string) {
    return this.userModel.findByIdAndRemove(id)
  }

  async update(_id: string, user: CreateUserDto)  {
    let toUpdate = await this.findById(_id)
    let updated = Object.assign(toUpdate, user)
    return this.userModel.findByIdAndUpdate(_id, updated);
  }


  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({where: {email}, include: {all: true}})
    return user;
  }

  async updateTodo(_id: string, todo: AddTask)  {
    let toUpdate = await this.findById(_id)
    console.log(toUpdate)
    let updated = Object.assign(toUpdate, todo)
    return this.userModel.findByIdAndUpdate(_id, {$push: {...todo}});
  }


}
