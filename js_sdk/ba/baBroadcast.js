// 监听系统广播、自定义广播 Ba-Broadcast
// https://ext.dcloud.net.cn/plugin?id=10277

// #ifdef APP-PLUS
const broadcast = uni.requireNativePlugin('Ba-Broadcast')
const actions = [
    // 'com.weisifang', //自定义广播

    'android.intent.action.SCREEN_OFF', //	关闭屏幕		
    'android.intent.action.SCREEN_ON', //    	打开屏幕		
    'android.intent.action.USER_PRESENT', //    	解锁屏幕		
    'android.intent.action.REBOOT', //    	重启设备
    'android.intent.action.ACTION_SHUTDOWN', //    关闭系统		
    'android.intent.action.CLOSE_SYSTEM_DIALOGS', //    	用户点击home键（homekey）和多任务键（recentapps）时（返回的reason值会有区别）    、当屏幕超时进行锁屏时、当用户按下电源按钮、进行锁屏时		
    'android.intent.action.ACTION_POWER_CONNECTED', //    	插上外部电源时发出的广播		
    'android.intent.action.ACTION_POWER_DISCONNECTED', //    	已断开外部电源链接时发出的广播		
    'android.intent.action.BATTERY_CHANGED', //    充电状态，或者电池的电量发生变化
    'android.intent.action.BATTERY_LOW', //    电池电量低		
    'android.intent.action.BATTERY_OKAY', //    	电池电量充足，即从电池电量低变化到饱满时会发出广播		
    'android.intent.action.AIRPLANE_MODE', //    	关闭或打开飞行模式时的广播	state	1：打开 0：关闭
    'android.intent.action.HEADSET_PLUG', //    	在耳机口上插入耳机时发出的广播	state	1：插入 0：拔出
    'android.provider.Telephony.SMS_RECEIVE', //    	接收短信 需要对应权限 android.permission.RECEIVE_SMS		
    'android.media.VOLUME_CHANGED_ACTION', //    	音量改变		
    'android.intent.action.TIME_TICK', //    	当前时间变化（正常的时间流逝）。当前时间改变，每分钟都发送		
    'android.intent.action.PACKAGE_INSTALL', //    	触发一个下载而且完成安装时发出的广播，好比在电子市场里下载应用		
    'android.intent.action.PACKAGE_REMOVED', //    	成功的删除某个APK以后发出的广播 （正在被安装的包程序不能接收到这个广播）		
    'android.intent.action.PACKAGE_REPLACED', //    	替换一个现有的安装包时发出的广播（无论如今安装的APP比以前的新仍是旧，都会发出此广播）		
    'android.intent.action.PACKAGE_ADDED', //    	成功的安装APK以后		
    'android.intent.action.PACKAGE_CHANGED', //    	一个已存在的应用程序包已经改变，包括包名		
    'android.intent.action.PACKAGE_DATA_CLEARED', //    	清除一个应用程序的数据时发出的广播(在设置－－应用管理－－选中某个应用，以后点清除数据时?)
];
//自定义广播
const customAction = 'com.weisifang'

import helper from '../weisifang/helper.js'
import api from '@/api/index.js'
// #endif

const baBroadcast = {
    register() { //注册监听
        broadcast.register({
            actions: actions
        }, res => {
            let msg = '';
            if (res.msg) {
                msg = res.msg;
            }
            if (!['android.intent.action.BATTERY_CHANGED', 'android.intent.action.TIME_TICK'].includes(res
                    .action)) {
                console.log("app广播：" + (res.action))
                // api.app.test_live({
                //     'name': "app广播：" + (res.action),
                //     'msg': JSON.stringify(res)
                // })
            }
            if (res.action) { //判断是否是接收到广播消息
                // this.msgList.push(res.action);
                msg = res.action;
            } else if (res.ok) {

            }
        });
    },
    unregister() { //注销监听
        broadcast.unregister({}, res => {
            console.log('注销监听', res);
            // uni.showToast({
            //     title: res.msg,
            //     icon: "none",
            //     duration: 3000
            // })
        });
    },
    sendBroadcast(action_str = '') { //发送自定义广播
        let send_action = action_str || customAction
        if (!send_action) {
            uni.showToast({
                title: 'action 不能为空',
                icon: "none"
            })
            return
        }
        broadcast.sendBroadcast({
            action: send_action, //广播 action
            msg: '测试广播', //随意自定义参数，可多个
        }, res => {
            console.log(res);
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
}
export default baBroadcast