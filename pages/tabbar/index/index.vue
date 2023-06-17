<template>
    <view class="container">
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
                tabs: [{
                        id: 1,
                        title: '栏目一'
                    },
                    {
                        id: 2,
                        title: '栏目二'
                    },
                    {
                        id: 3,
                        title: '栏目三'
                    },
                    {
                        id: 4,
                        title: '栏目四'
                    },
                    {
                        id: 5,
                        title: '栏目五'
                    },
                    {
                        id: 6,
                        title: '栏目六'
                    },
                    {
                        id: 7,
                        title: '栏目七'
                    },
                    {
                        id: 8,
                        title: '栏目八'
                    },
                    {
                        id: 9,
                        title: '栏目九'
                    },
                    {
                        id: 10,
                        title: '栏目十'
                    }
                ],
                // 当前激活的tab 数据
                items: []
            };
        },

        onLoad() {},
        onNavigationBarButtonTap(e) {
            this.helper.navBtns.handle(e)
        },
        methods: {
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