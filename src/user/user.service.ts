/*
* @Time    : 2021/08/23 16:01:22
* @Author  : DannyDong
* @File    : user.service.ts
* @Description: 用户相关逻辑实现
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from 'src/Common/result';
import { User } from 'src/Schema/user.schema';

@Injectable()
export class UserService {
    // 构造函数
    constructor(@InjectModel('userInfo') private readonly userInfoModel) {}

    // 获取所有用户
    async getUsers() {
        try {
            // 过滤返回字段
            const field = '_id userName is_del create_time'
            let users = await this.userInfoModel.find({}, field).exec()
            return new Result(users, '获取数据成功').success()
        } catch(error) {
            return new Result(`获取数据失败，失败原因: ${error}`).fail()
        }
    }

    // 通过ID获取用户信息
    async getUserById(Params: User) {
        // 过滤返回字段
        const field = '_id userName create_time'
        const user = await this.userInfoModel.findOne({'_id': Params.id}, field).exec()
        if (user) {
            return new Result(user, '获取数据成功').success()
        }
        return new Result('没有此用户，获取数据失败').fail()
    }
}
