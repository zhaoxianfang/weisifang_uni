import fetch from '@/common/httpRequest'

/* 文章相关接口 */
var article = {
    // 文章详情
    detail(id) {
        return fetch.request(`article/${id}/detail`, "POST", {})
    },
    // 文章列表
    list(id) {
        return fetch.request(`article/${id}/detail`, "POST", {})
    },
}

// 默认全部导入
export default article
