import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  // 进行配置的注入
  let userInfoJson = window.localStorage.getItem('userInfo')
  let token = userInfoJson ? JSON.parse(userInfoJson).token : null// 获取tokn值
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  // return Promise.reject(error)
  let code = error.response ? error.response.status : ''
  let message = ''
  switch (code) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证'
      break
    case 507:
      message = '服务器数据异常'
      break
    case 404:
      message = '手机号码不正确'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.clear()
      window.location.hash = '#/login'
      break
    default:
      message = '未知错误'
      break
  }
  Message({ message, topy: 'warning' })
  return new Promise()
})
export default axios
