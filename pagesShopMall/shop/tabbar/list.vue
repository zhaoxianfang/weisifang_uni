<template>
    <view>
        <swiper class="tui-banner" circular autoplay>
            <swiper-item>
                <image :src="webURL + 'img_banner_1.png'" class="tui-banner" @tap="onClickSwiperImg"></image>
            </swiper-item>
            <swiper-item>
                <image :src="webURL + 'img_banner_2.png'" class="tui-banner" @tap="onClickSwiperImg"></image>
            </swiper-item>
        </swiper>
        <view class="tui-menu__box" :class="{ 'tui-pbm__100': total > 0 }">
            <!-- 左边分类栏目 -->
            <view class="tui-left__box" v-if="scrollTop + height >= menuTop && isAndroid"></view>
            <view class="tui-left__box"
                :class="{ 'tui-left__fixed': scrollTop + height >= menuTop && isAndroid, 'tui-left__sticky': !isAndroid, 'tui-pbm__100': total > 0 }"
                :style="{ height: windowHeight - height - tabbarHeight + 'px', top: height + 'px' }">
                <scroll-view scroll-y :style="{ height: windowHeight - height - tabbarHeight + 'px' }"
                    :scroll-into-view="scrollView_leftId">
                    <view :id="`left_${index}`"
                        :class="{ 'tui-menu__active': activeTab == index, 'tui-bottom__radius': index == activeTab - 1, 'tui-top__radius': index == activeTab + 1 }"
                        class="tui-menu__item" v-for="(item, index) in goods_list" :key="index" @tap.stop="swichNav"
                        :data-index="index">
                        <image v-if="index == 0" class="tui-menu__icon" :src="webURL + 'icon_hot_3x.png'"></image>
                        <text>{{ item.classfiy_name || ('分类'+index) }}</text>
                    </view>
                </scroll-view>
            </view>
            <view class="tui-right__box">
                <block v-for="(item, index) in goods_list" :key="index">
                    <t-linkage :index="index" @linkage="linkage" :scrollTop="scrollTop" :recalc="recalc">

                        <!-- 推荐区商品 -->
                        <view class="tui-rec__list" v-if="item.id == 0">
                            <view class="tui-title tui-rec">{{ item.classfiy_name || '推荐'}}</view>
                            <view class="tui-img__box" v-for="(subItem, subIndex) in recommendGoods" :key="subIndex">
                                <image :src="webURL + subItem.bg_image_url" class="tui-rec__img"></image>
                                <view class="tui-goods__box">
                                    <view class="tui-rec__title">{{ subItem.name || '未命名'}}</view>
                                    <view class="tui-rec__attr">{{ subItem.attr || '未设置'}}</view>
                                    <view class="tui-rec__price">￥{{ subItem.price || '99999'}}</view>
                                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle"
                                        @click="addCart(1)">添加</tui-button>
                                </view>
                            </view>
                        </view>

                        <!-- 商品列表 -->
                        <view class="tui-goods__list" v-else>
                            <view class="tui-title">{{ item.classfiy_name || ('分类'+index) }}</view>
                            <view v-if="item.list">
                                <tui-list-cell :hover="false" padding="30rpx" v-if="item.list"
                                    v-for="(goods, goodsIndex) in item.list" :unlined="goodsIndex>0" :key="goodsIndex">
                                    <view class="tui-goods__item">
                                        <image :src="webURL + goods.image_url" class="tui-goods__img"></image>
                                        <view class="tui-goods__info">
                                            <view class="tui-goods__title">{{ goods.name || '未命名'}}</view>
                                            <view class="tui-goods__desc">描述描述描述描述描述描述描述描述描述描述描述描述</view>
                                            <view class="tui-goods-tags">
                                                <view class="goods-tag-item">新品</view>
                                                <view class="goods-tag-item" v-if="goodsIndex % 2 == 0">当前最热</view>
                                            </view>
                                            <view class="goods-price">￥{{ goods.price || '99999'}}</view>
                                        </view>
                                        <image src="/static/images/template/cafe/plus_circle.png" class="tui-plus__img"
                                            @tap="showModal(goods)"></image>
                                    </view>
                                </tui-list-cell>
                            </view>
                        </view>
                    </t-linkage>
                </block>
            </view>
        </view>
        <!--========点单弹层 选择规格 start========-->
        <tui-modal :show="modal" @cancel="hideModel" custom padding="0" radius="8rpx" width="88%">
            <view class="tui-order__modal">
                <image :src="webURL + currentGoodsItme.image_url" class="tui-img__detail" mode="widthFix"></image>
                <view class="tui-modal__box">
                    <view class="tui-modal__center">
                        <view class="tui-title__goods">{{currentGoodsItme.name || '未知'}}</view>
                        <!-- 商品规格列表 -->
                        <scroll-view scroll-y :style="{ height: attr.length > 4 ? '344rpx' : 'auto' }">
                            <view class="tui-attr__box" v-for="(item, index) in attr" :key="index">
                                <view class="tui-attr__title">{{ item.title }}</view>
                                <view class="tui-attr__all">
                                    <view class="tui-attr"
                                        :class="{ 'tui-attr__large': subItem.name.length > 1, 'tui-attr__active': item.selected == subItem.id }"
                                        v-for="(subItem, subIndex) in item.data" :key="subIndex"
                                        @tap="selectedAttr(index, subIndex)">
                                        {{ subItem.name }}
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                    <view class="tui-modal__bottom">
                        <view class="tui-price__box">
                            <!-- <view class="tui-price">￥{{ (currentGoodsItme.price).toFixed(2) }}</view> -->
                            <view class="tui-price goods-price">￥{{ currentGoodsItme.price || '9999' }}</view>
                            <view class="tui-number__box">
                                <!-- 加减购买数量 -->
                                <image src="/static/images/template/cafe/minus_circle.png" class="tui-plus__img"
                                    :class="{ 'tui-disabled': num == 1 }" @tap.stop="reduce"></image>
                                <view class="tui-num">{{ num }}</view>
                                <image src="/static/images/template/cafe/plus_circle.png" class="tui-plus__img"
                                    @tap.stop="add"></image>
                            </view>
                        </view>
                        <view class="tui-btn__box">
                            <view class="tui-attr__selected">
                                <view class="tui-name">{{currentGoodsItme.name || '未知'}}</view>
                                <view class="tui-sku">{{ attrText }}</view>
                            </view>
                            <tui-button type="brown" width="180rpx" height="60rpx" :size="26" shape="circle"
                                @click="addCart(2)">加入购物车</tui-button>
                        </view>
                    </view>
                    <view class="tui-cancel__icon" @tap.stop="hideModel">
                        <tui-icon name="shut" color="#f5f5f5" :size="40" unit="rpx" bold></tui-icon>
                    </view>
                </view>
            </view>
        </tui-modal>
        <!--========点单弹层 选择规格 end========-->

        <!--========购物车弹层 start========-->
        <tui-bottom-popup translateY="-198rpx" :show="show" @close="show=false">
            <view class="tui-popup__box">
                <view class="tui-popup__header">
                    <view class="tui-empty__box">
                        <tui-icon name="delete" :size="28" unit="rpx"></tui-icon>
                        <text class="tui-empty__text">清空购物袋</text>
                    </view>
                    <tui-icon name="shut" :size="44" unit="rpx" @click="show=false"></tui-icon>
                </view>
                <scroll-view class="tui-cart__list" scroll-y>
                    <block v-for="(item,index) in 3" :key="index">
                        <tui-list-cell :hover="false" padding="40rpx 30rpx">
                            <view class="tui-cart__item">
                                <view class="tui-title__box">
                                    <view class="tui-title__text">卡布奇诺S00{{index+1}}</view>
                                    <view class="tui-attr__text">小/热/标准</view>
                                </view>
                                <view class="tui-number__box">
                                    <image src="/static/images/template/cafe/minus_circle.png" class="tui-plus__img">
                                    </image>
                                    <view class="tui-num">1</view>
                                    <image src="/static/images/template/cafe/plus_circle.png" class="tui-plus__img">
                                    </image>
                                </view>
                            </view>
                        </tui-list-cell>
                    </block>
                </scroll-view>
            </view>
        </tui-bottom-popup>
        <!--========购物车弹层 end========-->

        <!--========已点单bar start========-->
        <view class="tui-order__bar" v-if="total > 0">
            <view class="tui-bar__inner">
                <view class="tui-bags__box" @tap="popupShow">
                    <image src="/static/images/template/cafe/shopping_bag.png" class="tui-bags__img"></image>
                    <tui-badge absolute type="red" :scaleRatio="0.9" translateX="50%">{{ total }}</tui-badge>
                </view>
                <view class="tui-total__price" @tap="popupShow">合计：￥93.00</view>
                <view class="tui-submit">
                    <tui-button type="brown" width="164rpx" height="56rpx" :size="26" shape="circle"
                        @click="submitOrder">下单</tui-button>
                </view>

            </view>
        </view>
    </view>
