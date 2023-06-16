import api from '@/api/index'
import tui from '@/common/httpRequest';

const user = {
    // 管理的数据
    state: {
        //用户登录手机号
        token: uni.getStorageSync("api_token") || "",
        //是否登录 项目中改为真实登录信息判断，如token
        isLogin: uni.getStorageSync("api_token") ? true : false,
        //登录用户名
        nickname: "请登录",
        userinfo: uni.getStorageSync("user_info") || {},
        //app版本
        version: "1.0.0"
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            state.isLogin = true
            uni.setStorageSync("api_token", token)
        },
        SET_USERINFO: (state, userinfo) => {
            state.userinfo = userinfo
            state.mobile = userinfo.mobile
            uni.setStorageSync("user_info", userinfo)
        },
        LOGOUT: (state, info) => {
            state.token = ''
            state.nickname = '请登录'
            state.isLogin = false
            state.userinfo = {}
            uni.removeStorageSync("api_token")
            uni.removeStorageSync("user_info")
        },
    },

    actions: {
        login({
            commit
        }, userInfo) {
            console.log('登录--', userInfo)
            const {
                mobile,
                password
            } = userInfo
            return new Promise((resolve, reject) => {
                api.user.login({
                    mobile: mobile.trim(),
                    password: password
                }).then(response => {
                    console.log('登录返回', response)
                    tui.toast(response.message)
                    if (response.code !== 200) {
                        reject(response)
                    } else {
                        let data = response.data
                        // 登录成功了
                        commit('SET_TOKEN', data.access_token)
                        commit('SET_USERINFO', data.user)
                        resolve(response)
                    }
                    // const { data } = response
                    // commit('SET_TOKEN', data.token)
                    // setToken(data.token)
                    // setSecret(data.secret)
                    // reject(false)
                }).catch(error => {
                    console.log(error)
                    tui.toast('出错啦')
                    reject(error)
                })
            })
        },
        qq_login({
            commit
        }, qqAppTokenInfo) {
            return new Promise((resolve, reject) => {
                api.user.qq_login(qqAppTokenInfo).then(response => {
                    // console.log('登录返回', response)
                    tui.toast(response.message)
                    if (response.code !== 200) {
                        reject(response)
                    } else {
                        let data = response.data
                        // 登录成功了
                        commit('SET_TOKEN', data.access_token)
                        commit('SET_USERINFO', data.user)
                        resolve(response)
                    }
                }).catch(error => {
                    console.log(error)
                    tui.toast('出错啦')
                    reject(error)
                })
            })
        },
        // 退出
        logout({
            commit,
            state
        }) {
            console.log('退出')
            commit('LOGOUT', true)
        },
        /**
         * 获取用户权限
         */
        getPermission({
            dispatch,
            commit
        }) {
            return new Promise((resolve, reject) => {
                getUserAuth().then(res => {
                    // 存储权限列表
                    const apiAuthData = res.data
                    if (!apiAuthData || apiAuthData.length < 1) { // 验证返回的是否是一个空数组
                        // console.log('getPermission 角色信息获取错误 !')
                        // reject('getPermission 角色信息获取错误 !')
                        reject()
                    }
                    let apiAuthPermissionList = []
                    apiAuthData.forEach(apiNode => {
                        apiAuthPermissionList.push(apiNode[RouterConfig.apiPermissionField])
                    })
                    commit('SET_AUTH', apiAuthPermissionList)
                    commit('SET_ROLES', apiAuthData)
                    // 调用完权限 ，调用同级的用户信息
                    dispatch('GetUserInfo').then(res => {
                        resolve(apiAuthData)
                    }).catch(() => {
                        reject()
                    })
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出
        Logout({
            commit,
            state
        }) {

        }

    }
}

export default user