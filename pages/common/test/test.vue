<template>
    <view>
        <view class="tui-content-box">
            <tui-list-view title="">
                <tui-list-cell @click="onKeep" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">通用保活</text>
                    </view>
                </tui-list-cell>
            </tui-list-view>

            <tui-list-view title="">
                <tui-list-cell @click="onAutoStart" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="sweep" color="#0000ff" :size="22"></tui-icon>
                        <text class="tui-list-cell_name">去设置自启动、后台运行</text>
                    </view>
                </tui-list-cell>
            </tui-list-view>

            <tui-list-view title="">
                <tui-list-cell @click="requestIgnoreBattery" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="service-fill" :size="24" color="#5677fc"></tui-icon>
                        <view class="tui-list-cell_name">申请加入电池优化白名单</view>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="goIgnoreBattery" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="explore-fill" :size="24" color="#19be6b"></tui-icon>
                        <view class="tui-list-cell_name">跳转到电池优化设置页</view>
                        <view class="tui-ml-auto">
                            <tui-tag padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green"
                                shape="circle">去设置</tui-tag>
                        </view>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="isIgnoringBattery" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="shop-fill" :size="23" color="#ed3f14"></tui-icon>
                        <view class="tui-list-cell_name">是否加入电池优化白名单</view>
                        <view class="tui-right">是否加入电池优化白名单</view>
                    </view>
                </tui-list-cell>
            </tui-list-view>

            <tui-list-view title="">
                <tui-list-cell @click="onShowNotify" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <tui-icon name="setup" :size="23" color="#afadb2"></tui-icon>
                        <text class="tui-list-cell_name">常驻通知保活</text>
                        <view class="tui-right"></view>
                    </view>
                </tui-list-cell>
            </tui-list-view>

            <tui-list-view title="">
                <tui-list-cell @click="onCancelNotify" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <tui-icon name="setup" :size="23" color="#afadb2"></tui-icon>
                        <text class="tui-list-cell_name">取消常驻通知保活</text>
                        <view class="tui-right"></view>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="detail" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <tui-icon name="about" :size="23" color="#afadb2"></tui-icon>
                        <text class="tui-list-cell_name">版本号</text>
                        <view class="tui-right">没有了</view>
                    </view>
                </tui-list-cell>
            </tui-list-view>
        </view>
    </view>
</template>

<script>
    const keepAlive = uni.requireNativePlugin('Ba-KeepAliveSuit')
    export default {
        onLoad: function(options) {},
        data() {
            return {

            };
        },
        created() {},
        methods: {
            onKeep() { //通用保活
                keepAlive.onKeep({
                        //channelId: "Ba-KeepAlive",
                        //channelName: "Ba-KeepAlive",
                        title: "测试",
                        content: "常驻通知描述",
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
            onAutoStart() { //去设置自启动、后台运行
                keepAlive.onAutoStart(
                    (res) => {
                        console.log(res);
                        uni.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 3000
                        })
                    });
            },
            requestIgnoreBattery() { //申请加入电池优化白名单
                keepAlive.requestIgnoreBattery(
                    res => {
                        console.log(res);
                        uni.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 3000
                        })
                    });
            },
            goIgnoreBattery() { //跳转到电池优化设置页
                keepAlive.goIgnoreBattery(
                    res => {
                        console.log(res);
                        uni.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 3000
                        })
                    });
            },
            isIgnoringBattery() { //是否加入电池优化白名单
                keepAlive.isIgnoringBattery(
                    res => {
                        console.log(res);
                        // if (res.data) {
                        //  this.msgList.unshift(JSON.stringify(res.data))
                        //  this.msgList.unshift(dateUtil.now())
                        // }
                        uni.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 3000
                        })
                    });
            },
            onShowNotify() { //常驻通知保活
                keepAlive.onShowNotify({
                        //channelId: "Ba-KeepAlive",
                        //channelName: "Ba-KeepAlive",
                        //ID:99
                        //title: "测试",
                        //content: "常驻通知描述",
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
            onCancelNotify() { //取消常驻通知保活
                keepAlive.onCancelNotify({
                        //channelId: "Ba-KeepAlive",
                        //channelName: "Ba-KeepAlive",
                        //ID:99
                        //title: "测试",
                        //content: "常驻通知描述",
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
            detail(e) {
                console.log('detail')
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