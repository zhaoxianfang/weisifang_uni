// 安卓保活套装（通用、常驻通知、电池优化、自启管理、后台运行等）
// https://ext.dcloud.net.cn/plugin?id=11765

// #ifdef APP-PLUS
const keepAlive = uni.requireNativePlugin('Ba-KeepAliveSuit')

import helper from '@/js_sdk/helper.js'
// #endif

const baKeepAliveSuit = {
    onKeep(option={},callback=null) { //通用保活
        var opt = Object.assign({}, {
                //channelId: "Ba-KeepAlive",
                //channelName: "Ba-KeepAlive",
                title: "威四方",
                content: "持续为您护航",// 常驻通知描述
            }, option)
        keepAlive.onKeep(opt,
        (res) => {
            console.log(res);
            if(callback){
                callback(res)
            }else{
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            }
        });
    },
    onAutoStart() { //去设置自启动、后台运行
        keepAlive.onAutoStart(
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    requestIgnoreBattery(callback=null) { //申请加入电池优化白名单
        keepAlive.requestIgnoreBattery(
            res => {
                if(callback){
                    callback(res)
                }else{
                    uni.showToast({
                        title: res.msg,
                        icon: "none",
                        duration: 3000
                    })
                }
            });
    },
    goIgnoreBattery() { //跳转到电池优化设置页
        keepAlive.goIgnoreBattery(
            res => {
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    isIgnoringBattery(callback=null) { //是否加入电池优化白名单
        keepAlive.isIgnoringBattery(
            res => {
                // console.log(res);
                // if (res.data) {
                //  this.msgList.unshift(JSON.stringify(res.data))
                //  this.msgList.unshift(dateUtil.now())
                // }
                if(callback){
                    callback(res.data.isIgnoring,res)
                }else{
                    uni.showToast({
                        title: res.msg,
                        icon: "none",
                        duration: 3000
                    })
                }
            });
    },
    onShowNotify(option={},callback=null) { //常驻通知保活
        var opt = Object.assign({}, {
            //channelId: "Ba-KeepAlive",
            //channelName: "Ba-KeepAlive",
            title: "威四方",
            content: "持续为您护航",// 常驻通知描述
        }, option)
        keepAlive.onShowNotify(opt,
        (res) => {
            console.log(res);
            if(callback){
                callback(res.data.isIgnoring,res)
            }else{
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            }
        });
    },
    onCancelNotify() { //取消常驻通知保活
        keepAlive.onCancelNotify({
                //channelId: "Ba-KeepAlive",
                //channelName: "Ba-KeepAlive",
                //ID:99
                //title: "测试",
                //content: "常驻通知描述",
            },
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
}
export default baKeepAliveSuit