// 文件操作相关。例如选择文件等
// #ifdef APP-PLUS
const officeViewModule = uni.requireNativePlugin("Seal-OfficeOnline") // 文件预览
// #endif
import helper from '@/js_sdk/helper.js'
// 离线文件预览插件
const tbs_core_file_url = 'https://weisifang.com/sdk/tbs_core_20210925_release.tbs'
const files = {
    // 选择资源文件 主要是 图片，视频，音频
    selectImgOrVideo(options = {}, callbackFun) {
        // #ifdef APP-PLUS
        // 图片视频选择
        helper.ba.mediaPicker.selectPicture(options, callbackFun)
        // #endif

        // #ifndef APP-PLUS
        uni.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图original还是压缩图compressed，默认二者都有
            // sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res) {
                //注：uni.chooseImage返回的地址为：“file://+路径”格式，需要转一下，如下
                res.real_path = res.tempFilePaths[0].replace("file://", "");
                callbackFun && callbackFun(res)
            },
            fail: function(err) {
                callbackFun && callbackFun(false)
            },
            complete: function(res) {}
        });
        // #endif


    },
    // 选择文件
    selectFiles(options = {}, callbackFun) {
        // #ifdef APP-PLUS
        helper.ba.filePicker.selectFile2(options, callbackFun)
        // #endif

        // #ifndef APP-PLUS
        uni.chooseFile({
            count: opts.maxCount || 9,
            extension: opts.filetypes || ['.zip', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.mp3',
                '.mp4', '.avi', '.mov', '.rmvb', '.rm', '.flv', '.wmv'
            ],
            success: function(res) {
                callbackFun && callbackFun(res)
            },
            fail: function(err) {
                callbackFun && callbackFun(false)
            },
            complete: function(res) {}
        });
        // #endif

    },
    // #ifdef APP-PLUS
    // 创建文件夹 例如：path='_downloads/images' 以"_downloads/"、"_doc/"、"_documents/" 开头
    createDir(path, callback) {
        plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, function(success) {
            success.root.getDirectory(path, {
                create: true
            }, function(entry) {
                callback && callback()
            }, function(e) {
                // console.log('文件夹创建出错')
                plus.nativeUI.toast('文件下载失败')
            })
        })
    },
    /* 根据后缀判断文件类型 */
    getFileType(fileName) {
        let suffix = '' // 后缀获取
        let result = '' // 获取类型结果
        if (fileName) {
            //获取最后一个.的位置
            var index = fileName.lastIndexOf('.')
            //获取后缀
            suffix = fileName.substr(index + 1)
        }

        if (!suffix) return 'other' // fileName无后缀返回false
        suffix = suffix.toLocaleLowerCase() // 将后缀所有字母改为小写方便操作
        // 匹配图片
        const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif'] // 图片格式
        result = imgList.find(item => item === suffix)
        if (result) return 'image'
        // 匹配txt
        const txtList = ['txt']
        result = txtList.find(item => item === suffix)
        if (result) return 'txt'
        // 匹配excel
        const excelList = ['xls', 'xlsx']
        result = excelList.find(item => item === suffix)
        if (result) return 'excel'
        // 匹配word
        const wordList = ['doc', 'docx']
        result = wordList.find(item => item === suffix)
        if (result) return 'word'
        // 匹配pdf
        const pdfList = ['pdf']
        result = pdfList.find(item => item === suffix)
        if (result) return 'pdf'
        // 匹配ppt
        const pptList = ['ppt', 'pptx']
        result = pptList.find(item => item === suffix)
        if (result) return 'ppt'
        // 匹配zip
        const zipList = ['rar', 'zip', '7z']
        result = zipList.find(item => item === suffix)
        if (result) return 'zip'
        // 匹配视频
        const videoList = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v']
        result = videoList.find(item => item === suffix)
        if (result) return 'video'
        // 匹配音频
        const radioList = ['mp3', 'wav', 'wmv']
        result = radioList.find(item => item === suffix)
        if (result) return 'radio'
        // 其他文件类型
        return 'other'
    },
    // 删除文件 例如：relativePath 以"_downloads/"、"_doc/"、"_documents/" 开头
    delFile(relativePath, callback) {
        plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
            entry.remove(function(entry) {
                // console.log('文件删除成功==' + relativePath)
                callback && callback()
            }, function(e) {
                // console.log('文件删除失败=' + relativePath)
                plus.nativeUI.toast('文件删除失败')
            })
        })
    },
    // 文件预览
    preview(url, title = '文件预览') {
        var now = new Date();
        var dd = String(now.getDate()).padStart(2, '0');
        var mm = String(now.getMonth() + 1).padStart(2, '0');
        var yyyy = now.getFullYear();
        let today = yyyy + '-' + mm + '-' + dd;

        var isDeleteFile = false
        if (url.substr(0, 4) == "http") {
            isDeleteFile = true
        }

        // 判断文件类型
        var index = url.lastIndexOf('.'); // 获取指定字符串最后一次出现的位置，返回index
        var ext = url.substr(index + 1, 4); // substr(start, length) 抽取从start下标开始的length个字符，返回新的字符串
        let isImages = ['png', 'png?', 'jpg', 'jpg?', 'jpeg', 'bmp', 'bmp?', 'gif', 'gif?', 'webp', 'psd', 'psd?',
            'svg', 'svg?', 'tiff'
        ].indexOf(ext.toLowerCase()) !== -1;
        let isVideo = ['mp4', 'mp4?', 'avi', 'avi?', 'mov', 'mov?', 'rmvb', 'rm', 'flv', 'flv?', 'wmv', 'wmv?']
            .indexOf(ext.toLowerCase()) !== -1;
        let isPdf = ['pdf', 'pdf?'].indexOf(ext.toLowerCase()) !== -1;
        let isAudio = ['mp3', 'mp3?'].indexOf(ext.toLowerCase()) !== -1; // 音频

        if (isDeleteFile && /[\u4E00-\u9FA5\ ]+/g.test(url)) {
            url = encodeURI(url) // url 中可能包含中文，空格等特殊字符，需要 使用 encodeURI 进行编码转换
        }
        if (isAudio) {
            // 播放音频
            const bgAudioManager = uni.getBackgroundAudioManager();
            bgAudioManager.title = title || '音频';
            bgAudioManager.singer = '暂无';
            bgAudioManager.coverImgUrl = '';
            bgAudioManager.src = url;
            bgAudioManager.play();
            return false
        }
        if (isImages) {
            this.openImage(url, 0)
            return false
        }
        if (isVideo) {
            this.openVideo(url)
            return false
        }

        let waterText = '威四方\n' + today; // 水印文本 例如：你好，世界\n准备好了吗？时刻准备着
        officeViewModule.openFile({
                url: url, // 同时支持在线和本地文档，三种参数传递方式，具体查看文档说明
                isTopBar: true, // 是否显示顶栏，默认为：true（显示）
                title: title || '在线预览', // 顶栏标题，默认为：APP名称
                topBarBgColor: '#3394EC', // 顶栏背景颜色，默认为：#177cb0（靛青）
                isBackArrow: true, // 是否显示返回按钮，默认为：true（显示）
                isDeleteFile: isDeleteFile, // 退出是否删除缓存的文件，默认为true（删除缓存文件）// 会删除文件
                waterMarkText: waterText, // 水印文本
                // 离线文件tbs
                installOfflineCore: true, // 是否离线安装内核
                coreLocalPath: files.tbs_core_url, // 离线安装内核本地路径

                // fileType: 'pdf',
                // fileName: 'example',
                // docRequestHeaders: {
                //   'Authorization': 'Token xxxxxxxx',
                //   'Other': 'other'
                // }, // 文档下载请求头
                topBarAutoHide: false, //顶栏是否自动隐藏，isTopBar=true时生效，IOS端无此配置
            },
            res => {
                // '打开在线文档事件结果：', res
                console.log('打开在线文档事件结果：', res)
            });
    },
    /**
     * 图片预览，支持jpg、jpeg、png、bmp、jpg、gif等多种常用图片格式
     * 图片可以来源于列表或九宫格，传递给imageUrls数组
     * @param {Object} fileUrl 图片url
     * @param {Object} imageCurrentIndex 当前图片位置下标，从0开始
     */
    openImage(fileUrl, imageCurrentIndex) {
        if (fileUrl.substr(0, 4) !== "http") {
            // 预览图片
            return uni.previewImage({
                urls: [fileUrl],
            });
        }
        var isDeleteFile = false
        if (fileUrl.substr(0, 4) == "http") {
            isDeleteFile = true
        }
        let os = plus.os.name;
        console.log(os)
        if ('Android' == os) {
            // Android
            officeViewModule.openFile({
                imageUrls: [fileUrl],
                imageCurrentIndex, // 当前点击图片在imageUrls中的下标，从0开始，默认为0
                imageIndexType: 'number', // 图片底部指示器类型，默认为'dot'，可选：'number':数字；'dot':点
                isDeleteFile: isDeleteFile, // 退出是否删除缓存的文件，默认为true（删除缓存文件）// 会删除文件
                installOfflineCore: true, // 是否离线安装内核
                coreLocalPath: files.tbs_core_url, // 离线安装内核本地路径
            });
        } else if (os === 'iOS') {
            // IOS
            officeViewModule.openFile({
                    url: fileUrl, // 同时支持在线和本地文档，三种参数传递方式，具体查看文档说明
                    title: 'IOS图片预览', // 顶栏标题，默认为：APP名称
                    topBarBgColor: '#3394EC', // 顶栏背景颜色，默认为：#177cb0（靛青）
                    isDeleteFile: isDeleteFile, // 退出是否删除缓存的文件，默认为true（删除缓存文件）// 会删除文件
                    installOfflineCore: true, // 是否离线安装内核
                    coreLocalPath: files.tbs_core_url, // 离线安装内核本地路径
                },
                res => {
                    uni.showModal({
                        content: 'IOS图片预览事件结果：' + JSON.stringify(res)
                    });
                }
            );
        }
    },
    /**
     * 视频播放，支持市面上几乎所有的视频格式，包括mp4, flv, avi, 3gp, webm, ts, ogv, m3u8, asf, wmv, rm, rmvb, mov, mkv等18种视频格式
     * 功能包括：全屏播放、锁屏、分享、画面比例调节、左边上下滑动调节亮度，右边上下滑动调节音量等
     * 支持Android和IOS
     * @param {Object} fileUrl 视频url
     */
    openVideo(fileUrl) {
        var isDeleteFile = false
        if (fileUrl.substr(0, 4) == "http") {
            isDeleteFile = true
        }
        officeViewModule.openFile({
                videoUrl: fileUrl, // 视频在线url，此参数优先于图片预览和文档预览
                isDeleteFile: isDeleteFile, // 退出是否删除缓存的文件，默认为true（删除缓存文件）// 会删除文件
                installOfflineCore: true, // 是否离线安装内核
                coreLocalPath: files.tbs_core_url // 离线安装内核本地路径
            },
            res => {
                uni.showModal({
                    content: '播放视频事件结果：' + JSON.stringify(res)
                });
            }
        );
    },
    // 编辑图片，涂鸦
    editImg() {
        const imageEditor = uni.requireNativePlugin('Ba-ImageEditor')
        //选择图片，本插件自带
        imageEditor.selectImage((ret) => {
            // console.log(ret)
            if (ret.outputPath) {
                let path = ret.outputPath;

                imageEditor.imageEdit({
                        'isShowSticker': true, //是否展示贴图功能，默认为true
                        'path': path, //原始图片路径
                        'outputPath': this.outputPath, //保存图片路径
                    },
                    (ret) => {
                        // console.log(ret)
                        if (ret.outputPath && ret.isImageEdit) {
                            path = ret.outputPath;
                            // console.log(ret, path)
                        }
                    });
            }
        });
    },
    refreshFile(file_path) { //刷新 媒体库文件
        //检查文件是否已存在
        plus.io.resolveLocalFileSystemURL(file_path, function(entry) {
            //如果文件存在 则刷新媒体库
            helper.ba.mediaUtil.refreshFile(file_path)
        }, function(e) {
            //如果文件不存在
            return false
        })
    }
    // #endif
}
export default files