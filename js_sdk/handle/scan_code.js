// 扫码相关的
import helper from '@/js_sdk/helper.js'
const scanCode = {
    // 扫码
    scan(onlyCamera = false) {
        var _this = this;
        // 调起条码扫描
        // 连续扫码
        if (helper.plugins.scanner) {
            helper.plugins.scanner.scan({
                isContinuous: false
            }, (res) => {
                _this.autoParseUrl(res)
            })
        } else {
            // baScanView 扫码组件板
            uni.navigateTo({
                url: '/pages/common/plugins/baScanView'
            })
        }
    },
    autoParseUrl(url) {
        // if (this.checkIsOnlineFile(url,'video')) {
        //     return this.playVideo(url);
        // }
        if (this.checkIsOnlineFile(url)) {
            return this.previewFileHandle(url)
        }
        if (this.checkIsUrl(url)) {
            return this.urlHandle(url)
        }
        return this.textHandle(url)

    },
    // 检查是否为url
    checkIsUrl(str) {
        var v = new RegExp(
            '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
            'i');
        return v.test(str);
    },
    /**
     * 检查是否为可读文件
     * @url 链接/文件地址
     * @checkType 检查是否为指定类型 支持 img、video、pdf、audio、office、pdf_office
     */
    checkIsOnlineFile(url, checkType='') {
        var index = url.lastIndexOf('.') // 获取指定字符串最后一次出现的位置，返回index
        if (index < 0) {
            return false;
        }
        var ext = url.substr(index + 1, 4); // substr(start, length) 抽取从start下标开始的length个字符，返回新的字符串
        let isImages = ['png', 'png?', 'jpg', 'jpg?', 'jpeg', 'bmp', 'bmp?', 'gif', 'gif?', 'webp', 'psd', 'psd?',
            'svg', 'svg?', 'tiff'
        ].indexOf(ext.toLowerCase()) !== -1;
        let isVideo = ['mp4', 'mp4?', 'avi', 'avi?', 'mov', 'mov?', 'rmvb', 'rm', 'flv', 'flv?', 'wmv', 'wmv?']
            .indexOf(ext.toLowerCase()) !== -1;
        let isPdf = ['pdf', 'pdf?'].indexOf(ext.toLowerCase()) !== -1;
        let isAudio = ['mp3', 'mp3?'].indexOf(ext.toLowerCase()) !== -1; // 音频
        let isOffice = ['wps', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'ppt', 'pptx', 'txt', 'properties', 'log',
            'ini', 'lua', 'conf', 'm', 'cpp', 'java', 'h', 'xml', 'html', 'htm'
        ].indexOf(ext.toLowerCase()) !== -1;
        if(checkType){
            var typeMap = {
                'img':isImages,
                'video':isVideo,
                'pdf':isPdf,
                'audio':isAudio,
                'office':isOffice,
                'pdf_office':isPdf || isOffice
            }
            if (typeMap.hasOwnProperty(checkType)) { 
                return typeMap[checkType];
            }
            return false;
            
        }
        return isImages || isVideo || isPdf || isAudio || isOffice
    },
    // url 操作
    urlHandle(url) {
        uni.navigateTo({
            url: '/pages/common/webview/webview?url=' + encodeURI(url)
        })
    },
    textHandle(text) {
        uni.navigateTo({
            url: '/pages/common/msg/msg?text=' + text
        })
    },
    // 视频操作
    playVideo(url){
        uni.navigateTo({
            url: '/pages/common/plugins/videoPlayer?url=' + encodeURI(url)
        })
    },
    // 预览文件 操作
    previewFileHandle(url) {
        helper.files.preview(url, '预览')
    },
}
export default scanCode