# cc-proNotImgManualImg

来源：[](https://ext.dcloud.net.cn/plugin?id=17855)

## 1.0.0（2024-04-27）
组件初始化

#### 使用方法 
```使用方法

<!-- 产品使用说明书  helpList：说明文档数组-->
<wsf-info :helpList="helpList" />
				
```

#### HTML代码实现部分
```html
<template>
	<view class="content">
	<!-- 产品使用说明书  helpList：说明文档数组-->
	<cc-proNotImgManualImg :helpList="helpList"></cc-proNotImgManualImg>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				helpList: [{
						title: '一、产品简介',
						desc: `广佛站点线路图小程序，是专为广州、佛山地铁用户精心打造的导航工具。其能够获取用户的实时或选定位置，并快速显示出附近的地铁站点。让您轻松查找站点，规划路线，助力您高效出行。`
					}, {
						title: '二、功能特点',
						desc: `	1.	实时定位：小程序能够实时获取用户的当前位置信息。
					2.	站点搜索：根据用户当前位置或选定位置，自动搜索并展示最近的三个地铁站点。
					3.	地图展示：在地图上绘制用户当前位置或所选定位置坐标点以及附近地铁站点坐标点，以便用户能直观了解站点位置。
					4.	刷新定位：当用户移动位置时，可以点击刷新定位功能，更新当前位置经纬度。`
					}, {
						title: '三、使用步骤',
						desc: `	1.	打开广佛站点导航助手小程序。
					2.	小程序将自动获取您的当前位置信息，并在地图上标注。
					3.	根据用户实时或选定位置在地图上查看离您最近的三个地铁站点，并了解站点的具体位置。
					4.	如需选择位置，点击选择位置按钮，小程序将获取您选定位置信息。
					5.	如需刷新定位，点击刷新定位按钮，小程序将重新获取您的当前位置信息。
					6.	根据需要选择合适的地铁站点，进行出行规划。`
					}, {
						title: '四、注意事项',
						desc: `	1.	请确保您的手机已开启定位功能，以便小程序能够准确获取您的位置信息。
					2.	由于网络信号或定位技术的原因，定位结果可能存在一定误差，请结合实际情况进行使用。
					3.	本小程序仅提供地铁站点导航功能，不涉及具体的出行路线规划，请用户根据实际需求自行规划出行路线。`
					}, {
						title: '五、版权声明',
						desc: `本小程序由广佛站点导航助手团队开发并维护，版权归广佛站点导航助手团队所有。未经授权，任何单位和个人不得复制、传播、修改或用于其他商业用途。`
					}, {
						title: '六、联系方式',
						desc: `如您在使用本小程序过程中遇到任何问题或建议，请通过以下方式与我们联系：
				邮箱：2819971691@qq.com
				电话：17665098516`
					}, {
						title: '',
						desc: `感谢您选择广佛站点导航助手小程序，我们将竭诚为您提供优质的服务！`
					},
					{
						title: '',
						desc: ``
					}, {
						title: '',
						desc: ``
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
```