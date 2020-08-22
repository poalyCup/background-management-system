import { request } from './request'

export function getMenuList () {
  return request({
      url: 'menus'
  })
}

export function getUsersList (queryInfo) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      ...queryInfo
    }
  })
}

export function changeUserState (userInfo) {
  // console.log(userInfo)
  const uid = userInfo.id
  const type = userInfo.mg_state
  return request({
    url: `/users/${uid}/state/${type}`,
    method: 'put'
  })
}

export function addNewUser (newUserInfo) {
  return request({
    url: '/users',
    method: 'post',
    params: { ...newUserInfo }
  })
}

//根据ID获取单用户的信息
export function getUserInfoById (id) {
  return request({
    url: `/users/${id}`,
    method: 'get'
  })
}

//对编辑后的用户信息进行保存
export function saveUserInfoById (editNewUserInfo) {
  console.log(editNewUserInfo)
  return request({
    url: `/users/${editNewUserInfo.id}`,
    method: 'put',
    params: { 
      email: editNewUserInfo.email,
      mobile: editNewUserInfo.mobile
     }
  })
}