/**
 * 常用方法封装 请求，文件上传等
 **/
import config from '@/api/config.js' // 倒入默认配置
import helper from '@/js_sdk/weisifang/helper.js'

const tui = {
    //接口地址
    interfaceUrl: function() {
        return config.baseURL
    },
    toast: function(text, duration, success) {
        uni.showToast({
            // #ifndef MP-ALIPAY
            duration: duration || 2000,
            // #endif
            title: text || "出错啦~",
            icon: success ? 'success' : 'none'
        })
    },
    modal: function(title, content, showCancel, callback, confirmColor, confirmText) {
        uni.showModal({
            title: title || '提示',
            content: content,
            showCancel: showCancel,
            cancelColor: "#555",
            confirmColor: confirmColor || "#5677fc",
            confirmText: confirmText || "确定",
            success(res) {
                if (res.confirm) {
                    callback && callback(true)
                } else {
                    callback && callback(false)
                }
            }
        })
    },
    isAndroid: function() {
        const res = uni.getSystemInfoSync();
        return res.platform.toLocaleLowerCase() == "android"
    },
    isPhoneX: function() {
        const res = uni.getSystemInfoSync();
        let iphonex = false;
        let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax']
        const model = res.model.replace(/\s/g, "").toLowerCase()
        if (models.includes(model)) {
            iphonex = true;
        }
        return iphonex;
    },
    constNum: function() {
        let time = 0;
        // #ifdef APP-PLUS
        time = this.isAndroid() ? 300 : 0;
        // #endif
        return time
    },
    delayed: null,
    loadding: false,
    showLoading: function(title, mask = true) {
        uni.showLoading({
            mask: mask,
            title: title || '请稍候...'
        })
    },
    /**
     * 请求数据处理
     * @param string url 请求地址
     * @param string method 请求方式
     *  GET or POST
     * @param {*} postData 请求参数
     * @param bool isDelay 是否延迟显示loading
     * @param bool isForm 数据格式
     *  true: 'application/x-www-form-urlencoded'
     *  false:'application/json'
     * @param bool hideLoading 是否隐藏loading
     *  true: 隐藏
     *  false:显示
     */
    request: async function(url, method = 'POST', postData = {}, isDelay = false, isForm = false, hideLoading =
        true) {
        //接口请求
        tui.loadding && uni.hideLoading();
        tui.loadding = false;
        if (!hideLoading) {
            if (isDelay) {
                tui.delayed = setTimeout(() => {
                    tui.loadding = true
                    tui.showLoading()
                }, 1000)
            } else {
                tui.loadding = true
                tui.showLoading()
            }
        }

        return new Promise((resolve, reject) => {
            uni.request({
                url: tui.interfaceUrl() + url,
                data: postData,
                header: {
                    'content-type': isForm ? 'application/x-www-form-urlencoded' :
                        'application/json',
                    'Authorization': tui.getToken()
                },
                method: method, //'GET','POST'
                dataType: 'json',
                success: (res) => {
                    clearTimeout(tui.delayed)
                    tui.delayed = null;
                    if (tui.loadding && !hideLoading) {
                        uni.hideLoading()
                    }
                    let res_content = res.data || res
                    if (!this.isObj(res_content)) {
                        if (this.isHtml(res.data)) {
                            // console.log('返回html 一般是报错了')
                            tui.toast('出错啦~')
                            // this.toLogin()
                            reject(res)
                            return false
                        }
                    }
                    if (!helper.isEmpty(res.statusCode) && (res.statusCode > 299 || res
                            .statusCode < 200)) {
                        reject(res)
                        return false
                    }
                    resolve(res.data)
                    return true
                },
                fail: (res) => {
                    clearTimeout(tui.delayed)
                    tui.delayed = null;
                    tui.toast("网络不给力，请稍后再试~")
                    reject(res)
                }
            })
        })
    },
    isHtml: function(input) {
        return /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(input);
    },
    isObj: function(val) {
        return Object.prototype.toString.call(val) === '[object Object]' || Object.prototype.toString.call(
            val) === '[object Array]'
    },
    /**
     * 上传文件
     * @param string url 请求地址
     * @param string src 文件路径
     */
    uploadFile: function(url, src) {
        tui.showLoading()
        return new Promise((resolve, reject) => {
            const uploadTask = uni.uploadFile({
                url: tui.interfaceUrl() + url,
                filePath: src,
                name: 'imageFile',
                header: {
                    'Authorization': tui.getToken()
                },
                formData: {
                    // sizeArrayText:""
                },
                success: function(res) {
                    uni.hideLoading()
                    let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
                    if (d.code % 100 == 0) {
                        //返回图片地址
                        let fileObj = d.data;
                        resolve(fileObj)
                    } else {
                        that.toast(res.msg);
                    }
                },
                fail: function(res) {
                    reject(res)
                    that.toast(res.msg);
                }
            })
        })
    },
    tuiJsonp: function(url, callback, callbackname) {
        // #ifdef H5
        window[callbackname] = callback;
        let tuiScript = document.createElement("script");
        tuiScript.src = url;
        tuiScript.type = "text/javascript";
        document.head.appendChild(tuiScript);
        document.head.removeChild(tuiScript);
        // #endif
    },
    //设置用户信息
    setUserInfo: function(mobile, token) {
        //uni.setStorageSync("thorui_token", token)
        // uni.setStorageSync("thorui_mobile", mobile)
    },
    //获取token
    getToken() {
        // return uni.getStorageSync("thorui_token")
        return 'Bearer ' + uni.getStorageSync('api_token')
    },
    //判断是否登录
    isLogin: function() {
        // return uni.getStorageSync("thorui_mobile") ? true : false
        return uni.getStorageSync('api_token') ? true : false
    },
    //跳转页面，校验登录状态
    href(url, isVerify) {
        if (isVerify && !tui.isLogin()) {
            uni.navigateTo({
                url: '/pages/common/login/login'
            })
        } else {
            uni.navigateTo({
                url: url
            });
        }
    },
    toLogin() {
        // 关闭所有页面，跳转到登录页面。
        uni.reLaunch({
            url: '/pages/common/login/login'
        });
    }
}

export default tui