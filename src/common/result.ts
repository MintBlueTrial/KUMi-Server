/*
* @Time    : 2021/08/23 11:40
* @Author  : DannyDong
* @File    : result.js
* @Description: 响应结果
*/

const { CODE_ERROR, CODE_SUCCESS, CODE_TOKEN_EXP } = require('../Utils/constant');

export class Result {

    data: any
    code: number
    msg: string

    // 构造函数
    constructor(data: any, msg?: string) {
        this.data = null
        if (arguments.length === 0) {
            this.msg = '请求成功'
        } else if (arguments.length === 1) {
            this.msg = data
        } else {
            this.data = data
            this.msg = msg
        }
    }

    // 生成响应体
    createResult() {
        if (!this.code) this.code = CODE_SUCCESS
        let base = {}
        if (this.data) base['data'] = this.data;
        base['msg'] = this.msg
        base['code'] = this.code
        return base;
    }

    // 成功
    success() {
        this.code = CODE_SUCCESS
        return this.createResult()
    }

    // 失败
    fail() {
        this.code = CODE_ERROR
        return this.createResult()
    }

    // token异常
    tokenErr() {
        this.code = CODE_TOKEN_EXP
        return this.createResult()
    }
}
