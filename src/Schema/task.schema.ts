/*
* @Time    : 2021/09/05 21:21:03
* @Author  : DannyDong
* @File    : task.schema.ts
* @Description: 任务相关数据ORM
*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;


@Schema({ versionKey: false })
export class Task extends Document {

    @Prop({ required: true, unique: true })
    taskId: string

    @Prop({ required: true })
    taskName: string;
    
    taskContent: string;
    
    // Status: ready、going、finish
    @Prop({ required: true, default: 'ready' })
    taskStatus: string;
    
    @Prop({ required: true, default: 0 })
    taskPrograss: number;
    
    @Prop({ required: true })
    beginDate: string;

    finishDate: string;

    @Prop({ required: true })
    creator: string
    
    @Prop({ required: true })
    createTime: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)
