HBuiderX 设置

## 默认值

```
{
    // 配置本机jre安装路径，语法提示功能依赖此配置
    // 官方下载地址：http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html
    // 示例: 'C:\\Program Files\\Java\\jre1.8.0_111\\bin'
    // 配置完毕后，由于语法提示插件需要初始化和加载，可能需要几分钟时间
    "jre.path": "",

    // adb的路径，为空为默认adb
    "adb.path": "",

    // Android模拟器端口
    "android.simulator.port": "26944",

    // node启动内存参数
    "node.run.memoryParam": "2048",

    // 最多允许启动终端数量，由于终端比较占用资源，开启过多终端可能会导致崩溃
    "terminal.maxcount": "8",

    // 皮肤样式
    "editor.colorScheme": "Default",

    // 编辑器字体大小，单位像素。
    "editor.fontSize": 16,

    // 编辑器字体样式，值域为英文
    "editor.fontFamily": "Menlo",

    // 编辑器字体样式，值域为中文
    "editor.fontFmyCHS": "华文细黑",

    // 编辑器行高比例
    "editor.lineHeight": "1.2",

    // 选中相同词高亮，仅在选择一个完整的单词时生效
    "editor.onlyHighlightWord": false,

    // 按 'Tab' 时插入空格。值为true时，按下Tab键插入制表符宽度editor.tabSize值对应个数的空格。
    "editor.insertSpaces": false,

    // 是否自动换行。当值为true时，启用自动换行。
    "editor.wordWrap": false,

    // 设置默认换行策略。
    "editor.wordWrapMode": "char",

    // 控制光标的宽度。取值范围为1~3，按数字大小依次变粗。
    "editor.caretWidth": 2,

    // 是否显示换行符。当值为true时显示行尾的回车符
    "editor.showEndOfLine": false,

    // 执行文字相关的导航或操作时将用作文字分隔符的字符
    "editor.wordSeparators": "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",

    // 一个制表符（tab）等于的空格数
    "editor.tabSize": 4,

    // 编辑器鼠标插入多光标键盘修饰键
    "editor.multiCursorModifier": "command",

    // 通过使用鼠标滚轮同时按住 Command 可缩放编辑器的字体
    "editor.mouseWheelZoom": false,

    // 智能猜测tab的空格数，为false时将采用配置里面的editor.tabSize的值，修改此项后需重新打开文件
    "editor.guessIndent": true,

    // 编辑器滚动到文末后，是否可以继续滚动一定区域。值为true时，仍然可以向下滚动一定区域
    "editor.scrollBeyondLastLine": true,

    // 应用代码提示中某一项的快捷选择方式
    "editor.contentAssistSelectionMode": "Alt+数字模式",

    // %settings.editor.hover.assist.desc%
    "editor.hover.assist": true,

    // 应用代码折叠展开的方式
    "editor.foldedCodeExpandMode": "部分展开",

    // 代码折叠时是否保留最后一行
    "editor.showLastLineWhenFolded": false,

    // 控制是否在编辑器失去焦点时自动保存。当值为true时，编辑器在失去焦点时自动保存当前内容
    "editor.saveOnFocusLost": false,

    // 设置默认换行符
    "editor.showDefaultEndOfLine": "\\n",

    // 保存文件时是否自动格式化,值为true时才会生效
    "editor.formatOnSave": false,

    // 是否激活代码助手。当值为true时，键入代码才会提示联想内容
    "editor.codeassist": true,

    // Tab键自动插入代码助手选中项
    "editor.codeassistKeyTab": false,

    // 代码助手字体大小
    "editor.codeassistFontSize": 12,

    // 代码助手触发字符
    "editor.triggerChars": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz._$#@",

    // 代码助手计算超时时间(单位毫秒)
    "editor.codeassist.timeout": 5000,

    // 启用px转rem提示
    "editor.codeassist.px2rem.enabel": true,

    // px转rem比例, 1(rem)=比例值(px)
    "editor.codeassist.px2rem.proportion": "16",

    // rem小数部分保留长度
    "editor.codeassist.px2rem.decimalLength": 6,

    // 启用px转upx提示, uni-app项目生效
    "editor.codeassist.px2upx.enabel": true,

    // px转upx比例, 1(upx)=比例值(px),比例计算方法为：设计稿基准宽度除以750
    "editor.codeassist.px2upx.proportion": "1",

    // upx小数部分保留长度
    "editor.codeassist.px2upx.decimalLength": 2,

    // 启用自动匹配字符功能
    "editor.matchesChars.enable": true,

    // 自动配对的匹配字符。光标位于如下字符时，自动高亮对应的闭合字符，注意:在json源码视图中修改时，双引号需转义为反斜杠+双引号
    "editor.matchesChars": "{}()''\"\"[]",

    // 执行双击选中单词或者单词跳转时将根据此处配置的字符匹配
    "editor.wordChars": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$",

    // 是否高亮时显示空白字符
    "editor.renderWhitespace": true,

    // 是否启用editorconfig支持
    "editor.editorConfigSupport": true,

    // 是否显示代码缩进对齐线
    "editor.viewIndentationGuides": true,

    // 是否显示行宽指示线
    "editor.longLineIndicator": false,

    // 行宽指示线显示在第几列
    "editor.longLineIndicatorColumn": 80,

    // 是否显示迷你地图
    "editor.minimap.enabled": true,

    // 迷你地图最大宽度，单位：像素
    "editor.minimap.maxPixelWidth": 100,

    // 是否开启滚动条悬停预览
    "editor.scrollbarHoverPreview.enabled": true,

    // 是否开启保存折叠状态
    "editor.saveFoldStatus.enabled": false,

    // 项目管理器字体大小
    "explorer.fontSize": "",

    // 打开文件时，在资源管理器同时展开至该文件的策略
    // 支持设置：default（单项目时自动关联）、never（从不关联）、always（总是关联）
    "explorer.fileReveal.policy": "default",

    // 是否显示已关闭工程
    "explorer.showClosedProject": true,

    // 项目管理器图标主题
    "explorer.iconTheme": "hx-file-icons",

    // 项目管理器单击展开
    "explorer.expandsOnClick": true,

    // 项目管理器单击文件夹触发资源管理器视图
    "explorer.folder.openExplorerViewOnClick": false,

    // 自动上报崩溃日志
    "logInfo.auto.reportCrash": true,

    // 更新设置
    "software.update.settings": "default",

    // 中文标点符号免干扰配置，撤销（Command+z）可还原成原来的字符
    "editor.autoHandoffChinesePunctuation": {
        // 语言类型：语言名称（点击编辑器右下角可见）或id，可配置多个，用“,”（逗号）号隔开
        "html,html_es6,xml,vue,wxml,ux,nml,php,asp,ejs": {
            // 是否开启
            "enable": true,

            // 需要转义的中文标点符号
            "characters": "：“”；‘’，。《》【】！￥（）、"
        },
        "css,nss,less,scss,sass,stylus": {
            "enable": true,
            "characters": "：“”；‘’，。》【】！￥（）、"
        },
        "javascript,javascript_es6,njs,typescript,javascriptreact,typescriptreact,actionscript,coffeescript": {
            "enable": true,
            "characters": "：“”；‘’，。《》？【】！￥（）、"
        },
        "json": {
            "enable": true,
            "characters": "：“”‘’，【】"
        }
    },

    // 配置语言关联(如: '*.htm': 'html')
    // 可配置的语言类型点击编辑器右下角可见，此处填入相应名称即可
    "files.associations": {},

    // 配置项目管理器不显示的文件和文件夹，每个规则以半角逗号分隔
    "files.exclude": "**/.git,**/.svn,**/.hg,**/CVS,**/.DS_Store,.settings,.project,.HBuilder",

    // 默认不搜索的文件夹，每个规则以半角逗号分隔
    "dir.exclude": ".git,.cvs,.svn,node_modules,unpackage",

    // 文件本地历史记录：单个文件最大记录数量
    "localHistory.file.maxBackupCount": 50,

    // 文件本地历史记录：单个文件大小限制，单位KB
    "localHistory.file.maxBackupSize": 1024,

    // 文件本地历史记录：单个文件最长天数
    "localHistory.file.maxBackupDays": 7,

    // 浏览器路径配置。有自动检测，检测不到或不准时可手动配置
    "browsers.config": {
        "Chrome.path": "",
        "Firefox.path": ""
    },

    // 内置web服务器端口
    "builtin.web.server.port": "8848",

    // Web服务器配置，url：Web服务器的url，可为ip、端口或者域名，例：http://127.0.0.1:8080；appendProjectName：url后面是否追加项目名称，true表示追加，例：http://127.0.0.1:8080/项目名称/index.html
    // HBuilderX自带HTML的web服务器，如需配置php等三方web服务器请修改此配置
    "webServer.config": {
        "url": "",
        "appendProjectName": true
    },

    // 微信开发者工具安装路径配置
    "weApp.devTools.path": "",

    // 真机运行时打开调试视图
    "view.remoteDebug.openOnRunDevice": false,

    // 云函数本地运行超时
    "cloud.runinlocal.timeout": 10,

    // node运行终端类型
    "terminal.type": "",

    // npm路径
    "npm.path": "",

    // node路径
    "node.path": "",

    // 插件获取文件列表超时时间(毫秒)
    "query.timeout": "60000",

    // 自定义UI主题，可拷贝相关行到右边编辑区更改颜色值
    // 详情参考：https://hx.dcloud.net.cn/Tutorial/themes?id=%e8%87%aa%e5%ae%9a%e4%b9%89%e4%b8%bb%e9%a2%98
    //"workbench.colorCustomizations": {
    //    "[Default]": {// 绿柔
    //        "sideBar.background":"#faf6e6", // 项目管理器背景颜色
    //        "editor.background":"#faf6e6" // 编辑区域背景颜色
    //    },
    //    "[Monokai]": {// 酷黑
    //        "toolBar.background": "#272822", // 工具栏背景色设为黑色
    //        "sideBar.background":"#272822"
    //    },
    //    "[Atom One Dark]": {// 雅蓝
    //        "sideBar.background": "#282c34",
    //        "editor.background":"#282c3f" //
    //    }
    //}

    // 自定义编辑器主题，可拷贝相关行到右边编辑区更改颜色值
    // 详情参考：https://hx.dcloud.net.cn/Tutorial/themes?id=%e8%87%aa%e5%ae%9a%e4%b9%89%e4%b8%bb%e9%a2%98
    // "editor.tokenColorCustomizations": {
    //     "[Default]": {
    //         "rules":[
    //             {
    //                 "scope": "comment",
    //                 "settings": {
    //                     "fontStyle": "italic",
    //                     "foreground": "#248C85"
    //                 }
    //             },
    //             {
    //                 "scope": "punctuation.definition.comment",
    //                 "settings": {
    //                     "fontStyle": "italic",
    //                     "foreground": "#248C85"
    //                 }
    //             }
    //         ]
    //     }
    // },

    // 自定义编辑器文件关联配置，可拷贝到右边编辑区更改
    // "workbench.editorAssociations": [
    //    {
    //        "viewType": "catEdit.catScratch",
    //        "filenamePattern": "*.json"
    //    },
    //    {
    //        "viewType": "builtin",
    //        "filenamePattern": "user.schema.json"
    //    }
    //],


    // JavaScript语言代码助手触发字符
    "javascript.triggerChars" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$.@/",
    // %settings.javascript.check.desc%
    "javascript.validate.enable" : false,
    // TypeScript语言代码助手触发字符
    "typescript.triggerChars" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$.",
    // %settings.typescript.check.desc%
    "typescript.validate.enable" : true,
    // Vue语言代码助手触发字符
    "vue.triggerChars" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$.< #@:&/",
    // HTML语言代码助手触发字符
    "html.triggerChars" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$.< #@&/",
    // CSS语言代码助手触发字符
    "css.triggerChars" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$.#@!-/",
    // JSON语言代码助手触发字符
    "json.triggerChars" : "",
    // 启用Emmet代码提示功能
    "emmet.codeassist" : true
}

```

## 用户设置
```
{
    "editor.codeassistKeyTab": false,
    "editor.colorScheme": "Monokai",
    "editor.formatOnSave": true,
    "editor.insertSpaces": true
}

```