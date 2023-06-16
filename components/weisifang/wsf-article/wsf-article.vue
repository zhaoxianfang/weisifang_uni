<template>
    <view class="container">
        <view class="header">
            <view class="title" v-if="error.length<1">{{title || ''}}</view>
            <view class="sub-title" v-if="error">{{error || '出错啦'}}</view>
        </view>
        <view class="tui-richtext" v-if="error.length<1 && content.length>0">
            <view v-if="['1',1].includes(type)">
                <uParse :content="content || ''" />
            </view>
            <view v-else>
                <uParse :content="marked(content) || ''" />
            </view>
        </view>
    </view>
</template>

<script>
    import marked from '@/components/uni/marked/index.js'
    import uParse from '@/components/uni/uParse/src/wxParse'
    export default {
        name: 'WsfArticle',
        components: {
            uParse
        },
        props: {
            // 文章类型 1 富文本；2 markdown
            type: {
                type: [Number, String],
                default: 1
            },
            // 文章内容
            content: {
                type: String,
                default: ''
            },
            // 文章标题
            title: {
                type: String,
                default: ''
            },
            // 文章错误提示
            error: {
                type: String,
                default: ''
            }

        },
        watch: {
            type(val) {

            },
            content(val) {

            },
            title(val) {

            },
            subTitle(val) {

            }
        },
        created() {

        },
        data() {
            return {}
        },
        onLoad() {},
        methods: {

        }
    }
</script>

<style>
    .container {
        padding: 20rpx;
        box-sizing: border-box;
        overflow-x: hidden;
    }

    .header {
        padding: 80rpx 90rpx 60rpx 90rpx;
        box-sizing: border-box;
    }

    .title {
        font-size: 34rpx;
        color: #333;
        font-weight: 500;
    }

    .sub-title {
        font-size: 40rpx;
        color: #7a7a7a;
        padding-top: 18rpx;
        text-indent: 2em
    }

    .tui-richtext {
        width: 100%;
        /* #ifndef H5 */
        padding-right: 30rpx;
        /* #endif */
        box-sizing: border-box;
    }

    .tui-title {
        padding: 60rpx 30rpx 20rpx 30rpx;
        font-size: 26rpx;
        color: #7a7a7a;
    }

    .tui-code {
        width: 100%;
        padding: 16rpx;
        box-sizing: border-box;
    }

    .tui-scroll-view {
        width: 100%;
        border: 1rpx solid #19BE6B;
        padding: 10rpx;
        height: 240rpx;
        font-size: 24rpx;
        box-sizing: border-box;
    }
</style>
