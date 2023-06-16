<template>
    <view>
        <view class="uni-uploader__files">
            <block v-for="(image,index) in imgList" :key="index">
                <view class="uni-uploader__file" style="position: relative;">
                    <image mode="aspectFill" class="uni-uploader__img" :src="src?image[src]:image"
                        @tap="preview(index)"></image>
                    <block v-if="manage">
                        <view v-if="coverIndex === index" class="set-capital">封面图</view>
                        <view v-else class="set-capital" style="background: #0A98D5;" @tap="setCapital(index)">设为封面图
                        </view>
                        <view class="close-view" @click="close(index)">删除</view>
                    </block>
                </view>
            </block>
        </view>
    </view>
</template>
<script type="text/javascript">
    export default {
        name: 'image-choose',
        emits: ['setCover', 'closeImage', 'hasRefresh'],
        props: {
            // list 中展示的字段对象，例如:[{src:12.jpg}]则为src,[12.jpg,13.jpg,14.jpg]则不传或传空
            src: {
                //展示字段名称
                type: String,
                default: ''
            },
            // 单此展示的图片列表，需要追加展示时候直接修改 list 的值即可，本差价会自动追加在尾部
            list: {
                //接收的图片列表[{src:12.jpg}]
                type: Array,
                default: function() {
                    return []
                }
            },
            // 是否管理照片，true:展示 设置封面图和删除操作按钮，false 不展示操作按钮
            manage: {
                //监听变化
                type: Boolean,
                default: false
            },
            // 是否刷新图片
            refresh: {
                //监听变化
                type: Boolean,
                default: false
            },
        },

        data() {
            return {
                coverIndex: '', // 封面图index
                imgList: [],
                previewUrls: [],
                isCloseHandle: false
            }
        },
        watch: {
            // list: {
            //     handler(val, oldval) {
            //       console.log('list change',val)
            //         this.addImg(val)
            //     },
            //     deep: false
            // },
            list(val, oldval) {
                if (this.isCloseHandle) {
                    // 删除 imgList数据时候会触发此处更新。进行拦截
                    this.isCloseHandle = false
                    return false
                }
                console.log('change list', val)
                this.addImg(val)
            },
            manage(val, oldval) {},
            refresh(val, oldval) {}
        },
        created() {
            this.addImg(this.list)
        },
        methods: {
            addImg(data = []) {
                // 底部加载
                if (this.refresh) {
                    this.imgList = data
                    this.$emit("hasRefresh", false);
                } else {
                    this.imgList = this.imgList.concat(data)
                }
                let previewUrls = [];
                for (let item of this.imgList) {
                    this.previewUrls.push(this.src.length > 0 ? item[this.src] : item)
                }
            },
            // 预览
            preview(index) {
                uni.previewImage({
                    current: index || 1,
                    urls: this.previewUrls,
                    indicator: 'number',
                    loop: true
                })
            },
            // 删除某个图片
            close(index) {
                this.isCloseHandle = true
                var item = this.imgList[index]
                this.imgList.splice(index, 1);
                this.previewUrls.splice(index, 1);
                this.$emit("closeImage", item);
            },
            // 设置主图/封面图
            setCapital(i, name) {
                var item = this.imgList[i];
                this.coverIndex = i
                this.$emit("setCover", item);
            }
        }
    }
</script>
<style scoped>
    .uni-uploader__file {
        margin: 10upx;
        width: 225upx;
        height: 225upx;
    }

    .uni-uploader__img {
        display: block;
        width: 225upx;
        height: 225upx;
    }

    .uni-uploader__files {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .set-capital {
        text-align: center;
        line-height: 30px;
        height: 30px;
        padding: 0 5px;
        right: 0;
        /* width: 30px; */
        background: #1AAD19;
        color: #FFFFFF;
        position: absolute;
        bottom: 0px;
        font-size: 12px;
    }

    .close-view {
        text-align: center;
        line-height: 14px;
        color: #FFFFFF;
        top: -3px;
        right: -4px;
        font-size: 14px;

        background: #D1372C;
        width: 35px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        opacity: 0.8;
        position: absolute;
        z-index: 2;
        cursor: pointer;
        box-sizing: border-box;

        transform: scale(0.8);
        position: absolute;
        line-height: 24px;
    }

    img,
    .uni-uploader__img {
        /* background-image:url('@/static/images/photo/default.png')); */
        background: #f2f2f2 url('@/static/images/photo/default_img.png') top left no-repeat;
    }
</style>
