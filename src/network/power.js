import { request } from './request'

//获取权限列表
export function getRightsList () {
  return request({
    url: `/rights/list`,
    method: 'get'
  })
}

//获取角色列表
export function getRolesList () {
  return request({
    url: '/roles',
    method: 'get'
  })
}
