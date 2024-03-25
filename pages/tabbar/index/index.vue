<template>
    <view class="container">
        <wsf-popup :itemList="menuList" ref="wsfPopup" @click="onClickPopupMenu"></wsf-popup>
        <wsf-tabs-swiper :tabs="tabs" tabTitle="title" :showSetup="true" @onSetup="clickSetup" @onRefresh="refreshList" @onLoadMore="loadMore" :list="items">
            <template v-slot:header="{ tabHead }">
                <view class="" style="padding: 10rpx;">
                    <!-- 当前栏目：{{ tabHead.id }}-{{ tabHead.title }} -->
                    <image :src="bannerImg(tabHead)" style="width: 100%;" mode="widthFix"></image>
                </view>
            </template>
            <template v-slot:item="{ item }">
                <tui-list-cell @click="detail(item)" padding="26rpx 30rpx">
                    <view class="tui-news-flex tui-flex-start">
                        <view class="tui-news-tbox tui-flex-column tui-flex-between">
                            <view class="tui-news-title">{{item.title}}</view>
                            <view class="tui-sub-box tui-pt20">
                                <view class="tui-sub-source">{{item.classify_name}}</view>
                                <view class="tui-sub-cmt">
                                    <view>{{item.publish_time}}</view>
                                    <view class="tui-scale" v-if="item.source_type && parseInt(item.source_type) > 1">
                                        <tui-tag padding="10rpx 24rpx" :plain="true" shape="circleRight">采集</tui-tag>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </tui-list-cell>
            </template>
        </wsf-tabs-swiper>
    </view>
</template>

<script>
    import thorui from '@/components/common/tui-clipboard/tui-clipboard.js';

    export default {
        data() {
            return {
                menuList: [{
                    title: '扫一扫',
                    icon: 'sweep',
                    type: 'scan'
                }],
                tabs: [
                    // {
                    //     id: 1,
                    //     title: '热门'
                    // },
                ],
                // 当前激活的tab 数据
                items: [],
                tabs_data_list: {}, // 所有tabs 加载的数据列表 例如：{1:[{...}]}
                query: {}, // 查询条件
                deviceWidth: 300 // 设备宽度
            };
        },
        onLoad() {
            this.query = {}
            this.getDeviceInfo()
            this.getTopNavBar()
        },
        onNavigationBarButtonTap(e) {
            this.$refs.wsfPopup.toggle();
        },
        computed: {

        },
        methods: {
            getDeviceInfo() {
                const systemInfo = uni.getSystemInfoSync();
                this.deviceWidth = systemInfo.windowWidth; // 单位dp
            },
            bannerImg(tab) {
                var width = this.deviceWidth;
                var heigth = width * 0.12;
                var text = tab.title || 'WeiSiFang.com'
                return `https://weisifang.com/tools/text2png/${text}/${this.deviceWidth}/${heigth}/ffffff/0000ff/1/pmzdxx.html`
            },
            onClickPopupMenu(e) {
                if (e.item.type === 'scan') {
                    this.helper.scanCode.scan()
                }
                if (e.item.type === 'subscribe_column') {
                    console.log('订阅栏目')
                }
            },
            getTopNavBar() {
                this.$api.article.home_top_nav().then(res => {
                        if (res.code === 200) {
                            this.tabs = res.data.list || []
                            // console.log(this.tabs)
                        } else {
                            this.tui.toast(res.msg || '出错啦!')
                        }
                    })
                    .catch(e => {
                        console.log('err', e)
                        this.tui.toast('出错啦!')
                    });
            },
            getList(classify_id = '') {
                if (!classify_id || classify_id == '' || classify_id == null || classify_id < 1 || this.query[
                        classify_id].not_more) {
                    return false
                }
                this.$api.article.list(this.query[classify_id]).then(res => {
                        if (!(this.tabs_data_list).hasOwnProperty(classify_id)) {
                            // 初始化
                            this.tabs_data_list[classify_id] = []
                        }
                        if (res.data.length < 1) {
                            // 没有了
                            this.query[classify_id].not_more = true
                            this.items = [];
                            return false
                        }
                        this.tabs_data_list[classify_id] = [...this.tabs_data_list[classify_id], ...res.data]
                        this.items = this.tabs_data_list[classify_id]
                    })
                    .catch(e => {
                        console.log('getList', e)
                        this.tui.toast('出错啦!')
                    });
            },
            // 底部加载更多
            loadMore(obj) {
                // console.log('需要加载数据：', obj)
                var classify_id = obj.tabInfo.id || 0
                var classify_title = obj.tabInfo.title || '未知'
                var page = obj.pageIndex || 1
                // 判断
                if (!(this.query).hasOwnProperty(classify_id)) {
                    // 初始化
                    this.query[classify_id] = {
                        page: 1,
                        limit: 15,
                        classify_id: classify_id,
                        not_more: false
                    }
                }
                if (this.query[classify_id].not_more) {
                    return true; // 没有了
                }
                this.query[classify_id].page = page;

                this.getList(classify_id)
            },
            // 手动下拉刷新数据
            refreshList(obj) {
                // console.log('下拉刷新数据：', obj)
                this.loadMore(obj)
            },
            detail(item) {
                this.tui.href('/pages/common/article/detail?id=' + item.id);
            },
            clickSetup(){
                this.tui.toast('点击了设置按钮')
            }
        }
    };
</script>

<style>
    .container {
        width: 100%;
        padding-bottom: 30rpx;
        height: 100vh;
    }

    .tui-news-flex {
        width: 100%;
        display: flex;
    }

    .tui-flex-start {
        align-items: flex-start !important;
    }

    .tui-flex-center {
        align-items: center !important;
    }

    .tui-flex-column {
        flex-direction: column !important;
    }

    .tui-flex-between {
        justify-content: space-between !important;
    }

    .tui-news-tbox {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        display: flex;
    }

    .tui-news-title {
        width: 100%;
        font-size: 34rpx;
        word-break: break-all;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        box-sizing: border-box;
    }

    .tui-pt20 {
        padding-top: 20rpx;
    }

    .tui-sub-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #999;
        box-sizing: border-box;
        line-height: 24rpx;
    }

    .tui-sub-source {
        font-size: 26rpx;
    }

    .tui-sub-cmt {
        font-size: 24rpx;
        line-height: 24rpx;
        display: flex;
        align-items: center;
    }


    .tui-scale {
        transform: scale(0.6);
        transform-origin: center center;
    }
</style>