/*
* @Time    : 2021/08/23 16:01:22
* @Author  : DannyDong
* @File    : user.service.ts
* @Description: 用户相关逻辑实现
*/

import { ObjectId } from 'mongodb'
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
            const field = 'userId userName is_del create_time'
            let users = await this.userInfoModel.find({}, field).exec()
            return new Result(users, '获取数据成功').success()
        } catch(error) {
            return new Result(`获取数据失败，失败原因: ${error}`).fail()
        }
    }

    // 通过ID获取用户信息
    async getUserById(Params: User) {
        // 过滤返回字段
        const field = 'userId userName create_time'
        const user = await this.userInfoModel.findOne({'userId': Params.userId}, field).exec()
        if (user) {
            return new Result(user, '获取数据成功').success()
        }
        return new Result('没有此用户，获取数据失败').fail()
    }

    // 新增用户信息
    async createUser(Params: User) {
        try {
            // 用户唯一性校验
            const temp: any[] = await this.userInfoModel.find({'userName': Params.userName}).exec()
            if (temp.length != 0) {
                return new Result('新增失败！用户名重复！').fail()
            }
            // 组装数据
            const data = {
                'userId': new ObjectId(),
                'userName': Params.userName,
                'password': Params.password,
                'is_del': 0,
                'create_time': new Date().valueOf()
            }
            await this.userInfoModel.create(data)
            return new Result('新增成功!').success()
        } catch(error) {
            return new Result(`新增失败！失败原因：${error}`).fail()
        }
    }

    // 编辑用户信息
    async editUser(Params: User) {
        try {
            const user = await this.userInfoModel.findOne({'userId': Params.userId})
            if (!user) {
                return new Result('没有该用户，更新用户信息失败！').fail()
            }
            const res = await this.userInfoModel.updateOne(
                {'userId': Params.userId}, 
                {'userName': Params.userName, 'password': Params.password}
            )
            return new Result('更新用户信息成功!').success()
        } catch (error) {
            return new Result(`更新失败！失败原因：${error}`).fail()
        }
    }

    // 编辑用户信息
    async deleteUser(Params: User) {
        try {
            const user = await this.userInfoModel.findOne({'userId': Params.userId})
            if (!user) {
                return new Result('没有该用户，删除用户信息失败！').fail()
            }
            const res = await this.userInfoModel.updateOne(
                {'userId': Params.userId}, 
                {'is_del': 1}
            )
            return new Result('删除用户成功!').success()
        } catch (error) {
            return new Result(`删除失败！失败原因：${error}`).fail()
        }
    }
}
