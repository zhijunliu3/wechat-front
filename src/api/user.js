import api from './index'
// axios
import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sc/wechatLogin',
    method: 'post',
    data
  })
}

export function bind(data) {
  return request({
    url: '/sc/wechatUserLogin',
    method: 'post',
    data
  })
}

// 用户信息 post 方法
export function getUserInfo(data) {
  return request({
    url: api.UserInfo,
    method: 'post',
    data,
    hideloading: true
  })
}

// 用户名称 get 方法
export function getUserName(params) {
  return request({
    url: api.UserName,
    method: 'get',
    params,
    hideloading: true
  })
}

export function register(data) {
  return request({
    url: '/sc/register',
    method: 'post',
    data
  })
}

export function listUserAuthUrl() {
  return request({
    url: '/sc/listUserAuthUrl',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/sc/logout',
    method: 'get'
  })
}

export function sendVerificationCode(mobile) {
  return request({
    url: '/sc/sendVerificationCode',
    method: 'post',
    data: {},
    params: { mobile }
  })
}

export function unBind() {
  return request({
    url: '/sc/wechatLogout',
    method: 'get'
  })
}
