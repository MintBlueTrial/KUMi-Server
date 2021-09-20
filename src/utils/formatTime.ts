/*
* @Time    : 2021/09/14 21:39:52
* @Author  : DannyDong
* @File    : formatTime.ts
* @Description: 时间戳转化时间字符串，并且格式化
*/

export function set_time(timeStr: string) {
    const tempTime = new Date(parseInt(timeStr))
    // 四位数年份
    var year = tempTime.getFullYear()
    //月份(0-11),0为一月份
    const month = tempTime.getMonth() + 1
    const newMonth = month < 10 ? ('0' + month) : month
    // 月的某一天(1-31)
    const day = tempTime.getDate()
    const newDay = day < 10 ? ('0' + day) : day
    // 小时(0-23)
    const hours = tempTime.getHours()
    const newHours = hours < 10 ? ('0' + hours) : hours
    // 分钟(0-59)
    const minutes = tempTime.getMinutes()
    const newMinutes = minutes < 10 ? ('0' + minutes) : minutes
    // 秒(0-59)
    const seconds = tempTime.getSeconds()
    const newSeconds = seconds < 10 ? ('0' + seconds) : seconds
    // 格式化时间（暂时只取年月日）
    // const newTime = year + '-' + newMonth + '-' + newDay + ' ' + newHours + ':' + newMinutes + ':' + newSeconds
    const newTime = year + '-' + newMonth + '-' + newDay
    return newTime
}
