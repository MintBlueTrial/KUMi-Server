import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
    login(userInfo: object): object {;
        if (userInfo['name'] == 'admin' && userInfo['password'] == '123') {
            return {'msg': '登录成功'}
        } else {
            return {'msg': '登录失败'}
        }
    }
}
