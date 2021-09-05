/*
* @Time    : 2021/09/05 21:57:01
* @Author  : DannyDong
* @File    : task.controller.ts
* @Description: 任务相关控制器
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { Response } from 'src/Common/result.interface';
import { Task } from 'src/Schema/task.schema';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    // 构造函数
    constructor(private readonly taskService: TaskService) {}

    // 获取所有用户
    @Get('/get/all')
    getAllTasks(): Promise<Response> {
        return this.taskService.getAllTasks()
    }

    // 新增任务
    @Post('/create')
    createTask(@Body() Params: Task) {
        return this.taskService.createTask(Params)
    }
}
