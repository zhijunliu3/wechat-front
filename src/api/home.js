import request from '@/utils/request'

// 获取站点
export function listSite(data) {
  return request({
    url: '/bu/car/listSite',
    method: 'post',
    data
  })
}

export function listCar(data) {
  return request({
    url: '/bu/car/listCar',
    method: 'post',
    data
  })
}
