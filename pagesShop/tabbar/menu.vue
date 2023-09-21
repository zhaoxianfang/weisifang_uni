<template>
    <view class="container">
        <tui-navigation-bar @init="initNavigation" @change="opcityChange" :isOpacity="false" :scrollTop="scrollTop"
            :title="shopName" :backgroundColor="backgroundColor" :backdropFilter="!isAndroid" :zIndex="999"
            :maxOpacity="isAndroid ? 1 : 0.7" color="#fff">
            <!-- #ifndef MP-ALIPAY || MP-BAIDU -->
            <view class="tui-share__back" :style="{ top: top + 'px' }" @tap="back">
                <tui-icon name="arrowleft" color="#fff"></tui-icon>
            </view>
            <view class="tui-right-menu" :style="{ top: top + 'px' }" @tap="openMenu">
                <view class="iconfont iconmenu"></view>
            </view>
            <!-- #endif -->
        </tui-navigation-bar>

        <wsf-popup :itemList="menuList" ref="wsfPopup" top="166rpx" @click="onClickPopupMenu"></wsf-popup>

        <List v-if="currentTabIndex === 0" :shopId="shopId" :scrollTop="scrollTop" :height="height"
            :windowHeight="windowHeight" />
        <Order v-if="currentTabIndex === 1" :shopId="shopId" />

        <!--========底部菜单========-->
        <tui-tabbar :zIndex="999" :current="currentTabIndex" backdropFilter :tabBar="tabBar" color="#777"
            selectedColor="#AC9157" @click="switchTabbar"></tui-tabbar>
    </view>
</template>
<script>
    import List from './list.vue'
    import Order from './order.vue'
    export default {
        components: {
            List,
            Order
        },
        data() {
            return {
                shopName: '我的小店',
                shopId: 0, // 商店id
                currentTabIndex: 0,
                webURL: 'https://thorui.cn/extend/cafe/',
                tabBar: [{
                        pagePath: './list',
                        text: '商品',
                        iconPath: '/static/images/template/cafe/img_cafe_normal.png',
                        selectedIconPath: '/static/images/template/cafe/img_cafe_active.png'
                    },
                    {
                        pagePath: './order',
                        text: '我的订单',
                        iconPath: '/static/images/template/cafe/img_order_normal.png',
                        selectedIconPath: '/static/images/template/cafe/img_order_active.png'
                    }
                ],
                menuList: [{
                    title: '分享',
                    icon: 'share',
                    type: 'share'
                }, {
                    title: '收藏',
                    icon: 'star',
                    type: 'star'
                }, {
                    title: '举报',
                    icon: 'soso',
                    type: 'caution'
                }],

                top: 10,
                scrollTop: 0.5,
                backgroundColor: '#333', // topNav 背景
                windowHeight: 400,
                isAndroid: true,
                opcity: 0,
                height: 20,
            };
        },
        onLoad(e) {
            this.shopId = parseInt(e.m_id || 0)
            this.shopName = '我的小店';
            this.isAndroid = this.tui.isAndroid();
        },
        onReady(e) {
            // console.log('onReady', e)
        },
        created(e) {
            // console.log('created', e)
        },
        methods: {
            back() {
                uni.navigateBack();
            },
            onClickPopupMenu(e) {
                if (e.item.type === 'scan') {
                    console.log('扫一扫')
                    this.helper.scanCode.scan()
                }
            },
            initNavigation(e) {
                this.opcity = e.opcity;
                this.height = e.height;
                this.top = e.top;
                this.windowHeight = e.windowHeight;
            },
            opcityChange(e) {
                this.opcity = e.opcity;
            },
            switchTabbar(e) {
                this.currentTabIndex = e.index
            },
            openMenu() {
                this.$refs.wsfPopup.toggle();
            }
        },
        onPageScroll(e) {
            this.scrollTop = e.scrollTop;
        },
        onShareAppMessage: function(e) {
            return {
                title: 'ThorUI模板-咖啡点单'
            };
        }
    };
</script>

<style>
    @import '@/static/fonts/iconfont.css';

    .container {
        padding-top: 160rpx;
    }

    .tui-share__back {
        position: absolute;
        left: 12rpx;
    }

    .tui-right-menu {
        position: absolute;
        right: 30rpx;
        top: 30rpx;
    }

    .iconfont {
        font-size: 50rpx;
        color: #fff;
    }
</style>