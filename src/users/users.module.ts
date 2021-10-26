import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService} from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import {AuthModule} from "../auth/auth.module";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(()=> AuthModule)

  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
      UsersService

  ]
})
export class UsersModule {}
