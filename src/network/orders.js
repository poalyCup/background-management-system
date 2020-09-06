import { request } from './request'

//获取订单列表
export function getOrdersList (queryInfo) {
  return request({
    url: '/orders',
    method: 'get',
    params: {
      ...queryInfo
    }
  })
}

//获取物流信息
export function getLogisticsInfo(){
  return request({
    url: '/kuaidi/1106975712662',
    method: 'get'
  })
}