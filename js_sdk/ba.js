// ba 组件合集
// https://ext.dcloud.net.cn/publisher?id=114807

import baBeep from '@/js_sdk/ba/baBeep.js'
import baNotify from '@/js_sdk/ba/baNotify.js'
import baFloatWinStat from '@/js_sdk/ba/baFloatWinStat.js'
import baKeepAliveSuit from '@/js_sdk/ba/baKeepAliveSuit.js'
import baFilePicker from '@/js_sdk/ba/baFilePicker.js'
import baMediaUtil from '@/js_sdk/ba/baMediaUtil.js'
import baSqlite from '@/js_sdk/ba/baSqlite.js'
import baPictureSelector from '@/js_sdk/ba/baPictureSelector.js'

// import baMediaPicker from '@/js_sdk/ba/baMediaPicker.js'
// import baChangeIcon from '@/js_sdk/ba/baChangeIcon.js'
// import baIdCode from '@/js_sdk/ba/baIdCode.js'
// import baLocation from '@/js_sdk/ba/baLocation.js'
// import baScanner from '@/js_sdk/ba/baScanner.js'
// import baGray from '@/js_sdk/ba/baGray.js'
// import baBroadcast from '@/js_sdk/ba/baBroadcast.js'
// import baAppWidget from '@/js_sdk/ba/baAppWidget.js'
// import baVideoPip from '@/js_sdk/ba/baVideoPip.js'

const ba = {
    beep: baBeep,
    // changeIcon: baChangeIcon,
    // idCode: baIdCode,
    // location: baLocation,
    notify: baNotify,
    floatWinStat: baFloatWinStat,
    keepAliveSuit: baKeepAliveSuit,
    filePicker: baFilePicker,
    mediaUtil: baMediaUtil,
    sqlite: baSqlite,
    pictureSelector: baPictureSelector,

    // mediaPicker: baMediaPicker,
    // scanner: baScanner,
    // gray: baGray,
    // broadcast: baBroadcast,
    // appWidget: baAppWidget,
    // videoPip: baVideoPip
}
export default ba