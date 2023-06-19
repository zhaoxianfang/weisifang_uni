// 画中画悬浮窗（视频） Ba-VideoPip
// https://ext.dcloud.net.cn/plugin?id=10619

// #ifdef APP-PLUS
const videoPip = uni.requireNativePlugin('Ba-VideoPip')

import helper from '@/js_sdk/helper.js'

// 打开画中画
// 属性名	类型	必填	默认值	说明
// url	String	true		视频地址
// currentTime	Number	true	0	当前播放时长(毫秒)
// isLive	Boolean	false	false	是否是直播，默认false
// custom	String	true		自定义参数


// #endif

const baVideoPip = {
    /**
     * 打开画中画
     * 
     * url 需要打开的视频地址
     * initCurrentTime 当前视频的初始播放时长
     * isLive 是否是直播
     * custom 自定义参数，暂时给一个默认值 pip
     */
    startPip(url, initCurrentTime = 0, isLive = false, custom = 'pip') {
        let that = this;
        // 先检查是否支持画中画
        baVideoPip.isSupportPip(function(enable, msg) {
            if (enable) {
                // 检查画中画是否已经打开
                baVideoPip.isOpenEnable(function(open_enable, msg) {
                    if (open_enable) {
                        // 重开
                        baVideoPip.restart(url, initCurrentTime, isLive, custom)
                    } else {
                        // 新开
                        videoPip.startPip({
                                url: url, //视频地址
                                currentTime: initCurrentTime, //当前播放时长
                                isLive: isLive, //是否是直播，默认false
                                custom: custom, //自定义参数 先默认给一个
                            },
                            res => {
                                // console.log(res);
                            });
                    }
                })
            } else {
                uni.showToast({
                    title: '暂不支持此功能',
                    icon: "none",
                    duration: 3000
                })
            }
        })
    },
    /**
     * //重新播放，（也可更改参数，用于切换）
     */
    restart(url, initCurrentTime = 0, isLive = false, custom = 'pip') {
        let that = this;
        videoPip.restart({
                url: url, //视频地址
                currentTime: initCurrentTime, //当前播放时长
                isLive: isLive, //是否是直播，默认false
                custom: custom, //自定义参数 先默认给一个
            },
            res => {
                console.log(res);
            }
        );
    },
    /**
     * 是否支持画中画
     */
    isSupportPip(callFun) {
        let that = this;
        videoPip.isSupportPip(
            res => {
                console.log(res);
                if (res.data) {
                    callFun && callFun(res.data.isSupportPip, res.msg)
                } else {
                    callFun && callFun(false, res.msg)
                }
            }
        );
    },
    /**
     * 画中画开关是否打开
     */
    isOpenEnable(callFun) {
        let that = this;
        videoPip.isOpenEnable(
            res => {
                console.log(res);
                if (res.data) {
                    callFun && callFun(res.data.isOpenEnable, res.msg)
                } else {
                    callFun && callFun(false, res.msg)
                }
            }
        );
    },
    /**
     * 画中画是否打开（本插件）
     */
    isStart(callFun) {
        let that = this;
        videoPip.isStart(
            res => {
                console.log(res);
                if (res.data) {
                    callFun && callFun(res.data.isStart, res.msg)
                } else {
                    callFun && callFun(false, res.msg)
                }
            }
        );
    },
    /**
     * 关闭画中画
     */
    closePip() {
        let that = this;
        videoPip.closePip(
            res => {
                // console.log(res);
                // uni.showToast({
                //     title: res.msg,
                //     icon: "none",
                //     duration: 3000
                // })
            }
        );
    },
}
export default baVideoPip