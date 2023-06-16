// 窗口小工具、桌面小部件、微件 Ba-AppWidget
// https://ext.dcloud.net.cn/plugin?id=10503

// #ifdef APP-PLUS
const appWidget = uni.requireNativePlugin('Ba-AppWidget')

import helper from '../weisifang/helper.js'

let textColor1 = "#FF0000";
let contents = [{
    text1: "text11",
    text2: "text21",
    imgUrl1: "http://www.lihuisem.com/mwj/zb_users/upload/2021/28/1611837327969_1.jpeg"
}, {
    text1: "text12",
    text2: "text22",
    imgUrl1: "http://www.lihuisem.com/mwj/zb_users/upload/2021/28/1611837327969_5.jpeg"
}];
let index = 0;

// #endif

const baAppWidget = {
    init() { //初始化配置，使用默认配置可以不调用
        appWidget.init({
                isTest: true, //仅用于测试效果
                textColor1: textColor1,
                text1: "text11",
                text2: "text21",
                imgUrl1: "http://www.lihuisem.com/mwj/zb_users/upload/2021/28/1611837327969_1.jpeg"
            },
            res => {
                console.log(res);
            }
        );
    },
    requestPin() { //添加到桌面，也可以通过桌面的方式添加
        let that = this;
        appWidget.requestPin(
            res => {
                that.subClick() // 监听点击事件
                console.log(res);
            }
        );
    },
    subClick() { //监听点击事件
        let that = this;
        appWidget.subClick(
            res => {
                console.log(res);
                if (res.data) {
                    if (res.data.id) { //根据id判断点击的事哪个按钮

                    }
                    that.updateAW(); //更新页面内容
                }
            }
        );
    },
    updateAW() { //更新内容
        let that = this;

        if (index == 0) {
            index = 1;
        } else {
            index = 0;
        }

        let content = contents[index];
        appWidget.updateAW(content,
            res => {
                console.log(res);
                if (res.data) {

                }
            }
        );
    },
}
export default baAppWidget
