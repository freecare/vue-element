// 字符串处理方法
export default {
  // 获取字符串长度，中文字符占两个长度
  getStrLength(str) {
    let chineseReg = new RegExp(/[^\x00-\xff]/, 'g')
    return str ? str.replace(chineseReg, 'aa').length : 0
  }
}
