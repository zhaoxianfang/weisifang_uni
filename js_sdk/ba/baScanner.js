// 扫码原生插件
// https://ext.dcloud.net.cn/plugin?id=9974

// #ifdef APP-PLUS
const scanner = uni.requireNativePlugin('Ba-Scanner')
const beep = uni.requireNativePlugin('Ba-Beep')
let defaultOpt = {
    //barcodeFormats: ["QR Code"],// 设置扫码格式，支持多个，默认所有。如：["QR Code", "Code 128"]
    isShowVibrate: true, // 扫描完成震动
    isShowBeep: true, // 扫描完成声音  自带一个提示音，但是 如果需要 识别回调之后 在根据是否识别成功来判断就需要 使用 ba-beep 进行提示音
    isShowPhotoAlbum: true, // 是否显示相册
    isShowLightController: true, //是否显示闪光灯开关
    zoom: true, // 是否支持手势缩放
    scanColor: '#00FF00', //扫描线的颜色
    hintText: '扫二维码/条形码', //提示文案
    hintTextColor: '#00FF00', //提示文案颜色
    hintTextSize: 14, //提示文案字体大小
    scanGrid: false, // 扫描线是否为网格线
    isContinuous: false, //是否开启连续扫描
    scanTimeSpace: 2000, // 连续扫描时间间隔，单位毫秒，默认 1000
    isShowToast: true, //扫码成功是否 toast 提示，默认 true
}
import helper from '../weisifang/helper.js'
// #endif

const baScanner = {
    scan: (opts = {}, callFun, tipText = '扫二维码/条形码') => {
        // 是否回调识别
        let needCallback = false;
        if (typeof callFun === "function") {
            needCallback = true;
        }
        var options = Object.assign({}, defaultOpt, opts)
        options.isShowBeep = !needCallback;
        scanner.onScan(options, (ret) => {
            if (ret.result) {
                if (needCallback) {
                    let callStatus = callFun(ret.result)
                    // 只要返回的结果 callStatus 不是 false ,都视为成功
                    if (callStatus != false) {
                        beep.play({
                            beepName: 'beep'
                        }, (res) => {});
                    } else {
                        beep.play({
                            beepName: 'error'
                        }, (res) => {});
                    }
                }
            }
        });
    }
}
export default baScanner
