import App from './App'
import store from './store'
import tui from './common/httpRequest'
import helper from './js_sdk/helper'
// #ifdef APP-PLUS
import plugins from './js_sdk/plugins'
// #endif
// API 封装
import api from './api'
import propsConfig from './components/thorui/tui-config/index.js'
// #ifdef H5
window.QQmap = null;
// #endif

//全局组件配置
uni.$tui = propsConfig

// #ifndef MP-TOUTIAO
//网络监听
setTimeout(() => {
    uni.onNetworkStatusChange(function(res) {
        //console.log(res.networkType);
        store.commit("networkChange", {
            isConnected: res.isConnected
        })
    });
}, 100)
// #endif

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
Vue.prototype.tui = tui
Vue.prototype.$store = store

Vue.prototype.helper = helper
// #ifdef APP-PLUS
Vue.prototype.plugins = plugins // 插件合集
// #endif
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
    createSSRApp
} from 'vue'
export function createApp() {
    const app = createSSRApp(App)
    app.use(store)
    app.config.globalProperties.tui = tui;
    return {
        app
    }
}
// #endif