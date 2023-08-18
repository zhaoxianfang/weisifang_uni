// 安卓保活套装（通用、常驻通知、电池优化、自启管理、后台运行等）
// https://ext.dcloud.net.cn/plugin?id=11765

// #ifdef APP-PLUS
const keepAlive = uni.requireNativePlugin('Ba-KeepAliveSuit')

import helper from '@/js_sdk/helper.js'
// #endif

const baKeepAliveSuit = {
    onKeep() { //通用保活
        keepAlive.onKeep({
                //channelId: "Ba-KeepAlive",
                //channelName: "Ba-KeepAlive",
                title: "测试",
                content: "常驻通知描述",
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
    requestIgnoreBattery() { //申请加入电池优化白名单
        keepAlive.requestIgnoreBattery(
            res => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    goIgnoreBattery() { //跳转到电池优化设置页
        keepAlive.goIgnoreBattery(
            res => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    isIgnoringBattery() { //是否加入电池优化白名单
        keepAlive.isIgnoringBattery(
            res => {
                console.log(res);
                // if (res.data) {
                //  this.msgList.unshift(JSON.stringify(res.data))
                //  this.msgList.unshift(dateUtil.now())
                // }
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    onShowNotify() { //常驻通知保活
        keepAlive.onShowNotify({
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