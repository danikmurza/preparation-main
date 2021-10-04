import {
  BadRequestException,
  Injectable,
  // NotFoundException,
  // ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return this.userModel.find().exec();
  }

  async add(data: CreateUserDto) {
    const userList = await this.userModel.find({ email: data.email }).exec();

    if (userList.length) {
      throw new BadRequestException(
        `${data.email} has already been registered`,
      );
    }

    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async getById(id: string) {
    console.log(' UsersService ' + id);
    return await this.userModel.findById(id).exec();
  }
}
