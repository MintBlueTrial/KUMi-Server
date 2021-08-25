/*
* @Time    : 2021/08/23 16:00:59
* @Author  : DannyDong
* @File    : user.controller.ts
* @Description: 用户相关控制器
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { Response } from 'src/Common/result.interface';
import { User } from 'src/Schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    // 构造函数
    constructor(private readonly userService: UserService) {}

    // 获取所有用户
    @Get('/get/all')
    getUsers(): Promise<Response> {
        return this.userService.getUsers()
    }

    // 通过ID获取用户信息
    @Post('/get/one')
    getUser(@Body() Parmas: User): Promise<Response> {
        return this.userService.getUserById(Parmas)
    } 

    // 新增用户信息
    @Post('/create')
    createUser(@Body() Parmas: User): Promise<Response> {
        return this.userService.createUser(Parmas)
    }

    // 更新用户信息
    @Post('/edit')
    editUser(@Body() Params: User): Promise<Response> {
        return this.userService.editUser(Params)
    }

    // 删除用户信息
    @Post('/del')
    deleteUser(@Body() Params: User): Promise<Response> {
        return this.userService.deleteUser(Params)
    }
}
