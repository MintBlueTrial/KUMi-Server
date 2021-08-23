/*
* @Time    : 2021/08/23 15:28:20
* @Author  : DannyDong
* @File    : login.controller.ts
* @Description: 登录控制器
*/

import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { User } from '../Schema/user.schema';
import { Response } from 'src/Common/result.interface';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    async login(@Body() userInfo: User): Promise<Response> {
        return await this.loginService.login(userInfo)
    } 
}
