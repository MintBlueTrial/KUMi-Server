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
import { Task } from 'src/Schema/task.schema';


@Injectable()
export class TaskService {
    // 构造函数
    constructor(@InjectModel('taskInfo') private readonly taskInfoModel) {}

    // 获取所有任务
    async getAllTasks() {
        const tasks = await this.taskInfoModel.find().exec()
        return new Result(tasks, '获取数据成功').success()
    }

    // 新增任务
    async createTask(Params: Task) {
        try {
            const data = {
                taskId:         new ObjectId(),
                taskName:       Params.taskName,
                taskContent:    Params.taskContent,
                taskStatus:     (Params.taskStatus == '' || Params.taskStatus == undefined) ? 'ready' : Params.taskStatus,
                taskPrograss:   (Params.taskPrograss.toString() == '' || Params.taskPrograss == undefined) ? 0 : Params.taskPrograss,
                beginDate:      Params.beginDate,
                finishDate:     Params.finishDate,
                // 创建人从cookie里取，暂时先传入
                creator:        Params.creator,
                createTime:     new Date().valueOf(),
            }
            await this.taskInfoModel.create(data)
            return new Result('新增成功').success()
        } catch (error) {
            return new Result(`新增任务失败！失败原因：${error}`).fail()
        }
    }

    // 编辑任务
    async editTask(Params: Task) {
        try {
            const task = await this.taskInfoModel.findOne({'taskId': Params.taskId})
            if (!task) {
                return new Result('没有该任务，编辑任务失败！').fail()
            }
            const res = await this.taskInfoModel.updateOne(
                { taskId: Params.taskId },
                {
                    taskName:       Params.taskName,
                    taskContent:    Params.taskContent,
                    taskStatus:     (Params.taskStatus == '' || Params.taskStatus == undefined) ? 'ready' : Params.taskStatus,
                    taskPrograss:   (Params.taskPrograss.toString() == '' || Params.taskPrograss == undefined) ? 0 : Params.taskPrograss,
                    beginDate:      Params.beginDate,
                    finishDate:     Params.finishDate,
                }
            )
            return new Result('更新任务信息成功!').success()
        } catch (error) {
            return new Result(`更新任务信息失败，失败原因：${error}`).fail()
        }
    }
}
