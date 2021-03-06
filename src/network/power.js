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

//获取角色权限树
export function getRightsTree () {
  return request({
    url: '/rights/tree',
    method: 'get'
  })
}

//角色授权
export function setRoleRights (roleId, rids) {
  return request({
    url: `/roles/${roleId}/rights`,
    method: 'post',
    params: {
      rids: rids
    }
  })

}