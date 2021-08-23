/*
* @Time    : 2021/08/23 15:31:07
* @Author  : DannyDong
* @File    : app.module.ts
* @Description: 应用程序的根模块
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    // MongoDB数据库连接
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/KUMi'),
    LoginModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
