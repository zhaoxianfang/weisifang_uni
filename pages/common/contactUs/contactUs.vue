<template>
    <view class="container">
        <view class="title">联系方式</view>
        <input class="tui-input" placeholder-class="phcolor" placeholder="请填写您的手机号或者邮箱号码" v-model="email"
            maxlength="20" />

        <view class="title top64">概要描述</view>
        <view class="tui-cells">
            <textarea class="tui-textarea" placeholder="我希望/想XXX" maxlength="500" placeholder-class="phcolor"
                v-model="desc"></textarea>
            <view class="textarea-counter">{{descNum}}/500</view>
        </view>

        <view class="tui-ptop">
            <tui-button :type="btnType" shadow height="88rpx" shape="circle" @click="submit">提交</tui-button>
        </view>
    </view>

</template>

<script>
    import form from "@/components/common/tui-validation/tui-validation.js"
    export default {
        computed: {
            descNum: function() {
                return this.desc.length
            }
        },
        onLoad(options) {
            this.btnType = options.page == 'mall' ? 'danger' : 'primary'
        },
        data() {
            return {
                email: "",
                desc: "",
                btnType: "primary"
            }
        },
        methods: {
            submit() {
                let rules = [{
                    name: "email",
                    rule: ["required", "minLength:8"],
                    msg: ["请填写手机号或邮箱号", "请填写正确的手机号或邮箱号"]
                }, {
                    name: "desc",
                    rule: ["required", "minLength:8", "maxLength:500"],
                    msg: ["请填写概要描述", "概要描述必须8个或以上字符", "概要描述不能超过500个字符"]
                }];
                let formData = {
                    email: this.email,
                    desc: this.desc
                }
                let checkRes = form.validation(formData, rules);
                if (!checkRes) {
                    this.$api.app.contact_us(formData).then(res => {
                            if (res.code === 200) {
                                this.tui.toast('提交成功')
                                uni.navigateBack({
                                    delta: 1 // 返回的页面数
                                })
                            } else {
                                this.tui.toast(res.msg || '出错啦!')
                            }
                        })
                        .catch(e => {
                            this.tui.toast('出错啦!')
                        });
                } else {
                    this.tui.toast(checkRes)
                }
            }
        }
    }
</script>

<style>
    page {
        background: #fff;
    }

    .container {
        background-color: #fff;
        margin-top: 22rpx;
        padding: 30rpx;
        box-sizing: border-box;
        padding-bottom: 162rpx
    }

    .title {
        font-size: 30rpx;
        color: #666;
        padding-bottom: 32rpx;
    }

    .tui-cells {
        border: 1rpx solid #e6e6e6;
        border-radius: 4rpx;
        height: 280rpx;
        box-sizing: border-box;
        padding: 20rpx 20rpx 0 20rpx;
    }

    .tui-textarea {
        height: 210rpx;
        width: 100%;
        color: #666;
        font-size: 28rpx;
    }

    .pholder {
        color: #ccc;
    }

    .textarea-counter {
        font-size: 24rpx;
        color: #999;
        text-align: right;
        height: 40rpx;
        line-height: 40rpx;
        padding-top: 4rpx;
    }

    .top64 {
        margin-top: 64rpx;
    }

    .tui-input {
        font-size: 30rpx;
        height: 88rpx;
        border: 1rpx solid #e6e6e6;
        border-radius: 4rpx;
        padding: 0 25rpx;
        box-sizing: border-box;
    }

    .tui-ptop {
        padding-top: 80rpx;
    }
</style>