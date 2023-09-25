<template>
    <view class="container">
        <view class="no-data" v-if="folderList.length < 1">
            <tui-no-data :fixed="false" imgUrl="/static/images/tabbar/null.png">
                <text class="tui-color__black">您还没有加入到好友的相册~</text>
            </tui-no-data>
        </view>

        <block>
            <view class="tui-ranking__list tui-justify__start">
                <view class="tui-ranking__item tui-item-mr__16" @tap="openFolder(item)"
                    v-for="(item, key) in folderList" :key="key">
                    <image :src="item.cover || '/static/images/photo/default.png'" mode="aspectFill"></image>
                    <view class="tui-ranking__gtitle">{{ item.name }}</view>
                    <!-- <view class="tui-ranking__sub" >包含xxx张照片</view> -->
                </view>
            </view>
        </block>

    </view>
</template>

<script>
    export default {
        name: 'Friend',
        props: {
            show: {
                type: Boolean,
                default: true
            },
        },
        watch: {
            show(val) {
                // if (val) {
                //     this.getList()
                // }
            },
        },
        data() {
            return {

                // 相册列表
                folderList: []
                // 	{
                // 		img: '/static/images/tabbar/default_img.png',
                // 		title: '我的相册一',
                // 		sales: 100000
                // 	},
                // ],

            };
        },
        onShow() {},
        mounted() {
            this.getList();
        },
        onLoad() {

        },
        methods: {
            // 获取我的相册列表
            getList() {
                this.$api.photo.get_photo_list({
                        type: 'friend'
                    }).then(res => {
                        if (res.code == 200) {
                            this.folderList = res.data
                        } else {
                            this.tui.toast(res.message || '出错啦')
                        }
                    })
                    .catch(e => {
                        this.tui.toast('出错啦')
                    });
            },

            // 打开相册
            openFolder(info) {
                uni.navigateTo({
                    url: 'detail?id=' + info.id + "&name=" + info.name
                });
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

    /* 相册列表 */
    .tui-ranking__list {
        padding-left: 16px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap; // flex 自动换行
    }

    .tui-justify__start {
        justify-content: flex-start !important;
    }

    .tui-item-mr__16 {
        margin-right: 16rpx;
    }

    .tui-ranking__item {
        width: 224rpx;
        border-radius: 12rpx;
        overflow: hidden;
        background-color: #fff;
        padding-bottom: 20rpx;
        margin-bottom: 20rpx;
        box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
    }

    .tui-ranking__item image {
        width: 204rpx;
        height: 224rpx;
        padding: 10rpx;
        display: block;
    }

    .tui-ranking__gtitle {
        font-size: 24rpx;
        line-height: 24rpx;
        padding: 24rpx 12rpx 8rpx;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .tui-ranking__sub {
        font-size: 25rpx;
        line-height: 25rpx;
        padding: 8rpx 18rpx 8rpx;
        transform: scale(0.8);
        transform-origin: 0 center;
        color: #999;
    }

    /* 没数据 */
    .no-data {
        margin-top: 30%;
    }

    img {
        background-image: url('/static/images/photo/default.png'));
    }
</style>