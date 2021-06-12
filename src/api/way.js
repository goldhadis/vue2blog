import { $http } from '@/utils/request'

// $http.get(url,data,config)
// 下方的函数方法都是可以接受三个参数的 分别是 地址 参数 配置   三个参数可以由函数function传入

// 获取详情
export function login(data) {
    return $http.post(`/login`, data)
}