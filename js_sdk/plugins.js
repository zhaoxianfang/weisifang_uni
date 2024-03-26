// 组件合集
// https://ext.dcloud.net.cn/publisher?id=114807

import baBeep from '@/js_sdk/plugins/baBeep.js'
import baNotify from '@/js_sdk/plugins/baNotify.js'
import baKeepAliveSuit from '@/js_sdk/plugins/baKeepAliveSuit.js'
import baFilePicker from '@/js_sdk/plugins/baFilePicker.js'
import baMediaUtil from '@/js_sdk/plugins/baMediaUtil.js'
import baSqlite from '@/js_sdk/plugins/baSqlite.js'
import baPictureSelector from '@/js_sdk/plugins/baPictureSelector.js'

// import baFloatWinStat from '@/js_sdk/plugins/baFloatWinStat.js'
// import baMediaPicker from '@/js_sdk/plugins/baMediaPicker.js'
// import baChangeIcon from '@/js_sdk/plugins/baChangeIcon.js'
// import baIdCode from '@/js_sdk/plugins/baIdCode.js'
import baLocation from '@/js_sdk/plugins/baLocation.js'
// import baScanner from '@/js_sdk/plugins/baScanner.js'
// import baGray from '@/js_sdk/plugins/baGray.js'
import baBroadcast from '@/js_sdk/plugins/baBroadcast.js'
// import baAppWidget from '@/js_sdk/plugins/baAppWidget.js'
// import baVideoPip from '@/js_sdk/plugins/baVideoPip.js'

const plugins = {
    beep: baBeep,
    // changeIcon: baChangeIcon,
    // idCode: baIdCode,
    location: baLocation,
    notify: baNotify,
    keepAliveSuit: baKeepAliveSuit,
    filePicker: baFilePicker,
    mediaUtil: baMediaUtil,
    sqlite: baSqlite,
    pictureSelector: baPictureSelector,

    // floatWinStat: baFloatWinStat,
    // mediaPicker: baMediaPicker,
    // scanner: baScanner,
    // gray: baGray,
    broadcast: baBroadcast,
    // appWidget: baAppWidget,
    // videoPip: baVideoPip
}
export default plugins