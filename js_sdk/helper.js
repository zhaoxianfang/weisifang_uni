var isIos = false
import download from '@/js_sdk/files/download.js'
import files from '@/js_sdk/files/files.js'
import permissions from '@/js_sdk/weisifang/permissions.js'
import scanCode from '@/js_sdk/handle/scan_code.js'
import navButtonsHandle from '@/js_sdk/handle/navButtonsHandle.js'

// #ifdef APP-PLUS
import {
    checkUpdate
} from '@/components/app-upgrade/js/app-update-check.js'
import utils from '@/js_sdk/weisifang/utils.js'
import ba from '@/js_sdk/ba.js'
isIos = (plus.os.name === 'iOS')
// #endif

import api from '@/api/index.js'


const helper = {
    debounceTime: null, // 防抖计时器
    debounceOldArgs: [], // 防抖动上次传入的参数
    download: download,
    files: files,
    permissions: permissions,
    scanCode: scanCode,
    // #ifdef APP-PLUS
    utils: utils,
    navBtns: navButtonsHandle,
    ba: ba,
    // #endif
    init() {
        // #ifdef APP-PLUS
        /* 5+环境锁定屏幕方向 */
        plus.screen.lockOrientation('portrait-primary'); //锁定
        // plus.screen.lockOrientation('portrait-primary') //锁定竖屏
        // plus.navigator.setFullscreen(false); // 设置应用全屏显示！
        plus.navigator.setFullscreen(false); //显示手机顶部状态栏
        plus.navigator.showSystemNavigation(); //显示手机底部导航按键

        this.clickToBack()

        try {
            // // 先注销注册广播
            // ba.broadcast.unregister()
            // setTimeout(() => {
            //     // 注册广播
            //     ba.broadcast.register()
            // }, 5000)
        } catch (e) {
            console.log('广播监听异常', e)
        }


        this.test_live('测试保活xx')

        // 悬浮窗-订单统计 Ba-FloatWinStat
        var globalEvent = uni.requireNativePlugin('globalEvent');
        globalEvent.addEventListener('baFloatWinStat', function(e) {
            console.log('baFloatWinStat：' + JSON.stringify(e));
            //处理点击事件
            uni.showToast({
                title: '点击了订单统计',
                icon: "none",
                duration: 3000
            })
        });


        // #endif
    },
    openUrl(url) {
        uni.navigateTo({
            url: '/pages/common/webview/webview?url=' + encodeURI(url)
        })
    },
    // 测试保活
    test_live(msg = 'msg') {
        setInterval(function() {
            api.app.test_live({
                'name': "test setInterval live",
                'msg': msg
            })
        }, 3000);
    },
    fullscreen() {
        // 设置应用全屏显示！  
        plus.navigator.setFullscreen(true);
    },
    unfullscreen() {
        // 设置应用非全屏显示！  
        plus.navigator.setFullscreen(false);
    },
    isfullscreen() {
        // 查询应用当前是否全屏显示！  
        console.log("是否全屏：" + (plus.navigator.isFullscreen() ? "是" : "否"));
    },
    // 返回键如何进入后台
    // uniapp退出应用改变为后台运行
    clickToBack() {
        let main = plus.android.runtimeMainActivity()
        //为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台
        plus.runtime.quit = function() {
            main.moveTaskToBack(false)
        }
        //重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast
        // plus.nativeUI.toast = (function(str) {
        // 	if (str == '再次返回退出应用') {
        // 		plus.runtime.quit()
        // 	} else {
        // 		uni.showToast({
        // 			title: '再次返回退出应用',
        // 			icon: 'none'
        // 		})
        // 	}
        // })
    },

    // app 检测版本更新
    //获取线上APP版本信息  参数type 0自动检查  1手动检查（手动检查时，之前取消更新的版本也会提示出来）
    checkAppUpgrade: (type = 0) => {
        // #ifdef APP-PLUS
        //app检测更新
        let platform = plus.os.name.toLocaleLowerCase();
        plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
            api.app.app_latest_version({
                    platform: platform,
                    version: widgetInfo.version //资源版本号
                })
                .then(res => {
                    if (res.code === 200 && res.data && res.data.latest && res.data.latest.url) {
                        let update_info = res.data.latest
                        checkUpdate(update_info, type).then(res => {
                            if (res.msg) {
                                plus.nativeUI.toast(res.msg)
                            }
                        })
                    } else {
                        console.log('获取app/version:失败');

                    }
                })
                .catch(e => {
                    console.log('出错啦', e);
                });
        });
        // #endif
    },
    toast: (title = '提示', duration = 'long', align = 'center') => {
        // #ifdef APP-PLUS
        plus.nativeUI.toast(title, {
            verticalAlign: align, // "top"、"center"、"bottom"
            duration: duration // "long"3.5s、"short"2s，
        })
        // #endif
    },
    /*
     * 防抖 函数
     * 
     * fn: 回调函数
     * delay：延迟执行时间
     * resOrArgsCallback：回调函数，
     *     会传递三个返回参数(isClear,resFnOrNewArgs,oldArgsOrNull)
     *         isClear:(bool类型，true:有未执行的fn被清除 false:fn已被执行
     *         resFnOrNewArgs: isClear为「true」时表示 最后一次fn的传递参数,isClear为「false」时表示 最后一次fn的执行结果
     *         oldArgsOrNull: isClear为「true」时表示未被执行的fn的传递参数,,isClear为「false」时返回 null
     * immdiate：是否无须等待，立即执行,默认为false
     * 
     * 使用：
     *    立即执行：helper.debounce(fn, 400,(isClear,resFnOrNewArgs,oldArgsOrNull) => { ... },true)(params)
     *    正常调用：helper.debounce(fn, 400,(isClear,resFnOrNewArgs,oldArgsOrNull) => { ... })(params)
     *    取消执行 ：let debounceChange = helper.debounce(...)(params); debounceChange.cancel()
     */
    debounce(fn, delay, resOrArgsCallback, immdiate = false) {
        var _this = this
        let isInvoke = false

        function _debounce(...arg) {
            if (_this.debounceTime) {
                clearTimeout(_this.debounceTime)
                if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(true, arg, _this
                    .debounceOldArgs)
            }
            setTimeout(() => {
                _this.debounceOldArgs = arg
            }, 80)
            if (immdiate && !isInvoke) {
                const result = fn.apply(this, arg)
                if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(false, result,
                    null)
                isInvoke = true
            } else {
                _this.debounceTime = setTimeout(() => {
                    const result = fn.apply(this, arg)
                    if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(
                        false, result,
                        null)
                    isInvoke = false
                    _this.debounceTime = null
                }, delay)
            }
        }
        _debounce.cancel = function() {
            if (_this.debounceTime) clearTimeout(_this.debounceTime)
            _this.debounceTime = null
            isInvoke = false
        }

        return _debounce
    },
    getTime() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    },
    //判断字符是否为空的方法
    isEmpty: function(obj) {
        if (typeof obj == "undefined" || obj == null || obj == "" || obj.length == 0 || (!/[^(^\s*)|(\s*$)]/
                .test(obj)) || (helper.getType(obj) == 'Object' && Object.keys(obj).length == 0) || (helper
                .getType(obj) == 'string' && ['{}', '[]'].includes(obj))) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断一个对象的类型
     * @param args
     * @returns
     */
    getType: function(data) {
        let type = typeof data;
        if (type !== "object") {
            return type;
        }
        return Object.prototype.toString.call(data).replace(/^\[object (\S+)\]$/, '$1');
    },
}
export default helper