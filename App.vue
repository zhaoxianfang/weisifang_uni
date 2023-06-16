<script>
    // #ifdef APP-PLUS
    import helper from '@/js_sdk/weisifang/helper.js';
    // #endif
    import api from '@/api/index.js'

    export default {
        onLaunch: function() {
            let that = this;
            // #ifdef APP-PLUS
            /* 5+环境锁定屏幕方向 */
            plus.screen.lockOrientation('portrait-primary'); //锁定

            // app 辅助功能初始化
            helper.init();

            // ba 插件的各种监听
            // this.checkArguments();
            // 重点是以下： 一定要监听后台恢复 ！一定要   
            plus.globalEvent.addEventListener('newintent', (e) => {
                this.checkArguments(); // 检测启动参数  
            });
            // ba 插件的各种监听 结束

            // 检测app 最新版本
            helper.checkAppUpgrade(0);

            // #endif

            // #ifdef MP-WEIXIN
            if (wx.canIUse('getUpdateManager')) {
                const updateManager = wx.getUpdateManager();
                updateManager.onCheckForUpdate(function(res) {
                    // 请求完新版本信息的回调
                    if (res.hasUpdate) {
                        updateManager.onUpdateReady(function() {
                            that.tui.modal('更新提示', '新版本已经上线啦~，为了获得更好的体验，建议立即更新', false, res => {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate();
                            });
                        });
                        updateManager.onUpdateFailed(function() {
                            // 新的版本下载失败
                            that.tui.modal('更新失败', '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开', false,
                                res => {});
                        });
                    }
                });
            }
            // #endif
        },
        onShow: function() {
            // 获取完整的urlscheme字符串
            // #ifdef APP-PLUS
            var args = plus.runtime.arguments;
            if (args) {
                // 处理args参数，如直达到某新页面等
                if (args.substring(0, 6) === 'wsf://' || args.substring(0, 12) === 'weisifang://') {
                    var urlschemeContent = args.substring(0, 6) === 'wsf://' ? args.slice(6) : args.slice(12);
                    plus.runtime.arguments = '';
                    if (urlschemeContent.length > 0) {
                        this.tui.modal('urlscheme', urlschemeContent, false, res => {});
                    }
                }
            }
            // ba-natify 通知 插件
            if (args) {
                let args1 = JSON.parse(args);
                if (args1.BaNotifyID) { //判断是否为通知传来的消息
                    //这里写你的处理逻辑
                    //args参数见“点击事件参数”
                    console.log('args.BaNotifyID', args1.BaNotifyID, args);
                }
            }
            // #endif
            if (!this.$store.state.user.isLogin) {
                // 未登录
                console.log('请登录')
                // 关闭所有页面，跳转到登录页面。
                this.tui.toLogin()
            }

        },
        onHide: function() {
            //console.log('App Hide')
        },
        onError: function(err) {
            //全局错误监听
            // #ifdef APP-PLUS
            plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
                const res = uni.getSystemInfoSync();
                let errMsg =
                    `手机品牌：${res.brand}；手机型号：${res.model}；操作系统版本：${res.system}；客户端平台：${res.platform}；错误描述：${err}`;
                console.log('发生错误：' + errMsg);
            });
            // #endif
        },
        methods: {
            // ba 插件的各种监听
            checkArguments() {
                var args = plus.runtime.arguments;
                if (args) {
                    let args1 = JSON.parse(args);

                    // 监听开机自启
                    // api.app.test_live({
                    //     'name': "============开机自启============",
                    //     'msg': JSON.stringify(args1 || {})
                    // })
                    if (args1.BaAutoboot) { //判断是否为BaAutoboot 自启传来的消息
                        //这里写你的处理逻辑
                        uni.showToast({
                            title: "BaAutoboot 开机自启",
                            icon: "none",
                            duration: 3000
                        })
                    }

                    // 监听 添加到“用其他应用打开”中，用于文件传递、分享等 Ba-ShareReceive 
                    if (args1.BaShareReceive) { //判断是 Ba-ShareReceive 插件的事件
                        //这里写你的处理逻辑
                        //参数：filePath 文件路径
                        uni.showToast({
                            title: "BaShareReceive：" + args1.filePath,
                            icon: "none",
                            duration: 3000
                        })
                        console.log('BaShareReceive', args1)
                        //跳转并传值到你的业务界面，仅做参考，逻辑根据实际业务即可
                        uni.navigateTo({
                            url: '/pages/common/ba/shareReceive?filePath=' + args1.filePath
                        })
                    }
                }
            },
        }
    };
</script>

<style>
    /*每个页面公共css uParse为优化版本*/
    @import './common/app.css';
    /* #ifndef APP-NVUE */
    @import './components/uni/uParse/src/wxParse.css';
    @import './static/fonts/icon-extend.css';
    /* #endif */
</style>