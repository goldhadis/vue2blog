import axios from 'axios'
import Element from 'element-ui'
import router from '../router'
import store from '../store'

const http = axios.create({
    timeout: 1000 * 30,
    //withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})


http.defaults.baseURL = "http://localhost:8081"

// 前置拦截
http.interceptors.request.use(config => {
    return config
})

http.interceptors.response.use(response => {
        let res = response.data;
        if (res.code === 200) {
            return response
        } else {

            Element.Message.error('错了哦，这是一条错误消息', {duration: 3 * 1000})

            return Promise.reject(response.data.msg)
        }
    },
    error => {
        console.log(error)
        if(error.response.data) {
            error.message = error.response.data.msg
        }

        if(error.response.status === 401) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }

        Element.Message.error(error.message, {duration: 3 * 1000})
        return Promise.reject(error)
    }
)

export default  http