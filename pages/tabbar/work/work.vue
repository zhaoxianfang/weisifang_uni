<template>
    <view class="container">
        <tui-grid>
            <block v-for="(item, index) in dataList" :key="index">
                <navigator :url="item.page" class="tui-cell tui-cell_access" v-show="item.page">
                    <tui-grid-item :cell="gridColumn">
                        <view class="tui-grid-icon">
                            <tui-icon :name="item.name" :size="item.size" :color="item.color || '#999'"></tui-icon>
                        </view>
                        <text class="tui-grid-label" :style="`color: ${item.color || '#333'};`">{{ item.label || item.name }}</text>
                    </tui-grid-item>
                </navigator>
                <tui-grid-item :cell="gridColumn" @click="more(item)" v-show="!item.page">
                    <view class="tui-grid-icon">
                        <tui-icon :name="item.name" :size="item.size" :color="item.color || '#999'"></tui-icon>
                    </view>
                    <text class="tui-grid-label" :style="`color: ${item.color || '#333'};`">{{ item.label || item.name }}</text>
                </tui-grid-item>
            </block>
        </tui-grid>
        <wsf-popup :itemList="menuList" ref="wsfPopup" @click="onClickPopupMenu"></wsf-popup>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                baSelectedList: [], // ba 图片文件选择返回值
                gridColumn: 2,
                menuList: [{
                    title: '扫一扫',
                    icon: 'sweep',
                    type: 'scan'
                }],
                dataList: [{
                        name: 'picture',
                        label: '相册',
                        color: '#8a5966',
                        page: '/pagesWork/picture/index/index',
                        size: 30
                    },
                    {
                        name: 'strategy',
                        label: '在线文档',
                        color: '#8a5966',
                        size: 30,
                        type: 'webview'
                    },
                    {
                        name: 'manage',
                        label: '仓库管理',
                        color: '#999',
                        page: '/pagesA/wms/index/index',
                        size: 30
                    },
                    {
                        name: 'shop',
                        label: '商家点单',
                        color: '#8a5966',
                        page: '/pagesShopMall/shop/tabbar/menu?m_id=1',
                        size: 30
                    },
                    {
                        name: 'service',
                        label: '我的文件',
                        color: '#8a5966',
                        page: '/pagesWork/files/files',
                        size: 30
                    },
                    {
                        name: 'tool',
                        label: '音乐-图片选择',
                        color: '#999',
                        size: 30,
                        type: 'img'
                    },
                    {
                        name: 'tool',
                        label: '图片、音频、视频',
                        color: '#999',
                        size: 30,
                        type: 'picture'
                    },
                    {
                        name: 'feedback',
                        label: '笔记、备忘',
                        color: '#999',
                        size: 30,
                        page: '/pagesA/calendar/index/index',
                    },
                    {
                        name: 'weather',
                        label: '天气-预览-office',
                        color: '#999',
                        size: 30,
                        type: 'office'
                    },
                    {
                        name: 'gps',
                        label: '附近',
                        color: '#999',
                        size: 30,
                        type: ''
                    },
                    {
                        name: 'gps',
                        label: '已安装的app',
                        color: '#8a5966',
                        size: 28,
                        type: 'app_list'
                    },
                    {
                        name: 'more-fill',
                        label: '文件选择',
                        color: '#8a5966',
                        size: 30,
                        type: 'files'
                    },
                    {
                        name: 'more-fill',
                        label: '悬浮框',
                        color: '#999',
                        size: 30,
                        type: 'window'
                    }, {
                        name: 'more-fill',
                        label: '分享图片',
                        color: '#8a5966',
                        size: 30,
                        type: 'share'
                    }, {
                        name: 'more-fill',
                        label: '图片编辑',
                        color: '#8a5966',
                        size: 30,
                        type: 'edit_img'
                    }
                ],

            };
        },
        mounted() {
            // #ifdef APP-PLUS

            // #endif
        },
        onShow: function() {
            // uni.showTabBar()
        },
        onHide: function() {
            // uni.hideTabBar()
        },
        onNavigationBarButtonTap(e) {
            this.$refs.wsfPopup.toggle();
        },
        methods: {
            onClickPopupMenu(e) {
                if (e.item.type === 'scan') {
                    console.log('扫一扫')
                    this.helper.scanCode.scan()
                }
            },

            jump_page: function(e) {
                // (1)uni.navigateTo(OBJECT) 保留当前页面，跳转到应用内的某个页面
                // (2)uni.redirectTo(OBJECT) 关闭当前页面，跳转到应用内的某个页面
                // (3)uni.reLaunch(OBJECT) 关闭所有页面，打开到应用内的某个页面
                // (4)uni.switchTab(OBJECT) 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
                // (5)uni.navigateBack(OBJECT) 关闭当前页面，返回上一页面或多级页面
                if (e.page) {
                    uni.navigateTo({
                        url: e.page
                    });
                } else {
                    this.more();
                }
            },
            more: function(e) {
                // this.tui.toast('敬请期待~');
                var _this = this
                // #ifdef APP-PLUS

                if (e.type == 'img') {
                    // 图片视频选择
                    this.helper.plugins.pictureSelector.selectImg({
                        // 'max': 99
                    }, function(file) {
                        if (file === false) {
                            console.log('选择文件出错啦 ')
                            return false
                        }
                        console.log('file', file)
                    })
                }
                if (e.type == 'picture') {
                    // 图片、音频、视频
                    this.helper.plugins.pictureSelector.selectMedia({
                        // 'mediaType': 0,
                        // 'max': 99
                    }, function(file) {
                        if (file === false) {
                            console.log('选择文件出错啦 ')
                            return false
                        }
                        console.log('file', file)
                    })
                }

                if (e.type == 'files') {
                    this.helper.files.selectFiles({}, function(file) {
                        if (file === false) {
                            console.log('选择文件出错啦 ')
                            return false
                        }
                        console.log('file', file)
                    })
                }
                if (e.type == 'office') {
                    // 文件预览组件

                    // 方式一：直接在openFile接口中传递在线url
                    this.helper.files.preview('http://silianpan.cn/upload/2022/01/01/1.docx', 'Office文档在线预览');

                }
                if (e.type == 'webview') {
                    this.helper.openUrl('http://0l0.net/docs')
                }
                if (e.type == 'app_list') {
                    this.tui.href('/pages/common/extend/app_list');
                }
                if (e.type == 'window') {
                }
                if (e.type == 'share') {
                    // 分享图片: 图片视频选择
                    this.helper.plugins.pictureSelector.selectMedia({
                        // 'mediaType': 0,
                        // 'max': 99
                    }, function(file) {
                        if (file === false) {
                            console.log('选择文件出错啦 ')
                            return false
                        }
                        console.log('file', file)
                        // 分享
                        uni.shareWithSystem({
                            type: 'image', // 分享类型，只支持text，image，默认为text
                            summary: '我正在使用威四方，你也赶紧来试试吧~', // 分享的文字内容
                            // href: 'https://weisifang.com', // 分享链接，ios端分享到微信时必填此字段
                            imageUrl: file[0].realPath, // 分享图片，仅支持本地路径
                            success(res) {
                                // 分享完成，请注意此时不一定是成功分享
                                console.log('分享完成，请注意此时不一定是成功分享', res)
                            },
                            fail(err) {
                                // 分享失败
                                console.log('分享失败', err)
                            },
                            complete(res) {
                                // 成功或失败都调用
                                console.log('成功或失败都调用', res)
                            }
                        })
                    })
                }
                if (e.type == 'scan') {
                    // 扫一扫
                    this.helper.scanCode.scan()
                }
                if (e.type == 'edit_img') {
                    // 扫一扫
                    this.helper.files.editImg()
                }
                // #endif

            }
        }
    };
</script>

<style>
    .container {
        padding-bottom: env(safe-area-inset-bottom);
    }

    .tui-title {
        padding: 50rpx 30rpx 30rpx 30rpx;
        font-size: 32rpx;
        color: #333;
        box-sizing: border-box;
        font-weight: bold;
        clear: both;
    }

    .tui-grid-icon {
        width: 64rpx;
        height: 64rpx;
        margin: 0 auto;
        text-align: center;
        vertical-align: middle;
    }

    .tui-grid-label {
        display: block;
        text-align: center;
        font-weight: 400;
        color: #333;
        font-size: 28rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 10rpx;
    }

    .tui-grid-2,
    .tui-grid-3,
    .tui-grid-4,
    .tui-grid-5 {
        margin-top: 0 !important;
        color: #8a5966 !important;
    }
</style>
<style scoped>
    .tui-grid {
        line-height: 100rpx !important;
        overflow: hidden;
    }
</style>