import request from '@/utils/request'

export function createOrder(data) {
  return request({
    url: '/bu/order/create',
    method: 'post',
    data
  })
}

export function cancelOrder(data) {
  return request({
    url: '/bu/order/cancelOrder',
    method: 'post',
    data
  })
}

export function onCarOrder(data) {
  return request({
    url: '/bu/order/onCarOrder',
    method: 'post',
    data
  })
}

export function payOrder(data) {
  return request({
    url: '/bu/order/payOrder',
    method: 'post',
    data
  })
}

export function orderDetail(orderId) {
  return request({
    url: '/bu/order/orderDetail',
    method: 'get',
    params: { orderId }
  })
}

export function waitPayOrderList(data = {}) {
  return request({
    url: '/bu/order/waitPayOrderList',
    method: 'post',
    data
  })
}

export function paidOrderList(data = {}) {
  return request({
    url: '/bu/order/paidOrderList',
    method: 'post',
    data
  })
}

export function finishOrderList(data = {}) {
  return request({
    url: '/bu/order/finishOrderList',
    method: 'post',
    data
  })
}

export function cancelOrderList(data = {}) {
  return request({
    url: '/bu/order/cancelOrderList',
    method: 'post',
    data
  })
}

export function wechatPay(orderId) {
  return request({
    url: '/bu/order/wechatPay',
    method: 'post',
    data: {},
    params: { orderId }
  })
}

export function deleteImage(id) {
  return request({
    url: '/bu/image/delete',
    method: 'post',
    data: [id]
  })
}

export function singleCar(data) {
  return request({
    url: '/bu/car/singleCar',
    method: 'post',
    data
  })
}
