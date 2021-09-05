/*
* @Time    : 2021/09/05 21:45:31
* @Author  : DannyDong
* @File    : task.service.ts
* @Description: 任务相关逻辑实现
*/

import { ObjectId } from 'mongodb'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from 'src/Common/result';


@Injectable()
export class TaskService {
    // 构造函数
    constructor(@InjectModel('taskInfo') private readonly taskInfoModel) {}

    // 获取所有任务
    async getAllTasks() {
        const tasks = await this.taskInfoModel.find().exec()
        return new Result(tasks, '获取数据成功').success()
    }
}
