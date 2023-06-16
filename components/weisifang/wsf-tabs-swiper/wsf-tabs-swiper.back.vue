<template>
    <view>
        <view class="wrap">
            <v-tabs fixed v-model="tabIndex" :tabs="topTabs" @change="tabChange" height="80rpx" fontSize="32rpx"
                padding="4rpx"></v-tabs>

            <swiper class="swiper-box" :current="tabIndex" @change="swiperChange" :duration="300"
                @transition="transition" @animationfinish="animationfinish">
                <swiper-item class="swiper-item" v-for="(swList, swIndex) in swiperData" :key="`swiper-${swIndex}`">
                    <scroll-view scroll-y style="height: 100%;width: 100%;" refresher-enabled
                        :refresher-triggered="swList.refreshing" refresher-background="#fafafa" enable-back-to-top
                        :refresher-threshold="100" :lower-threshold="200" @scrolltolower="loadMore(swIndex)"
                        @refresherrestore="refresherrestore" @refresherrefresh="onRefresh(swIndex)">
                        <!-- 通过插槽传值 当前激活的 tab -->
                        <slot name="tab" :tab="tabs[tabIndex]"></slot>
                        <view v-for="(item, itemIndex) in swList.data" :key="`swiper-item-${itemIndex}`">
                            <!-- 通过插槽传值 -->
                            <slot name="item" :item="item"></slot>
                        </view>
                        <view class="wsf-loading-more" v-if="swList.isLoading || !swList.hasMore">
                            <text class="wsf-loadmore-line" v-if="!swList.hasMore"></text>
                            <text class="wsf-loading-more-text">{{ swList.loadingText }}</text>
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
    import VTabs from '@/components/v-tabs/v-tabs.vue'
    export default {
        name: 'WsfTabSwiper',
        emits: ['loadMore'],
        components: {
            VTabs
        },
        props: {
            // 顶部v-tabs 数据
            tabs: {
                type: Array,
                default () {
                    return []
                }
            },
            // 顶部v-tabs 显示使用 tabs 里面的哪个字段
            tabTitle: {
                type: String,
                default: 'title'
            },
            // 加载当前激活tab 的数据
            list: {
                type: Array,
                default () {
                    return []
                }
            },
            // 新加载进来的数据是否 重叠 覆盖原数据，否表示在现有据后追加 或者加到现有数据前面
            overlap: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            list(val) {
                this.addData(val)
            }
        },
        data() {
            return {
                tabIndex: 0, // 初始激活的 tab index
                topTabs: ['默认'],
                swiperData: [],
                debounceTime: null, // 防抖计时器
                debounceOldArgs: [], // 防抖老参数
                forbidReq: false, // 禁止请求
                handelLoadOrRefreshTabIndex: 0, // 通过手势刷新或者底部滑动得到的 tab index
                hasHandelLoadOrRefresh: false
            }
        },
        created() {
            this.initTabs()
            this.initSwiper()
            this.getList(false, true)
        },
        methods: {
            // 初始化 顶部 tabs 显示的标题数据
            initTabs() {
                if (this.tabs.length < 1) {
                    this.topTabs = ['默认']
                } else {
                    let tabsTitleArr = []
                    for (let index in this.tabs) {
                        this.tabs[index][this.tabTitle] || '未知'
                        tabsTitleArr.push(this.tabs[index][this.tabTitle] || '未知')
                    }
                    this.topTabs = tabsTitleArr
                }
            },
            // 初始化 swiper 数据格式
            initSwiper() {
                let swiper = []
                // 有多少个数据，就初始化多少个 swiper item
                for (let i = 0, length = this.tabs.length; i < length; i++) {
                    let swiperItem = {
                        isLoading: false, // 正在加载数据中
                        loadingText: '正在加载...', // 加载提示信息
                        refreshing: false, // 正在刷新数据中
                        refreshText: '', // 刷新提示信息
                        pageIndex: 0, // 当前tab初始化的页码
                        hasMore: true, // 当前tab 是否有更多数据，如果某次加载后传入的数据为空，就置为false,表示该tab不再加载更多数据
                        data: [] // 展示出来的数据
                    }
                    // 如果传入了默认值，则默认值 list 作为第一页的数据展示
                    if (i === this.tabIndex && this.list.length > 0) {
                        swiperItem.pageIndex = 1
                        swiperItem.data = this.list
                    }
                    swiper.push(swiperItem)
                }
                this.swiperData = swiper
                return swiper
            },
            addData(data) {
                let activeTab = this.swiperData[this.tabIndex]
                if (data === '' || data === undefined || data.length < 1) {
                    activeTab.hasMore = false
                    if (activeTab.isLoading) {
                        activeTab.loadingText = '没有了'
                    } else {
                        activeTab.refreshText = '没有了'
                
   }
                } else {
                    if (activeTab.isLoading) {
                        // 底部加载
                        activeTab.data = activeTab.data.concat(data)
                    } else {
                        // 刷新 直接覆盖数据
                        activeTab.data = data
                    }
                }
                activeTab.isLoading = false
                // activeTab.refreshing = false
                // this.$set(this.swiperData, this.tabIndex, activeTab)

                // 【关键】直接 操作  activeTab.refreshing = false 无法 使 下拉 加载状态 修改为 false ,需要 在 $nextTick 之后才有效
                // this.$nextTick(function() {
                //     activeTab.refreshing = false
                // })
                // 防止 无新数据渲染 手动关闭状态
                activeTab.refreshing = false
            },
            // v-tabs 变化时候
            tabChange(index) {
                this.switchTab(index)
            },
            // 手势滑动swiper的时候
            swiperChange(e) {
                let index = e.target.current || e.detail.current
                if (e.detail.source == 'touch' || e.detail.source == 'autoplay') {
                    this.switchTab(index)
                }
            },
            /*
             * 防抖 函数
       
    * 
             * fn: 回调函数
             * delay：延迟执行时间
             * resOrArgsCallback：回调函数，
             *     会传递三个返回参数(isClear,resFnOrNewArgs,oldArgsOrNull)
             *         isClear:(bool类型，true:有未执行的fn被清除 false:fn已被执行
             *         resFnOrNewArgs: isClear为「true」时表示 最后一次fn的传递参数,isClear为「false」时表示 最后一次fn的执行结果
             *         oldArgsOrNull: isClear为「true」时表示未被执行的fn的传递参数,,isClear为「false」时返回 null
             * immdiate：是否无须等待，立即执行,默认为false
             * 
             * 使用：
             *    立即执行：this.debounce(fn, 400,(isClear,resFnOrNewArgs,oldArgsOrNull) => { ... },true)(params)
             *    正常调用：this.debounce(fn, 400,(isClear,resFnOrNewArgs,oldArgsOrNull) => { ... })(params)
             *    取消执行 ：let debounceChange = this.debounce(...)(params); debounceChange.cancel()
             */
            debounce(fn, delay, resOrArgsCallback, immdiate = false) {
                var _this = this
                let isInvoke = false

                function _debounce(...arg) {
                    if (_this.debounceTime) {
                        clearTimeout(_this.debounceTime)
                        if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(true, arg,
                            _this
                            .debounceOldArgs)
                    }
                    setTimeout(() => {
                        _this.debounceOldArgs = arg
                    }, 80)
                    if (immdiate && !isInvoke) {
                        const result = fn.apply(this, arg)
                        if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(false,
                            result, null)
                        isInvoke = true
                    } else {
                        _this.debounceTime = setTimeout(() => {
                            const result = fn.apply(this, arg)
                            if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(
                                false, result,
                                null)
                            isInvoke = false
                            _this.debounceTime = null
                        }, delay)
                    }
                }
                _debounce.cancel = function() {
                    if (_this.debounceTime) clearTimeout(_this.debounceTime)
                    _this.debounceTime = null
                    isInvoke = false
                }

                return _debounce
            },
            switchTab(index) {
                this.tabIndex = index
                let activeTab = this.swiperData[index]
                // 关闭之前的加载/刷新状态
                activeTab.isLoading = false
                activeTab.refreshing = false
                if (activeTab.hasMore && (activeTab.data.length < 1) && !activeTab.isLoading && !activeTab.refreshing) {
                    activeTab.isLoading = true
                    this.getList(false, true)
                } else {
                    // 取消正在发生的请求
                    this.cancelReq()
                    setTimeout(() => {
                        // _this.forbidReq = false
                        activeTab.refreshing = false
                    }, 300)
                }
            },
            cancelReq() {
                var _this = this
                this.forbidReq = true
                setTimeout(() => {
                    _this.forbidReq = false
                }, 1200)
            },
            getList(refresh = false, immdiate = false) {
                var _this = this

                // 防抖操作
                this.debounce(this.reqData, 400, (isClear, resFnOrNewArgs, oldArgsOrNull) => {
                    if (isClear) {
                        // 只关心 处理恢复请清除的swiper 下拉刷新状态
                        let oldTabIndex = oldArgsOrNull[1]
                        let oldTab = _this.swiperData[oldTabIndex]
                        // 让被切换走的 swiper 刷新状态复位
                        oldTab.refreshing = false
                    }
                }, immdiate)(refresh, this.tabIndex)
            },
            // 真正去通知父组件加载数据，「禁止」直接调用本方法，需要加载数据请调用 getList 方法，由getList 方法来调用
            reqData(refresh) {
                let index = this.tabIndex
                let activeTab = this.swiperData[index]
                if (!activeTab.hasMore) {
                    activeTab.loadingText = '没有更多了'
                    return false
                }
                // 请求被禁止 || 下拉或刷新的对象 不是当前新激活的tab
                if (this.forbidReq || (this.hasHandelLoadOrRefresh && this.handelLoadOrRefreshTabIndex !== this
                        .tabIndex)) {
                    activeTab.refreshing = false
                    activeTab.isLoading = false
                    return false
                }
                // 通知父组件 加载数据
                if (refresh) {
                    // 下滑刷新数据
                    activeTab.pageIndex = 1
                    activeTab.refreshing = true
                    activeTab.isLoading = false
                    activeTab.refreshText = '正在刷新中...'
                } else {
                    // 底部加载数据
                    activeTab.pageIndex = activeTab.pageIndex + 1
                    activeTab.isLoading = true
                    activeTab.refreshing = false
                    activeTab.loadingText = '正在加载中...'
                }
                this.$emit('loadMore', {
                    tabInfo: this.tabs[index],
                    pageIndex: activeTab.pageIndex
                })
            },
            transition(e) {
                // console.log('transition swiper-item 的位置发生改变时会触发 transition 事件，event.detail = {dx: dx, dy: dy}，支付宝小程序暂不支持dx, dy', e)
            },
            animationfinish(e) {
                // console.log('动画结束', e.detail.current)
            },
            onRefresh(index) {
                this.handelLoadOrRefreshTabIndex = index
                let activeTab = this.swiperData[this.tabIndex]
                var _this = this
                if (this.tabIndex === index) {
                    if (!activeTab.refreshing) {
                        this.getList(true)
                    }
                }
                activeTab.refreshing = true
                activeTab.isLoading = false
                _this.hasHandelLoadOrRefresh = true
                setTimeout(() => {
                    _this.hasHandelLoadOrRefresh = false
                }, 1200)

            },
            refresherrestore(e) {
                // console.log('下拉被复位', e, this.tabIndex)
            },
            loadMore(index) {
                this.handelLoadOrRefreshTabIndex = index
                var _this = this
                let activeTab = this.swiperData[this.tabIndex]

                if (this.tabIndex === index) {
                    if (!activeTab.isLoading) {
                        this.getList(false)
                    }
                }
                activeTab.isLoading = true
                activeTab.refreshing = false

                _this.hasHandelLoadOrRefresh = true
                setTimeout(() => {
                    _this.hasHandelLoadOrRefresh = false
                }, 1200)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wsf-loading-icon {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        color: #999999;
    }

    .wsf-loading-text {
        margin-left: 2px;
        font-size: 14px;
        color: #999999;
    }

    .wsf-loading-more {
        align-items: center;
        justify-content: center;
        padding-top: 15px;
        padding-bottom: 15px;
        text-align: center;
        position: relative;
    }

    .wsf-loadmore-line {
        border-bottom-width: 1rpx;
        border-bottom-style: solid;
        border-bottom-color: #e5e5e5;
        width: 320rpx;
        position: absolute;
        z-index: -1;
    }

    .wsf-loading-more-text {
        padding-left: 8rpx;
        padding-right: 8rpx;
        font-size: 28rpx;
        line-height: 28rpx;
        background-color: #fafafa;
        text-align: center;
        color: #999;
    }

    .wrap {
        display: flex;
        flex-direction: column;
        height: calc(100vh - var(--window-top));
        width: 100%;
    }

    .swiper-box {
        flex: 1;
    }

    .swiper-item {
        height: 100%;
    }
</style>
