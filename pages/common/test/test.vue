<template>
    <view>
        <view class="tui-content-box">
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