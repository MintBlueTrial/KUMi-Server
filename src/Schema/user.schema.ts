/*
* @Time    : 2021/08/23 16:00:29
* @Author  : DannyDong
* @File    : user.schema.ts
* @Description: 用户相关数据ORM
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
