// Cookie处理方法
export default {
  // 写入cookie
  writeCookie: (name, value, expiresIn) => {
    var expire = new Date((new Date()).getTime() + +expiresIn)
    expire = '; expires=' + expire.toGMTString() // toUTCString,toGMTString
    document.cookie = name + '=' + escape(value) + expire + '; path=/'
  },

  // 读取cookie
  getCookie: (name) => {
    var arr = null
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null
  },

  // 清除cookie
  removeCookie: (name) => {
    this.default.writeCookie(name, '1', -1)
  }
}
