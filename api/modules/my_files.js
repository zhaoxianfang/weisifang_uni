import fetch from '@/common/httpRequest'


/* 系统接口 列表 */
var myFiles = {
    // 文职
    jdwz(data) {
        return fetch.request('docs/jdwz', "GET", data)
    }
}

// 默认全部导入
export default myFiles
