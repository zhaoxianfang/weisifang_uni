<template>
	<view class="container">
		<view class="tui-order__detail">
			<view class="tui-order__info">
				<view class="tui-shipping">预约取货</view>
				<view class="tui-info">
					<text class="tui-title">取货地址：</text>
					<text>Store</text>
				</view>
				<view class="tui-info">
					<text class="tui-title">预约时间：</text>
					<text>2020-09-01 16:30</text>
				</view>
				<view class="tui-info">
					<text class="tui-title">订单时间：</text>
					<text>2020-09-01 16:00</text>
				</view>

				<view class="tui-divider"></view>
			</view>
			<view class="tui-detail__box">
				<view class="tui-detail__cell" @tap="toggle">
					<text>订单详情</text>
					<view class="tui-arrow__detail" :class="{'tui-rotate':show}">
						<tui-icon name="arrowright" :size="30" unit="rpx"></tui-icon>
					</view>
				</view>
				<view class="tui-goods__list" v-show="show">
					<view class="tui-total__box">
						<view>合计：￥59.00</view>
						<view>共4件商品</view>
					</view>
					<tui-list-cell :hover="false" lineLeft="0" padding="40rpx 0">
						<view class="tui-goods__item">
							<image :src="webURL+'img_cafe_1.jpg'"></image>
							<view class="tui-goods__info">
								<view class="tui-name">卡布奇诺</view>
								<view class="tui-attr">大/热/标准</view>
								<view>￥17.00</view>
							</view>
							<view class="tui-quantity">x1</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" lineLeft="0" padding="40rpx 0">
						<view class="tui-goods__item">
							<image :src="webURL+'img_cafe_2.jpg'"></image>
							<view class="tui-goods__info">
								<view class="tui-name">拿铁</view>
								<view class="tui-attr">小/热/标准</view>
								<view>￥14.00</view>
							</view>
							<view class="tui-quantity">x1</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" lineLeft="0" padding="40rpx 0" :unlined="true">
						<view class="tui-goods__item">
							<image :src="webURL+'img_cafe_1.jpg'"></image>
							<view class="tui-goods__info">
								<view class="tui-name">卡布奇诺</view>
								<view class="tui-attr">小/冷/标准</view>
								<view>￥14.00</view>
							</view>
							<view class="tui-quantity">x2</view>
						</view>
					</tui-list-cell>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				webURL: 'https://thorui.cn/extend/cafe/'
			}
		},
		methods: {
			toggle() {
				this.show = !this.show
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		padding: 10rpx 30rpx 80rpx;
		box-sizing: border-box;
	}

	.tui-order__detail {
		width: 100%;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
	}

	.tui-order__info {
		width: 100%;
		padding: 50rpx 50rpx 80rpx;
		box-sizing: border-box;
		position: relative;
	}

	.tui-shipping {
		font-size: 30rpx;
		font-weight: bold;
		padding-bottom: 20rpx;
	}

	.tui-info {
		padding-top: 20rpx;
		font-size: 26rpx;
		line-height: 36rpx;
		font-weight: 400;
		display: flex;
		align-items: flex-start;
		word-break: break-all;
	}

	.tui-title {
		flex-shrink: 0;
	}

	.tui-divider {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		border-bottom: 1px dashed #eee;
	}

	.tui-divider::before {
		content: ' ';
		position: absolute;
		left: 0;
		top: -50%;
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		background-color: #f5f5f5;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.tui-divider::after {
		content: ' ';
		position: absolute;
		right: 0;
		top: -50%;
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		background-color: #f5f5f5;
		transform: translate(50%, -50%);
		z-index: 10;
	}

	.tui-detail__box {
		width: 100%;
		padding: 50rpx;
		box-sizing: border-box;
	}

	.tui-detail__cell {
		padding: 20rpx 0;
		font-size: 30rpx;
		line-height: 30rpx;
		color: #999;
		display: flex;
		align-items: center;
	}

	.tui-arrow__detail {
		transition: transform 0.1s linear;
	}

	.tui-rotate {
		transform: rotate(90deg);
	}

	.tui-total__box {
		width: 100%;
		font-size: 30rpx;
		line-height: 30rpx;
		padding-top: 40rpx;
		padding-bottom: 20rpx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods__item {
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
	}

	.tui-goods__item image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		background-color: #F8F8F8;
		flex-shrink: 0;
	}

	.tui-goods__info {
		width: 60%;
		font-size: 26rpx;
		padding-left: 20rpx;
	}

	.tui-name {
		width: 100%;
		font-size: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-attr {
		font-size: 24rpx;
		color: #999;
		padding: 8rpx 0;
	}

	.tui-quantity {
		position: absolute;
		right: 0;
		top: 8rpx;
		font-size: 24rpx;
	}
</style>
