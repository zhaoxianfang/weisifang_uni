<!-- 蓝色简洁登录页面 -->
<template>
    <view class="wsf-login">
        <!-- 页面装饰图片 -->
        <image class="img-a" src="@/static/images/login/2.png"></image>
        <image class="img-b" src="@/static/images/login/3.png"></image>
        <!-- 标题 -->
        <view class="wsf-title">{{ title }}</view>
        <form class="col">
            <view class="wsf-item">
                <tui-icon name="people" color="#5677fc" :size="44" unit="rpx"></tui-icon>
                <input type="number" name="mobile" placeholder="请输入手机号" maxlength="11" v-model="mobile" />
            </view>
            <view class="wsf-item">
                <tui-icon name="pwd" color="#5677fc" :size="44" unit="rpx"></tui-icon>
                <input type="text" name="password" placeholder="请输入密码" v-model="password" />
            </view>
            <view class="wsf-item">
                <tui-icon name="shield" color="#5677fc" :size="44" unit="rpx"></tui-icon>
                <input type="number" name="code" maxlength="6" placeholder="请输入验证码" v-model="sms_code" />
                <view v-if="showText" class="wsf-code" @tap="getCode">发送短信</view>
                <view v-else class="wsf-code" style="background-color: #A7A7A7;">重新发送({{ second }})</view>
            </view>
            <button @tap="login">登 录</button>
            <view class="tui-protocol" hover-class="opcity" :hover-stay-time="150">
                点击"登录"即表示已同意
                <text class="tui-protocol-red" @tap="protocol">《用户协议》</text>
            </view>
            <view class="wsf-register">
                <navigator url="register" class="left" open-type="navigate">注册账号</navigator>
                <navigator url="forget" class="right" open-type="navigate">忘记密码?</navigator>
            </view>
        </form>
        <tui-divider :gradual="true">第三方账号登录</tui-divider>
        <view class="wsf-other-login col">
            <view class="wsf-sdk-login" @tap="otherLogin('qq')">
                <tui-icon name="qq" color="#5677fc" :size="80" unit="rpx"></tui-icon>
            </view>
            <view class="wsf-sdk-login" @tap="otherLogin('sina')">
                <tui-icon name="sina" color="#F4A460" :size="80" unit="rpx"></tui-icon>
            </view>
        </view>
    </view>
</template>
<script>
    import form from '@/components/common/tui-validation/tui-validation.js'
    export default {
        data() {
            return {
                title: '欢迎回来', //填写logo或者app名称，也可以用：欢迎回来
                second: 60, //默认60秒
                showText: true, //判断短信是否发送
                mobile: '', //手机号码
                password: '', //密码
                sms_code: '',
                isLoading: false
            };
        },
        onLoad() {},
        methods: {
            //当前登录按钮操作
            login(e) {
                var _this = this;
                //登录
                if (this.isLoading) {
                    //判断是否加载中，避免重复点击请求
                    return false;
                }
                this.isLoading = true;

                let password = this.password;
                let mobile = this.mobile;

                let rules = [{
                        name: 'mobile',
                        rule: ['required', 'isMobile'],
                        msg: ['请输入手机号码', '请输入正确的手机号码']
                    }, {
                        name: 'password',
                        rule: ['required'],
                        msg: ['请输入密码']
                    }
                    // {
                    // 	name: 'loginCode',
                    // 	rule: ['required', 'isSame:code'],
                    // 	msg: ['请输入验证码', '验证码不正确']
                    // }
                ];
                //进行表单检查
                let formData = {
                    mobile: mobile,
                    password: password
                    // loginCode: loginCode,
                    // code: this.code
                };
                console.log('登录--', mobile, password)
                let checkRes = form.validation(formData, rules);
                if (checkRes) {
                    this.tui.toast(checkRes);
                    return;
                }
                // let format = util.formatNumber(mobile);
                // uni.setStorageSync('thorui_mobile', format);
                let state = {
                    mobile: mobile,
                    password: password
                };
                this.isLoading = true
                this.$store.dispatch('login', state).then((res) => {
                    this.tui.toast('登录成功', 2000);
                    _this.isLoading = false
                    // 关闭所有页面，跳转到首页
                    uni.reLaunch({
                        url: '/pages/tabbar/index/index'
                    });

                }).catch((err) => {
                    console.log(err)
                    _this.isLoading = false
                    this.tui.toast(err.message);
                })
            },
            //获取短信验证码
            getCode() {
                var that = this;
                var interval = setInterval(() => {
                    that.showText = false;
                    var times = that.second - 1;
                    that.second = times < 10 ? '0' + times : times; //小于10秒补 0
                    if (that.second < 1) {
                        clearInterval(interval);
                        that.second = 60;
                        that.showText = true;
                    }
                    console.log(times);
                }, 1000);
                //这里请求后台获取短信验证码
                uni.request({
                    //......//此处省略
                    success: function(res) {
                        that.showText = false;
                    }
                });
            },
            //等三方登录
            otherLogin(type) {
                var that = this;
                if (type === 'qq') {
                    uni.login({
                        provider: 'qq',
                        success: function(loginRes) {
                            // console.log('qq 登录 success', loginRes, loginRes.authResult);

                            that.$store.dispatch('qq_login', loginRes.authResult).then(
                                () => {
                                    that.tui.toast('登录成功', 2000);
                                    // 关闭所有页面，跳转到首页
                                    uni.reLaunch({
                                        url: '/pages/tabbar/index/index'
                                    });
                                }).catch((err) => {
                                that.tui.toast(err.message);
                            })

                            // 获取用户信息
                            // uni.getUserInfo({
                            //     provider: 'qq',
                            //     success: function(infoRes) {
                            //         // console.log('用户信息：', infoRes.userInfo);
                            //         that.$store.dispatch('qq_login', infoRes.userInfo).then(
                            //             () => {
                            //                 that.tui.toast('登录成功', 2000);
                            //                 // 关闭所有页面，跳转到首页
                            //                 uni.reLaunch({
                            //                     url: '/pages/tabbar/index/index'
                            //                 });
                            //             }).catch((err) => {
                            //             that.tui.toast(err.message);
                            //         })
                            //     },
                            //     fail: function(err) {
                            //         that.tui.toast('登录失败')
                            //     }
                            // });
                        },
                        fail: function(err) {
                            that.tui.toast('登录失败')
                        }
                    });
                } else {
                    this.tui.toast('暂未开通该登录方式')
                }
            },
            // 用户协议
            protocol: function() {
                // uni.navigateTo({
                //     url: '/pages/doc/protocol/protocol'
                // });
            },
        }
    };
