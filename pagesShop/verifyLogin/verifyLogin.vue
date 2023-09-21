<template>
	<view class="tui-login-box">
		<form :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="mobile" placeholder="请输入手机号码" maxlength="11" type="number" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">验证码</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="name" placeholder="请输入验证码" maxlength="6" type="text" />
					<tui-button plain width="200rpx" height="52rpx" :size="24" type="brown" shape="circle">获取验证码</tui-button>
				</view>
			</tui-list-cell>
			<view class="tui-btn__box"><tui-button shadow type="brown" height="80rpx" shape="circle">登录</tui-button></view>
			<view class="tui-agreement">登录即表示同意<text>《注册协议》</text></view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {

		};
	},
	methods: {}
};
</script>

<style>
.tui-login-box {
	padding: 20rpx 0;
}

.tui-line-cell {
	width: 100%;
	padding: 24rpx 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}

.tui-title {
	width: 180rpx;
	font-size: 28rpx;
}

.tui-title-city-text {
	width: 180rpx;
	height: 40rpx;
	display: block;
	line-height: 46rpx;
}

.tui-input {
	width: 500rpx;
}

.tui-input-city {
	flex: 1;
	height: 40rpx;
	font-size: 28rpx;
	padding-right: 30rpx;
}

.tui-phcolor {
	color: #ccc;
	font-size: 28rpx;
}
.tui-cell-title {
	font-size: 28rpx;
}


.tui-btn__box {
	padding: 24rpx 60rpx;
	margin-top: 100rpx;
}

.tui-agreement{
	width: 100%;
	text-align: center;
	font-size: 24rpx;
	font-size: #999;
	padding-top: 12rpx;
}
.tui-agreement text{
	color: #ac9157;
}
</style>
