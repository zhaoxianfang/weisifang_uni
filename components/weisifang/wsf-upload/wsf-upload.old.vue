<template>
    <view class="wsf-upload-list">
        <view class="wsf-upload-Item" v-for="(item,index) in uploadLists" :key="index">
            <view class="wsf-upload-Item-video" v-if="isVideo(item)">
                <!-- #ifndef APP-PLUS -->
                <video :disabled="false" :controls="false" :src="getFileUrl(item)">
                    <cover-view class="wsf-upload-Item-video-fixed" @click="previewVideo(getFileUrl(item))">
                    </cover-view>

                    <cover-view class="wsf-upload-Item-del-cover" v-if="remove && previewVideoSrc==''"
                        @click="imgDel(index)">×</cover-view>
                    <view v-if="!isVideo(item.url)">
                        <cover-view class="wsf-upload-Item-capital-cover cover-active"
                            v-if="manage && previewVideoSrc=='' && coverIndex === index ">封面图</cover-view>
                        <cover-view class="wsf-upload-Item-capital-cover"
                            v-if="manage && previewVideoSrc=='' && coverIndex !== index " @click="setCapital(index)">
                            设为封面图</cover-view>
                    </view>
                </video>
                <!-- #endif -->
                <!-- #ifdef APP-PLUS -->
                <view class="wsf-upload-Item-video-fixed" @click="previewVideo(getFileUrl(item))"></view>
                <image class="wsf-upload-Item-video-app-poster" mode="widthFix" :src="appVideoPoster"></image>
                <!-- #endif -->
            </view>

            <image v-else :src="getFileUrl(item)" @click="imgPreview(getFileUrl(item))"></image>

            <view class="wsf-upload-Item-del" v-if="remove" @click="imgDel(index)">×</view>
            <view v-if="!isVideo(item.url)">
                <view class="wsf-upload-Item-capital cover-active" v-if="manage && coverIndex === index">封面图</view>
                <view class="wsf-upload-Item-capital" v-if="manage && coverIndex !== index" @click="setCapital(index)">
                    设为封面图</view>
            </view>
        </view>
        <view class="wsf-upload-Item wsf-upload-Item-add" v-if="uploadLists.length<max && add" @click="chooseFile">
            +
        </view>
        <view class="preview-full" v-if="previewVideoSrc!=''">
            <video :autoplay="true" :src="previewVideoSrc" :show-fullscreen-btn="false">
                <cover-view class="preview-full-close" @click="previewVideoClose"> ×
                </cover-view>
            </video>
        </view>


        <!--  -->
    </view>
</template>

<style>
    .ceshi {
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #FFFFFF;
        color: #2C405A;
        opacity: 0.5;
        z-index: 100;
    }
</style>

