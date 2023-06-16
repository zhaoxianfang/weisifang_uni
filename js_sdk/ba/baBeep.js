// 声音提示、震动提示、语音播报
// https://ext.dcloud.net.cn/plugin?id=9974

// #ifdef APP-PLUS
const beep = uni.requireNativePlugin('Ba-Beep')

import helper from '../weisifang/helper.js'
// #endif

const baBeep = {
    play: (beepName = 'notify', pattern = [200, 500], repeat = -1) => {
        // 播放beep 声音 //音频资源名称，参照“音频资源配置”
        beep.play({
            beepName: beepName
        }, (res) => {});
        // 震动
        beep.playVibrate({
            repeat: repeat, //重复 -1：表示不重复 0：循环的震动 >1：表示从哪里开始重复
            pattern: pattern //震动规则，传递一个整型数组作为关闭和开启震动的持续时间，以毫秒为单位。第一个值表示等待震动开启的毫秒数，下一个值表示保持震动的毫秒数，这个序列值交替表示震动关闭和开启的毫秒数
        }, (res) => {});
    },
    playList(list = []) {
        if (list.length < 1) {
            return
        }
        beep.playList({
                beepList: ["_daozhang", "_1", "_bai", "_2", "_shi", "_dian", "_5", "_yuan"],
                //restart: true, //是否从新开始，默认false
            },
            (res) => {
                console.log(res)
            }
        );
    },
}
export default baBeep
