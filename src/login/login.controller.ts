/*
* @Time    : 2021/08/23 15:28:20
* @Author  : DannyDong
* @File    : login.controller.ts
* @Description: 登录控制器
*/

import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { User } from '../Schema/user.schema';
import { Response } from 'src/Common/result.interface';
import { Response as res } from 'express';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    async login(@Body() userInfo: User, @Res({ passthrough: true }) response: res): Promise<Response> {
        const result: Response = await this.loginService.login(userInfo)
        if (result.code == 0) {
            // 登录成功后，设置cookie
            response.cookie('userId', result.data.userId, { httpOnly: true })
            Logger.debug('Cookie设置成功')
        }
        return result
    } 
}
