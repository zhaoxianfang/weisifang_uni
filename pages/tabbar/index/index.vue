<template>
    <view class="container">
        <wsf-popup :itemList="menuList" ref="wsfPopup" @click="onClickPopupMenu"></wsf-popup>
        <wsf-tabs-swiper :tabs="tabs" @loadMore="loadList" :list="items">
            <template v-slot:tab="{ tab }">
                <view class="" style="height: 30px;background-color: #fff;margin: 10rpx;">当前栏目
                    ：{{ tab.id }}-{{ tab.title }}</view>
            </template>
            <template v-slot:item="{ item }">
                <tui-list-cell @click="detail(item)">
                    <view class="tui-news-flex tui-flex-start">
                        <view class="tui-news-tbox tui-flex-column tui-flex-between">
                            <view class="tui-news-title">{{item.title}}</view>
                            <view class="tui-sub-box tui-pt20">
                                <view class="tui-sub-source">{{item.classify_name}}</view>
                                <view class="tui-sub-cmt">
                                    <view>{{item.publish_time}}</view>
                                    <view class="tui-scale">
                                        <tui-tag padding="10rpx 24rpx" :plain="true" shape="circleRight">自动采集</tui-tag>
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
                }, {
                    title: '订阅栏目',
                    icon: 'listview',
                    type: 'subscribe_column'
                }],
                tabs: [{
                    id: 1,
                    title: '热门'
                }],
                // 当前激活的tab 数据
                items: [],
                tabs_data_list: {}, // 所有tabs 加载的数据列表 例如：{1:[{...}]}
                query: {} // 查询条件
            };
        },

        onLoad() {
            this.query = {}
            this.getTopNavBar()
        },
        onNavigationBarButtonTap(e) {
            this.$refs.wsfPopup.toggle();
        },
        methods: {
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
                            this.tabs = res.data.list || [{
                                id: 1,
                                title: '热门'
                            }]
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
            // 加载更多
            loadList(obj) {
                // console.log('需要加载数据：', obj)
                var classify_id = obj.tabInfo.id || 0
                var classify_title = obj.tabInfo.title || '未知'
                var page = obj.pageIndex || 1
                // 判断
                if (!(this.query).hasOwnProperty(classify_id)) {
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
            detail(item) {
                this.tui.href('/pages/common/article/detail?id=' + item.id);
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

    .tui-news-cell {
        display: flex;
        padding: 20rpx 30rpx;
    }

    .tui-news-tbox {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        display: flex;
    }

    .tui-news-picbox {
        display: flex;
        position: relative;
    }

    .tui-w220 {
        width: 220rpx;
    }

    .tui-h165 {
        height: 165rpx;
    }

    .tui-block {
        display: block;
    }

    .tui-w-full {
        width: 100%;
    }

    .tui-one-third {
        width: 33%;
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

    .tui-pl-20 {
        padding-left: 20rpx;
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

    .tui-btm-badge {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 24rpx;
        color: #fff;
        padding: 2rpx 12rpx;
        background: rgba(0, 0, 0, 0.6);
        z-index: 20;
        transform: scale(0.8);
        transform-origin: 100% 100%;
    }

    .tui-video {
        position: absolute;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transform-origin: 0 0;
    }

    .tui-icon {
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        padding: 26rpx;
    }
</style>