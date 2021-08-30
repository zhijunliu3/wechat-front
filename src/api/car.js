import request from '@/utils/request'

export function getMyCar(data = {}) {
  return request({
    url: '/bu/car/myCar',
    method: 'post',
    data
  })
}

export function getMyTrip(data = {}) {
  return request({
    url: '/bu/car/myTrip',
    method: 'post',
    data
  })
}

export function tripDetail(data = {}) {
  return request({
    url: '/bu/car/tripDetail',
    method: 'post',
    data
  })
}
