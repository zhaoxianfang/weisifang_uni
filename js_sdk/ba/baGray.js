// 全局置灰、哀悼置灰（可动态、同时支持nvue、vue） Ba-Gray
// https://ext.dcloud.net.cn/plugin?id=10312

// #ifdef APP-PLUS
const gray = uni.requireNativePlugin('Ba-Gray')

import helper from '../weisifang/helper.js'
// #endif

const baGray = {
    openGray() { //置灰
        gray.gray({
            grayScale: 0.1 //灰度，可不填，默认为0，取值范围0~1，建议值0~0.3
        }, res => {
            console.log(res);
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
    closeGray() { //取消置灰
        gray.ungray(res => {
            console.log(res);
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
}
export default baGray
