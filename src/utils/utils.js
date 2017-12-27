// 通用全局函数
export default {
  /**
   * 日期格式化
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * 使用方法：
   * this.$utils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
   * this.$utils.dateFormat(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
   * @param {Date, String} date 日期对象或日期字符串
   * @param {String} fmt 格式化字符串
   */
  dateFormat(date, fmt) {
    if (date && typeof date === 'string') {
      // 解决IE、firefox浏览器下JS的new Date()的值为Invalid Date、NaN-NaN的问题
      date = date.replace(/\.0$/g, '').replace(/-/g, '/')
      date = new Date(date)
    }

    if (!date) { return '' }

    let o = {
      'M+': date.getMonth() + 1,                   // 月份
      'd+': date.getDate(),                        // 日
      'h+': date.getHours(),                       // 小时
      'm+': date.getMinutes(),                     // 分
      's+': date.getSeconds(),                     // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds()                  // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },

  /**
   * 对象或数组排序方法，按一个字段数值大小排序
   * 使用方法：
   * data.sort(this.$utils.rank('prop', true))
   * @param {String} prop 排序的键名
   * @param {Boolean} desc 升序或降序，true为降序，false从升序
   */
  rank(prop, desc) {
    return function (obj1, obj2) {
      var val1 = obj1[prop]
      var val2 = obj2[prop]
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1)
        val2 = Number(val2)
      }
      return desc ? ((val1 < val2) ? 1 : -1) : ((val1 > val2) ? 1 : -1)
    }
  },

  /**
   * 查找数组中所有对象的某一个键是否存在某个值，如存在，返回序号，不存在，返回-1
   * @param {Array} array 查找的数组
   * @param {String} attr 数组中对象的键名
   * @param {any} val 对象的键值
   */
  findObjIndex(array, attr, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][attr] === val) { return i }
    }
    return -1
  }
}
