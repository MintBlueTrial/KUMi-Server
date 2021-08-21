import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './login.schema';

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
                    Logger.log(`用户${users[i].userName}登录成功`)
                    return { ...userInfo, 'msg': '登录成功', 'statusCode': 0 }
                }
            }
        }
        return { 'msg': '登录失败, 用户名或密码错误', 'statusCode': -1 }
    }
}
