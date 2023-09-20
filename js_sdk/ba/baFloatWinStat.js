// 悬浮窗-订单统计 Ba-FloatWinStat
// https://ext.dcloud.net.cn/plugin?id=14055

// #ifdef APP-PLUS
const floatWin = uni.requireNativePlugin('Ba-FloatWinStat')

import helper from '@/js_sdk/helper.js'
// #endif

const baFloatWinStat = {
    timer: false, // 是否更新
    data: {
        text1: "Text1",
        text2: "Text2",
        text3: "Text3",
        text4: "Text4",
        num1: 'Num1',
        num2: 'Num2',
        num3: 'Num3',
        switchChecked: true,
        isToast: false
    },
    setData(obj) {
        this.data = {
            ...this.data,
            ...obj
        }
    },
    showFW(timer = false) { //显示
        this.timer = timer;
        var _this = this;
        floatWin.show(this.data, (res) => {
            _this.updateFW(_this.timer)
        });
    },
    updateFW(timer = false) { //更新数据
        var _this = this

        //格式化输出当前时间的小时、分钟、秒
        var now = new Date();
        var h = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
        var m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        var s = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

        this.setData({
            text3: h,
            text4: "开/关",
            num3: m + ':' + s,
        })

        floatWin.update(this.data, (res) => {
            _this.timer && setTimeout(function() {
                _this.updateFW(_this.timer)
            }, 1000);
        });
    },
    hideFW() { //隐藏
        var _this = this
        floatWin.hide((res) => {
            _this.timer = false
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
    onClick(e) {
        if (e.tag === 'switch_off') {
            this.hideFW()
        }
        if (e.tag === 'switch_on') {
            this.hideFW()
        }

    }
}
export default baFloatWinStat