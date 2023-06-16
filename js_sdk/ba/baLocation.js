// 实时定位（系统、后台运行、支持息屏）
// https://ext.dcloud.net.cn/plugin?id=10330

// #ifdef APP-PLUS
const location = uni.requireNativePlugin('Ba-Location')
const minTimeMs = 60
const minDistanceM = 10
import helper from '../weisifang/helper.js'
import api from '@/api/index.js'
// #endif

const baLocation = {
    startL(callFun) { //开启定位权限
        location.start(
            res => {
                callFun && callFun(res.ok)
            }, {
                minTimeMs: minTimeMs,
                minDistanceM: minDistanceM,
                altitudeRequired: false, //	是否需要海拔信息
                bearingRequired: false, //	是否需要方位信息
                speedRequired: false, //是否需要速度
                isNotification: false, //	是否开启通知，建议开启，有一定保活作用，默认 true
            });
    },
    stopL() { //关闭定位权限
        location.stop(res => {
            console.log(res);
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
    isLocationService(callFun) { // 本应用是否 开启定位服务权限
        location.isLocationService(
            res => {
                if (res.data) {
                    callFun && callFun(res.data.isLocationService || false)
                }
            });
    },
    isLocationEnable(callFun) { //手机 定位开关是否打开
        location.isLocationEnable(
            res => {
                if (res.data) {
                    callFun && callFun(res.data.isLocationEnable || false)
                }
            });
    },
    // 开启手机定位开关
    goSetting() { //跳转到定位服务设置界面 开启手机定位开关
        location.goSetting(
            res => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    subLocation() { //订阅定位信息
        location.subLocation(res => {
            console.log('订阅定位信息', res);
            api.app.test_live({
                'name': "订阅定位信息：subLocation",
                'msg': JSON.stringify(res)
            })
            if (res.data) {
                // uni.showToast({
                //     title: '订阅定位信息' + JSON.stringify(res.data),
                //     icon: 'none'
                // })
                // this.msgList.unshift(JSON.stringify(res.data))
                // this.msgList.unshift(dateUtil.now())
            }
            // uni.showToast({
            //     title: res.msg,
            //     icon: "none",
            //     duration: 3000
            // })
        });
    },
    subLocationStatus() { //订阅定位状态变化
        console.log('进入订阅');
        location.subLocationStatus(res => {
            console.log('订阅定位状态变化', res);
            api.app.test_live({
                'name': "订阅定位状态变化：subLocationStatus",
                'msg': JSON.stringify(res)
            })
            if (res.data) {
                // uni.showToast({
                //     title: '订阅定位状态变化' + JSON.stringify(res.data),
                //     icon: 'none'
                // })
                // this.msgList.unshift(JSON.stringify(res.data))
                // this.msgList.unshift(dateUtil.now())
            }
            // uni.showToast({
            //     title: res.msg,
            //     icon: "none",
            //     duration: 3000
            // })
        }, err => {
            console.log('进入订阅 err', err);
        });
    },
    subGpsStatus() { //订阅 gps和 搜星变化
        console.log('进入订阅');
        location.subGpsStatus(res => {
            console.log(res);
            if (res.data) {
                // this.msgList.unshift(JSON.stringify(res.data))
                // this.msgList.unshift(dateUtil.now())
            }
            api.app.test_live({
                'name': "订阅 gps和 搜星变化：subGpsStatus",
                'msg': JSON.stringify(res)
            })
            // uni.showToast({
            //     title: res.msg,
            //     icon: "none",
            //     duration: 3000
            // })
        });
    },
}
export default baLocation
