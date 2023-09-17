<template>
    <view v-if="show">
        <view class="tui-popup-show tui-z_index"
            :style="{ width: '300rpx', backgroundColor: '#4c4c4c', borderRadius: '8rpx', color: '#fff', position: 'fixed', left: 'auto', right: '8px', bottom: 'auto', top: 'auto',transform:`translate(0,0)` }">

            <view class="tui-triangle" :style="{
            		borderWidth: '12rpx',
            		borderColor: `transparent transparent #4c4c4c transparent`,
            		left: 'auto',
            		right: '16px',
            		top: '-22rpx',
            		bottom: 'auto'
            	}"></view>

            <view class="tui-popup-item"
                :class="{ 'tui-start': index === 0, 'tui-last': index === itemList.length - 1 }"
                hover-class="tui-item-active" :hover-stay-time="150" @tap="handleClick(index)"
                v-for="(item, index) in itemList" :key="index">
                <tui-icon :name="item.icon" color="#fff" :size="40" unit="rpx" v-if="item.icon && !isImage"></tui-icon>
                <image :src="item.icon" v-if="item.icon && isImage" :style="{width:width,height:height}"></image>
                <text class="tui-bubble-popup_title">{{ item.title }}</text>
            </view>
        </view>
        <view @touchmove.stop.prevent="stop" class="tui-popup-mask tui-popup-show" style="backgroundColor:transparent"
            v-if="mask" @tap="handleClose"></view>
    </view>
</template>

<script>
    //右上角气泡弹层
    // import popup from './popup.vue'
    export default {
        name: 'wsfPopup',
        emits: ['click'],
        components: {
            // popup,
        },
        props: {
            itemList: {
                type: Array,
                default: () => {
                    return [{
                        title: '关闭',
                        icon: 'close'
                    }];
                }
            },
            //遮罩背景色
            maskBgColor: {
                type: String,
                default: 'transparent'
            },
            //图标是否为图片
            isImage: {
                type: Boolean,
                default: false
            },
            //图标宽度
            width: {
                type: String,
                default: '40rpx'
            },
            //图标高度
            height: {
                type: String,
                default: '40rpx'
            },
            //当为自定义header时传值
            top: {
                type: String,
                default: '12rpx'
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
            handleClick(index) {
                console.log(index)
                this.$emit('click', {
                    index: index
                });
                this.toggle()
            },
            toggle() {
                this.show = !this.show;
            },
            handleClose() {
                this.toggle()
                // if (!this.show) {
                //     return;
                // }
                // this.$emit('close', {});
            },
            stop() {
                return false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .tui-popup-item {
        padding: 10rpx 34rpx;
        display: flex;
        align-items: center;
        font-size: 32rpx;
        position: relative;

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

    .tui-item-active {
        background-color: #444;
    }
</style>

<style scoped>
    .tui-z_index {
        z-index: 996;
    }

    .tui-popup-show {
        opacity: 1;
        /* #ifndef APP-NVUE */
        visibility: visible;
        /* #endif */
    }

    .tui-triangle {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        z-index: 997;
    }

    .tui-popup-mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 995;
        /* #ifndef APP-NVUE */
        transition: all 0.3s ease-in-out;
        visibility: hidden;
        /* #endif */
        opacity: 0;

    }
</style>