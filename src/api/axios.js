import axios from 'axios'
import router from '../router'
import store from '../store'

// 设置全局配置，如超时时长、根路径、头部信息等
// https://www.npmjs.com/package/axios
const service = axios.create({
  timeout: 30000
  // baseURL: 'https://some-domain.com/api/',
  // headers: {'X-Requested-With': 'XMLHttpRequest'}
})

// http request 拦截器
service.interceptors.request.use(config => {
  var token = store.state.token
  if (token) {
    // 每次请求都为http头增加Authorization字段，其内容为 token
    config.headers.Authorization = `token ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// http response 响应拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 异常的全局处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        default:
          break
      }
    }
    return Promise.reject(error.response)
  }
)

export default service