</script>
<style>
    .img-a {
        position: fixed;
        width: 300rpx;
        height: 300rpx;
        top: 0;
        right: 0;
        z-index: -1;
    }

    .img-b {
        position: fixed;
        width: 300rpx;
        height: 435rpx;
        bottom: 0;
        left: 0;
        margin-bottom: 0;
        z-index: -1;
    }

    .wsf-login {
        width: 600rpx;
        margin: 0 auto;
        font-size: 28rpx;
        color: #000;
    }

    .wsf-login button {
        font-size: 28rpx;
        background: #5677fc;
        color: #fff;
        height: 90rpx;
        line-height: 90rpx;
        border-radius: 50rpx;
        box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
    }

    .wsf-login input {
        padding: 0 20rpx 0 120rpx;
        height: 90rpx;
        line-height: 90rpx;
        margin-bottom: 50rpx;
        background: #f8f7fc;
        border: 1px solid #e9e9e9;
        font-size: 28rpx;
        border-radius: 50rpx;
    }

    .wsf-login .wsf-item {
        position: relative;
    }

    .wsf-login .wsf-item .tui-icon {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        left: 40rpx;
        top: 28rpx;
        border-right: 2rpx solid #dedede;
        padding-right: 20rpx;
    }

    .wsf-login .wsf-title {
        text-align: center;
        font-size: 46rpx;
        color: #000;
        padding: 200rpx 0 90rpx 0;
        font-weight: bold;
    }

    .wsf-login .wsf-code {
        position: absolute;
        right: 22rpx;
        top: 22rpx;
        background: #5677fc;
        color: #fff;
        font-size: 24rpx;
        border-radius: 50rpx;
        height: 50rpx;
        line-height: 50rpx;
        padding: 0 25rpx;
    }

    .wsf-login .wsf-other-login {
        text-align: center;
        width: 250rpx;
        margin: 40rpx auto 0;
    }

    .wsf-login .wsf-sdk-login {
        float: left;
        width: 50%;
    }

    .wsf-login .wsf-other-login image {
        width: 70rpx;
        height: 70rpx;
    }

    .wsf-login .uni-input-placeholder {
        color: #000;
    }

    .col {
        zoom: 1;
    }

    .col:after {
        clear: both;
        display: block;
        visibility: hidden;
        height: 0;
        content: '\20';
    }

    .wsf-login .wsf-register {
        text-align: right;
        color: #666666;
        margin: 30rpx 30rpx 40rpx 0;
    }

    .wsf-login .wsf-register .left {
        padding-left: 30rpx;
        float: left;
    }

    .wsf-login .wsf-register .right {
        float: right;
    }

    .tui-protocol {
        color: #333;
        font-size: 24rpx;
        text-align: center;
        width: 100%;
        margin-top: 29rpx;
    }

    .tui-protocol-red {
        color: #f54f46;
    }
</style>