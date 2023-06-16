// 应用消息通知插件
// https://ext.dcloud.net.cn/plugin?id=9231

// #ifdef APP-PLUS
const notify = uni.requireNativePlugin('Ba-Notify')
const beep = uni.requireNativePlugin('Ba-Beep')

import helper from '../weisifang/helper.js'
let defaultContent = {
    channelID: '1', //渠道Id
    channelName: '新消息通知', // 渠道名称
    ID: 0, // 通知id
    isSound: false, //	声音 使用 Ba-Beep 差距发声
    isVibrate: true, //	震动
    isLights: true, //	闪光
    ticker: '威四方', // 	在顶部状态栏中的提示信息
    title: '新消息', // 设置通知中心的标题
    content: '您有一条消息通知', // 设置通知中心中的内容
    thumbUrl: '_www/static/images/logo/logo.png', //	缩略图本地绝对路径（大图通知、HeadUp通知、消息盒子）
    // bigUrl: '_www/static/images/logo/logo.png', //    大图本地绝对路径（大图通知）
    leftBtnText: '', //    	左侧按钮（按钮通知、HeadUp通知）
    rightBtnText: '', //    	右侧按钮（按钮通知、HeadUp通知）
    msgList: [], //    	消息列表（消息盒子）
    maxProgress: 100, //    最大进度（进度通知）
    progress: 0, //    	当前进度（进度通知）
    indeterminate: false, //  否有准确的进度显示（进度通知）
    finishText: '', //    	完成后的显示（进度通知）
    autoCancel: true, //    	点击通知，自动消失，默认 true
    ongoing: false, //    	通知持续显示，侧滑不能删除，默认 false
    notifyType: 1, // 通知类型0~6 0:普通通知 1:大图通知 2:按钮通知 3:HeadUp 4:消息盒子 5:多行通知 6:进度通知
    extend: '' // 附加消息
}

// #endif

const baNotify = {
    //是否打开通知权限
    isNotifyEnabled(goToSetting = true) {
        notify.isNotifyEnabled((res) => {
            if (!res.isNotifyEnabled && goToSetting) {
                notify.show(defaultContent, (res) => {});
                this.goSetNotify()
            }
            return res.isNotifyEnabled ? true : false; // 是否开启通知权限
        });
    },
    //跳转到通知设置界面
    goSetNotify() {
        notify.goSetNotify();
    },
    //清空某类型消息
    clear(type = '', notifyId = 0) {
        if (this.isNumber(type)) {
            notify.clear({
                'channelID': type || '0', //渠道Id
                'channelName': defaultContent.channelName || '新消息通知', //渠道名称
                'ID': notifyId || 0,
            });
        } else {
            for (var i = 0; i < 7; i++) {
                notify.clear({
                    'channelID': i || '0', //渠道Id
                    'channelName': ('channel_' + i) || 'channel_0', //渠道名称
                    'ID': notifyId || 0,
                });
            }
        }
    },
    getId() {
        var date = new Date();
        let timeId = date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date
            .getMinutes() + date.getSeconds() + date.getMilliseconds();
        return parseInt(timeId);
    },
    isNumber(obj) {
        return typeof obj === 'number' && !isNaN(obj)
    },
    send: (obj, notifyType = 1, extend = {}, callFn) => {
        // #ifdef APP-PLUS

        // 判断是否开启通知权限
        baNotify.isNotifyEnabled(true);

        // 初始化通知内容
        obj = obj || {}
        var noticeContentObj = Object.assign({}, defaultContent, obj)

        // 播放beep 声音 //音频资源名称，参照“音频资源配置”
        beep.play({
            beepName: 'notify'
        }, (res) => {});
        // 震动
        beep.playVibrate({
            repeat: -1, //重复 -1：表示不重复 0：循环的震动 >1：表示从哪里开始重复
            pattern: [200,
                800
            ] //震动规则，传递一个整型数组作为关闭和开启震动的持续时间，以毫秒为单位。第一个值表示等待震动开启的毫秒数，下一个值表示保持震动的毫秒数，这个序列值交替表示震动关闭和开启的毫秒数
        }, (res) => {});

        noticeContentObj.thumbUrl = plus.io.convertLocalFileSystemURL(noticeContentObj.thumbUrl)

        noticeContentObj.notifyType = notifyType
        noticeContentObj.ID = baNotify.getId()

        noticeContentObj.extend = JSON.stringify(extend);
        // 发送通知
        notify.show(noticeContentObj, (res) => {
            console.log('发送通知res:', res)
            callFn && callFn('send_res', res)
        });
        // #endif
    }
}
export default baNotify
