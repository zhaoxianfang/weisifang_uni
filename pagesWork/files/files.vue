<template>
	<view class="container">
		<tui-index-list :list-data="listData">
			<template v-slot:header>
				<tui-searchbar backgroundColor="#ededed" placeholder="搜索" @input="input" @search="search"
					@clear="clearInput"></tui-searchbar>
				<tui-list-cell padding="16rpx 30rpx">
					<!--此处样式App端偶尔会丢失-->
					<view class="tui-list__item" style="display: flex; align-items: center;" @tap="newFriends">
						<image class="tui-avatar" style="width: 68rpx;height: 68rpx;"
							src="https://thorui.cn/extend/avatar/img_new_friends.png"></image>
						<view style="padding-left: 20rpx;">新的朋友</view>
					</view>
				</tui-list-cell>
			</template>
			<!--此处2.0已做调整，循环在外部执行，兼容vue3-->
			<template v-slot:item="{ entity,index}">
				<tui-list-cell padding="16rpx 30rpx" v-for="(item,subi) in entity" :key="subi" @click="itemClick(index,subi)">
					<view class="tui-list__item">
						<image class="tui-avatar" :src="item.avatar"></image>
						<view class="tui-name">{{ item.name }}</view>
					</view>
				</tui-list-cell>
			</template>
			<template v-slot:footer>
				<tui-loadmore v-if="getTotal == 0 && init"></tui-loadmore>
				<view class="tui-footer__total" v-if="getTotal > 0 || !init">{{ getTotal }}位联系人</view>
			</template>
		</tui-index-list>
	</view>
</template>

<script>
	import list from '@/utils/index.list.js'
	export default {
		data() {
			return {
				listData: [],
				init: true
			};
		},
		computed: {
			getTotal() {
				let total = 0;
				for (let item of this.listData) {
					total += item.data.length;
				}
				return total;
			}
		},
		onLoad() {
			// 模拟异步获取数据场景
			setTimeout(() => {
				this.listData = [...list];
				this.init = false;
			}, 50);
		},
		methods: {
			search(e) {
				console.log(e);
				let value = e.value;
				this.searchResult(value);
			},
			clearInput() {
				this.searchResult('');
			},
			input(e) {
				console.log(e);
				let value = e.value;
				this.searchResult(value);
			},
			searchResult(value) {
				let result = [];
				for (let item of list) {
					let data = item.data.filter(item => item.name.indexOf(value) > -1 || item.keyword.toLocaleLowerCase()
						.indexOf(value.toLocaleLowerCase()) > -1);
					if (data.length > 0) {
						result.push({
							letter: item.letter,
							data: data
						});
					}
				}
				this.listData = result;
			},
			itemClick(index,subi) {
				let e=this.listData[index].data[subi]
				this.tui.toast(`id=${e.id},name=${e.name}`);
			},
			newFriends() {
				this.tui.toast('Hi小友~');
			}
		}
	};
</script>

<style>
	.tui-footer__total {
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 30rpx;
	}

	.tui-list__item {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		width: 68rpx;
		height: 68rpx;
		border-radius: 8rpx;
		flex-shrink: 0;
		background-color: #ccc;
	}

	.tui-name {
		width: 90%;
		font-size: 32rpx;
		padding-left: 20rpx;
		padding-right: 40rpx;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