</template>
<script>
    import tLinkage from '@/components/views/t-linkage/t-linkage';
    export default {
        name: 'List',
        components: {
            tLinkage
        },
        props: {
            // 商店id
            shopId: {
                type: Number,
                default: 0
            },
            scrollTop: {
                type: [Number, String],
                default: 0.5
            },
            windowHeight: {
                type: Number,
                default: 400
            },
            height: {
                type: Number,
                default: 20
            },
        },
        watch: {
            scrollTop(val) {
                if (this.isTap) return;
                this.handleContentScroll(val);
            },
            windowHeight(val) {},
            height(val) {},
            shopId(val) {},
        },
        data() {
            return {
                // 开发配置的固定参数
                tabbarHeight: uni.upx2px(100),
                menuTop: uni.upx2px(500),
                isAndroid: true,
                show: false,
                modal: false,
                isTap: false,
                timer: null,
                recalc: 0,

                // 业务数据参数
                webURL: 'https://thorui.cn/extend/cafe/',

                // 左侧分类菜单
                goods_list: [{
                        classfiy_name: '咖啡',
                        id: 2,
                        list: [{
                                name: '拿铁1', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺2', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 13.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '当季限定',
                        id: 3,
                        list: [{
                                name: '拿铁3', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 14.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺4', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 15.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '果茶家族',
                        id: 4,
                        list: [{
                                name: '拿铁5', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 16.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺6', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 17.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '果汁制冰7',
                        id: 5,
                        list: [{
                                name: '拿铁', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺8', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '优酸乳',
                        id: 6,
                        list: [{
                                name: '拿铁9', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '波波家族',
                        id: 7,
                        list: [{
                                name: '拿铁', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '牛乳茶',
                        id: 8,
                        list: [{
                                name: '拿铁', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '纯茶',
                        id: 9,
                        list: [{
                                name: '拿铁', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '加料',
                        id: 10,
                        list: [{
                                name: '拿铁', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '休闲零品',
                        id: 11,
                        list: [{
                                name: '拿铁', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                    {
                        classfiy_name: '苏打类',
                        id: 12,
                        list: [{
                                name: '拿铁', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_1.jpg' //背景图
                            },
                            {
                                name: '卡布奇诺', // 商品名称
                                attr: '小/热/标准', // 规格
                                price: 12.00, // 价格
                                image_url: 'img_cafe_2.jpg'
                            }
                        ]
                    },
                ],
                // 推荐商品
                recommendGoods: [{
                    name: '拿铁', // 商品名称
                    attr: '小/热/标准', // 规格
                    price: 12.00, // 价格
                    bg_image_url: 'img_cafe_3x.jpg' //img_cafe_1.jpg 背景图
                }, {
                    name: '卡布奇诺', // 商品名称
                    attr: '小/热/标准', // 规格
                    price: 13.99, // 价格
                    bg_image_url: 'img_cafe_2.jpg'
                }],

                scrollView_leftId: 'left_0',
                contentTop: {},
                activeTab: 0,

                currentGoodsItme: {},

                attr: [{
                        title: '大小',
                        selected: 1,
                        data: [{
                                id: 1,
                                name: '小',
                                price: 0 //是否加价
                            },
                            {
                                id: 2,
                                name: '大',
                                price: 3
                            }
                        ]
                    },
                    {
                        title: '温度',
                        selected: 1,
                        data: [{
                                id: 1,
                                name: '热',
                                price: 0
                            },
                            {
                                id: 2,
                                name: '去冰',
                                price: 0
                            },
                            {
                                id: 3,
                                name: '冷',
                                price: 0
                            }
                        ]
                    },
                    {
                        title: '浓缩',
                        selected: 1,
                        data: [{
                                id: 1,
                                name: '标准',
                                price: 0
                            },
                            {
                                id: 2,
                                name: '加浓缩',
                                price: 1
                            }
                        ]
                    }
                ],

                total: 0,
                num: 1,
                //真实项目中，此数据从商品列表中获取
                rackRate: 17, //标准价
                price: 17, //选择规格后价格
                attrText: '小/热/标准',

            };
        },
        created() {
            console.log('created')
            // 判断是否有推荐商品
            this.recommendGoods.length > 0 && this.goods_list.unshift({
                classfiy_name: '推荐',
                id: 0
            })
        },
        mounted() {
            console.log('mounted')
        },
        onLoad(e) {
            this.isAndroid = this.tui.isAndroid();

        },
        onReady() {
            console.log('onReady')
            setTimeout(() => {
                this.recalc = 1;
            }, 300);
        },
        methods: {
            onClickSwiperImg(e) {

            },
            linkage(e) {
                let index = Number(e.index);
                this.contentTop[index] = Number(e.top);
            },
            handleContentScroll(scrollTop) {
                if (scrollTop >= this.contentTop[0]) {
                    let index = 0;
                    for (let i = 0, length = this.goods_list.length + 1; i < length; i++) {
                        if (scrollTop + this.height >= this.contentTop[i] && scrollTop + this.height < this.contentTop[
                                i + 1]) {
                            index = i;
                            break;
                        }
                    }
                    this.activeTab = index;
                    index = index - 5 < 0 ? 0 : index - 5;
                    this.scrollView_leftId = `left_${index}`;
                }
            },
            swichNav(e) {
                let cur = Number(e.currentTarget.dataset.index);
                if (this.activeTab == cur) {
                    return false;
                } else {
                    this.isTap = true;
                    this.activeTab = cur;
                    let index = cur - 5 < 0 ? 0 : cur - 5;
                    this.scrollView_leftId = `left_${index}`;
                    let scrollTop = this.contentTop[cur];
                    clearTimeout(this.timer);
                    this.timer = null;
                    uni.pageScrollTo({
                        scrollTop: scrollTop - this.height,
                        duration: 100,
                        complete: res => {
                            this.timer = setTimeout(() => {
                                this.isTap = false;
                            }, 450);
                        }
                    });
                }
            },
            selectedAttr(index, subIndex) {
                let item = this.attr[index];
                item.selected = item.data[subIndex].id;

                //计算价格 & 获取规格
                let price = this.rackRate;
                let attr = '';
                this.attr.forEach(item => {
                    for (let model of item.data) {
                        if (item.selected == model.id) {
                            price += model.price;
                            attr += `${model.name}/`;
                            break;
                        }
                    }
                });
                this.attrText = attr.substring(0, attr.length - 1);
                this.price = price;
            },
            add() {
                this.num++;
            },
            reduce() {
                let num = this.num - 1;
                this.num = num < 1 ? 1 : num;
            },
            showModal(goods) {
                this.currentGoodsItme = goods
                this.num = 1;
                this.attrText = '小/热/标准';
                this.price = this.rackRate;
                this.attr.forEach(item => {
                    item.selected = 1;
                });

                this.modal = true;
            },
            hideModel() {
                this.modal = false;
            },
            addCart(type) {
                if (type == 1) {
                    this.total += 1;
                } else {
                    this.total += this.num;
                }
                this.hideModel();
            },
            popupShow() {
                this.show = !this.show
            },
            login() {
                this.tui.href('../login/login')
            },
            submitOrder() {
                this.tui.href('../submitOrder/submitOrder')
            }
        },
        onPageScroll(e) {
            this.scrollTop = e.scrollTop;
            if (this.isTap) return;
            this.handleContentScroll(e.scrollTop);
        },
        onShareAppMessage: function(e) {
            return {
                title: 'ThorUI模板-咖啡点单'
            };
        }
    };
</script>

<style>
    .tui-banner {
        width: 100%;
        height: 500rpx;
    }

    .tui-menu__box {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .tui-left__box {
        width: 22%;
        min-height: 300px;
        background-color: #fff;
    }

    .tui-left__sticky {
        position: sticky;
        left: 0;
        z-index: 1;
    }

    .tui-left__fixed {
        position: fixed;
        left: 0;
        z-index: 1;
    }

    .tui-right__box {
        width: 78%;
        min-height: 100%;
        background-color: #fff;
        padding-bottom: 100rpx;
    }

    .tui-menu__item {
        width: 100%;
        height: 100rpx;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
        box-sizing: border-box;
        color: #666;
        background-color: #f8f8f8;
    }

    .tui-menu__active {
        background-color: #fff;
        color: #000;
        font-weight: 600;
    }

    .tui-bottom__radius {
        border-bottom-right-radius: 20rpx;
    }

    .tui-top__radius {
        border-top-right-radius: 20rpx;
    }

    .tui-menu__item text {
        font-size: 26rpx;
    }

    .tui-menu__icon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 12rpx;
        flex-shrink: 0;
    }

    .tui-title {
        width: 100%;
        color: #ac9157;
        font-size: 28rpx;
        line-height: 28rpx;
        font-weight: 500;
        padding: 30rpx 30rpx 20rpx;
        box-sizing: border-box;
    }

    .tui-rec {
        padding: 50rpx 30rpx;
    }

    .tui-rec__list {
        padding-bottom: 10rpx;
    }

    .tui-goods__list {
        width: 100%;
    }

    .tui-img__box {
        width: 100%;
        position: relative;
        margin-bottom: 20rpx;
        padding: 0 30rpx;
        box-sizing: border-box;
    }

    .tui-rec__img {
        width: 100%;
        height: 260rpx;
        border-radius: 8rpx;
        display: block;
        background-color: #f8f8f8;
    }

    .tui-goods__box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding: 0 60rpx 0 30rpx;
        box-sizing: border-box;
        font-size: 24rpx;
    }

    .tui-rec__title {
        font-size: 32rpx;
        font-weight: bold;
    }

    .tui-rec__attr {
        font-size: 24rpx;
        padding-top: 12rpx;
    }

    .tui-rec__price {
        padding-bottom: 24rpx;
    }

    .tui-goods__item {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 26rpx;
    }

    .tui-goods__img {
        width: 140rpx;
        height: 140rpx;
        border-radius: 8rpx;
        flex-shrink: 0;
        margin-right: 16rpx;
        background-color: #f8f8f8;
    }

    .tui-plus__img {
        width: 56rpx;
        height: 56rpx;
        flex-shrink: 0;
        margin-left: auto;
    }

    .tui-goods__info {
        width: 56%;
        min-height: 132rpx;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: space-between;
    }

    .tui-goods__title {
        width: 100%;
        font-size: 32rpx;
        line-height: 32rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .tui-attr {
        font-size: 24rpx;
        color: #999;
    }

    /* 商品标签 */
    .tui-goods-tags {
        display: inline-block;
        flex-direction: initial;
        justify-content: flex-start;
        align-content: stretch;
        width: 100%;
    }

    .goods-tag-item {
        font-size: 24rpx;
        color: #ac9157;
        border: #ac9157 solid 1px;
        border-radius: 10%;
        float: left;
        margin-right: 10rpx;
    }

    .goods-price {
        color: red;
    }

    /* 商品描述 */
    .tui-goods__desc {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .tui-order__bar {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 100rpx;
        z-index: 999;
        background-color: #fff;
        padding-bottom: env(safe-area-inset-bottom);
        box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
    }

    /*如果底部是原生tabbar则不需要 考虑safe-area-inset-bottom */
    /*两个容器改为一个即可 */
    .tui-bar__inner {
        width: 100%;
        height: 100rpx;
        display: flex;
        align-items: center;
        padding: 0 30rpx;
        box-sizing: border-box;
    }

    .tui-bags__box {
        position: relative;
    }

    .tui-bags__img {
        width: 48rpx;
        height: 48rpx;
        display: block;
    }

    .tui-total__price {
        font-weight: bold;
        font-family: sans-serif;
        margin-left: 80rpx;
    }

    .tui-submit {
        margin-left: auto;
    }

    .tui-pbm__100 {
        padding-bottom: 100rpx;
    }

    .tui-order__modal {
        border-radius: 8rpx;
        overflow: hidden;
        position: relative;
    }

    .tui-img__detail {
        width: 100%;
        height: 282rpx;
        display: block;
    }

    .tui-modal__box {
        width: 100%;
        padding: 60rpx 40rpx;
        box-sizing: border-box;
    }

    .tui-modal__center {}

    .tui-title__goods {
        font-size: 32rpx;
        font-weight: bold;
        padding-bottom: 20rpx;
    }

    .tui-attr__box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 18rpx;
    }

    .tui-attr__title {
        font-size: 24rpx;
        color: #999;
        flex-shrink: 0;
    }

    .tui-attr__all {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
    }

    .tui-attr {
        width: 48rpx;
        height: 48rpx;
        border: 2px solid #b2b2b2;
        border-radius: 50%;
        font-size: 24rpx;
        line-height: 24rpx;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #b2b2b2;
        margin: 6rpx 0 6rpx 20rpx;
    }

    .tui-attr__large {
        width: auto;
        min-width: 112rpx;
        padding: 0 10rpx;
        box-sizing: border-box;
        border-radius: 48px;
    }

    .tui-attr__active {
        border-color: #ac9157;
        color: #ac9157;
    }

    .tui-modal__bottom {
        margin-top: 50rpx;
        border-top: 1rpx solid #eee;
        padding-top: 50rpx;
    }

    .tui-price__box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .tui-price {
        font-size: 36rpx;
        line-height: 36rpx;
        font-size: bold;
    }

    .tui-number__box {
        display: flex;
        align-items: center;
    }

    .tui-disabled {
        opacity: 0.5;
    }

    .tui-num {
        font-size: 32rpx;
        font-weight: 400;
        min-width: 80rpx;
        text-align: center;
    }

    .tui-btn__box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30rpx;
    }

    .tui-attr__selected {
        font-size: 24rpx;
        transform: scale(0.9);
        transform-origin: 0 0;
    }

    .tui-name {
        padding-bottom: 4rpx;
    }

    .tui-cancel__icon {
        position: absolute;
        left: 0;
        top: 0;
        padding: 12rpx 0 0 20rpx;
    }

    .tui-popup__box {}

    .tui-popup__header {
        width: 100%;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }

    .tui-empty__box {
        display: flex;
        align-items: center;
        color: #999;
    }

    .tui-empty__text {
        padding-left: 6rpx;
        font-size: 24rpx;
        line-height: 24rpx;
    }

    .tui-cart__list {
        width: 100%;
        min-height: 300rpx;
        max-height: 600rpx;
    }

    .tui-cart__item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .tui-title__box {
        width: 60%;
    }

    .tui-title__text {
        font-size: 30rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-bottom: 12rpx;
    }

    .tui-attr__text {
        font-size: 24rpx;
        color: #999;
    }
</style>