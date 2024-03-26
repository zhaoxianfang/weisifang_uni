// 文件选择插件（支持Android11、12） Ba-FilePicker2
// https://ext.dcloud.net.cn/plugin?id=15427

// #ifdef APP-PLUS
const filePicker = uni.requireNativePlugin('Ba-FilePicker2')

import helper from '@/js_sdk/helper.js'
// #endif

const baFilePicker = {
    selectFile(selectType) {
        filePicker.selectFile({
                selectType: 1, // 选择类型：默认为0（ 0：浏览文件目录 1：文件分类 2:类型分组）
                maxCount: 99,
                sortType: 3, // 排序类型：默认为0（ 0：名称-升序 1：名称-降序 2:时间-升序 3:时间-降序 4:大小-升序 5:大小-降序 6:类型-升序 7:类型-降序）
                filetypes: "png, jpg, jpeg, gif"
            },
            (ret) => {
                console.log(ret)
                if (ret.data) {
                    this.selectedList = ret.data;
                }
            });
    },
    selectFile2(options, callbackFun) { // 自定义类型分组
        var defautl_options = {
            selectType: 2, // 选择类型：默认为0（ 0：浏览文件目录 1：文件分类 2:类型分组）
            maxCount: 9, // 最大选择数，默认为9
            sortType: 3, // 排序类型：默认为0（ 0：名称-升序 1：名称-降序 2:时间-升序 3:时间-降序 4:大小-升序 5:大小-降序 6:类型-升序 7:类型-降序）
            isWxQq: true, // 是否显示微信、QQ文件
            //isWxQqGuide: true, // 是否显示微信、QQ文件的授权引导页
            //isWxQqWeb13: true, // 是否显示微信、QQ文件教程页面
            //urlQq: this.urlQq, // QQ教程网址
            //urlWx: this.urlWx, // 微信教程网址
            // targetDir:'', // 指定目录，本地目录
            // 'filetypes': 'doc,docx,ppt,xls,xlsx,zip,mp3,mp4,avi,mov,rm,flv,wmv,apk' // 文件类型，多个英文","隔开
            groupTypes: [{ //有默认值，可自定义
                name: "图片",
                fileTypes: ["png", "jpg", "jpeg", "gif"]
            }, {
                name: "视频",
                fileTypes: ["mp4", "avi", "mpeg", "wmv", "rm", "3gp", "m4v", "mkv", "mov", "flv"]
            }, {
                name: "音频",
                fileTypes: ["mp3", "ogg", "flac", "wav", "wma", "m4a", "mid", "mka", "mpa", "mpc"]
            }, {
                name: "文档",
                fileTypes: ["txt", "doc", "docx", "xls", "xlsx", "pdf", "ppt", "pptx"]
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
                breadTextRam: "内部存储设备",
                breadTextSd: "SD卡",
                folderDesc: "文件:%1$s  |  文件夹:%2$s",
            },
            sortType: 3, //排序类型：默认为0（ 0：名称-升序 1：名称-降序 2:时间-升序 3:时间-降序 4:大小-升序 5:大小-降序 6:类型-升序 7:类型-降序）
        }
        var opts = Object.assign({}, defautl_options, options)
        filePicker.selectFile(opts, (ret) => {
            callbackFun && callbackFun(ret.data)
            // 返回 data 格式
            // name	String	文件名
            // absolutePath	String	文件路径
            // mimeType	String	文件类型
            // size	Number	文件大小（单位B）
            // sizeS	String	文件大小（智能显示）
        });
    },
    // 显示微信、QQ文件（分组模式）
    selectFileWxQq(selectType) {
        filePicker.selectFile({
                selectType: 2, // 选择类型：默认为0（ 0：浏览文件目录 1：文件分类 2:类型分组）
                maxCount: 99,
                sortType: 3, // 排序类型：默认为0（ 0：名称-升序 1：名称-降序 2:时间-升序 3:时间-降序 4:大小-升序 5:大小-降序 6:类型-升序 7:类型-降序）
                isWxQq: true, // 是否显示微信、QQ文件
                //isWxQqGuide: true, // 是否显示微信、QQ文件的授权引导页
                //isWxQqWeb13: true, // 是否显示微信、QQ文件教程页面
                //urlQq: this.urlQq, // QQ教程网址
                //urlWx: this.urlWx, // 微信教程网址
                // targetDir:'', // 指定目录，本地目录
                groupTypes: [{
                    name: "WORD",
                    fileTypes: ["doc", "docx"]
                }, {
                    name: "EXCEL",
                    fileTypes: ["xls", "xlsx"]
                }, {
                    name: "PPT",
                    fileTypes: ["ppt"]
                }, {
                    name: "其他",
                    fileTypes: ["txt", "pdf", "png", "jpg", "gif"]
                }]
            },
            (ret) => {
                console.log(ret)
                if (ret.data) {
                    this.selectedList = ret.data;
                }
            });
    },
}
export default baFilePicker