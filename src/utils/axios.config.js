import axios from 'axios'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

/*
  后端=>前端=>字符串=>JSON.parse()=>如果超出了最大安全数字=>计算偏差=>JSON.parse()将不精确
  js的数字有最大安全数值
    即2的53次方
    Number.MAX_SAFE_INTEGER
    在运算或者json对象转换时会有误差
  解决方法：
    json-bigint npm包
      1.看文档
      2.npm i json-bigint
      3.import JSONBig from 'json-bigint'
      4.JSONBig.parse('数据')
    使用：
      原来是axios默认转换数据
      现在使用自定义的方式转换数据
      transformResponse 在传递给then/catch前，允许修改响应数据
      eg：tansfromResponse:[function(data){
        对data进行任意转换处理
        return data:
      }],
  结论：后端传过来的id数字超过了前端最大安全数字的限制，导致JSON.parse及其他运算失败，需要第三方的转化包
  jso-bigint=>调用接口=>ok
*/
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]
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
  return new Promise(function () {})// 如果不return就会抛出异常控制台就会看到错误
  // 返回一个新的promise对象就意味着，一个新的没有错误的promise 返回了之前的错误被终止了
})
export default axios
