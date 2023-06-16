# v-tabs 加 swiper 组合的一个通用的 滑动页面 联动组件

## demo
```
<template>
  <view class="container">
    <wsf-tabs-swiper :tabs="tabs" :list="items" tabTitle="title" :overlap="false" @loadMore="loadList">
      <template v-slot:tab="{ tab }">
        <view class="" style="height: 60px;background-color: #fff;margin: 10rpx;">接收当前激活的tab,传入时tabs里面的原始数据 ：{{ tab.id }}-{{ tab.title }}
        </view>
      </template>
      <template v-slot:item="{ item }">
        <view class="" style="height: 60px;background-color: #fff;margin: 10rpx;">接收插槽值,传入时items里面的原始数据 ： {{ item.name }}</view>
      </template>
    </wsf-tabs-swiper>
  </view>
</template>

<script>

export default {
    data() {
        return {
            tabs: [{
                id: 1,
                title: '军事'
            },
            {
                id: 2,
                title: '科幻'
            },
            {
                id: 3,
                title: '战争'
            },
            {
                id: 4,
                title: '人文'
            },
            {
                id: 5,
                title: '地理'
            },
            {
                id: 6,
                title: '社会'
            },
            {
                id: 7,
                title: '家庭'
            },
            {
                id: 8,
                title: '育儿'
            },
            {
                id: 9,
                title: '科技'
            },
            {
                id: 10,
                title: '教育'
            }
            ],
            // 当前激活的tab 数据
            items: []
        }
    },

    onLoad() {},
    methods: {
        loadList(obj) {
        // console.log('需要加载数据：', obj)

            var _this = this

            var num = (obj.pageIndex - 1) * 10
            var tempList = []
            for (let i = 1; i < 11; i++) {
                let index = parseInt(num) + parseInt(i)
                let tempItem = {
                    name: index + '_' + obj.tabInfo.title
                }
                tempList.push(tempItem)
            }
            // 模拟延时3秒
            setTimeout(() => {
                _this.items = tempList
            }, 300)
        }
    }
}
</script>

<style>
  .container {
    width: 100%;
    padding-bottom: 30rpx;
    height: 100vh;
  }
</style>


```