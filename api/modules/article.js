import fetch from '@/common/httpRequest'

/* 文章相关接口 */
var article = {
    // 首页顶部导航 top_nav
    home_top_nav() {
        return fetch.request(`app/home/top_nav`, "GET", {})
    },
    // 某个分类下的文章列表
    list(data) {
        return fetch.request(`article/list`, "GET", {
            classify_id: data.classify_id || 0,
            page: data.page || 1,
            limit: data.limit || 15
        })
    },
    // 文章详情
    detail(id) {
        return fetch.request(`article/${id}/detail`, "GET", {})
    }
}

// 默认全部导入
export default article