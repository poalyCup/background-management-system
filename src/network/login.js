import { request } from './request'

export function goLogin (loginForm) {
    return request({
        url: 'login',
        method: 'post',
        params: { ...loginForm }
    })
}