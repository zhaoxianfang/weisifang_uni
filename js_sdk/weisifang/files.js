// 文件操作相关。例如选择文件等
// #ifdef APP-PLUS
const mediaPicker = uni.requireNativePlugin('Ba-MediaPicker') // 图文选择
const filePicker = uni.requireNativePlugin('Ba-FilePicker') // 文件选择
const officeViewModule = uni.requireNativePlugin("Seal-OfficeOnline") // 文件预览
// #endif
import helper from './helper.js'
// 离线文件预览插件
const tbs_core_file_url = 'https://weisifang.com/sdk/tbs_core_20210925_release.tbs'
const files = {
    // 选择资源文件 主要是 图片，视频，音频
    selectImgOrVideo(options = {}, callbackFun) {
        // #ifdef APP-PLUS
        var defautl_options = {
            'onlyCamera': false, // 是否仅拍照
            'mediaType': 0, // 选择媒体类型 0:所有 1:图片 2:视频 3:音频
            'single': false, // 是否单选
            'singleBack': true, // 单选模式直接返回
            'max': 9, // 多选最大选择数
            'maxVideo': 1, // 多选最大选择数（视频）
            'compress': false, // 是否压缩
            'crop': false, // 是否裁剪
            'cropScale': 0, // 裁剪比例 0(默认) 1(1:1) 2(3:4) 3(3:2) 4(16:9)
            'cropRound': false, // 是否裁剪圆形
            'gif': false, // 是否显示gif图片
            'language': 0, // 语言 0简体中文 1繁体中文 2英语 3韩语 4德语 5法语 6日语 7越语 8西班牙语 9葡萄牙语 10阿拉伯语 11俄语
            'slide': true, // 滑动选择
            'isCamera': true, // 显示拍摄、拍照、录音
            'isDisplayTimeAxis': false, // 显示资源时间轴
            'isOriginalControl': true, // 是否开启原图功能
            'isOpenClickSound': true, // 是否开启点击声音
            'isMaxSelectEnabledMask': true, // 是否显示蒙层(达到最大可选数量，默认false,弹窗提示)
            'selectedList': [], //已选择项回显，注意：需传选择回调返回的data数组
            'position': 0, //初始显示第几项（已选择预览时使用）
        }
        var opts = Object.assign({}, defautl_options, options)
        // 图片视频选择
        mediaPicker.selectPicture(opts, (ret) => { //回调参数
            if (ret.data) {
                if (opts.single) {
                    callbackFun && callbackFun(ret.data[0])
                } else {
                    callbackFun && callbackFun(ret.data)
                }
                // ret.data.forEach(item => {
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
                // })
            } else {
                callbackFun && callbackFun(false)
            }
        });
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
        var defautl_options = {
            'selectType': 2, // 选择类型：默认为0（ 0：浏览文件目录 1：文件分类 2:类型分组）
            'maxCount': 9, // 最大选择数，默认为9
            // 'filetypes': 'doc,docx,ppt,xls,xlsx,zip,mp3,mp4,avi,mov,rmvb,rm,flv,wmv,apk' // 文件类型，多个英文","隔开
            groupTypes: [{ //有默认值，可自定义
                name: "图片",
                fileTypes: ["png", "jpg", "jpeg", "gif"]
            }, {
                name: "视频",
                fileTypes: ["mp4", "avi", "mpeg", "wmv", "rm", "rmvb", "3gp", "mov", "m4v", "dat",
                    "mkv", "flv", "vob"
                ]
            }, {
                name: "音频",
                fileTypes: ["mp3", "ogg", "flac", "wav", "wma", "m4a", "mid", "mka", "mpa", "mpc",
                    "ape", "ofr", "ogg", "mv"
                ]
            }, {
                name: "文档",
                fileTypes: ["log", "txt", "doc", "docx", "xls", "xlsx", "pdf", "ppt", "pptx"]
            }, {
                name: "压缩包",
                fileTypes: ["zip", "rar", "7z"]
            }, {
                name: "应用",
                fileTypes: ["apk", "exe"]
            }],
            strings: { //自定义文本
                barTitle: "文件选择",
                barBtnOk: "确认",
                selectedDialogTitle: "已选文件",
                selectedFileCount: "已选(%1$s/%2$s)",
                searchInputHint: "请输入搜索内容",
                sortDialogTitle: "请选择",
                sortDialogItemMC: "按名称",
                sortDialogItemSJ: "按时间",
                sortDialogItemDX: "按大小",
                sortDialogItemLX: "按类型",
                sortDialogBtnAsc: "升序",
                sortDialogBtnDesc: "降序",
            },
            sortType: 3, //排序类型：默认为0（ 0：名称-升序 1：名称-降序 2:时间-升序 3:时间-降序 4:大小-升序 5:大小-降序 6:类型-升序 7:类型-降序）
        }
        var opts = Object.assign({}, defautl_options, options)

        // #ifdef APP-PLUS
        filePicker.selectFile(opts, (ret) => {
            callbackFun && callbackFun(ret.data)
            // 返回 data 格式
            // name	String	文件名
            // absolutePath	String	文件路径
            // mimeType	String	文件类型
            // size	Number	文件大小（单位B）
            // sizeS	String	文件大小（智能显示）
        });
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

        let waterText = '威四方\n' + today;
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
            console.log(ret)
            if (ret.outputPath) {
                let path = ret.outputPath;

                imageEditor.imageEdit({
                        'isShowSticker': true, //是否展示贴图功能，默认为true
                        'path': path, //原始图片路径
                        'outputPath': this.outputPath, //保存图片路径
                    },
                    (ret) => {
                        console.log(ret)
                        if (ret.outputPath && ret.isImageEdit) {
                            path = ret.outputPath;
                            console.log(ret, path)
                        }
                    });
            }
        });
    }
    // #endif
}
export default files
