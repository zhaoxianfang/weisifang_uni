<template>
    <view class="container">
        <view class="tui-header">
            Hi，欢迎使用「{{ appName }}」当前版本：
            <text class="tui-version">V{{ version }}</text>
        </view>
        <view class="tui-log">
            <tui-time-axis>
                <tui-timeaxis-item v-for="(item, index) in logList" :key="index">
                    <template v-slot:node>
                        <view class="tui-node">
                            <tui-icon name="explore-fill" :color="version == item.version ? '#5c8dff' : '#ddd'"
                                :size="18"></tui-icon>
                        </view>
                    </template>
                    <template v-slot:content>
                        <view class="tui-content-log" :class="[version == item.version ? '' : 'tui-log-gray']">
                            <view class="tui-version-date">
                                {{ logList.length - 1 == index ? item.version : 'V' + item.version }}（{{ item.date }}）
                            </view>
                            <view v-for="(model, index2) in item.log" :key="index2" class="tui-log-text">{{ model }}
                            </view>
                            <view class="tui-doc-box" v-if="index === logList.length - 1">
                                <view>本站官网：</view>
                                <view class="tui-link" @tap.stop="getLink('https://www.weisifang.com/')">
                                    https://www.weisifang.com/</view>
                                <!-- <view class="tui-link" @tap.stop="getLink('https://www.weisifang.com/docs/')">
									https://www.weisifang.com/docs/</view> -->
                                <view>在线文档地址：</view>
                                <view class="tui-link" @tap.stop="getLink('https://www.weisifang.com/docs/')">
                                    https://www.weisifang.com/docs/</view>
                            </view>
                        </view>
                    </template>
                </tui-timeaxis-item>
            </tui-time-axis>
        </view>
    </view>
</template>

<script>
    import thorui from '@/components/common/tui-clipboard/tui-clipboard.js'

    export default {
        data() {
            return {
                version: '1.0.0',
                appName: '威四方',
                logList: [{
                        version: '规划',
                        date: '2022-11-05',
                        log: ['本项目稳定后，会同步更新一些有用的有趣的工具和辅助工具']
                    },
                    {
                        version: '1.0.0',
                        date: '2022-11-05',
                        log: [
                            '1.在线相册',
                            '2.在线文档'
                        ]
                    }
                ].reverse()
            };
        },
        created() {
            // 获取本地应用资源版本号
            plus.runtime.getProperty(plus.runtime.appid, (info) => {
                this.version = info.version;
                this.appName = info.name;
            })
        },
        methods: {
            getLink: function(link) {
                thorui.getClipboardData(link, res => {
                    // #ifdef H5 || MP-ALIPAY
                    if (res) {
                        this.tui.toast('链接复制成功');
                    } else {
                        this.tui.toast('链接复制失败');
                    }
                    // #endif
                });
            }
        }
    };
</script>

<style>
    .container {
        overflow: hidden;
    }

    .tui-header {
        width: 100%;
        padding: 0 30rpx;
        box-sizing: border-box;
        font-size: 24rpx;
        color: #999;
        height: 54rpx;
        line-height: 54rpx;
        background: #fff8d5;
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        /* #ifdef H5 */
        top: 44px;
        /* #endif */
        z-index: 999999;
    }

    .tui-version {
        color: #f54f46;
        font-weight: bold;
    }

    .tui-log {
        padding: 84rpx 80rpx 30rpx 40rpx;
        box-sizing: border-box;
    }

    .tui-node {
        padding: 3px 0;
    }

    .tui-content-log {
        border-radius: 10rpx;
        position: relative;
        padding: 20rpx 26rpx;
        font-size: 28rpx;
        color: #fff;
        background: #5c8dff;
        border: 1rpx solid #5c8dff;
        display: inline-block;
        word-break: break-all;
    }

    /* 
.tui-log-text {
	word-break: break-all;
	word-wrap: break-word;
	text-align: justify;
} */

    .tui-content-log::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: 14rpx;
        border: 16rpx solid;
        right: 100%;
        border-color: transparent #5c8dff transparent transparent;
    }

    .tui-log-gray {
        background: #ededed !important;
        border: 1rpx solid #ededed !important;
        color: #999 !important;
    }

    .tui-log-gray::before {
        border-color: transparent #ededed transparent transparent !important;
    }

    .tui-version-date {
        font-size: 32rpx;
        font-weight: bold;
        padding-bottom: 20rpx;
    }

    .tui-doc-box {
        padding-top: 20rpx;
        word-break: break-all;
    }

    .tui-link {
        padding-bottom: 20rpx;
        color: #0066cc;
    }
</style>