<script>
    export default {
        name: 'wsfUpload',
        props: {
            max: { //展示图片最大值
                type: Number,
                default: 1,
            },
            chooseNum: { //选择图片数
                type: Number,
                default: 9,
            },
            name: { //发到后台的文件参数名
                type: String,
                default: 'file',
            },
            dataType: { //v-model的数据结构类型
                type: Number,
                default: 0, // 0: ['http://xxxx.jpg','http://xxxx.jpg'] 1:[{type:0,url:'http://xxxx.jpg'}]  type 0 图片 1 视频 url 文件地址 此类型是为了给没有文件后缀的状况使用的
            },
            remove: { //是否展示删除按钮
                type: Boolean,
                default: true,
            },
            manage: { //是否展示管理
                type: Boolean,
                default: false,
            },
            add: { //是否展示添加按钮
                type: Boolean,
                default: true,
            },
            disabled: { //是否禁用
                type: Boolean,
                default: false,
            },
            sourceType: { //选择照片来源 【ps：H5就别费劲了，设置了也没用。不是我说的，官方文档就这样！！！】
                type: Array,
                default: () => ['album', 'camera'],
            },
            action: { //上传地址 如需使用uniCloud服务，设置为uniCloud即可
                type: String,
                default: '',
            },
            headers: { //上传的请求头部
                type: Object,
                default: () => {},
            },
            formData: { //HTTP 请求中其他额外的 form data
                type: Object,
                default: () => {},
            },
            compress: { //是否需要压缩
                type: Boolean,
                default: true,
            },
            quality: { //压缩质量，范围0～100
                type: Number,
                default: 80,
            },
            // #ifndef VUE3
            value: { //受控图片列表
                type: Array,
                default: () => [],
            },
            // #endif
            // #ifdef VUE3
            modelValue: { //受控图片列表
                type: Array,
                default: () => [],
            },
            // #endif
            uploadSuccess: {
                default: (res) => {
                    return {
                        success: false,
                        url: ''
                    }
                },
            },
            mediaType: { //文件类型 image/video/all
                type: String,
                default: 'all',
            },
            maxDuration: { //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。 (只针对拍摄视频有用)
                type: Number,
                default: 60,
            },
            camera: { //'front'、'back'，默认'back'(只针对拍摄视频有用)
                type: String,
                default: 'back',
            },
            appVideoPoster: { //app端视频展示封面 只对app有效
                type: String,
                default: '/static/images/common/play.png',
            },
        },
        data() {
            return {
                coverIndex: '',
                uploadLists: [],
                mediaTypeData: ['image', 'video', 'all'],
                previewVideoSrc: '',
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                // #ifndef VUE3
                this.uploadLists = this.value;
                // #endif
                // #ifdef VUE3
                this.uploadLists = this.modelValue;
                // #endif
                if (this.mediaTypeData.indexOf(this.mediaType) == -1) {
                    uni.showModal({
                        title: '提示',
                        content: 'mediaType参数不正确',
                        showCancel: false,
                        success: function(res) {
                            if (res.confirm) {
                                //console.log('用户点击确定');
                            } else if (res.cancel) {
                                //console.log('用户点击取消');
                            }
                        }
                    });
                }
            });
        },
        watch: {
            // #ifndef VUE3
            value(val, oldVal) {
                //console.log('value',val, oldVal)
                this.uploadLists = val;
            },
            // #endif
            // #ifdef VUE3
            modelValue(val, oldVal) {
                //console.log('value',val, oldVal)
                this.uploadLists = val;
            },
            // #endif
            manage(val, oldVal) {},


        },
        methods: {
            isVideo(item) {
                var path = item.url || item;
                var index = path.lastIndexOf('.') // 获取指定字符串最后一次出现的位置，返回index
                var ext = path.substr(index + 1, 4) // substr(start, length) 抽取从start下标开始的length个字符，返回新的字符串
                // toLowerCase() 将字符串转换为小写，返回一个新的字符串
                let isImages = ['png', 'png?', 'jpg', 'jpg?', 'jpeg', 'bmp', 'bmp?', 'gif', 'gif?', 'webp', 'psd',
                    'psd?', 'svg', 'svg?', 'tiff'
                ].indexOf(ext.toLowerCase()) !== -1

                return !isImages
            },
            getFileUrl(item) {
                var url = item.url || item;

                return url
            },
            previewVideo(src) {
                this.previewVideoSrc = src;
                // this.previewVideoSrc =
                // 	'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-fbd63a76-dc76-485c-b711-f79f2986daeb/ba804d82-860b-4d1a-a706-5a4c8ce137c3.mp4'
            },
            previewVideoClose() {
                this.previewVideoSrc = ''
                //console.log('previewVideoClose', this.previewVideoSrc)
            },
            imgDel(index) {
                uni.showModal({
                    title: '提示',
                    content: '您确定要删除么?',
                    success: (res) => {
                        if (res.confirm) {
                            // this.uploadLists.splice(index, 1)
                            // this.$emit("input", this.uploadLists);
                            // this.$emit("imgDelete", this.uploadLists);
                            let delUrl = this.uploadLists[index]
                            this.uploadLists.splice(index, 1)
                            // #ifndef VUE3
                            this.$emit("input", this.uploadLists);
                            // #endif
                            // #ifdef VUE3
                            this.$emit("update:modelValue", this.uploadLists);
                            // #endif
                            this.$emit("imgDelete", {
                                del: delUrl,
                                tempFilePaths: this.uploadLists
                            });
                        } else if (res.cancel) {}
                    }
                });
            },
            // 设置封面图
            setCapital(index) {
                let item = this.uploadLists[index]
                this.coverIndex = index
                this.$emit("setCover", item);
            },
            imgPreview(index) {

                var imgData = []

                this.uploadLists.forEach(item => {
                    if (!this.isVideo(item)) {
                        imgData.push(this.getFileUrl(item))
                    }
                })

                uni.previewImage({
                    urls: imgData,
                    current: index,
                    loop: true,
                });


            },
            chooseFile() {
                var _this = this
                if (this.disabled) {
                    return false;
                }
                // #ifdef APP-PLUS

                this.helper.plugins.pictureSelector.selectMedia({
                    'mediaType': 0,
                    'max': 99
                }, function(file) {
                    if (file === false) {
                        console.log('选择文件出错啦 ')
                        return false
                    }
                    file.forEach(item => {
                        //TG-2022-09-22-200117456.mp4
                        // console.log(_this.isVideo('TG-2022-09-22-200117456.mp4'))
                        console.log(_this.isVideo(item.fileName), item.fileName, item.realPath)
                        if (_this.isVideo(item.fileName)) {
                            _this.chooseSuccessMethod([item.realPath], 1)
                        } else {
                            _this.chooseSuccessMethod([item.realPath], 0)
                        }
                        // item.fileName	文件名
                        // item.path	初始路径
                        // item.realPath	绝对路径
                        // item.compressed	是否压缩
                        // item.compressPath	压缩文件路径
                        // item.isCut	是否裁剪
                        // item.cutPath	裁剪路径
                        // item.isOriginal	是否开启原图
                        // item.originalPath	原图路径
                        // item.videoThumbnailPath	视频缩略图
                        // item.size	文件大小
                        // item.duration	文件时长
                    })


                })
                // #endif
                // #ifndef APP-PLUS
                switch (this.mediaTypeData.indexOf(this.mediaType)) {
                    case 1: //视频
                        this.videoAdd();
                        break;
                    case 2: //全部
                        uni.showActionSheet({
                            itemList: ['相册', '视频'],
                            success: (res) => {
                                if (res.tapIndex == 1) {
                                    this.videoAdd();
                                } else if (res.tapIndex == 0) {
                                    this.imgAdd();
                                }
                            },
                            fail: (res) => {
                                console.log(res.errMsg);
                            }
                        });
                        break;
                    default: //图片
                        this.imgAdd();
                        break;
                }


                //if(this.mediaType=='image'){

                // #endif
            },
            videoAdd() {
                //console.log('videoAdd')
                let nowNum = Math.abs(this.uploadLists.length - this.max);
                let thisNum = (this.chooseNum > nowNum ? nowNum : this.chooseNum) //可选数量
                uni.chooseVideo({
                    compressed: this.compress,
                    sourceType: this.sourceType,
                    camera: this.camera,
                    maxDuration: this.maxDuration,
                    success: (res) => {
                        // console.log('videoAdd', res)
                        // console.log(res.tempFilePath)
                        this.chooseSuccessMethod([res.tempFilePath], 1)
                        //this.imgUpload([res.tempFilePath]);
                        //console.log('tempFiles', res)
                        // if (this.action == '') { //未配置上传路径
                        // 	this.$emit("chooseSuccess", res.tempFilePaths);
                        // } else {
                        // 	if (this.compress && (res.tempFiles[0].size / 1024 > 1025)) { //设置了需要压缩 并且 文件大于1M，进行压缩上传
                        // 		this.imgCompress(res.tempFilePaths);
                        // 	} else {
                        // 		this.imgUpload(res.tempFilePaths);
                        // 	}
                        // }
                    }
                });
            },
            imgAdd() {
                //console.log('imgAdd')
                let nowNum = Math.abs(this.uploadLists.length - this.max);
                let thisNum = (this.chooseNum > nowNum ? nowNum : this.chooseNum) //可选数量
                //console.log('nowNum', nowNum)
                //console.log('thisNum', thisNum)
                // #ifdef APP-PLUS
                if (this.sourceType.length > 1) {
                    uni.showActionSheet({
                        itemList: ['拍摄', '从手机相册选择'],
                        success: (res) => {
                            if (res.tapIndex == 1) {
                                this.appGallery(thisNum);
                            } else if (res.tapIndex == 0) {
                                this.appCamera();
                            }
                        },
                        fail: (res) => {
                            console.log(res.errMsg);
                        }
                    });
                }
                if (this.sourceType.length == 1 && this.sourceType.indexOf('album') > -1) {
                    this.appGallery(thisNum);
                }

                if (this.sourceType.length == 1 && this.sourceType.indexOf('camera') > -1) {
                    this.appCamera();
                }
                // #endif
                //#ifndef APP-PLUS
                uni.chooseImage({
                    count: thisNum,
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: this.sourceType,
                    success: (res) => {
                        this.chooseSuccessMethod(res.tempFilePaths, 0)
                        //console.log('tempFiles', res)
                        // if (this.action == '') { //未配置上传路径
                        // 	this.$emit("chooseSuccess", res.tempFilePaths);
                        // } else {
                        // 	if (this.compress && (res.tempFiles[0].size / 1024 > 1025)) { //设置了需要压缩 并且 文件大于1M，进行压缩上传
                        // 		this.imgCompress(res.tempFilePaths);
                        // 	} else {
                        // 		this.imgUpload(res.tempFilePaths);
                        // 	}
                        // }
                    }
                });
                // #endif
            },
            appCamera() {
                var cmr = plus.camera.getCamera();
                var res = cmr.supportedImageResolutions[0];
                var fmt = cmr.supportedImageFormats[0];
                //console.log("Resolution: " + res + ", Format: " + fmt);
                cmr.captureImage((path) => {
                        //alert("Capture image success: " + path);
                        this.chooseSuccessMethod([path], 0)
                    },
                    (error) => {
                        //alert("Capture image failed: " + error.message);
                        console.log("Capture image failed: " + error.message)
                    }, {
                        resolution: res,
                        format: fmt
                    }
                );
            },
            appGallery(maxNum) {
                plus.gallery.pick((res) => {
                    this.chooseSuccessMethod(res.files, 0)
                }, function(e) {
                    //console.log("取消选择图片");
                }, {
                    filter: "image",
                    multiple: true,
                    maximum: maxNum
                });
            },
            chooseSuccessMethod(filePaths, type) {
                if (this.action == '') { //未配置上传路径
                    this.$emit("chooseSuccess", filePaths, type); //filePaths 路径 type 0 为图片 1为视频
                } else {
                    console.log(' chooseSuccessMethod type', type)
                    if (type == 1) {
                        this.imgUpload(filePaths, type);
                    } else {
                        if (this.compress) { //设置了需要压缩
                            this.imgCompress(filePaths, type);
                        } else {
                            this.imgUpload(filePaths, type);
                        }
                    }

                }
            },
            imgCompress(tempFilePaths, type) { //type 0 为图片 1为视频
                uni.showLoading({
                    title: '压缩中...'
                });

                let compressImgs = [];
                let results = [];
                tempFilePaths.forEach((item, index) => {
                    compressImgs.push(new Promise((resolve, reject) => {
                        // #ifndef H5
                        uni.compressImage({
                            src: item,
                            quality: this.quality,
                            success: res => {
                                //console.log('compressImage', res.tempFilePath)
                                results.push(res.tempFilePath);
                                resolve(res.tempFilePath);
                            },
                            fail: (err) => {
                                //console.log(err.errMsg);
                                reject(err);
                            },
                            complete: () => {
                                //uni.hideLoading();
                            }
                        })
                        // #endif
                        // #ifdef H5
                        this.canvasDataURL(item, {
                            quality: this.quality / 100
                        }, (base64Codes) => {
                            //this.imgUpload(base64Codes);
                            results.push(base64Codes);
                            resolve(base64Codes);
                        })
                        // #endif
                    }))
                })
                Promise.all(compressImgs) //执行所有需请求的接口
                    .then((results) => {
                        uni.hideLoading();
                        //console.log('imgCompress', type)
                        this.imgUpload(results, type);
                    })
                    .catch((res, object) => {
                        uni.hideLoading();
                    });
            },
            imgUpload(tempFilePaths, type) { //type 0 为图片 1为视频
                // if (this.action == '') {
                // 	uni.showToast({
                // 		title: '未配置上传地址',
                // 		icon: 'none',
                // 		duration: 2000
                // 	});
                // 	return false;
                // }
                if (this.action == 'uniCloud') {
                    this.uniCloudUpload(tempFilePaths, type)
                    return
                }
                uni.showLoading({
                    title: '上传中'
                });
                // console.log('imgUpload', tempFilePaths, type)
                let uploadImgs = [];
                tempFilePaths.forEach((item, index) => {
                    uploadImgs.push(new Promise((resolve, reject) => {
                        // if (item.substring(0,7) !== "file://"){
                        // 	item = "file://"+item
                        // }
                        // console.log(index, item, this.name, this.formData, this.headers)
                        const uploadTask = uni.uploadFile({
                            url: this.action, //仅为示例，非真实的接口地址
                            filePath: item,
                            name: this.name,
                            // fileType: type == 1 ? 'video' : 'image', //文件类型，image/video/audio 仅支付宝小程序填
                            formData: this.formData,
                            header: this.headers,
                            success: (uploadFileRes) => {
                                //uni.hideLoading();
                                //console.log(typeof this.uploadSuccess)
                                // console.log('success',uploadFileRes,this.action)
                                if (this.tui.isHtml(uploadFileRes.data)) {
                                    reject('上传出错啦');
                                    this.$emit("uploadFail", '上传出错啦');
                                    return false
                                }
                                uploadFileRes.fileType = type
                                if (typeof this.uploadSuccess == 'function') {

                                    let thisUploadSuccess = this.uploadSuccess(
                                        uploadFileRes)
                                    if (thisUploadSuccess.success) {
                                        let keyName = '';
                                        // #ifndef VUE3
                                        keyName = 'value'
                                        // #endif
                                        // #ifdef VUE3
                                        keyName = 'modelValue'
                                        // #endif
                                        if (this.dataType == 0) {
                                            this[keyName].push(thisUploadSuccess.url)
                                        } else {
                                            this[keyName].push({
                                                type: type,
                                                url: thisUploadSuccess.url,
                                                ...thisUploadSuccess
                                            })
                                        }

                                        //this.$emit("input", this.uploadLists);
                                        // #ifndef VUE3
                                        this.$emit("input", this.uploadLists);
                                        // #endif
                                        // #ifdef VUE3
                                        this.$emit("update:modelValue", this
                                            .uploadLists);
                                        // #endif
                                    }
                                }
                                resolve(uploadFileRes);
                                this.$emit("uploadSuccess", uploadFileRes);
                            },
                            fail: (err) => {
                                console.log(err);
                                //uni.hideLoading();
                                reject(err);
                                this.$emit("uploadFail", err);
                            },
                            complete: () => {
                                //uni.hideLoading();
                            }
                        });
                    }))
                })
                Promise.all(uploadImgs) //执行所有需请求的接口
                    .then((results) => {
                        uni.hideLoading();
                    })
                    .catch((res, object) => {
                        uni.hideLoading();
                        this.$emit("uploadFail", res);
                    });
                // uploadTask.onProgressUpdate((res) => {
                // 	//console.log('',)
                // 	uni.showLoading({
                // 		title: '上传中' + res.progress + '%'
                // 	});
                // 	if (res.progress == 100) {
                // 		uni.hideLoading();
                // 	}
                // });
            },
            uniCloudUpload(tempFilePaths, type) {
                uni.showLoading({
                    title: '上传中'
                });
                console.log('uniCloudUpload', tempFilePaths);
                let uploadImgs = [];
                tempFilePaths.forEach((item, index) => {
                    uploadImgs.push(new Promise((resolve, reject) => {

                        uniCloud.uploadFile({
                            filePath: item,
                            cloudPath: this.guid() + '.' + this.getFileType(item, type),
                            success(uploadFileRes) {
                                if (uploadFileRes.success) {
                                    resolve(uploadFileRes.fileID);
                                }
                            },
                            fail(err) {
                                console.log(err);
                                reject(err);
                            },
                            complete() {}
                        });

                    }))
                })
                Promise.all(uploadImgs) //执行所有需请求的接口
                    .then((results) => {
                        uni.hideLoading();
                        // console.log('then', results)

                        uniCloud.getTempFileURL({
                            fileList: results,
                            success: (res) => {
                                //console.log('success',res.fileList)
                                res.fileList.forEach(item => {
                                    //console.log(item.tempFileURL)
                                    //this.value.push(item.tempFileURL)
                                    // #ifndef VUE3
                                    this.value.push(item.tempFileURL)
                                    // #endif
                                    // #ifdef VUE3
                                    this.modelValue.push(item.tempFileURL)
                                    // #endif
                                })
                            },
                            fail() {},
                            complete() {}
                        });
                    })
                    .catch((res, object) => {
                        uni.hideLoading();
                    });
            },
            getFileType(path, type) { //手机端默认图片为jpg 视频为mp4
                // #ifdef H5 
                var result = type == 0 ? 'jpg' : 'mp4';
                // #endif


                // #ifndef H5
                var result = path.split('.').pop().toLowerCase();
                // #ifdef MP 
                if (this.compress) { //微信小程序压缩完没有后缀
                    result = type == 0 ? 'jpg' : 'mp4';
                }
                // #endif
                // #endif
                return result;
            },
            guid() {
                return 'xxxxxxxx-date-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                }).replace(/date/g, function(c) {
                    return Date.parse(new Date());
                });
            },
            canvasDataURL(path, obj, callback) {
                var img = new Image();
                img.src = path;
                img.onload = function() {
                    var that = this;
                    // 默认按比例压缩
                    var w = that.width,
                        h = that.height,
                        scale = w / h;
                    w = obj.width || w;
                    h = obj.height || (w / scale);
                    var quality = 0.8; // 默认图片质量为0.8
                    //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 创建属性节点
                    var anw = document.createAttribute("width");
                    anw.nodeValue = w;
                    var anh = document.createAttribute("height");
                    anh.nodeValue = h;
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);
                    ctx.drawImage(that, 0, 0, w, h);
                    // 图像质量
                    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                        quality = obj.quality;
                    }
                    // quality值越小，所绘制出的图像越模糊
                    var base64 = canvas.toDataURL('image/jpeg', quality);
                    // 回调函数返回base64的值
                    callback(base64);
                }
            },
        }
    }
