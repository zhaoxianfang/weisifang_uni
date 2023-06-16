// 动态切换icon
// https://ext.dcloud.net.cn/plugin?id=9648

// #ifdef APP-PLUS
const changeIcon = uni.requireNativePlugin('Ba-ChangeIcon')

import helper from '../weisifang/helper.js'
// #endif
// 更换icon 图标
const baChangeIcon = {
    change: (imgIndex = 1) => {
        changeIcon.changeIcon({
            aliasSer: imgIndex //样式序号，0：原有样式，其他对应配置的样式顺序（1~5）
        }, (res) => {
            baChangeIcon.setIconIndex(imgIndex);
            if (res.ok) {
                uni.showToast({
                    title: res.ok ? '切换成功' : '切换失败',
                    icon: "none",
                    duration: 3000
                })
            }
        });
    },
    getCurrentSer(callFun) { //获取当前样式
        changeIcon.getCurrentSer((res) => {
            let iconIndex = 0;
            if (res.currentSer) {
                baChangeIcon.setIconIndex(res.currentSer);
                iconIndex = res.currentSer
            }
            callFun && callFun(iconIndex);
        });
    },
    setIconIndex(index) {
        uni.setStorage({
            key: 'wsf_icon_index',
            data: index || 0,
            success: function() {}
        });
    }
}
export default baChangeIcon
