<template>
    <view class="container">
        <!--顶部消息-->
        <tui-tips ref="toast" backgroundColor="#ff7900"></tui-tips>
        <view class="tui-box-upload">
            <wsf-upload :max="99" v-model="value" :chooseNum="99" :headers="headers" :compress="true" name='album'
                :formData="formData" :remove="true" @uploadSuccess="uploadSuccess" @imgDelete="remove"
                @uploadFail="uploadFail" :action="serverUrl" :add="true" @chooseSuccess="chooseSuccess"
                @finally="finallyStat" @starting="starting"></wsf-upload>
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
                value: [
                    // 'https://weisifang.com/photos/9PfZSGkucgm7/20220928/6334570676ad4.jpg?uni_file=6'
                ],
                headers: {
                    'Authorization': this.tui.getToken()
                },
                formData: {
                    id: null
                },
                // 上传统计
                uploadStatistics: {
                    succ: 0, // 上传成功数量
                    fail: 0 // 上传失败数量
                },
                isTooManyAttempts: false, // 是否请求太频繁了

            }
        },
        onLoad(option) {
            this.uploadStatistics = {
                succ: 0,
                fail: 0
            }
            this.isTooManyAttempts = false
            if (option) {
                this.formData.id = option.id
                this.serverUrl = config.baseURL + 'photo/items/upload/' + option.id
                // 设置标题
                // uni.setNavigationBarTitle({
                // 	title: '相册详情'
                // });
            }
        },
        methods: {
            remove: function(e) {
                //移除图片
                console.log('移除图片', e)
                // console.log('移除图片',e,e.file.id)

                // tui-upload 方法
                // let index = e.index
                // this.$api.photo.del_photo_item(e.file.id)

                // wsf-upload 方法


                // 1.find() 返回数组中第一个满足条件的数据
                var delObj = this.imageData.find((item, index) => {
                    return item.url == e.del;
                })

                this.$api.photo.del_photo_item(delObj.id)
            },
            uploadSuccess(res) { //上传成功
                // console.log('res 上传成功', res)
                /****************
                因为上传接口返回的结构不一致，所以以下代码需要根据实际的接口返回结构开发，在此只是展示如果给数组里添加的过程，仅供参考
                ***************/
                var _res = JSON.parse(res.data);
                if (_res.code == 200) {
                    this.uploadStatistics.succ += 1;
                    this.value.push({
                        url: _res.url,
                        id: _res.id || 0
                    });
                    this.imageData.push(_res);
                } else {
                    this.uploadStatistics.fail += 1;
                    if (_res.code == 429 || _res.message == 'Too Many Attempts.') {
                        // 请求太频繁
                        this.isTooManyAttempts = true;
                        this.tui.toast('请求太频繁了')
                    } else {
                        // console.log('上传失败:', _res)
                        this.tui.toast('上传失败:' + (_res.msg || _res.message || '出错啦'))
                    }
                }
                /*******************************/
            },
            uploadFail(err) { //上传失败
                this.uploadStatistics.fail += 1;
                uni.hideLoading();
                console.log('err', err)
                this.tui.toast('上传失败:文件太大或系统出错')
            },
            chooseSuccess(file, tyoe) { //未设置上传地址
                console.log('chooseSuccess', file, tyoe)
            },
            // 操作完成
            finallyStat(fallTotal, videoTotal, imgTotal) {
                let msg = '共选择' + fallTotal + '个文件;';
                if (this.isTooManyAttempts) {
                    msg = '「选择的文件过多」' + msg; // 请求太频繁了
                }
                if (videoTotal && videoTotal > 0) {
                    msg += '视频' + fallTotal + '个;';
                }
                if (imgTotal && imgTotal > 0) {
                    msg += '图片' + imgTotal + '个;';
                }
                msg += '成功' + this.uploadStatistics.succ + '个,失败' + this.uploadStatistics.fail + '个;';
                this.tui.toast(msg)
                this.uploadStatistics = {
                    succ: 0,
                    fail: 0
                }

                this.$refs.toast.showTips({
                    msg: msg,
                    duration: 6000
                });
                this.isTooManyAttempts = false
            },
            // 从媒体库选择完成，即将开始上传
            starting() {
                this.isTooManyAttempts = false
                this.uploadStatistics = {
                    succ: 0,
                    fail: 0
                }
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