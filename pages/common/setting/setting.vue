<template>
    <view>
        <view class="tui-content-box">
            <tui-list-view title="">
                <tui-list-cell @click="detail" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="shield" :size="24" color="#ff7900"></tui-icon>
                        <text class="tui-list-cell_name">应用权限</text>
                    </view>
                </tui-list-cell>
            </tui-list-view>

            <tui-list-view title="">
                <tui-list-cell @click="protocol" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <tui-icon name="explore-fill" :size="23" color="#19be6b"></tui-icon>
                        <text class="tui-list-cell_name">用户隐私协议</text>
                        <view class="tui-right"></view>
                    </view>
                </tui-list-cell>
            </tui-list-view>

            <tui-list-view title="">
                <tui-list-cell @click="about" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <tui-icon name="about" :size="23" color="#afadb2"></tui-icon>
                        <text class="tui-list-cell_name">关于我们</text>
                        <view class="tui-ml-auto">
                            <tui-tag padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green"
                                shape="circle">{{app_name}}</tui-tag>
                        </view>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="logs" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <tui-icon name="order" :size="23" color="#afadb2"></tui-icon>
                        <text class="tui-list-cell_name">更新日志</text>
                        <view class="tui-right"></view>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="check_version" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <tui-icon name="refresh" :size="23" color="#afadb2"></tui-icon>
                        <text class="tui-list-cell_name">检查更新</text>
                        <view class="tui-right">{{version}}</view>
                    </view>
                </tui-list-cell>
            </tui-list-view>

            <tui-list-view title="">
                <tui-list-cell @click="contactUs" :arrow="true">
                    <view class="tui-item-box">
                        <tui-icon name="kefu" :size="24" color="#19be6b"></tui-icon>
                        <text class="tui-list-cell_name">联系我们</text>
                    </view>
                </tui-list-cell>
            </tui-list-view>

        </view>

        <view class="tui-exit">
            <tui-button shape="circle" shadow type="danger" height="88rpx" @click="logout">退出登录</tui-button>
        </view>
    </view>
</template>

<script>
    export default {
        onLoad: function(options) {},
        data() {
            return {
                time: '',
                version: '1.0.0',
                app_name: ''
            };
        },
        created() {},
        mounted() {
            // 获取本地应用资源版本号
            plus.runtime.getProperty(plus.runtime.appid, (info) => {
                this.version = info.version;
                this.app_name = info.name || '威四方'
            })
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            // 检查更新
            check_version() {
                this.helper.checkAppUpgrade(1);
            },
            protocol() {
                this.tui.href('/pages/common/doc/protocol', false)
            },
            about() {
                this.tui.href('/pages/common/doc/about', false)
            },
            logs(e) {
                this.tui.href('/pages/common/doc/log', false);
            },
            contactUs(e) {
                this.tui.href('/pages/common/contactUs/contactUs', false);
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

    .tui-exit {
        padding: 100rpx 24rpx;
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