/*
* @Time    : 2021/08/23 15:28:53
* @Author  : DannyDong
* @File    : login.module.ts
* @Description: 登录 Module
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Schema/user.schema';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: 'userInfo',
                    schema: UserSchema,
                    collection: 'user'
                }
            ]
        )
    ],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
