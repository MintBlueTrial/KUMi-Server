/*
* @Time    : 2021/08/23 15:29:32
* @Author  : DannyDong
* @File    : login.schema.ts
* @Description: 登录数据ORM
*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
