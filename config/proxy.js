// 开始环境的http代理，处理跨域js请求问题
// 如：axios.get('/api/data') 实际代理的地址为 http://some-domain.com/api/data

const api = [
  '/auth',
  '/api'
]

const option = {
  target: 'http://some-domain.com',
  changeOrigin: true
}

let proxy = {}
api.forEach(item => { proxy[item] = option })

module.exports = proxy
