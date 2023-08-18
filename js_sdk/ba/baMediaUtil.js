// 刷新媒体库插件（图片、音频、视频、文件等） Ba-MediaUtil 
// https://ext.dcloud.net.cn/plugin?id=11598

// #ifdef APP-PLUS
const mediaUtil = uni.requireNativePlugin('Ba-MediaUtil');

import helper from '@/js_sdk/helper.js'
// #endif

const baMediaUtil = {
    refreshFile(filePath) { //刷新
        let that = this;
        mediaUtil.refreshFile({
                path: filePath
            },
            (ret) => {
                console.log(ret)
            });
    },
}
export default baMediaUtil