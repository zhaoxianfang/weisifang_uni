<template>
    <view class="container">
        <view class="tui-box-upload">
            <tui-upload :value="value" :header="headers" fileKeyName='photo' :formData="formData" :limit="99" :size="8"
                :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload>
        </view>
    </view>
</template>

<script>
    import config from '@/api/config.js' // 倒入默认配置
    export default {
        name: 'upload-page',
        data() {
            return {
                // 上传文件
                imageData: [],
                //上传接口地址
                serverUrl: "",
                //初始化图片
                value: [],
                headers: {
                    'Authorization': this.tui.getToken()
                },
                formData: {
                    id: null
                }
            }
        },
        onLoad(option) {

            if (option) {
                console.log(option)
                this.formData.id = option.id
                this.serverUrl = config.baseURL + 'photo/items/upload/' + option.id
                // 设置标题
                // uni.setNavigationBarTitle({
                // 	title: '相册详情'
                // });
            }
        },
        methods: {
            // 上传文件
            result: function(e) {
                console.log(e)
                this.imageData = e.imgArr;
            },
            remove: function(e) {
                //移除图片
                console.log('移除图片', e, e.file.id)
                let index = e.index
                this.$api.photo.del_photo_item(e.file.id)
            }
        }
    }
</script>

<style scoped>
    .container {
        padding: 20rpx 0 120rpx 0;
        box-sizing: border-box;
    }

    /* 上传文件 */
    .tui-box-upload {
        padding-left: 25rpx;
        box-sizing: border-box;
    }

    ::v-deep .tui-upload-add {
        color: #fff;
        background-color: #C0C0C0;
    }
</style>
