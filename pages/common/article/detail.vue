<template>
    <view class="container">
        <view class="tui-news-title">{{ info.title || '文章标题' }}</view>
        <view class="tui-sub-info">
            <view class="tui-sub-left">
                <text class="tui-author">{{ info.classify_name || '分类' }}</text>
                <text>{{ info.publish_time || info.created_at }}</text>
            </view>
            <view class="tui-sub-right">阅读 999</view>
        </view>
        <view class="tui-news-content">
            <uParse :content="info.content || ''" />
        </view>

        <view class="tui-news-source">文章来源：{{ info.classify_name || '数据采集' }}</view>

        <view class="tui-operate-box">
            <tui-tag padding="26rpx 56rpx" type="gray" shape="circle" :plain="true">
                <tui-icon name="agree" :size="20" color="#333"></tui-icon>
                <text class="tui-black">999赞</text>
            </tui-tag>
            <button open-type="share" class="tui-share-btn" @tap="btnShare">
                <tui-tag padding="26rpx 60rpx" type="gray" shape="circle" :plain="true">
                    <tui-icon name="partake" :size="20" color="#333"></tui-icon>
                    <text class="tui-black">分享</text>
                </tui-tag>
            </button>
        </view>

        <!--加载loadding-->
        <tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
        <!--加载loadding-->
        <view class="tui-safearea-bottom"></view>
    </view>
</template>

<script>
    import uParse from '@/components/uni/uParse/src/wxParse'
    export default {
        components: {
            uParse
        },
        data() {
            return {
                id: 0,
                info: {},
                loadding: false
            }
        },
        computed: {

        },
        onLoad(options) {
            this.id = options.id || 0
            this.loadding = true
            this.getDetail();
        },
        methods: {
            // 获取文章详情
            getDetail() {
                this.$api.article.detail(this.id).then(res => {
                        this.loadding = false
                        if (typeof res.code !== "undefined" || typeof res.data === "undefined") {
                            this.tui.toast(res.message || '出错啦!')
                        }
                        this.info = res.data || {}
                    })
                    .catch(e => {
                        this.loadding = false
                        console.log('err', e)
                        this.tui.toast('出错啦!')
                    });
            },
            btnShare() {
                // #ifdef H5
                location.href = 'https://www.weisifang.com/';
                // #endif

                //#ifdef APP-PLUS
                plus.share.sendWithSystem({
                        content: '威四方',
                        href: 'https://www.weisifang.com/'
                    },
                    function() {
                        console.log('分享成功');
                    },
                    function(e) {
                        console.log('分享失败：' + JSON.stringify(e));
                    }
                );
                //#endif
            }
        },
        // 页面上拉触底事件的处理函数
        onReachBottom: function() {

        }
    }
</script>

<style>
    page {
        background: #fff;
        color: #333;
    }

    .container {
        padding: 40rpx 30rpx 110rpx 30rpx;
        box-sizing: border-box;
    }

    .tui-news-title {
        font-size: 48rpx;
        font-weight: 500;
        text-align: justify;
    }

    .tui-sub-info {
        padding-top: 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
        color: #999;
    }

    .tui-author {
        color: #5677fc;
        padding-right: 20rpx;
    }

    .tui-news-content {
        padding-top: 40rpx;
    }

    .tui-news-source {
        font-size: 24rpx;
        color: #999;
    }

    .tui-operate-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 60rpx 40rpx;
        box-sizing: border-box;
    }

    .tui-black {
        color: #333;
        padding-left: 12rpx;
    }

    .tui-safearea-bottom {
        width: 100%;
        height: env(safe-area-inset-bottom);
    }

    .tui-share-btn {
        display: block;
        background: none;
        margin: 0;
        padding: 0;
    }
</style>