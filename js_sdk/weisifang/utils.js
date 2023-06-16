const utils = {
    /**
     * 显示加载框
     */
    showLoading: (title, type) => {
        // #ifdef APP-PLUS
        var w = plus.nativeUI.showWaiting(title || "", {
            width: '80px',
            height: '80px',
            loading: {
                type: type || 'snow',
                height: '40px'

            },
            background: 'rgba(0,0,0,0.9)'
        });
        // #endif
        // #ifndef APP-PLUS
        uni.showLoading({
            title: title || '',
        });
        // #endif
    },
    /**
     * 隐藏加载框
     */
    hideLoading() {
        // #ifdef APP-PLUS
        plus.nativeUI.closeWaiting();
        // #endif
        // #ifndef APP-PLUS
        uni.hideLoading();
        // #endif
    },
    /**
     * 提示消息
     * @param {Object} msg
     */
    showToast: (msg) => {
        uni.showToast({
            title: msg,
            mask: false,
            duration: 2000,
            icon: "none"
        });
    },
    /**
     * 要复制的内容
     * NJS设置剪切板
     */
    setClipboardData: (string, callback) => {
        const appPlatform = uni.getSystemInfoSync().platform
        // #ifdef APP-PLUS
        if (appPlatform == "ios") {
            var UIPasteboard = plus.ios.importClass("UIPasteboard");
            var generalPasteboard = UIPasteboard.generalPasteboard();
            // 设置 
            generalPasteboard.setValueforPasteboardType(string, "public.utf8-plain-text");
            callback && callback({
                code: 1
            });
        } else {
            var Context = plus.android.importClass("android.content.Context");
            var main = plus.android.runtimeMainActivity();
            var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
            plus.android.invoke(clip, "setText", string);
            callback && callback({
                code: 1
            });
        }
        // #endif
    },

    /**
     * njs 获取剪切板
     */
    getClipboardData: (callback) => {
        const appPlatform = uni.getSystemInfoSync().platform
        // #ifdef APP-PLUS
        if (appPlatform == "ios") {
            var UIPasteboard = plus.ios.importClass("UIPasteboard");
            var generalPasteboard = UIPasteboard.generalPasteboard();
            // 获取 
            var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");
            callback && callback({
                code: 1,
                data: value
            });
        } else {
            var Context = plus.android.importClass("android.content.Context");
            var main = plus.android.runtimeMainActivity();
            var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
            var value = plus.android.invoke(clip, "getText");
            callback && callback({
                code: 1,
                data: value
            });
        }
        // #endif
    },
    // 唤醒后台app 或者跳转到第三方app
    openApp(pkName = '', params = {}) {
        if (pkName.length < 1) {
            plus.runtime.openURL('weisifang://', function(res) {
                console.log(res);
            });
        }
        var main = plus.android.runtimeMainActivity()
        pkName = pkName ? pkName : main.getPackageName() // 包名
        if (plus.runtime.isApplicationExist({
                pname: pkName
            })) {
            //调用第三方app
            plus.runtime.launchApplication({
                    pname: pkName,
                    // action: "io.dcloud.PandoraEntry",
                    action: "weisifang://",
                    extra: params || {
                        test: '测试传参'
                    } //传递的参数
                },
                (err) => {
                    uni.showToast({
                        title: "打开失败",
                        icon: "none"
                    })
                },
            );
        } else {
            // 没有安装
            uni.showToast({
                title: "未安装：" + pkName,
                icon: "none"
            })
        }
    },
    getLocation() {
        // 获取系统自带的定位信息
        return new Promise((resolve, reject) => {
            uni.getLocation({
                type: 'wgs84', // 默认wgs84，若为 gcj02 则走第三方sdk
                isHighAccuracy: true, // 是否开启高精度定位
                success: (res) => {
                    // console.log('获取位置成功', res)
                    resolve(res)
                },
                fail: (err) => {
                    console.log('获取位置失败', err)
                    resolve(false)
                }
            })
        })
    }
}
export default utils
