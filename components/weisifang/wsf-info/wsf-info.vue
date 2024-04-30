<template>
	<view class="help-container">
		<view v-for="(item, index) in helpList" :key="index" class="help-row">
			<view class="row-top">
				<text class="title">{{item.title}}</text>
			</view>
			<view class="row-bottom">
				<text class=" desc">{{item.desc}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
        name: 'wsfInfo',
		props: {
			// 数据源
			helpList: {
				type: Array,
				default () {
					return [];
				}
			}

		},
		data() {
			return {

			}
		},
		methods: {

		}

	}
</script>


<style lang="scss">
	.help-container {
		height: 100%;
		background-color: #fff;

		.help-row {
			padding: 2px 12px;

			.row-top {
				margin-top: 8px;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.title {
					font-size: 16px;
					color: #161616;
					margin-left: 0px;
					font-weight: 550;
					height: 32px;
					line-height: 32px;
				}
			}

			.row-bottom {
				margin-top: 6px;

				.desc {
					font-size: 15px;
					line-height: 28px;
					height: 28px;
					color: #666666;
					font-weight: 400;
					margin-left: 2px;
				}
			}
		}
	}
</style>