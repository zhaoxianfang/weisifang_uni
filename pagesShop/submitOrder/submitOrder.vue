<template>
    <view class="container">
        <view class="tui-order__detail">
            <view class="tui-order__info">
                <view class="tui-logo__box">
                    <image :src="webURL + 'logo.png'" mode="widthFix"></image>
                </view>
                <radio-group @change="switchShipping">
                    <label class="tui-shipping">
                        <radio class="tui-radio" color="#ac9157" value="1" :checked="way==1"></radio>
                        <text>Store取货(大约需要等20分钟)</text>
                    </label>
                    <label class="tui-shipping">
                        <radio class="tui-radio" color="#ac9157" value="2" :checked="way==2"></radio>
                        <text>外卖</text>
                    </label>
                    <tui-list-cell padding="0" arrow unlined :hover="false" v-if="way==2" @click="selectAddr">
                        <view class="tui-input__box"><input disabled type="text" class="tui-input"
                                placeholder-class="tui-placeholder" placeholder="请选择收货地址" /></view>
                    </tui-list-cell>
                    <label class="tui-shipping">
                        <radio class="tui-radio" color="#ac9157" value="3" :checked="way==3"></radio>
                        <text>预约取货</text>
                    </label>
                </radio-group>
                <tui-list-cell padding="0" arrow unlined :hover="false" v-if="way==3">
                    <view class="tui-input__box"><input disabled type="text" class="tui-input"
                            placeholder-class="tui-placeholder" placeholder="请选择预约时间" /></view>
                </tui-list-cell>
                <input type="text" class="tui-input" placeholder-class="tui-placeholder" placeholder="备注..." />
                <view class="tui-divider"></view>
            </view>
            <view class="tui-detail__box">
                <view class="tui-goods__list">
                    <view class="tui-total__box">
                        <view>合计：￥59.00</view>
                        <view>共4件商品</view>
                    </view>
                    <tui-list-cell :hover="false" lineLeft="0" padding="40rpx 0">
                        <view class="tui-goods__item">
                            <image :src="webURL + 'img_cafe_1.jpg'"></image>
                            <view class="tui-goods__info">
                                <view class="tui-name">卡布奇诺</view>
                                <view class="tui-attr">大/热/标准</view>
                                <view>￥17.00</view>
                            </view>
                            <view class="tui-quantity">x1</view>
                        </view>
                    </tui-list-cell>
                    <tui-list-cell :hover="false" lineLeft="0" padding="40rpx 0">
                        <view class="tui-goods__item">
                            <image :src="webURL + 'img_cafe_2.jpg'"></image>
                            <view class="tui-goods__info">
                                <view class="tui-name">拿铁</view>
                                <view class="tui-attr">小/热/标准</view>
                                <view>￥14.00</view>
                            </view>
                            <view class="tui-quantity">x1</view>
                        </view>
                    </tui-list-cell>
                    <tui-list-cell :hover="false" lineLeft="0" padding="40rpx 0" :unlined="true">
                        <view class="tui-goods__item">
                            <image :src="webURL + 'img_cafe_1.jpg'"></image>
                            <view class="tui-goods__info">
                                <view class="tui-name">卡布奇诺</view>
                                <view class="tui-attr">小/冷/标准</view>
                                <view>￥14.00</view>
                            </view>
                            <view class="tui-quantity">x2</view>
                        </view>
                    </tui-list-cell>
                </view>
            </view>
        </view>
        <view class="tui-tabbar">
            <view class="tui-total__price">合计：￥58.80</view>
            <view class="tui-btn__box">
                <text>积分：-￥0.20</text>
                <tui-button type="brown" width="180rpx" height="60rpx" :size="26" shape="circle">付款</tui-button>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                webURL: 'https://thorui.cn/extend/cafe/',
                way: 1
            };
        },
        methods: {
            switchShipping(e) {
                this.way = e.detail.value;
            },
            selectAddr() {
                this.tui.href('../address/address')
            }
        }
    };
</script>

<style>
    .container {
        width: 100%;
        padding: 10rpx 30rpx 200rpx;
        box-sizing: border-box;
    }

    .tui-order__detail {
        width: 100%;
        border-radius: 12rpx;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
    }

    .tui-order__info {
        width: 100%;
        padding: 50rpx 50rpx 80rpx;
        box-sizing: border-box;
        position: relative;
    }

    .tui-logo__box {
        display: flex;
        align-items: center;
        padding-bottom: 40rpx;
        font-size: 36rpx;
        font-weight: bold;
    }

    .tui-logo__box image {
        width: 184rpx;
        height: 60rpx;
    }

    .tui-shipping {
        font-size: 30rpx;
        font-weight: bold;
        padding: 20rpx 0;
        display: block;
        display: flex;
        align-items: center;
    }

    /* #ifdef MP-WEIXIN */
    .tui-shipping .wx-radio-input {
        height: 36rpx;
        width: 36rpx;
    }

    /* #endif */

    /* #ifndef MP-WEIXIN */
    ::v-deep .tui-shipping .uni-radio-input {
        height: 36rpx;
        width: 36rpx;
    }

    /* #endif */

    .tui-shipping text {
        padding-left: 12rpx;
    }

    .tui-input {
        width: 100%;
        height: 80rpx;
        padding: 20rpx;
        border-radius: 8rpx;
        font-size: 26rpx;
        box-sizing: border-box;
        background-color: #f8f8f8;
        margin-top: 20rpx;
    }

    .tui-placeholder {
        color: #bbbbbb;
    }

    .tui-divider {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        border-bottom: 1px dashed #eee;
    }

    .tui-divider::before {
        content: ' ';
        position: absolute;
        left: 0;
        top: -50%;
        width: 28rpx;
        height: 28rpx;
        border-radius: 50%;
        background-color: #f5f5f5;
        transform: translate(-50%, -50%);
        z-index: 10;
    }

    .tui-divider::after {
        content: ' ';
        position: absolute;
        right: 0;
        top: -50%;
        width: 28rpx;
        height: 28rpx;
        border-radius: 50%;
        background-color: #f5f5f5;
        transform: translate(50%, -50%);
        z-index: 10;
    }

    .tui-detail__box {
        width: 100%;
        padding: 50rpx;
        box-sizing: border-box;
    }

    .tui-total__box {
        width: 100%;
        font-size: 30rpx;
        line-height: 30rpx;
        padding-bottom: 20rpx;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
    }

    .tui-goods__item {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
    }

    .tui-goods__item image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 8rpx;
        background-color: #f8f8f8;
        flex-shrink: 0;
    }

    .tui-goods__info {
        width: 60%;
        font-size: 26rpx;
        padding-left: 20rpx;
    }

    .tui-name {
        width: 100%;
        font-size: 28rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .tui-attr {
        font-size: 24rpx;
        color: #999;
        padding: 8rpx 0;
    }

    .tui-quantity {
        position: absolute;
        right: 0;
        top: 8rpx;
        font-size: 24rpx;
    }

    .tui-tabbar {
        width: 100%;
        height: 120rpx;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        padding: 0 30rpx;
        box-sizing: border-box;
    }

    .tui-btn__box {
        display: flex;
        align-items: center;
    }

    .tui-btn__box text {
        font-size: 24rpx;
        color: #ac9157;
        padding-right: 30rpx;
    }

    .tui-total__price {
        font-size: 30rpx;
        font-weight: bold;
        padding-right: 30rpx;
    }

    .tui-input__box {
        margin-bottom: 20rpx;
    }

    .tui-input__box .tui-input {
        padding-right: 60rpx;
    }
</style>