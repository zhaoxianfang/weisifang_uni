import fetch from '@/common/httpRequest'


/* 系统接口 列表 */
var apiList = {
    // 账号登录
    login(data) {
        return fetch.request('users/auth/login', "POST", data)
    },
    // qq app登录信息交换用户信息
    qq_login(data) {
        return fetch.request('callback/token/userinfo', "POST", data)
    },
}

// 默认全部导入
export default apiList
