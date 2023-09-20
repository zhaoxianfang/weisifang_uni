<template>
    <view v-if="show">
        <view @touchmove.stop.prevent="stop" class="tui-popup-show tui-popup-mask " v-if="mask" @tap="toggle">
        </view>

        <view class="tui-popup-show tui-z_index tui-item-box"
            :style="{ left: left, right: right, bottom: bottom, top: top,position: position }">
            <!-- #ifdef APP-NVUE -->
            <list>
                <!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
                <cell v-for="(item, index) in itemList" :key="item.title" class="tui-popup-item"
                    :class="{ 'tui-start': index === 0, 'tui-last': index === itemList.length - 1 }"
                    @tap="handleClick(item)">
                    <tui-icon class="nvue-item-icon" :name="item.icon" color="#fff" :size="45" unit="rpx"
                        v-if="item.icon && !isImage"></tui-icon>
                    <text class="nvue-item-text" :style="{ color: '#fff'}">{{item.title}}</text>
                </cell>
            </list>
            <!-- #endif -->
            <!-- #ifndef APP-NVUE -->
            <view class="tui-popup-item"
                :class="{ 'tui-start': index === 0, 'tui-last': index === itemList.length - 1 }"
                @tap="handleClick(item)" v-for="(item, index) in itemList" :key="index">
                <tui-icon :name="item.icon" color="#fff" :size="40" unit="rpx" v-if="item.icon && !isImage"></tui-icon>
                <image :src="item.icon" v-if="item.icon && isImage" :style="{width:'40rpx',height:'40rpx'}"></image>
                <view class="tui-bubble-popup_title" :style="{ color: '#fff'}">
                    {{ item.title }}
                </view>
            </view>
            <!-- #endif -->

        </view>

    </view>
</template>

<script>
    //右上角气泡弹层
    export default {
        name: 'wsfPopup',
        emits: ['click'],
        components: {},
        props: {
            itemList: {
                type: Array,
                default: () => {
                    return [{
                        title: '关闭',
                        icon: 'shut',
                        type: 'close'
                    }];
                }
            },
            //图标是否为图片
            isImage: {
                type: Boolean,
                default: false
            },
            //当为自定义header时传值
            top: {
                type: String,
                default: '2rpx'
            },
            right: {
                type: String,
                default: '12rpx'
            },
            left: {
                type: String,
                default: 'auto'
            },
            bottom: {
                type: String,
                default: 'auto'
            },
            position: {
                type: String,
                default: 'fixed'
            }

        },
        watch: {
            top(val) {
                if (val) {}
            }
        },
        created() {
            // #ifdef H5
            this.top = 44 + uni.upx2px(12) + 'px';
            // #endif
        },
        data() {
            return {
                show: false,
                mask: true,
            };
        },
        methods: {
            handleClick(item) {
                this.$emit('click', {
                    item: item
                });
                this.toggle()
            },
            toggle() {
                this.show = !this.show;
            },
            stop() {
                return true;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .tui-popup-item {
        /* #ifdef APP-NVUE */
        padding: 10rpx 20rpx;
        /* #endif */
        /* #ifndef APP-NVUE */
        padding: 30rpx;
        /* #endif */
        display: flex;
        align-items: center;
        font-size: 32rpx;
        position: relative;
        color: #fff;
        text-align: center;

        flex-direction: row;
        /* #ifdef APP-NVUE */
        border-bottom: #666 solid 1rpx;
        /* #endif */

        &::after {
            position: absolute;
            border-bottom: 1rpx solid #888;
            /* #ifndef APP-NVUE */
            content: '';
            -webkit-transform: scaleY(0.5);
            /* #endif */
            transform: sc8aleY(0.5);
            bottom: 0;
            right: 0;
            left: 38rpx;
        }

        .tui-bubble-popup_title {
            color: #fff;
            padding-left: $uni-spacing-row-base;
        }
    }

    .tui-start {
        border-top-left-radius: 8rpx;
        border-top-right-radius: 8rpx;
    }

    .tui-last {
        border-bottom-left-radius: 8rpx;
        border-bottom-right-radius: 8rpx;

        &::after {
            border-bottom: 0 !important;
        }
    }

    .tui-item-box {
        width: 300rpx;
        background-color: #4c4c4c;
        border-radius: 8rpx;
        color: #fff;
        transform: translate(0, 0)
    }

    .tui-z_index {
        z-index: 99996;
    }

    .tui-popup-show {
        opacity: 1;
    }

    .tui-popup-mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99990;
        /* #ifndef APP-NVUE */
        transition: all 0.3s ease-in-out;
        /* #endif */
        opacity: 0;
        background-color: transparent;
    }

    .nvue-item-icon {
        width: 55rpx;
        height: 55rpx;
    }

    .nvue-item-text {
        height: 55rpx;
        flex: 1;
        color: #fff;
        padding-left: 8rpx;
    }
</style>