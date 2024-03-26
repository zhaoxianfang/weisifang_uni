// 图片选择插件-新（支持视频、音频） Ba-PictureSelector
// https://ext.dcloud.net.cn/plugin?id=14535

import helper from '@/js_sdk/helper.js'

// #ifdef APP-PLUS
const pictureSelector = uni.requireNativePlugin('Ba-PictureSelector')

let defaultContent = {
    'onlyCamera': false, // 是否仅拍照 默认false
    'mediaType': 0, // 选择媒体类型 0:所有 1:图片 2:视频 3:音频 默认0
    'single': false, // 是否单选 默认false
    'singleBack': false, // 单选模式直接返回 默认 false
    'max': 99, // 多选最大选择数 默认9
    'maxVideo': 1, // 多选最大选择数（视频） 默认1
    'compress': false, // 是否压缩 默认false
    'crop': false, // 是否裁剪 默认false
    'cropScale': 0, // 裁剪比例 0(默认) 1(1:1) 2(3:4) 3(3:2) 4(16:9) 默认0
    'cropRound': false, // 是否裁剪圆形 默认false
    'gif': false, // 是否显示gif图片 默认false
    'language': 0, // 语言 0简体中文 1繁体中文 2英语 3韩语 4德语 5法语 6日语 7越语 8西班牙语 9葡萄牙语 10阿拉伯语 11俄语 默认0
    'slide': true, // 滑动选择 默认true
    'isCamera': true, // 显示拍摄、拍照、录音 默认true
    'isDisplayTimeAxis': false, // 显示资源时间轴 默认false
    'isOriginalControl': true, // 是否开启原图功能 默认false
    'isOpenClickSound': false, // 是否开启点击声音
    'isMaxSelectEnabledMask': true, // 是否显示蒙层(达到最大可选数量，默认false,弹窗提示) 默认false
    'position': 0, // 初始显示第几项（已选择预览时使用）
    // 'selectedList': this.selectedList, //已选择项回显，注意：需传选择回调返回的data数组 默认 []
};
// #endif

const baPictureSelector = {
    //图片、音频、视频
    selectMedia(obj = {}, callbackFun) {
        // 初始化通知内容
        obj = obj || {}
        var currentObj = Object.assign({}, defaultContent, obj)
        pictureSelector.selectPicture(currentObj, (ret) => { //回调参数
            if (ret.data) {
                callbackFun && callbackFun(ret.data)
                // ret.data.forEach(item => {
                //     //文件名： item.fileName
                //     //初始路径： item.path
                //     //绝对路径： item.realPath
                //     //是否压缩： item.compressed
                //     //压缩文件路径： item.compressPath
                //     //是否裁剪： item.isCut
                //     //裁剪路径： item.cutPath
                //     //是否开启原图： item.isOriginal
                //     //原图路径： item.originalPath
                //     //视频缩略图： item.videoThumbnailPath
                //     //文件大小： item.size
                //     //文件时长： item.duration
                // })
            } else {
                callbackFun && callbackFun(false)
            }
        });
    },
    //图片
    selectImg(obj = {}, callbackFun) {
        // 初始化通知内容
        obj = obj || {}
        var currentObj = Object.assign({}, defaultContent, obj,{mediaType:1})
        pictureSelector.selectPicture(currentObj, (ret) => { //回调参数
            if (ret.data) {
                callbackFun && callbackFun(ret.data)
                // ret.data.forEach(item => {
                //     //文件名： item.fileName
                //     //初始路径： item.path
                //     //绝对路径： item.realPath
                //     //是否压缩： item.compressed
                //     //压缩文件路径： item.compressPath
                //     //是否裁剪： item.isCut
                //     //裁剪路径： item.cutPath
                //     //是否开启原图： item.isOriginal
                //     //原图路径： item.originalPath
                //     //视频缩略图： item.videoThumbnailPath
                //     //文件大小： item.size
                //     //文件时长： item.duration
                // })
            } else {
                callbackFun && callbackFun(false)
            }
        });
    },
    preview(index) { //已选择项预览
        pictureSelector.preview({
            'position': index, //初始显示第几项
            'selectedList': this.selectedList, //已选择项回显，注意：需传选择回调返回的data数组
        });
    },
}
export default baPictureSelector