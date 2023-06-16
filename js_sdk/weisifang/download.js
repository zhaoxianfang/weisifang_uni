// https://www.html5plus.org/doc/zh_cn/downloader.html#plus.downloader.createDownload
const download = {
    callFun: null, // 下载完成后的回调函数
    // 下载文件 到本应用 的 downloads 文件夹下，
    // loadUrl：文件地址;
    // existAndDel: 如果本地存在此文件，是否删除重新下载
    downloadFile(loadUrl, callFun, existAndDel = false) {
        let that = this
        this.callFun = callFun || null;
        // #ifdef H5
        uni.downloadFile({
            url: loadUrl,
            success: (res) => {
                if (res.statusCode === 200) {
                    console.log('下载成功');
                }
            }
        });
        // #endif
        // #ifdef APP-PLUS
        //图片下载成功 默认保存在本地相对路径的"_downloads"文件夹里面, 如"_downloads/logo.jpg"
        var filename = loadUrl.substring(loadUrl.lastIndexOf('/') + 1, loadUrl.length)
        var download_path_dir = '_downloads/' + this.getFileType(loadUrl)
        var relativePath = download_path_dir + '/' + filename
        // 不管路径怎么样，先走一遍创建文件夹
        this.createDir(download_path_dir, function() {
            //检查图片是否已存在
            plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
                //如果文件存在,则先删除本地图片再重新下载,防止同名文件 或者文件内容被更新
                existAndDel && that.delFile(relativePath, function() {
                    that.setFileFromNet(loadUrl, relativePath)
                })
                let file_local_path = that.setFileFromLocal(relativePath)
            }, function(e) {
                // console.log('图片不存在,联网下载=' + relativePath)
                //如果文件不存在,联网下载图片
                that.setFileFromNet(loadUrl, relativePath)
            })
        })
        // #endif
    },
    // 创建文件夹
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
    // 下载成功后都调用此方法
    setFileFromLocal(relativePath) {
        //获取 SD卡绝对路径
        var sd_path = plus.io.convertLocalFileSystemURL(relativePath)
        // console.log('文件路径', sd_path)
        if (typeof this.callFun === "function") {
            this.callFun(sd_path)
        }
        return sd_path
    },
    /*联网下载图片*/
    // relativePath 参数仅支持 以"_downloads/"、"_doc/"、"_documents/" 开头
    setFileFromNet(loadUrl, relativePath) {
        let that = this
        //创建下载任务
        var dtask = plus.downloader.createDownload(loadUrl, {
            filename: relativePath
        }, function(d, status) {
            if (status === 200) {
                //下载成功
                // console.log('下载成功=' + relativePath)
                that.setFileFromLocal(relativePath, d.filename)
            } else {
                //下载失败,需删除本地临时文件,否则下次进来时会检查到图片已存在
                plus.nativeUI.toast('文件下载失败')
                // console.log('下载失败=' + status + '==' + relativePath)
                //dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
                if (relativePath !== null)
                    that.delFile(relativePath)
            }
        })
        //启动下载任务
        dtask.start()
    },
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
    // 检查下载文件是否存在
    existFile(loadUrl) {
        var filename = loadUrl.substring(loadUrl.lastIndexOf('/') + 1, loadUrl.length)
        var download_path_dir = '_downloads/' + this.getFileType(loadUrl)
        var relativePath = download_path_dir + '/' + filename

        //检查图片是否已存在
        plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
            //如果文件存在,则先删除本地图片再重新下载,防止同名文件 或者文件内容被更新
            return that.setFileFromLocal(relativePath)
        }, function(e) {
            //如果文件不存在
            return false
        })
    }
}
export default download
