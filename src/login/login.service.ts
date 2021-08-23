/*
* @Time    : 2021/08/23 15:27:37
* @Author  : DannyDong
* @File    : login.service.ts
* @Description: 用户登录Service
*/

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from 'src/Common/result';
import { User } from '../Schema/user.schema';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel('userInfo') private readonly userInfoModel
    ) {}

    async login(userInfo: User) {
        const users: any[] = await this.userInfoModel.find({'userName': userInfo.userName})
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].password == userInfo.password) {
                    Logger.debug(`KUMi用户「${users[i].userName}」登录成功`)
                    return new Result({...userInfo}, '登录成功').success()
                }
            }
        }
        return new Result('登录失败').fail()
    }
}
