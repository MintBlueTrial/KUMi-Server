/*
* @Time    : 2021/08/23 15:59:05
* @Author  : DannyDong
* @File    : user.module.ts
* @Description: 用户相关 Module
*/

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
