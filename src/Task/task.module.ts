/*
* @Time    : 2021/09/05 21:47:10
* @Author  : DannyDong
* @File    : task.module.ts
* @Description: 任务相关Moudle
*/

import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from '../Schema/task.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: 'taskInfo',
                    schema: TaskSchema,
                    collection: 'task'
                }
            ]
        )
    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
