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
import { set_time } from 'src/Utils/formatTime';


@Injectable()
export class TaskService {
    // 构造函数
    constructor(@InjectModel('taskInfo') private readonly taskInfoModel) {}

    // 获取任务信息
    async getTasks(Params: Task) {
        var tasks = []
        // 判断查询参数是否为空
        if (Object.keys(Params).length == 0) {
            tasks = await this.taskInfoModel.find().populate({path: 'creator', select: 'userName'})
        } else {
            // 构造查询参数 ($regex 代表模糊查询)
            const queryTaskName = (Params.taskName == null || Params.taskName == 'undefined') ? {} : {'taskName': { $regex: Params.taskName }} 
            const queryTaskStatus = (Params.taskStatus == null || Params.taskStatus == 'undefined') ? {} : {'taskStatus': { $regex: Params.taskStatus }} 
            const queryBeginTime = (Params.beginTime == null || Params.beginTime == 'undefined') ? {} : {'beginTime': { '$gte': Params.beginTime }} 
            const queryFinishTime = (Params.finishTime == null || Params.finishTime == 'undefined') ? {} : {'finishTime': { '$lte': Params.finishTime }}
            tasks = await this.taskInfoModel.find(
                Object.assign(queryTaskName, queryTaskStatus, queryBeginTime, queryFinishTime)
            ).populate({path: 'creator', select: 'userName'})
        }
        // 处理获取到的创建人信息和时间
        tasks.map((item: any) => {
            item.creator = item.creator.userName
            item.beginTime = set_time(item.beginTime)
            item.finishTime = set_time(item.finishTime)
        })
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
                beginTime:      Params.beginTime,
                finishTime:     Params.finishTime,
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
                    beginTime:      Params.beginTime,
                    finishTime:     Params.finishTime,
                }
            )
            return new Result('更新任务信息成功!').success()
        } catch (error) {
            return new Result(`更新任务信息失败，失败原因：${error}`).fail()
        }
    }

    // 删除任务
    async deleteTask(Params: Task) {
        try {
            const task = await this.taskInfoModel.findOne({'taskId': Params.taskId})
            if (!task) {
                return new Result('没有该任务，删除任务失败!').fail()
            }
            const res = await this.taskInfoModel.deleteOne({ taskId: Params.taskId })
            return new Result('删除任务成功!').success()
        } catch (error) {
            return new Result(`删除任务失败！失败原因：${error}`).fail()
        }
    }
}
