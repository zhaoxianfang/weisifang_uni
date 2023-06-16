// 极速通知
// https://ext.dcloud.net.cn/plugin?id=5959

// #ifdef APP-PLUS
import helper from './helper.js'
let defaultContent = {
    title: '您有一条新的消息',
    text: '消息内容',
}
let defaultOptions = {
    smallIcon: '_www/static/images/tabbar/work_active.png', // 系统logo ，后续看能不能直接获取系统logo icon 图标
    sound: '_www/static/media/notice.mp3',
    largeIcon: '_www/static/images/tabbar/work_active.png', // 通知右侧大图 test
    // bigPicture:'_www/static/images/system/test.jpg', // 通知内容超级大图
}
// #endif

const notify = {
    send: (obj, options, callFn) => {
        // #ifdef APP-PLUS
        // 如需本地打包使用本插件，可联系作者打包本地包，本地包需要帮顶包名，qq: 1320024819  微信： m1320024819

        // 判断是否开启通知权限
        helper.permissions.judgeIosPermissionPush()
        // 初始化通知内容
        obj = obj || {}
        options = options || {}
        let _tempMotificationId = (new Date().getTime())
        defaultOptions.notificationId = _tempMotificationId
        var noticeContent = Object.assign({}, defaultContent, obj)
        var optionsContent = Object.assign({}, defaultOptions, options)
        // 下面使用文件的地方，需要先使用这个方法将路径转换为本地路径
        const filePath = plus.io.convertLocalFileSystemURL(optionsContent.smallIcon)
        const noticePath = plus.io.convertLocalFileSystemURL(optionsContent.sound)
        const largeIconPath = plus.io.convertLocalFileSystemURL(optionsContent.largeIcon)
        const bigPicturePath = plus.io.convertLocalFileSystemURL(optionsContent.bigPicture)

        plus.push.setAutoNotification(true) //设置通知栏显示通知 //必须设置
        // 第一步，引入插件
        const uniNotification = uni.requireNativePlugin('Ys-UniNotification')

        // 一系列示例

        // 设置长震动
        uni.vibrateLong({})
        // 播放通知提示音
        // bgAudioManager.src = noticePath;
        // // bgAudioManager.stop();
        // bgAudioManager.seek = 0;
        // bgAudioManager.play();

        var notificationContent = Object.assign({}, noticeContent, optionsContent, {
            // 可选，设置小图标，值为图片本地路径
            smallIcon: filePath,
            largeIcon: largeIconPath, // 可选，设置大图标，值为图片本地路径
            //bigPicture: filePath, // 可选，设置大图片，值为图片路径，可使用上面获取图片路径的代码获取
            smallIconColor: [255, 100, 100, 100],
            notificationId: optionsContent.notificationId, //通知id
            // channelPriority: 4, //通知渠道的提示方式，默认是4,  1. 无声音，无弹出，text可折叠  2.text始终显示，不可折叠  3.有声音  4.有弹窗 5.做全屏提示的，如来电提醒就是这个
            // // 可选，在不支持渠道的系统上使用，默认为1, 可选值为-2到2,也是5个值，基本对应渠道的那5个值，具体可以自己测试
            // priority : 1 ,
            badgeNumber: 1, // 可选，app图标的角标数量 桌面图标的角标
            isVibration: true, // 使用默认震动
            sound: noticePath, // 自定义提示音，参数为音频文件路径
            vibrationPattern: [1000, 2000, 3000, 4000],
            lightColorArr: [255, 255, 0, 0], // 呼吸灯
            // isShowWhen: false,// 可选，通知上面是否显示时间，默认是显示的，所以如果不想显示的话，只用设置为false即可
            // when: 1629435337521, // 可选，通知上面的时间，格式是时间戳，单位是毫秒
            autoCancel: true, // 点击后自动取消
            // clickStr: '789' ,///点击通知需要回调的字符串
            clickStr: (new Date()).getTime(), ///点击通知需要回调的字符串
        })
        console.log('测试发送数据', notificationContent)

        // 弹出将app添加到电池优化白名单提示框，此功能可在一定程度上防止app被系统后台杀死
        uniNotification.addBatteryIgnore()

        let res = uniNotification.postNotification(notificationContent, clickEvent => {
            // 点击多媒体按钮的回调
            // 特别注意，每次回调里，需要重新发送多媒体通知，否则下次的点击会接收不到回调
            console.log('点击了第x个按钮/回调', clickEvent)
            callFn && callFn('click', clickEvent)
        })

        // 前台通知，可加大防杀死几率
        // uniNotification.postNotification({
        // 	title: '极速通知',
        // 	text: '前台通知，不可手动取消，加大防杀死几率',
        // 	isFrontService: true
        // })


        if (res == 'success') {
            // console.log('notification发送成功')
        } else {
            console.warn('notification发送失败，原因: ' + res)
        }
        callFn && callFn('send_res', res)

        // 取消全部通知 
        // cancelAll() {
        //     this.uniNotification.postNotification({
        //         isCancelAll: true
        //     })
        // },

        // 设置进度条，比如50%，则参数curProgress为50
        // setProgress(curProgress) {
        //     this.uniNotification.postNotification({
        //         title: '极速通知',
        //         progressMax: 100,
        //         progressCurrent: curProgress,
        //         progressAnimation: false
        //     })
        // },

        // 发送多媒体通知

        // 大文本，通知可折叠
        // bigTextNotification() {
        //     this.uniNotification.postNotification({
        //         title: '极速通知',
        //         text: '大段文本演示',
        //         bigText: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜奔白发，朝如青丝暮成雪。',
        //     })
        // },

        // 大图标
        // bigPictureNotification() {
        //     this.uniNotification.postNotification({
        //         title: '极速通知',
        //         text: '显示大图',
        //         bigPicture: plus.io.convertLocalFileSystemURL('/static/bigPicture.jpg'),
        //     })
        // },

        // 桌面图标的角标
        // badgeNotification() {
        //     this.uniNotification.postNotification({
        //         title: '极速通知',
        //         text: '桌面图标角标数字设置',
        //         badgeNumber: 1,
        //     })
        // },

        // 使用默认震动
        // vibrationNotification() {
        //     this.uniNotification.postNotification({
        //         title: '极速通知',
        //         text: '提示时震动',
        //         isVibration: true,
        //     })
        // },

        // // 自定义震动频率
        // customerVibrationNotification() {
        //     this.uniNotification.postNotification({
        //         title: '极速通知',
        //         text: '自定义震动',
        //         vibrationPattern: [1000, 2000, 3000, 4000],
        //     })
        // },

        // // 呼吸灯
        // lightNotification() {
        //     this.uniNotification.postNotification({
        //         title: '极速通知',
        //         text: '呼吸灯',
        //         lightColorArr: [255, 255, 0, 0],
        //     })
        // },

        // // 收件箱模式
        // inboxNotification() {
        //     this.uniNotification.postNotification({
        //         title: '极速通知',
        //         text: '收件箱',
        //         inboxArr: [
        //             "吃饭了吗？",
        //             "打游戏去",
        //             "你在哪",
        //             "考的怎么样",
        //             "什么时候去",
        //             "在家吗",
        //             "任务完成了"
        //         ],
        //     })
        // },

        // 参数说明
        // let res = uniNotification.postNotification({
        //     // 通知标题
        //     title: '测试uni插件',
        //     // 通知文本
        //     text: '测试uni插件正文',

        //     // 可选，为true时点击通知，通知会自动小时
        //     autoCancel: true,

        //     // 可选，默认值为1，notification的id，这个id代表同一个notification，可以使用这个id对同一个通知进行更新，移除
        //     notificationId: 2,

        //     // 可选，设置小图标，值为图片本地路径
        //     smallIcon: plus.io.convertLocalFileSystemURL('../../../static/images/smallIcon.png'),

        //     // 可选，设置大图标，值为图片本地路径
        //     largeIcon: plus.io.convertLocalFileSystemURL('../../../static/images/largeIcon.png'),

        //     // 可选，设置大段文本内容
        //     bigText: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜奔白发，朝如青丝暮成雪。',

        //     // 可选，设置大图片，值为图片路径，可使用上面获取图片路径的代码获取
        //     bigPicture: plus.io.convertLocalFileSystemURL('../../../static/images/largeIcon.png'),

        //     // 可选，app图标的角标数量
        //     badgeNumber: 1,

        //     // 可选，通知上面是否显示时间，默认是显示的，所以如果不想显示的话，只用设置为false即可
        //     isShowWhen: false,

        //     // 可选，通知上面的时间，格式是时间戳，单位是毫秒
        //     when: 1629435337521,

        //     // 可选，通知自动消失的时间，单位是毫秒
        //     timeoutAfter: 5000,

        //     /**
        //      * 创建通知渠道，Android8.0以上的手机才支持，实际开发过程中不用判断版本，android的sdk会自动判断，自适应低版本系统
        //      * 不同渠道，区别是通知方式不同
        //      * 如是否发出声音，是否弹出提示框，如果不弹出提示框，则只在状态栏里显示
        //      */
        //     channelId: 'uniNotification1', // 必须唯一
        //     channelName: 'uniNotification', // 渠道名称
        //     channelDesc: 'Android端的Notification的Uni插件', // 渠道说明信息
        //     // 请注意:下面的5,全屏提示未适配
        //     channelPriority: 4, //通知渠道的提示方式，默认是4,  1. 无声音，无弹出，text可折叠  2.text始终显示，不可折叠  3.有声音  4.有弹窗 5.做全屏提示的，如来电提醒就是这个

        //     // 可选，在不支持渠道的系统上使用，默认为1, 可选值为-2到2,也是5个值，基本对应渠道的那5个值，具体可以自己测试
        //     priority： 1,

        //     // 自定义提示音，参数为音频文件路径
        //     sound: plus.io.convertLocalFileSystemURL('../../../static/notice.mp3'),

        //     // 提示时震动
        //     isVibration: true,

        //     // 自定义震动模式,定义了这个参数，如果不定义isVibration，也会自动开启震动
        //     // 两个数一组，第一个是等待时间，第二个是震动时间，如1000,2000,3000,4000， 等待1000毫秒，震动2000毫秒，等待3000毫秒，震动4000毫秒，不想等待可以设置为0
        //     vibrationPattern: [1000, 2000, 3000, 4000],

        //     // 设置小图标颜色,4个0-255整数组成，代表argb
        //     smallIconColor: [255, 100, 100, 100],

        //     // 设置呼吸灯颜色，格式同上smallIconColor一样
        //     lightColorArr: [255, 255, 0, 0],

        //     // 设置收件箱模式的消息
        //     inboxArr: [
        //         "吃饭了吗？",
        //         "打游戏去",
        //         "你在哪",
        //         "考的怎么样",
        //         "什么时候去",
        //         "在家吗",
        //         "任务完成了"
        //     ],

        //     // 取消通知,notificationId必带
        //     isCancel: true,
        //     notificationId: 2,

        //     // 取消全部通知
        //     isCancelAll: true,

        //     // 设置进度条，进度条的最大值
        //     progressMax: 100,
        //     // 进度条的当前值
        //     progressCurrent: 30,
        //     // 可选，是否显示进度条动画，默认不显示
        //     progressAnimation： true,

        //     // 发送多媒体通知
        //     isMedia: true,
        //     // 播放控制按钮，最多添加5个
        //     btnArr: [
        //         [
        //             // 图标按钮
        //             plus.io.convertLocalFileSystemURL('/static/icon.png'),
        //             // 图标文字，有些机型上不显示
        //             '上一首'
        //         ],
        //         [
        //             plus.io.convertLocalFileSystemURL('/static/icon.png'),
        //             '播放'
        //         ],
        //         [
        //             plus.io.convertLocalFileSystemURL('/static/icon.png'),
        //             '下一首'
        //         ]
        //     ],
        //     // 可选，音乐封面
        //     largeIcon: plus.io.convertLocalFileSystemURL('/static/yuan2.png'),

        //     // 可选，是否固定在状态栏，不能手动删除，此功能又前台服务实现，还有app防系统杀死功能，不能完全防杀死，只能加大保活几率
        //     isFrontService： true,

        //     // 取消前台通知
        //     cancelFront: true

        // }, btnIndex => {
        //     // 点击多媒体按钮的回调
        //     // 特别注意，每次回调里，需要重新发送多媒体通知，否则下次的点击会接收不到回调
        //     console.log('点击了第' + btnIndex + 个按钮)
        // })
        // if (res == 'success') {
        //     console.log('notification发送成功')
        // } else {
        //     console.warn('notification发送失败，原因: ' + res)
        // }
        // #endif
    }
}
export default notify
