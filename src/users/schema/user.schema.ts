import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum MaritalStatus {
  Married = 'married',
  Divorced = 'divorced',
  Single = 'single',
  Widow = 'widow',
  Other = 'other',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// if schema changed we need to drop all indexes in the USERS collection
// by db.getCollection('USERS').dropIndexes()
@Schema({ collection: 'USERS' })
export class User {

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ required: true})
  password: string;


  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  // @Prop({ required: false })
  // dateOfBirth: Date;

  @Prop({ required: true })
  placeOfBirth: string;

  @Prop({ required: true, enum: Object.values(MaritalStatus) })
  maritalStatus: MaritalStatus;

  @Prop({ required: true, enum: Object.values(Gender) })
  gender: Gender;
}

export const UserSchema = SchemaFactory.createForClass(User);
