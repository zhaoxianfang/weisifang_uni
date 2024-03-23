  <template>
    <view class="content" style="display: flex;flex-direction: column;">
        <button @click="getApps" class="marTB">获取App列表</button>

        <scroll-view scroll-y style="flex: 1;">
            <template v-for="(item,index) in list">
                <view :key="index" style="display: flex;flex-direction: row;border-bottom: 1rpx dotted #ccc;align-items: center;"
                    class="parTB" @click="jumpToApp(item.packageName)">
                    <image :src="'data:image/jpg;base64,' + item.icon" mode="scaleToFill"
                        style="width: 80rpx;height: 80rpx;margin-right: 20rpx;"></image>
                    <view>{{item.name}}</view>
                </view>

            </template>
        </scroll-view>
    </view>
</template>

<script>
    const launcher = uni.requireNativePlugin("cj-launcher");
    export default {
        data() {
            return {
                list: [],
            }
        },

        methods: {

            jumpToApp(pckName) {
                launcher.jumpToApp(pckName);
            },
            getApps() {
                uni.showLoading({
                    mask: true
                })
                var list = launcher.getAppsInfo();
                this.list = list;
                uni.hideLoading();

            },

        }
    }
</script>

<style>
    .marTB {
        margin-top: 20rpx;
        margin-left: 10%;
        margin-right: 10%;
        margin-bottom: 20rpx;
    }

    .parTB {
        padding-left: 20rpx;
        padding-right: 20rpx;
        padding-top: 20rpx;
        padding-bottom: 20rpx;
    }
</style>