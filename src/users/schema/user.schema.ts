import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {ObjectId} from "mongoose";

export type UserDocument = User & mongoose.Document;

@Schema({collection: 'USERS'})
export class User {

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    todo: [{
        _id: mongoose.Schema.Types.ObjectId

        title: string;

        description: string;

        priority: string

        duration: string

        done: boolean
    }]
    @Prop()
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
}


export const UserSchema = SchemaFactory.createForClass(User);


@Schema({collection: 'Todo'})
export class Todo {


    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    priority: string
    @Prop()
    duration: string
    @Prop()
    done: boolean
}


export const TodoSchema = SchemaFactory.createForClass(Todo);
