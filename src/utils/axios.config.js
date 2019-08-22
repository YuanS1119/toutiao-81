
import axios from 'axios'
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
  return Promise.reject(error)
})
export default axios
