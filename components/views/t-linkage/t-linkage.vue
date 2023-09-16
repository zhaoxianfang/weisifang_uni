<template>
	<view class="tui-linkage-class"><slot></slot></view>
</template>

<script>
//vtabs 左右联动
export default {
	name: 'tLinkage',
	emits: ['linkage'],
	props: {
		scrollTop: {
			type: Number,
			default: 0
		},
		recalc: {
			type: Number,
			default: 0
		},
		//列表中的索引值
		index: {
			type: [Number, String],
			default: 0
		}
	},
	watch: {
		recalc(newValue, oldValue) {
			this.updateScrollChange();
		}
	},
	mounted() {
		setTimeout(() => {
			this.updateScrollChange();
		}, 20);
	},
	data() {
		return {
			timer: null
		};
	},
	methods: {
		updateScrollChange() {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				const className = '.tui-linkage-class';
				const query = uni.createSelectorQuery().in(this);
				query
					.select(className)
					.boundingClientRect(res => {
						if (res) {
							let top = res.top + this.scrollTop;
							this.$emit('linkage', {
								top: top,
								height:res.height,
								index:this.index
							});
						}
					})
					.exec();
			}, 0);
		}
	}
};
</script>