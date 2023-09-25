<template>
    <view class="container">

        <Mine v-show="current === 0" :show="current === 0" />
        <Friend v-show="current === 1" :show="current === 1" />

        <tui-tabbar :current="current" @click="tabbarSwitch" backdropFilter :backgroundColor="backgroundColor"
            :tabBar="tabBar" color="#646464" selectedColor="#5677FC"></tui-tabbar>
    </view>
</template>

<script>
    import Mine from './mine.vue'
    import Friend from './friend.vue'
    export default {
        components: {
            Mine,
            Friend
        },
        data() {
            return {
                current: 0,
                tabBar: [{
                        pagePath: '/pages/tabbar/index/index',
                        text: '我的相册',
                        iconPath: '/static/images/tabbar/picture_gray.png',
                        selectedIconPath: '/static/images/tabbar/picture_active.png',
                        // num: 1,
                        // isDot: false
                    },
                    {
                        pagePath: '/pages/tabbar/my/my',
                        text: '好友相册',
                        iconPath: '/static/images/tabbar/users_gray.png',
                        selectedIconPath: '/static/images/tabbar/users_active.png',
                        verify: true
                    }
                ],
                backgroundColor: 'rgba(248,248,248,.7)',
            };
        },
        onShow() {
            this.getList()
        },
        mounted() {},
        onLoad() {
            // #ifdef H5
            this.backgroundColor = '#f8f8f8';
            // #endif
            // #ifndef H5
            if (this.tui.isAndroid()) {
                this.backgroundColor = '#f8f8f8';
            }
            // #endif
        },
        methods: {
            // 获取我的相册列表
            getList() {

            },
            tabbarSwitch(e) {
                this.current = e.index;
                //获取登录状态，此处默认未登录
                // if (e.verify) {
                //     this.tui.toast('此功能暂未开通~');
                // } else {
                //     this.current = e.index;
                // }
            },
        }
    };
</script>

<style>
    /* page {
		background: #EDEDED;
	}
 */
    .container {
        padding: 20rpx 0 120rpx 0;
        box-sizing: border-box;
    }

    img {
        background-image: url('/static/images/photo/default.png'));
    }
</style>