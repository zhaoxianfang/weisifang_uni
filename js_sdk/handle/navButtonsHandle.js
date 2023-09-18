import helper from '@/js_sdk/helper.js'
const navButtonsHandle = {
    /**
     * 统一处理顶部标题栏自定义按钮点击事件
     * 识别 uni_code 参数
     */
    handle(e) {
        // console.log(e)
        let uniCode = e.uni_code || ''
        let event = null
        // #ifdef APP-PLUS
        switch (uniCode) {
            case 'scan': // 扫码
                event = helper.scanCode.scan()
                break;
            case 'webview_menu': // webview 顶部菜单
                // 
                break;
            case 'ba_share_receive': // ba 分享/打开文件
                event = helper.scanCode.autoParseUrl(e.file_path)
                break;
            default:
                break;
        }
        // #endif
        // #ifndef APP-PLUS

        // #endif
        return event;
    },
}
export default navButtonsHandle