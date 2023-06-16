import fetch from '@/common/httpRequest'


import app from './modules/app'
import user from './modules/user'
import photo from './modules/photo'
import article from './modules/article'
import my_files from './modules/my_files'

/* 将所有接口统一起来便于维护 */
var apiList = {
    // 通用post请求
    post(url, data) {
        return fetch.request(url, "POST", data)
    },
    // 通用get请求
    get(url) {
        return fetch.request(url, "GET", {})
    },
    app,
    user,
    photo,
    article,
    my_files,
}

// 默认全部导入
export default apiList