</script>

<style>
    .preview-full {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1002;
    }

    .preview-full video {
        width: 100%;
        height: 100%;
        z-index: 1002;
    }

    .preview-full-close {
        position: fixed;
        right: 32rpx;
        top: 25rpx;
        width: 80rpx;
        height: 80rpx;
        line-height: 60rpx;
        text-align: center;
        z-index: 1003;
        /* 	background-color: #808080; */
        color: #fff;
        font-size: 65rpx;
        font-weight: bold;
        text-shadow: 1px 2px 5px rgb(0 0 0);
    }



    /* .preview-full-close-before,
	.preview-full-close-after {
		position: absolute;
		top: 50%;
		left: 50%;
		content: '';
		height: 60rpx;
		margin-top: -30rpx;
		width: 6rpx;
		margin-left: -3rpx;
		background-color: #FFFFFF;
		z-index: 20000;
	}

	.preview-full-close-before {
		transform: rotate(45deg);

	}

	.preview-full-close-after {
		transform: rotate(-45deg);

	} */

    .wsf-upload-list {
        display: flex;
        flex-wrap: wrap;
    }

    .wsf-upload-Item {
        width: 160rpx;
        height: 160rpx;
        margin: 13rpx;
        border-radius: 10rpx;
        position: relative;
    }

    .wsf-upload-Item image {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
    }

    .wsf-upload-Item-video {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
        position: relative;

    }

    .wsf-upload-Item-video-fixed {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
        z-index: 996;

    }

    .wsf-upload-Item video {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;

    }

    .wsf-upload-Item-add {
        font-size: 105rpx;
        line-height: 160rpx;
        text-align: center;
        border: 1px dashed #d9d9d9;
        color: #d9d9d9;
    }

    .wsf-upload-Item-del {
        background-color: #f5222d;
        font-size: 24rpx;
        position: absolute;
        width: 35rpx;
        height: 35rpx;
        line-height: 35rpx;
        text-align: center;
        top: 0;
        right: 0;
        z-index: 997;
        color: #fff;
    }

    .wsf-upload-Item-capital {
        background-color: #0A98D5;
        font-size: 24rpx;
        position: absolute;
        // width: 35rpx;
        padding: 4rpx;
        height: 35rpx;
        line-height: 35rpx;
        text-align: center;
        bottom: 0;
        right: 0;
        z-index: 997;
        color: #fff;
    }

    .cover-active {
        background-color: #1AAD19;
    }

    .wsf-upload-Item-del-cover {
        background-color: #f5222d;
        font-size: 24rpx;
        position: absolute;
        width: 35rpx;
        height: 35rpx;
        text-align: center;
        top: 0;
        right: 0;
        color: #fff;
        /* #ifdef APP-PLUS */
        line-height: 25rpx;
        /* #endif */
        /* #ifndef APP-PLUS */
        line-height: 35rpx;
        /* #endif */
        z-index: 997;

    }

    .wsf-upload-Item-capital-cover {
        background-color: #0A98D5;
        font-size: 24rpx;
        position: absolute;
        // width: 35rpx;
        padding: 4rpx;
        height: 35rpx;
        text-align: center;
        bottom: 0;
        right: 0;
        color: #fff;
        /* #ifdef APP-PLUS */
        line-height: 25rpx;
        /* #endif */
        /* #ifndef APP-PLUS */
        line-height: 35rpx;
        /* #endif */
        z-index: 997;

    }

    .wsf-upload-Item-video-app-poster {
        width: 100%;
        height: 100%;
    }
</style>
<style scoped>
    img,
    .uni-uploader__img {
        /* background-image:url('@/static/images/photo/default.png')); */
        background: #f2f2f2 url('@/static/images/photo/default_img.png') top left no-repeat;
    }
</style>
