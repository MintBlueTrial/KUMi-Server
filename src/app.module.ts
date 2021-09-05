/*
* @Time    : 2021/08/23 15:31:07
* @Author  : DannyDong
* @File    : app.module.ts
* @Description: 应用程序的根模块
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './Login/login.module';
import { UserModule } from './User/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    // MongoDB数据库连接
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/KUMi', { useCreateIndex: true }),
    LoginModule,
    UserModule,
    TaskModule
  ],
})
export class AppModule {}
