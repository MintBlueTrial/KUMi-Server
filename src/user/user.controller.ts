/*
* @Time    : 2021/08/23 16:00:59
* @Author  : DannyDong
* @File    : user.controller.ts
* @Description: 用户相关控制器
*/

import { Controller, Get } from '@nestjs/common';
import { Response } from 'src/Common/result.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    // 构造函数
    constructor(private readonly userService: UserService) {}

    // 获取所有用户
    @Get('/get/all')
    async getUsers(): Promise<Response> {
        return await this.userService.getUsers()
    }
}
