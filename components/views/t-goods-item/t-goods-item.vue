<template>
	<view class="tui-product__item" :class="{'tui-flex__list':isList,'tui-product__item-show':isShow}"
		hover-class="tui-hover" :hover-start-time="150" @tap="detail">
		<image :src="entity.img" class="tui-product__img" :class="{'tui-img__list':isList}" mode="widthFix"></image>
		<view class="tui-product__content">
			<view class="tui-product__title">{{ entity.name || '' }}</view>
			<view>
				<view class="tui-product__price">
					<text class="tui-sale__price">￥{{ entity.sale || '0.00' }}</text>
					<text class="tui-factory__price">￥{{ entity.factory || '0.00' }}</text>
				</view>
				<view class="tui-product__pay">{{ entity.payNum || 0 }}人付款</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tGoodsItem',
		props: {
			//数据obj
			entity: {
				type: Object,
				default () {
					return {};
				}
			},
			//是否为列表展示
			isList: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isShow: false
			}
		},
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.isShow = true
				}, 20)
			})
		},
		methods: {
			detail() {
				uni.showToast({
					title: '功能开发中~',
					icon: 'none'
				})
			}
		}
	};
</script>

<style>
	.tui-product__item {
		width: 100%;
		margin-bottom: 10rpx;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
		transition: all 0.15s linear;
		visibility: hidden;
		opacity: 0;
	}

	.tui-product__item-show {
		visibility: visible;
		opacity: 1;
	}

	.tui-flex__list {
		display: flex !important;
		margin-bottom: 0 !important;
		position: relative;
	}

	.tui-flex__list::after {
		content: " ";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
		z-index: 2;
	}

	.tui-product__img {
		width: 100%;
		display: block;
		background-color: #F1F1F1;
	}

	.tui-img__list {
		width: 260rpx !important;
		height: 260rpx !important;
		border-radius: 12rpx;
		flex-shrink: 0;
	}

	.tui-product__content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-product__title {
		color: #2e2e2e;
		font-size: 26rpx;
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-product__price {
		padding-top: 18rpx;
	}

	.tui-sale__price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory__price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-product__pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
</style>