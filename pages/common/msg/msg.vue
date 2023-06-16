<template>
    <view class="container">
        <view class="msg-content">
            <view class="tips">
                {{text}}
            </view>
        </view>
        <tui-button type="gray-green" width="400rpx" height="84rpx" bold margin="32rpx auto" @tap="back">返回</tui-button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                text: '暂无内容',
            }
        },
        methods: {
            back() {
                uni.navigateBack({
                    delta: 1 // 返回的页面数
                })
            }
        },
        onLoad(options) {
            console.log('msg')
            this.text = options.text || '暂无内容';
        }
    }
</script>

<style>
    .container {
        padding: 0 80rpx;
    }

    .msg-content {
        width: 90%;
        min-height: 100upx;
        line-height: 100upx;
        text-align: center;
        border-top: 2rpx solid #ffaa00;
        border-bottom: 2rpx solid #ffaa00;
        margin: 30rpx auto;
        padding: 20upx 30upx;
        vertical-align: middle;
    }

    .tips {
        width: 100%;
        line-height: 1.5;
        display: inline-block;
        vertical-align: middle;
        word-wrap: break-word;
    }
</style>
