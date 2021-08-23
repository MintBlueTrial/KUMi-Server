/*
* @Time    : 2021/08/23 16:01:22
* @Author  : DannyDong
* @File    : user.service.ts
* @Description: 用户相关逻辑实现
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from 'src/Common/result';

@Injectable()
export class UserService {
    // 构造函数
    constructor(@InjectModel('userInfo') private readonly userInfoModel) {}

    async getUsers() {
        try {
            const users: any[] = await this.userInfoModel.find()
            return new Result(users, '获取数据成功').success()
        } catch(error) {
            return new Result(`获取数据失败，失败原因: ${error}`).fail()
        }
    }
}
