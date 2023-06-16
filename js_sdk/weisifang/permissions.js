// app 权限操作操作相关

// https://www.apiref.com/android-zh/android/provider/package-summary.html
// https://www.apiref.com/android-zh/android/provider/Settings.html

// 'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
// 'android.intent.action.BOOT_COMPLETED', //开机启动 默认被拒绝
// 'android.permission.READ_EXTERNAL_STORAGE', // 外部存储(含相册)读取权限</button>
// 'android.permission.READ_CALL_LOG', // 获取通话记录权限</button>
// 'android.permission.ACCESS_CHECKIN_PROPERTIES',//  访问登记属性 读取或写入登记check-in数据库属性表的权限
// 'android.permission.ACCESS_COARSE_LOCATION',//  获取错略位置 通过WiFi或移动基站的方式获取用户错略的经纬度信息,定位精度大概误差在30~1500米
// 'android.permission.ACCESS_FINE_LOCATION',//  获取精确位置 通过GPS芯片接收卫星的定位信息,定位精度达10米以内
// 'android.permission.ACCESS_LOCATION_EXTRA_COMMANDS',//  访问定位额外命令 允许程序访问额外的定位提供者指令
// 'android.permission.ACCESS_MOCK_LOCATION',//  获取模拟定位信息 获取模拟定位信息,一般用于帮助开发者调试应用
// 'android.permission.ACCESS_NETWORK_STATE',//  获取网络状态 获取网络信息状态,如当前的网络连接是否有效
// 'android.permission.ACCESS_SURFACE_FLINGER',//  访问Surface Flinger Android平台上底层的图形显示支持,一般用于游戏或照相机预览界面和底层模式的屏幕截图
// 'android.permission.ACCESS_WIFI_STATE',//  获取WiFi状态 获取当前WiFi接入的状态以及WLAN热点的信息
// 'android.permission.ACCOUNT_MANAGER',//  账户管理 获取账户验证信息,主要为GMail账户信息,只有系统级进程才能访问的权限
// 'android.permission.AUTHENTICATE_ACCOUNTS',//  验证账户 允许一个程序通过账户验证方式访问账户管理ACCOUNT_MANAGER相关信息
// 'android.permission.BATTERY_STATS',//  电量统计 获取电池电量统计信息
// 'android.permission.BIND_APPWIDGET',//  绑定小插件 允许一个程序告诉appWidget服务需要访问小插件的数据库,只有非常少的应用才用到此权限
// 'android.permission.BIND_DEVICE_ADMIN',//  绑定设备管理 请求系统管理员接收者receiver,只有系统才能使用
// 'android.permission.BIND_INPUT_METHOD',//  绑定输入法 请求InputMethodService服务,只有系统才能使用
// 'android.permission.BIND_REMOTEVIEWS',//  绑定RemoteView 必须通过RemoteViewsService服务来请求,只有系统才能用
// 'android.permission.BIND_WALLPAPER',//  绑定壁纸 必须通过WallpaperService服务来请求,只有系统才能用
// 'android.permission.BLUETOOTH',//  使用蓝牙 允许程序连接配对过的蓝牙设备
// 'android.permission.BLUETOOTH_ADMIN',//  蓝牙管理 允许程序进行发现和配对新的蓝牙设备
// 'android.permission.BRICK',//  变成砖头 能够禁用手机,非常危险,顾名思义就是让手机变成砖头
// 'android.permission.BROADCAST_PACKAGE_REMOVED',//  应用删除时广播 当一个应用在删除时触发一个广播
// 'android.permission.BROADCAST_SMS',//  收到短信时广播 当收到短信时触发一个广播
// 'android.permission.BROADCAST_STICKY',//  连续广播 允许一个程序收到广播后快速收到下一个广播
// 'android.permission.BROADCAST_WAP_PUSH',//  WAP PUSH广播 WAP PUSH服务收到后触发一个广播
// 'android.permission.CALL_PHONE',//  拨打电话 允许程序从非系统拨号器里输入电话号码
// 'android.permission.CALL_PRIVILEGED',//  通话权限 允许程序拨打电话,替换系统的拨号器界面
// 'android.permission.CAMERA',//  拍照权限 允许访问摄像头进行拍照
// 'android.permission.CHANGE_COMPONENT_ENABLED_STATE',//  改变组件状态 改变组件是否启用状态
// 'android.permission.CHANGE_CONFIGURATION',//  改变配置 允许当前应用改变配置,如定位
// 'android.permission.CHANGE_NETWORK_STATE',//  改变网络状态 改变网络状态如是否能联网
// 'android.permission.CHANGE_WIFI_MULTICAST_STATE',//  改变WiFi多播状态 改变WiFi多播状态
// 'android.permission.CHANGE_WIFI_STATE',//  改变WiFi状态 改变WiFi状态
// 'android.permission.CLEAR_APP_CACHE',//  清除应用缓存 清除应用缓存
// 'android.permission.CLEAR_APP_USER_DATA',//  清除用户数据 清除应用的用户数据
// 'android.permission.CWJ_GROUP',//  底层访问权限 允许CWJ账户组访问底层信息
// 'android.permission.CELL_PHONE_MASTER_EX',//  手机优化大师扩展权限 手机优化大师扩展权限
// 'android.permission.CONTROL_LOCATION_UPDATES',//  控制定位更新 允许获得移动网络定位信息改变
// 'android.permission.DELETE_CACHE_FILES',//  删除缓存文件 允许应用删除缓存文件
// 'android.permission.DELETE_PACKAGES',//  删除应用 允许程序删除应用
// 'android.permission.DEVICE_POWER',//  电源管理 允许访问底层电源管理
// 'android.permission.DIAGNOSTIC',//  应用诊断 允许程序到RW到诊断资源
// 'android.permission.DISABLE_KEYGUARD',//  禁用键盘锁 允许程序禁用键盘锁
// 'android.permission.DUMP',//  转存系统信息 允许程序获取系统dump信息从系统服务
// 'android.permission.EXPAND_STATUS_BAR',//  状态栏控制 允许程序扩展或收缩状态栏
// 'android.permission.FACTORY_TEST',//  工厂测试模式 允许程序运行工厂测试模式
// 'android.permission.FLASHLIGHT',//  使用闪光灯 允许访问闪光灯
// 'android.permission.FORCE_BACK',//  强制后退 允许程序强制使用back后退按键,无论Activity是否在顶层
// 'android.permission.GET_ACCOUNTS',//  访问账户Gmail列表 访问GMail账户列表
// 'android.permission.GET_PACKAGE_SIZE',//  获取应用大小 获取应用的文件大小
// 'android.permission.GET_TASKS',//  获取任务信息 允许程序获取当前或最近运行的应用
// 'android.permission.GLOBAL_SEARCH',//  允许全局搜索 允许程序使用全局搜索功能
// 'android.permission.HARDWARE_TEST',//  硬件测试 访问硬件辅助设备,用于硬件测试
// 'android.permission.INJECT_EVENTS',//  注射事件 允许访问本程序的底层事件,获取按键、轨迹球的事件流
// 'android.permission.INSTALL_LOCATION_PROVIDER',//  安装定位提供 安装定位提供
// 'android.permission.INSTALL_PACKAGES',//  安装应用程序 允许程序安装应用
// 'android.permission.INTERNAL_SYSTEM_WINDOW',//  内部系统窗口 允许程序打开内部窗口,不对第三方应用程序开放此权限
// 'android.permission.INTERNET',//  访问网络 访问网络连接,可能产生GPRS流量
// 'android.permission.KILL_BACKGROUND_PROCESSES',//  结束后台进程 允许程序调用killBackgroundProcesses(String).方法结束后台进程
// 'android.permission.MANAGE_ACCOUNTS',//  管理账户 允许程序管理AccountManager中的账户列表
// 'android.permission.MANAGE_APP_TOKENS',//  管理程序引用 管理创建、摧毁、Z轴顺序,仅用于系统
// 'android.permission.MTWEAK_USER',//  高级权限 允许mTweak用户访问高级系统权限
// 'android.permission.MTWEAK_FORUM',//  社区权限 允许使用mTweak社区权限
// 'android.permission.MASTER_CLEAR',//  软格式化 允许程序执行软格式化,删除系统配置信息
// 'android.permission.MODIFY_AUDIO_SETTINGS',//  修改声音设置 修改声音设置信息
// 'android.permission.MODIFY_PHONE_STATE',//  修改电话状态 修改电话状态,如飞行模式,但不包含替换系统拨号器界面
// 'android.permission.MOUNT_FORMAT_FILESYSTEMS',//  格式化文件系统 格式化可移动文件系统,比如格式化清空SD卡
// 'android.permission.MOUNT_UNMOUNT_FILESYSTEMS',//  挂载文件系统 挂载、反挂载外部文件系统
// 'android.permission.NFC',//  允许NFC通讯 允许程序执行NFC近距离通讯操作,用于移动支持
// 'android.permission.PERSISTENT_ACTIVITY',//  永久Activity 创建一个永久的Activity,该功能标记为将来将被移除
// 'android.permission.PROCESS_OUTGOING_CALLS',//  处理拨出电话 允许程序监视,修改或放弃播出电话
// 'android.permission.READ_CALENDAR',//  读取日程提醒 允许程序读取用户的日程信息
// 'android.permission.READ_CONTACTS',//  读取联系人 允许应用访问联系人通讯录信息
// 'android.permission.READ_FRAME_BUFFER',//  屏幕截图 读取帧缓存用于屏幕截图
// 'com.android.browser.permission.READ_HISTORY_BOOKMARKS',//  读取收藏夹和历史记录 读取浏览器收藏夹和历史记录
// 'android.permission.READ_INPUT_STATE',//  读取输入状态 读取当前键的输入状态,仅用于系统
// 'android.permission.READ_LOGS',//  读取系统日志 读取系统底层日志
// 'android.permission.READ_PHONE_STATE',//  读取电话状态 访问电话状态
// 'android.permission.READ_SMS',//  读取短信内容 读取短信内容
// 'android.permission.READ_SYNC_SETTINGS',//  读取同步设置 读取同步设置,读取Google在线同步设置
// 'android.permission.READ_SYNC_STATS',//  读取同步状态 读取同步状态,获得Google在线同步状态
// 'android.permission.REBOOT',//  重启设备 允许程序重新启动设备
// 'android.permission.RECEIVE_BOOT_COMPLETED',//  开机自动允许 允许程序开机自动运行
// 'android.permission.RECEIVE_MMS',//  接收彩信 接收彩信
// 'android.permission.RECEIVE_SMS',//  接收短信 接收短信
// 'android.permission.RECEIVE_WAP_PUSH',//  接收Wap Push 接收WAP PUSH信息
// 'android.permission.RECORD_AUDIO',//  录音 录制声音通过手机或耳机的麦克
// 'android.permission.REORDER_TASKS',//  排序系统任务 重新排序系统Z轴运行中的任务
// 'android.permission.RESTART_PACKAGES',//  结束系统任务 结束任务通过restartPackage(String)方法,该方式将在外来放弃
// 'android.permission.SEND_SMS',//  发送短信 发送短信
// 'android.permission.SET_ACTIVITY_WATCHER',//  设置Activity观察其 设置Activity观察器一般用于monkey测试
// 'com.android.alarm.permission.SET_ALARM',//  设置闹铃提醒 设置闹铃提醒
// 'android.permission.SET_ALWAYS_FINISH' 设置总是退出 设置程序在后台是否总是退出
// 'android.permission.SET_ANIMATION_SCALE',//  设置动画缩放 设置全局动画缩放
// 'android.permission.SET_DEBUG_APP',//  设置调试程序 设置调试程序,一般用于开发
// 'android.permission.SET_ORIENTATION',//  设置屏幕方向 设置屏幕方向为横屏或标准方式显示,不用于普通应用
// 'android.permission.SET_PREFERRED_APPLICATIONS',//  设置应用参数 设置应用的参数,已不再工作具体查看addPackageToPreferred(String)介绍
// 'android.permission.SET_PROCESS_LIMIT',//  设置进程限制 允许程序设置最大的进程数量的限制
// 'android.permission.SET_TIME',//  设置系统时间 设置系统时间
// 'android.permission.SET_TIME_ZONE',//  设置系统时区 设置系统时区
// 'android.permission.SET_WALLPAPER',//  设置桌面壁纸 设置桌面壁纸
// 'android.permission.SET_WALLPAPER_HINTS',//  设置壁纸建议 设置壁纸建议
// 'android.permission.SIGNAL_PERSISTENT_PROCESSES',//  发送永久进程信号 发送一个永久的进程信号
// 'android.permission.STATUS_BAR',//  状态栏控制 允许程序打开、关闭、禁用状态栏
// 'android.permission.SUBSCRIBED_FEEDS_READ',//  访问订阅内容 访问订阅信息的数据库
// 'android.permission.SUBSCRIBED_FEEDS_WRITE',//  写入订阅内容 写入或修改订阅内容的数据库
// 'android.permission.SYSTEM_ALERT_WINDOW',//  显示系统窗口 显示系统窗口
// 'android.permission.UPDATE_DEVICE_STATS',//  更新设备状态 更新设备状态
// 'android.permission.USE_CREDENTIALS',//  使用证书 允许程序请求验证从AccountManager
// 'android.permission.USE_SIP',//  使用SIP视频 允许程序使用SIP视频服务
// 'android.permission.VIBRATE',//  使用振动 允许振动
// 'android.permission.WAKE_LOCK',//  唤醒锁定 允许程序在手机屏幕关闭后后台进程仍然运行
// 'android.permission.WRITE_APN_SETTINGS',//  写入GPRS接入点设置 写入网络GPRS接入点设置
// 'android.permission.WRITE_CALENDAR',//  写入日程提醒 写入日程,但不可读取
// 'android.permission.WRITE_CONTACTS',//  写系人 写系人,但不可读取
// 'android.permission.WRITE_EXTERNAL_STORAGE',//  写入外部存储 允许程序写入外部存储,如SD卡上写文件
// 'android.permission.WRITE_GSERVICES',//  写入Google地图数据 允许程序写入Google Map服务数据
// 'com.android.browser.permission.WRITE_HISTORY_BOOKMARKS',//  写入收藏夹和历史记录 写入浏览器历史记录或收藏夹,但不可读取
// 'android.permission.WRITE_SECURE_SETTINGS',//  读写系统敏感设置 允许程序读写系统安全敏感的设置项
// 'android.permission.WRITE_SETTINGS',//  读写系统设置 允许读写系统设置项
// 'android.permission.WRITE_SMS',// 编写短信 允许编写短信
const permissions = {
    // #ifdef APP-PLUS
    // app 权限设置列表
    settingList(name) {
        // 更多请参考 https://www.apiref.com/android-zh/android/provider/Settings.html
        var list = {
            'SETTINGS': 'android.settings.SETTINGS',
            'APN_SETTINGS': 'android.settings.APN_SETTINGS',
            'LOCATION_SOURCE_SETTINGS': 'android.settings.LOCATION_SOURCE_SETTINGS',
            'USER_SETTINGS': 'android.settings.USER_SETTINGS',
            'WIRELESS_SETTINGS': 'android.settings.WIRELESS_SETTINGS',
            'SECURITY_SETTINGS': 'android.settings.SECURITY_SETTINGS',
            'PRIVACY_SETTINGS': 'android.settings.PRIVACY_SETTINGS',
            'WIFI_SETTINGS': 'android.settings.WIFI_SETTINGS',
            'WIFI_IP_SETTINGS': 'android.settings.WIFI_IP_SETTINGS',
            'BLUETOOTH_SETTINGS': 'android.settings.BLUETOOTH_SETTINGS',
            'CAST_SETTINGS': 'android.settings.CAST_SETTINGS',
            'DATE_SETTINGS': 'android.settings.DATE_SETTINGS',
            'SOUND_SETTINGS': 'android.settings.SOUND_SETTINGS',
            'DISPLAY_SETTINGS': 'android.settings.DISPLAY_SETTINGS',
            'LOCALE_SETTINGS': 'android.settings.LOCALE_SETTINGS',
            'VOICE_INPUT_SETTINGS': 'android.settings.VOICE_INPUT_SETTINGS',
            'INPUT_METHOD_SETTINGS': 'android.settings.INPUT_METHOD_SETTINGS',
            'MANAGE_APPLICATIONS_SETTINGS': 'android.settings.MANAGE_APPLICATIONS_SETTINGS',
            'DEVICE_INFO_SETTINGS': 'android.settings.DEVICE_INFO_SETTINGS',
            'NOTIFICATION_SETTINGS': 'android.settings.NOTIFICATION_SETTINGS',
            'battery': 'android.settings.BATTERY_SAVER_SETTINGS”', // 显示节电设置
            'ignore_battery': 'android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS', // 显示屏幕以控制哪些应用可以忽略电池优化
            'storage': 'android.settings.INTERNAL_STORAGE_SETTINGS”', // 显示内部存储的设置
            'req_ignore_battery': 'android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS', // 要求用户允许应用忽略电池优化(白名单)[需要]
            'per_req_ignore_battery': 'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS', // 
            'window': 'android.permission.SYSTEM_ALERT_WINDOW', //  悬浮框权限窗口
            'open': this.openSetting,
            'openAppSetting': this.openAppSetting,
            'openApp': this.openApp
            // 'broadCast': broadCast,
            // 'getApplication': getApplication
        };
        return list[name] || false
    },
    // 判断权限
    requestPermission(list = [], callFun) {
        var _this = this;
        plus.android.requestPermissions(list || [], function(resultObj) {
                for (var i = 0; i < resultObj.granted.length; i++) {
                    // var grantedPermission = resultObj.granted[i]
                    // console.log('已获取的权限：' + grantedPermission)
                    callFun && callFun(true)
                }
                for (var i = 0; i < resultObj.deniedPresent.length; i++) {
                    // var deniedPresentPermission = resultObj.deniedPresent[i]
                    // console.log('拒绝本次申请的权限：' + deniedPresentPermission)
                    callFun && callFun(false)
                }
                for (var i = 0; i < resultObj.deniedAlways.length; i++) {
                    // var deniedAlwaysPermission = resultObj.deniedAlways[i]
                    // console.log('永久拒绝申请的权限：' + deniedAlwaysPermission)
                    callFun && callFun(false)
                }
                // 若所需权限被永久拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限  
                if (resultObj.deniedAlways.length > 0) {
                    // console.log('进来没：')
                    // _this.openAppSetting()
                }
            },
            function(error) {
                // console.log('申请权限错误：' + error.code + ' = ' + error.message)
                callFun && callFun(false)
            })
    },
    // openSetting(){

    //   // ACTION_APPLICATION_DEVELOPMENT_SETTINGS 开发者选项
    //   // ACTION_ACCESSIBILITY_SETTINGS 无障碍
    //   // ACTION_ADD_ACCOUNT 添加账号
    //   // ACTION_AIRPLANE_MODE_SETTINGS 无线和网络 飞行模式
    //   // ACTION_APN_SETTINGS apn 网络节点
    //   // ACTION_APPLICATION_SETTINGS 应用列表
    //   // ACTION_BLUETOOTH_SETTINGS 蓝牙开关
    //   // sim 卡网络与流量管理
    //   // ACTION_DATE_SETTINGS 日期和时间 设置
    //   // ACTION_DEVICE_INFO_SETTINGS 关于手机
    //   // ACTION_DISPLAY_SETTINGS 显示与亮度设置
    //   // ACTION_INPUT_METHOD_SETTINGS 输入法管理
    //   // ACTION_INPUT_METHOD_SUBTYPE_SETTINGS 输入法设置
    //   // ACTION_INTERNAL_STORAGE_SETTINGS 存储空间
    //   // ACTION_LOCALE_SETTINGS 选择语言
    //   // ACTION_LOCATION_SOURCE_SETTINGS 位置信息
    //   // ACTION_MANAGE_ALL_APPLICATIONS_SETTINGS 所有应用列表
    //   // ACTION_MANAGE_APPLICATIONS_SETTINGS 安装的应用列表
    //   // ACTION_MEMORY_CARD_SETTINGS 存储空间
    //   // ACTION_NETWORK_OPERATOR_SETTINGS sim卡与流量
    //   // ACTION_PRIVACY_SETTINGS 隐私权
    //   // ACTION_SEARCH_SETTINGS 全局搜索
    //   // ACTION_SECURITY_SETTINGS 安全
    //   // ACTION_SETTINGS 手机设置
    //   // ACTION_SOUND_SETTINGS 声音与震动
    //   // ACTION_SYNC_SETTINGS 用户与账号
    //   // ACTION_USER_DICTIONARY_SETTINGS 个人字典
    //   // ACTION_WIFI_SETTINGS wlan wifi 设置
    //   // ACTION_WIRELESS_SETTINGS 无线和网络、飞行模式

    //   var main = plus.android.runtimeMainActivity() //获取activity
    //   var Intent = plus.android.importClass('android.content.Intent')
    //   var Settings = plus.android.importClass('android.provider.Settings')
    // https://www.apiref.com/android-zh/android/provider/package-summary.html
    //   var intent = new Intent(Settings.ACTION_SOUND_SETTINGS) //可设置http://ask.dcloud.net.cn/question/14732这里所有Action字段
    //   main.startActivity(intent)


    //   const main = plus.android.runtimeMainActivity(); //获取activity
    //   let intent = plus.android.newObject('android.content.Intent', 'android.settings.APPLICATION_DETAILS_SETTINGS');
    //   let uri = plus.android.invoke('android.net.Uri', 'fromParts', 'package', main.getPackageName(), null);
    //   plus.android.invoke(intent, 'setData', uri);
    //   main.startActivity(intent);
    // }
    /**
     * 打开设置页面
     * @param {Object} settingName 例如 : android.settings.APPLICATION_DETAILS_SETTINGS
     */
    openSetting(settingName) {
        try {
            let os = plus.os.name;
            if ('Android' == os) {
                const main = plus.android.runtimeMainActivity();
                // let intent = plus.android.newObject('android.content.Intent', 'android.settings.APPLICATION_DETAILS_SETTINGS');
                let intent = plus.android.newObject('android.content.Intent', settingName);
                let uri = plus.android.invoke('android.net.Uri', 'fromParts', 'package', main.getPackageName(),
                    null);
                plus.android.invoke(intent, 'setData', uri);
                main.startActivity(intent);
            } else {
                //unsupport, nothing to do.
                return false
            }
        } catch (e) {
            console.error('error @openSettings!!', e);
            return false
        }
    },
    /**
     * 打开手机系统的定位服务开关（注意：是手机系统的，不是本应用的）
     */
    openAppLocationSetting() {
        let system = uni.getSystemInfoSync(); // 获取系统信息
        if (system.platform === 'android') { // 判断平台
            var context = plus.android.importClass("android.content.Context");
            var locationManager = plus.android.importClass("android.location.LocationManager");
            var main = plus.android.runtimeMainActivity();
            var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
            if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
                uni.showModal({
                    title: '提示',
                    content: '请打开定位服务功能',
                    showCancel: false, // 不显示取消按钮
                    success() {
                        var Intent = plus.android.importClass('android.content.Intent');
                        var Settings = plus.android.importClass('android.provider.Settings');
                        var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                        main.startActivity(intent); // 打开系统设置GPS服务页面

                    }
                });
            }
        } else if (system.platform === 'ios') {
            var cllocationManger = plus.ios.import("CLLocationManager");
            var enable = cllocationManger.locationServicesEnabled();
            var status = cllocationManger.authorizationStatus();
            plus.ios.deleteObject(cllocationManger);
            console.log("手机系统的定位没有打开");
            uni.showModal({
                title: '提示',
                content: '请打开定位服务功能',
                showCancel: false, // 不显示取消按钮
                success() {
                    var UIApplication = plus.ios.import("UIApplication");
                    var application2 = UIApplication.sharedApplication();
                    var NSURL2 = plus.ios.import("NSURL");
                    var setting2 = NSURL2.URLWithString("App-Prefs:root=Privacy&path=LOCATION");
                    application2.openURL(setting2);
                    plus.ios.deleteObject(setting2);
                    plus.ios.deleteObject(NSURL2);
                    plus.ios.deleteObject(application2);
                }
            });
        }
    },
    /**
     * 打开应用设置页面
     */
    openAppSetting() {
        try {
            let os = plus.os.name;
            if ('Android' == os) {
                const main = plus.android.runtimeMainActivity();
                let intent = plus.android.newObject('android.content.Intent',
                    'android.settings.APPLICATION_DETAILS_SETTINGS');
                let uri = plus.android.invoke('android.net.Uri', 'fromParts', 'package', main.getPackageName(),
                    null);
                plus.android.invoke(intent, 'setData', uri);
                main.startActivity(intent);

                // console.log(plus.device.vendor);
                // var Intent = plus.android.importClass('android.content.Intent')
                // var Settings = plus.android.importClass('android.provider.Settings')
                // var Uri = plus.android.importClass('android.net.Uri')
                // var mainActivity = plus.android.runtimeMainActivity()
                // var intent = new Intent()
                // intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                // var uri = Uri.fromParts('package', mainActivity.getPackageName(), null)
                // intent.setData(uri)
                // mainActivity.startActivity(intent)
            } else {
                var UIApplication = plus.ios.import('UIApplication')
                var application2 = UIApplication.sharedApplication()
                var NSURL2 = plus.ios.import('NSURL')
                // var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");		
                var setting2 = NSURL2.URLWithString('app-settings:')
                application2.openURL(setting2)

                plus.ios.deleteObject(setting2)
                plus.ios.deleteObject(NSURL2)
                plus.ios.deleteObject(application2)
            }
        } catch (e) {
            console.error('error @openAppSetting!!');
        }
    },
    // 调用第三方应用案例 根据包名从应用市场下载
    androidMarket(pname) {
        plus.runtime.openURL("market://details?id=" + pname);
    },
    /**
     * 根据包名启动第三方应用
     * @param {String} pname 包名，如微信是com.tencent.mm
     * @param {String} pnamestr 应用名称，如微信
     */
    openApp(pname, pnamestr) {
        try {
            const os = plus.os.name;
            if ('Android' == os) {
                plus.runtime.launchApplication({
                    pname: pname
                }, function(e) {
                    let str = `检查到您未安装"${pnamestr}",是否到商城搜索下载？`;
                    plus.nativeUI.confirm(str, function(i) {
                        if (i.index == 0) {
                            permissions.androidMarket(pname);
                        }
                    });
                });
            } else {
                //unsupport, nothing to do.
            }
        } catch (e) {
            console.error('error @openApp!!');
        }
    },
    // navite.js 检测悬浮窗权限并且打开设置
    check_overlays(callbackFn) {
        // this.judgeIosPermissionPush()
        const isIos = uni.getSystemInfoSync().platform == 'ios'
        const android_overlays = (callbackFn) => {
            var main = plus.android.runtimeMainActivity()
            var pkName = main.getPackageName()
            var Settings = plus.android.importClass('android.provider.Settings')
            var Uri = plus.android.importClass('android.net.Uri')
            var Build = plus.android.importClass('android.os.Build')
            var Intent = plus.android.importClass('android.content.Intent')
            var intent = new Intent('android.settings.action.MANAGE_OVERLAY_PERMISSION', Uri.parse('package:' +
                pkName))
            // main.startActivityForResult(intent, 5004);
            console.log(JSON.stringify(Settings))
            if (!Settings.canDrawOverlays(main)) {
                // 检测悬浮窗
                uni.showModal({
                    title: '温馨提示',
                    content: '请先打开「悬浮窗」权限！',
                    showCancel: false,
                    success: function(res) {
                        if (res.confirm) {
                            main.startActivityForResult(intent, 5004) // 转跳到悬浮窗设置  
                            // main.startActivityForResult(intent, 2000) // 转跳到悬浮窗设置  

                            // const main = plus.android.runtimeMainActivity();
                            // let intentChild = plus.android.newObject('android.content.Intent', 'android.settings.APPLICATION_DETAILS_SETTINGS');
                            // let uriChild = plus.android.invoke('android.net.Uri', 'fromParts', 'package', main.getPackageName(), null);
                            // plus.android.invoke(intentChild, 'setData', uriChild);
                            // main.startActivity(intentChild);
                        }
                    }
                })
            } else {
                callbackFn && callbackFn()
            }
        }
        const ios_overlays = (callbackFn) => {
            // 有空再写
            // var UIApplication = plus.ios.import("UIApplication");  
            // var app = UIApplication.sharedApplication();  
            // var enabledTypes  = 0;  
        }
        return !isIos ? android_overlays(callbackFn) : ios_overlays(callbackFn)
    },
    // 判断是否在白名单中
    checkWhiteList() {
        // 白名单  
        var main = plus.android.runtimeMainActivity()
        var packName = main.getPackageName()
        var Context = plus.android.importClass('android.content.Context')
        var PowerManager = plus.android.importClass('android.os.PowerManager')
        // 获取电源类
        var pm = main.getSystemService(Context.POWER_SERVICE)
        let inWhiteList = pm.isIgnoringBatteryOptimizations(packName)
        console.log('是否在白名单：', inWhiteList) //是否白名单  
        try {
            var Uri = plus.android.importClass('android.net.Uri')
            var Settings = plus.android.importClass('android.provider.Settings')
            var packageURI = Uri.parse('package:' + packName)
            var intents = plus.android.newObject('android.content.Intent', Settings
                .ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, packageURI) // 电池  优化，是否允许在后台运行
            main.startActivity(intents)
            // console.log('调起end')
        } catch {
            console.log('白名单调起失败')
        }
        if (pm.isIgnoringBatteryOptimizations(packName)) {
            console.log(11)
        } else {
            uni.showModal({
                title: '提示',
                content: '请开启自启动权限和省电策略设置无限制!',
                success: function(res) {
                    if (res.confirm) {
                        Settings.openAppSetting()
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    },
    // 判断推送权限是否开启
    judgeIosPermissionPush(toOpen = true) {
        const isIos = uni.getSystemInfoSync().platform == 'ios'
        if (isIos) { //ios
            var result = false
            var UIApplication = plus.ios.import('UIApplication')
            var app = UIApplication.sharedApplication()
            var enabledTypes = 0
            if (app.currentUserNotificationSettings) {
                var settings = app.currentUserNotificationSettings()
                enabledTypes = settings.plusGetAttribute('types')
                console.log('enabledTypes1:' + enabledTypes)
                if (enabledTypes === 0) {
                    // gotoAppPermissionSetting()
                    console.log('推送权限没有开启')
                } else {
                    result = true
                    console.log('已经开启推送功能!')
                }
                plus.ios.deleteObject(settings)
            } else {
                enabledTypes = app.enabledRemoteNotificationTypes()
                if (enabledTypes === 0) {
                    // gotoAppPermissionSetting()
                    console.log('推送权限没有开启!')
                } else {
                    result = true
                    console.log('已经开启推送功能!')
                }
                console.log('enabledTypes2:' + enabledTypes)
            }
            plus.ios.deleteObject(app)
            plus.ios.deleteObject(UIApplication)
            return result
        } else { //android
            var result = false
            var main = plus.android.runtimeMainActivity()
            var pkName = main.getPackageName()
            var uid = main.getApplicationInfo().plusGetAttribute('uid')
            var NotificationManagerCompat = plus.android.importClass('androidx.core.app.NotificationManagerCompat')
            //("android.support.v4.app.NotificationManagerCompat");
            var areNotificationsEnabled = NotificationManagerCompat.from(main)
            // 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置  
            if (!areNotificationsEnabled.areNotificationsEnabled()) {
                if (!toOpen) {
                    return false
                }
                uni.showModal({
                    title: '通知权限开启提醒',
                    content: '您还没有开启通知权限，无法接受到消息通知，请前往设置！',
                    showCancel: false,
                    confirmText: '去设置',
                    success: function(res) {
                        if (res.confirm) {
                            var Intent = plus.android.importClass('android.content.Intent')
                            var Build = plus.android.importClass('android.os.Build')
                            //android 8.0引导  
                            if (Build.VERSION.SDK_INT >= 26) {
                                var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS')
                                intent.putExtra('android.provider.extra.APP_PACKAGE', pkName)
                            } else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
                                var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS')
                                intent.putExtra('app_package', pkName)
                                intent.putExtra('app_uid', uid)
                            } else { //(<21)其他--跳转到该应用管理的详情页
                                var Settings = plus.android.importClass('android.provider.Settings')
                                var Uri = plus.android.importClass('android.net.Uri')
                                var intent = new Intent()
                                intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                                var uri = Uri.fromParts('package', main.getPackageName(), null)
                                intent.setData(uri)
                            }
                            // 跳转到该应用的系统通知设置页  
                            main.startActivity(intent)
                            return result
                        }
                    }
                })
            } else {
                result = true
                return result
            }
        }
    }
    // #endif
}
export default permissions
