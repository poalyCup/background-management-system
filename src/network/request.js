import axios from 'axios'

export function request (config) {
    const instance = axios.create({
        // baseURL: "http://127.0.0.1:8888/api/private/v1/",
        baseURL: 'http://api.airpass.top/',
        timeout: 3000
    })
    //axios拦截器
    //请求拦截
    instance.interceptors.request.use(config => {
        // console.log(config)
        //拦截后必须将config   return出去，不然网络无法继续请求
        config.headers.Authorization = window.sessionStorage.getItem('token')
        // console.log(config)
        return config
    },err => {
        console.log(err)
    })
    //响应拦截
    instance.interceptors.response.use(res => {
        //console.log(res)
        return res.data
    }, err => {
        console.log(err)
    })
    return instance(config)
}