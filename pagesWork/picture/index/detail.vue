<template>
    <view class="container">
        <view class="no-data" v-if="photoList.length < 1">
            <tui-no-data :fixed="false" imgUrl="/static/images/tabbar/null.png" btnText="添加照片" @click="addImages">
                <text class="tui-color__black">该相册还没有添加任何照片~</text>
            </tui-no-data>
        </view>

        <block v-else>
            <!-- <wsf-choose-img :manage="managePhoto" :list="photoList" :refresh="refresh" @hasRefresh="hasRefresh" @closeImage="closeImage" @setCover="setCover"></wsf-choose-img> -->
            <wsf-upload v-model="photoList" :max="999" :remove="managePhoto" :manage="managePhoto" :add="false"
                @imgDelete="remove" @setCover="setCover"></wsf-upload>
        </block>

        <tui-divider v-if="!notMore" :size="28" :bold="true" color="#ccc" width="50%">正在加载中...</tui-divider>
        <tui-divider v-if="photoList.length > 0 && notMore" :size="28" :bold="true" color="#ccc"
            width="50%">没有了</tui-divider>

        <tui-fab :left="0" :right="80" :bottom="80" :width="100" :height="100" bgColor="#5677fc" :btnList="btnList"
            @click="onClick" custom maskClosable>
            <tui-icon name="setup" color="#fff"></tui-icon>
        </tui-fab>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                managePhoto: false,
                refresh: false,
                photo_id: '',
                photoList: [], // 照片列表
                queryList: {
                    page: 1,
                    limit: 20
                },
                notMore: false,
                finished: true,
                btnList: [{
                    bgColor: "#1589FF",
                    //图标/图片地址
                    imgUrl: "/static/images/tabbar/plus_big.png",
                    //图片高度 rpx
                    imgHeight: 45,
                    //图片宽度 rpx
                    imgWidth: 45,
                    //名称
                    text: "添加图片",
                    //字体大小
                    fontSize: 34,
                    //字体颜色
                    color: "#fff"
                }, {
                    bgColor: "#FFA500",
                    //图标/图片地址
                    imgUrl: "/static/images/tabbar/image_big.png",
                    //图片高度 rpx
                    imgHeight: 45,
                    //图片宽度 rpx
                    imgWidth: 45,
                    //名称
                    text: "管理图片",
                    //字体大小
                    fontSize: 34,
                    //字体颜色
                    color: "#fff"
                }],
                timer: '' // 定时器
            }
        },
        onLoad(option) {
            this.queryList.page = 1
            this.notMore = false
            this.finished = true
            if (option) {
                this.photo_id = option.id
                // 设置标题
                uni.setNavigationBarTitle({
                    title: option.name || '相册详情'
                });
            }

            if (this.photo_id) {
                // 加载
                this.refresh = true;
                this.photoList = [];
                this.getList()
                if (this.managePhoto) {
                    this.btnList[1].text = '完成管理'
                } else {
                    this.btnList[1].text = '管理图片'
                }
            }

        },
        onShow() {

        },
        onReachBottom() {
            if (this.notMore) {
                return false
            }
            if (!this.finished) {
                return false
            }
            if (this.timer) {
                return false
            }
            this.finished = false
            this.timer = setTimeout(() => {
                this.queryList.page++
                this.getList();
                this.timer = ''
            }, 800)
        },
        methods: {
            getList() {
                if (this.notMore) {
                    return false
                }
                this.finished = false
                this.$api.photo.get_photo_item_list(this.photo_id, this.queryList).then(res => {
                        // console.log(res.data)
                        if (res.data && res.data.length > 0) {
                            if (this.queryList.page > 1) {
                                this.photoList = [...this.photoList, ...res.data]
                            } else {
                                this.photoList = res.data
                            }
                            this.notMore = false
                        } else {
                            // 没有了
                            this.notMore = true
                        }
                        this.finished = true
                    })
                    .catch(e => {
                        this.finished = true
                        console.log('出错啦', e);
                        this.tui.toast('出错啦')
                    });
            },
            // 删除图片
            closeImage(e) {
                console.log('closeImage', e)
                this.$api.photo.del_photo_item(e.id)
            },
            setCover(e) {
                console.log('setCover', this.photo_id, e.id)
                this.$api.photo.set_cover_img(this.photo_id, e.id)
            },
            addImages() {
                this.tui.toast("添加照片")
                uni.navigateTo({
                    url: 'upload?id=' + this.photo_id
                });
            },
            onClick(e) {
                let index = e.index
                switch (index) {
                    case 0:
                        this.addImages();
                        break;
                    case 1:
                        this.managePhoto = !this.managePhoto
                        if (this.managePhoto) {
                            this.btnList[1].text = '完成管理'
                        } else {
                            this.btnList[1].text = '管理图片'
                        }
                        break;
                    default:
                        break;
                }
            },
            // 收到组件通知已经初始化过刷新操作了，重置为不刷新「追加」
            hasRefresh(e) {
                this.refresh = false
            },
            remove: function(e) {
                //移除图片
                console.log('移除图片', e)
                // console.log('移除图片',e,e.file.id)

                // tui-upload 方法
                // let index = e.index
                // this.$api.photo.del_photo_item(e.file.id)

                // wsf-upload 方法
                this.$api.photo.del_photo_item(e.del.id)
            },
        }
    }
</script>

<style>
    .container {
        padding: 20rpx 0 120rpx 0;
        box-sizing: border-box;
    }

    .no-data {
        margin-top: 30%;
    }

    img {
        /* background-image:url('@/static/images/photo/default.png')); */
        background: #ccc url('@/static/images/photo/default.png') top left no-repeat;
    }
</style>