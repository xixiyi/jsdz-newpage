
//格式：2019-03-01 01:01:01
function shifenmiaotime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return year + '-' + formatNumber(month) + '-' + formatNumber(day) + " " + formatNumber(hour) + ":" + formatNumber(minute) + ":" + formatNumber(second)
}

//格式：20190301010101
function timelongstring(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return year + formatNumber(month) + formatNumber(day) + formatNumber(hour) + formatNumber(minute) + formatNumber(second)
}
// 获取今日时间
function getToday(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + '-' + formatNumber(month) + '-' + formatNumber(day)
}

//时间拼接 0
function formatNumber(n) {
    n = n.toString()
    return n.length == 1 ? '0' + n : n
}

//时间计算
function addDate(date, days, hours, minutes) {
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours)
    date.setMinutes(date.getMinutes() + minutes)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    // return [year, month, day].map(formatNumber).join('')
    return year + '-' + formatNumber(month) + '-' + formatNumber(day) + " " + formatNumber(hour) + ":" + formatNumber(minute) + ":" + formatNumber(second)
}


export default {
    shifenmiaotime,
    timelongstring,
    getToday,
    addDate
}