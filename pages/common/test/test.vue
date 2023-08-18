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
                        <text class="tui-list-cell_name">====== ======</text>
                        <view class="tui-right">分割</view>
                    </view>
                </tui-list-cell>
            </tui-list-view>

            <tui-list-view title="Ba-FloatWinStat">
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

                <tui-list-cell @click="hideFW" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">隐藏</text>
                    </view>
                </tui-list-cell>
            </tui-list-view>
        </view>
    </view>
</template>

<script>
    export default {
        onLoad: function(options) {},
        data() {
            return {
                time: ''
            };
        },
        created() {},
        mounted() {
            this.showFW()
        },
        methods: {
            onKeep() { //通用保活
                this.ba.keepAliveSuit.onKeep()
            },
            onAutoStart() { //去设置自启动、后台运行
                this.ba.keepAliveSuit.onAutoStart()
            },
            requestIgnoreBattery() { //申请加入电池优化白名单
                this.ba.keepAliveSuit.requestIgnoreBattery()
            },
            goIgnoreBattery() { //跳转到电池优化设置页
                this.ba.keepAliveSuit.goIgnoreBattery()
            },
            isIgnoringBattery() { //是否加入电池优化白名单
                this.ba.keepAliveSuit.isIgnoringBattery()
            },
            onShowNotify() { //常驻通知保活
                this.ba.keepAliveSuit.onShowNotify()
            },
            onCancelNotify() { //取消常驻通知保活
                this.ba.keepAliveSuit.onCancelNotify()
            },
            detail(e) {
                console.log('detail')
            },
            showFW() { //显示
                var _this = this
                //格式化输出当前时间的小时、分钟、秒
                var now = new Date();
                var year = now.getFullYear();
                var month = (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1);
                var day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
                var h = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
                var m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
                var s = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
                this.time = h + ':' + m + ':' + s;

                this.ba.floatWinStat.setData({
                    text1: year,
                    text2: h,
                    text3: h,
                    text4: "开/关",
                    num1: month + ':' + day,
                    num2: m + ':' + s,
                    num3: m + ':' + s,
                })
                this.ba.floatWinStat.showFW(true)
            },
            updateFW() { //更新数据
                var _this = this
                //格式化输出当前时间的小时、分钟、秒
                var now = new Date();
                var h = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
                var m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
                var s = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

                this.ba.floatWinStat.setData({
                    text3: h,
                    text4: "开/关",
                    num3: m + ':' + s,
                })
                this.ba.floatWinStat.updateFW(true)
            },
            hideFW() { //隐藏
                this.ba.floatWinStat.hideFW()
            },
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