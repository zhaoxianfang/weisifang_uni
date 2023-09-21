<template>
    <view class="page-content">
        <view class="tui-banner__box">
            <image :src="webURL+'img_banner.png'" class="tui-banner"></image>
            <view class="tui-user__box">
                <view class="tui-name">echo.</view>
                <view class="tui-integral">目前积分20分，可抵扣0.2元</view>
            </view>
        </view>
        <view class="tui-order__list">
            <tui-list-cell padding="60rpx 50rpx" :hover="false" @click="detail">
                <view class="tui-order__item">
                    <view>
                        <view class="tui-order__status">订单待付款</view>
                        <view class="tui-img__box">
                            <image :src="webURL+'img_cafe_1.jpg'"></image>
                            <image :src="webURL+'img_cafe_2.jpg'"></image>
                            <view class="tui-img__more">
                                <tui-icon name="more-fill" :size="56" unit="rpx" color="#fff"></tui-icon>
                            </view>
                        </view>
                    </view>
                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle">付款</tui-button>
                </view>
            </tui-list-cell>
            <tui-list-cell padding="60rpx 50rpx" :hover="false" @click="detail">
                <view class="tui-order__item">
                    <view>
                        <view class="tui-order__status">订单待付款</view>
                        <view class="tui-img__box">
                            <image :src="webURL+'img_cafe_1.jpg'"></image>
                            <image :src="webURL+'img_cafe_2.jpg'"></image>
                            <view class="tui-img__more">
                                <tui-icon name="more-fill" :size="56" unit="rpx" color="#fff"></tui-icon>
                            </view>
                        </view>
                    </view>
                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle">付款</tui-button>
                </view>
            </tui-list-cell>
            <tui-list-cell padding="60rpx 50rpx" :hover="false" @click="detail">
                <view class="tui-order__item">
                    <view>
                        <view class="tui-order__status">订单待付款</view>
                        <view class="tui-img__box">
                            <image :src="webURL+'img_cafe_1.jpg'"></image>
                            <image :src="webURL+'img_cafe_2.jpg'"></image>
                            <view class="tui-img__more">
                                <tui-icon name="more-fill" :size="56" unit="rpx" color="#fff"></tui-icon>
                            </view>
                        </view>
                    </view>
                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle">付款</tui-button>
                </view>
            </tui-list-cell>
            <tui-list-cell padding="60rpx 50rpx" :hover="false" @click="detail">
                <view class="tui-order__item">
                    <view>
                        <view class="tui-order__status">订单待付款</view>
                        <view class="tui-img__box">
                            <image :src="webURL+'img_cafe_1.jpg'"></image>
                            <image :src="webURL+'img_cafe_2.jpg'"></image>
                            <view class="tui-img__more">
                                <tui-icon name="more-fill" :size="56" unit="rpx" color="#fff"></tui-icon>
                            </view>
                        </view>
                    </view>
                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle">付款</tui-button>
                </view>
            </tui-list-cell>
            <tui-list-cell padding="60rpx 50rpx" :hover="false" @click="detail">
                <view class="tui-order__item">
                    <view>
                        <view class="tui-order__status">订单待付款</view>
                        <view class="tui-img__box">
                            <image :src="webURL+'img_cafe_1.jpg'"></image>
                            <image :src="webURL+'img_cafe_2.jpg'"></image>
                            <view class="tui-img__more">
                                <tui-icon name="more-fill" :size="56" unit="rpx" color="#fff"></tui-icon>
                            </view>
                        </view>
                    </view>
                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle">付款</tui-button>
                </view>
            </tui-list-cell>
            <tui-list-cell padding="60rpx 50rpx" :hover="false" @click="detail">
                <view class="tui-order__item">
                    <view>
                        <view class="tui-order__status">订单待付款</view>
                        <view class="tui-img__box">
                            <image :src="webURL+'img_cafe_1.jpg'"></image>
                            <image :src="webURL+'img_cafe_2.jpg'"></image>
                            <view class="tui-img__more">
                                <tui-icon name="more-fill" :size="56" unit="rpx" color="#fff"></tui-icon>
                            </view>
                        </view>
                    </view>
                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle">付款</tui-button>
                </view>
            </tui-list-cell>
            <tui-list-cell @click="detail" padding="60rpx 50rpx" :hover="false" v-for="(item,index) in 2" :key="index">
                <view class="tui-order__item">
                    <view>
                        <view class="tui-order__status">订单已完成</view>
                        <view class="tui-img__box">
                            <image :src="webURL+'img_cafe_2.jpg'"></image>
                            <image :src="webURL+'img_cafe_1.jpg'"></image>
                        </view>
                    </view>
                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle">再来一单</tui-button>
                </view>
            </tui-list-cell>
            <tui-list-cell padding="60rpx 50rpx" :hover="false" :unlined="true" @click="detail">
                <view class="tui-order__item">
                    <view>
                        <view class="tui-order__status">订单已完成</view>
                        <view class="tui-img__box">
                            <image :src="webURL+'img_cafe_1.jpg'"></image>
                        </view>
                    </view>
                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle">再来一单</tui-button>
                </view>
            </tui-list-cell>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'Order',
        props: {
            // 商店id
            shopId: {
                type: Number,
                default: 0
            },
        },
        watch: {
            shopId(val) {},
        },
        data() {
            return {
                webURL: 'https://thorui.cn/extend/cafe/',
            }
        },
        methods: {
            detail() {
                this.tui.href('../orderDetail/orderDetail')
            }
        }
    }
</script>

<style>
    .page-content {
        margin-bottom: 110rpx;
    }

    .tui-banner__box {
        width: 100%;
        height: 180rpx;
        position: relative;
    }

    .tui-banner {
        width: 100%;
        height: 180rpx;
        border-radius: 12rpx;
    }

    .tui-user__box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        color: #ac9157;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 60rpx;
        box-sizing: border-box;
    }

    .tui-name {
        font-size: 34rpx;
        line-height: 24rpx;
        font-weight: bold;
    }

    .tui-integral {
        font-size: 24rpx;
        line-height: 24rpx;
        padding-top: 24rpx;
    }

    .tui-order__list {
        margin-top: 24rpx;
        border-radius: 12rpx;
        overflow: hidden;
        box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
    }

    .tui-order__item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .tui-order__status {
        font-size: 26rpx;
        color: #999;
        padding-bottom: 20rpx;
    }

    .tui-img__box {
        display: flex;
        align-items: center;
    }

    .tui-img__box image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 8rpx;
        margin-right: 20rpx;
    }

    .tui-img__more {
        width: 80rpx;
        height: 80rpx;
        border-radius: 8rpx;
        background-color: rgba(83, 83, 83, .1);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>