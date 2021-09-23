import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseUrl } from '@/config'
import { getToken } from '@/utils/auth'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// 不拦截响应结果的
const whiteList = ['/sc/wechatLogin']

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    const config = response.config
    if (whiteList.indexOf(config.url) === -1) {
      if (res.errorCode !== '0') {
        Toast(res.errorMsg || 'Error')
        // 登录超时,重新登录
        if (res.errorCode === 'WEB_2002') {
          router.push('/common')
        }
        return Promise.reject(res || 'error')
      } else {
        return Promise.resolve(res)
      }
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
