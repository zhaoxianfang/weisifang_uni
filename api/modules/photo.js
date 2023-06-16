import fetch from '@/common/httpRequest'

/* 相册列表 */
var apiList = {
    // 获取我的相册列表
    get_photo_list() {
        return fetch.request('photo/list', "POST", {})
    },
    // 新建相册
    create_photos(data) {
        return fetch.request('photo/create', "POST", data)
    },
    // 修改相册名称
    edit_photos(id, data) {
        return fetch.request('photo/update/' + id, "POST", data)
    },
    // 删除单张相片
    del_photo_item(id) {
        return fetch.request('photo/items/delete/' + id, "POST", {})
    },
    get_photo_item_list(id, data) {
        return fetch.request('photo/items/list/' + id, "POST", data || {})
    },
    set_cover_img(photo_id, item_id) {
        return fetch.request('photo/cover/' + photo_id + '/' + item_id, "POST", {})
    },
}

// 默认全部导入
export default apiList
