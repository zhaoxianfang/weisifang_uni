<template>
    <view>
        <view class="tui-content-box">
            <tui-list-view title="Ba-FloatWinStat">
                <tui-list-cell @click="isPermissionFW" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">判断是否开启悬浮窗</text>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="permissionFW" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">申请悬浮窗</text>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="goPermissionFW" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">跳转到悬浮窗</text>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="showFW" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">显示</text>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="updateFW" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">更新数据</text>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="updateDataFW" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">更新数据(不刷新页面)</text>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="hideFW" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">隐藏</text>
                    </view>
                </tui-list-cell>
            </tui-list-view>
            

            <tui-list-view title="">
                <tui-list-cell @click="showAppList" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <tui-icon name="setup" :size="23" color="#afadb2"></tui-icon>
                        <text class="tui-list-cell_name">获取手机应用列表</text>
                        <view class="tui-right"></view>
                    </view>
                </tui-list-cell>
            </tui-list-view>
         </view>
    </view>
</template>

<script>
    const floatWin = uni.requireNativePlugin('Ba-FloatWinWeb')
    export default {
        onLoad: function(options) {},
        data() {
            return {
                time: ''
            };
        },
        created() {},
        mounted() {
            // this.showFW()
        },
        methods: {
            detail(e) {
                console.log('detail')
            },
            showFW() { //显示
                // var _this = this
                // //格式化输出当前时间的小时、分钟、秒
                // var now = new Date();
                // var year = now.getFullYear();
                // var month = (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1);
                // var day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
                // var h = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
                // var m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
                // var s = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
                // this.time = h + ':' + m + ':' + s;

                // this.plugins.floatWinStat.setData({
                //     text1: year,
                //     text2: h,
                //     text3: h,
                //     text4: "开/关",
                //     num1: month + ':' + day,
                //     num2: m + ':' + s,
                //     num3: m + ':' + s,
                // })
                // this.plugins.floatWinStat.showFW(true)
                let params = {
                    //isToast: true,
                    //tag: tag,//悬浮窗标识，用于区分多个悬浮窗，可以不传
                     tag: "tag_1",
                    // webUrl: "file:///android_asset/testFloatWin.html",//网页地址
                    webUrl: "http://0l0.net/uniapp_ba.html",//网页地址
                    width: 128,//宽度 px
                    height: 128,//高度 px
                    xRatio: 0.8,//x轴偏移量（屏幕宽度比例）
                    yRatio: 0.7,//y轴偏移量（屏幕高度比例）
                    //moveType: 1,//拖动方式：1：不可拖动 2：任意拖动、3：贴边拖动。默认2
                    //isRememberXY: false,//是否记住上次的位置。默认true
                    //isPermission: false,//是否申请悬浮窗权限。默认true
                    //widthRatio:1,//宽度（屏幕宽度比例），width有值时无效
                    //heightRatio: 0.3,//高度（屏幕高度比例），height有值时无效
                    //webviewBgColor:"#FFFFFF"//webview背景色，默认透明
                    //isStartApp:true//点击悬浮窗，是否打开App，默认true
                    //fullscreen:true//是否全屏，沉浸到状态栏，默认false（注意heightRatio和widthRatio设置为1）
                }
                floatWin.show(params,
                (res) => {
                    console.log(res);
                    uni.showToast({
                        title: res.msg,
                        icon: "none",
                        duration: 3000
                    })
                });
            },
            updateFW() { //更新数据
                // var _this = this
                // //格式化输出当前时间的小时、分钟、秒
                // var now = new Date();
                // var h = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
                // var m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
                // var s = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

                // this.plugins.floatWinStat.setData({
                //     text3: h,
                //     text4: "开/关",
                //     num3: m + ':' + s,
                // })
                // this.plugins.floatWinStat.updateFW(true)
                // let webUrl ="file:///android_asset/testFloatWin.html?num1=66&num2=21"
                let webUrl ="http://0l0.net/uniapp_ba.html"
                floatWin.update({
                        webUrl: webUrl,
                        tag: "tag_1",
                        //width:128,//宽度 px
                        //height: 128,//高度 px
                        //xRatio: 0.8,//x轴偏移量（屏幕宽度比例）
                        //yRatio: 0.7,//y轴偏移量（屏幕高度比例）
                        //moveType: 1,//拖动方式：1：不可拖动 2：任意拖动、3：贴边拖动。默认2
                    },
                    (res) => {
                        console.log(res);
                        uni.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 3000
                        })
                    });
            },
            //更新数据（不刷新界面）
            updateDataFW(tag) {
                var _this = this;
                // uniapp 和 html 请求和返回的数据都直接按照json格式发送和返回
                floatWin.updateData({
                        data: {
                            'num1': Math.floor(Math.random() * 90) + 10, // 2位随机数
                            'num2': Math.floor(Math.random() * 90) + 10, // 2位随机数
                            'num3': Math.floor(Math.random() * 90) + 10, // 2位随机数
                            'num4': Math.floor(Math.random() * 90) + 10, // 2位随机数
                        },//复杂的可以传json，自行解析
                        tag: "tag_1"
                    },
                    (res) => {
                        // console.log(res);//结果返回数据在res.data.result，可自行定义

                        var json = {};
                        // 判断data是否为json字符串
                        if (res.data.result && (typeof(res.data.result) === 'string')) {
                            json = JSON.parse(res.data.result);
                        }else{
                            json = res.data.result;
                        }
                        console.log('返回数据',json);
                        _this.tui.toast(json.msg || '已更新!')
                    });
            },
            hideFW() { //隐藏
                // this.plugins.floatWinStat.hideFW()
                floatWin.hide({
                    tag: "tag_1"
                },
                (res) => {
                    console.log(res);
                    uni.showToast({
                        title: res.msg,
                        icon: "none",
                        duration: 3000
                    })
                });
            },
            permissionFW() { //申请悬浮窗权限
                floatWin.permission(
                    (res) => {
                        console.log(res);
                        uni.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 3000
                        })
                    });
            },
            goPermissionFW() { //跳转到悬浮窗权限页面
                floatWin.goPermission(
                    (res) => {
                        console.log(res);
                        uni.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 3000
                        })
                    });
            },
            isPermissionFW() { //是否申请悬浮窗权限
                floatWin.isPermission(
                    (res) => {
                        console.log(res);
                        let msg = res.msg;
                        if (res.data) {
                            msg = "isPermission:" + res.data.isPermission;
                        }
                        uni.showToast({
                            title: msg,
                            icon: "none",
                            duration: 3000
                        })
                    });
            },
            // =================================
            showAppList(){
                this.tui.href('../extend/app_list');
            }
        },
        onPageScroll(e) {

        },
        onPullDownRefresh() {
            setTimeout(() => {
                uni.stopPullDownRefresh();
            }, 200);
        },
        onReachBottom: function() {

        }
    };
</script>

<style lang="scss" scoped>
    .tui-content-box {
        /* width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	position: relative;
	top: -72rpx;
	z-index: 10; */
    }

    /* ====================== */
    .tui-item-box {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .tui-list-cell_name {
        padding-left: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tui-ml-auto {
        margin-left: auto;
    }

    .tui-right {
        margin-left: auto;
        margin-right: 34rpx;
        font-size: 26rpx;
        color: #999;
    }

    .tui-logo {
        height: 52rpx;
        width: 52rpx;
        flex-shrink: 0;
    }

    .tui-list-view {
        margin-bottom: 8rpx !important;
    }
</style>