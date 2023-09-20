<template>
    <view class="container">
        <wsf-popup :itemList="menuList" ref="wsfPopup" @click="onClickPopupMenu"></wsf-popup>
        <wsf-tabs-swiper :tabs="tabs" @loadMore="loadList" :list="items">
            <template v-slot:tab="{ tab }">
                <view class="" style="height: 60px;background-color: #fff;margin: 10rpx;">接收激活的tab
                    ：{{ tab.id }}-{{ tab.title }}</view>
            </template>
            <template v-slot:item="{ item }">
                <view class="" @tap="click" style="height: 60px;background-color: #fff;margin: 10rpx;">接收插槽值 ：
                    {{ item.name }}
                </view>
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
                    },
                    {
                        id: 2,
                        title: '娱乐'
                    },
                    {
                        id: 3,
                        title: '教育'
                    },
                    {
                        id: 4,
                        title: '新闻'
                    },
                    {
                        id: 5,
                        title: '电影'
                    }
                ],
                // 当前激活的tab 数据
                items: []
            };
        },

        onLoad() {},
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
            loadList(obj) {
                // console.log('需要加载数据：', obj)

                var _this = this;

                var num = (obj.pageIndex - 1) * 10;
                var tempList = [];
                for (let i = 1; i < 11; i++) {
                    let index = parseInt(num) + parseInt(i);
                    let tempItem = {
                        name: index + '_' + obj.tabInfo.title
                    };
                    tempList.push(tempItem);
                }
                // 模拟延时3秒
                setTimeout(() => {
                    _this.items = tempList;
                }, 300);
            },
            click() {
                this.tui.href('/pages/common/article/detail?id=1');
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
</style>