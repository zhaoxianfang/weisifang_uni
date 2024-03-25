<template>
    <view>
        <view class="tui-content-box">
            <tui-list-view title="电池优化">
                <tui-list-cell :arrow="false">
                    <view class="tui-item-box">
                        <!-- <tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon> -->
                        <text class="tui-list-cell_name">通知保活</text>
                        <view class="tui-ml-auto">
                            <tui-switch @change="changeOnKeep" :checked="hasKeepAlive" :disabled="hasKeepAlive" color="#07c160" :scaleRatio="0.7"></tui-switch>
                        </view>
                    </view>
                </tui-list-cell>
                <tui-list-cell :arrow="false">
                    <view class="tui-item-box">
                        <text class="tui-list-cell_name">电池优化</text>
                        <view class="tui-ml-auto">
                            <tui-switch @change="changeIgnoringBatterySwitch" :checked="hasIgnoringBattery" :disabled="hasIgnoringBattery" color="#07c160" :scaleRatio="0.7"></tui-switch>
                        </view>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="onAutoStart" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <text class="tui-list-cell_name">开启后台运行</text>
                        <view class="tui-ml-auto">
                            <tui-tag padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green"
                                shape="circle">去设置</tui-tag>
                        </view>
                    </view>
                </tui-list-cell>
            </tui-list-view>

            <!-- <tui-list-view title="">
                <tui-list-cell @click="onCancelNotify" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <tui-icon name="setup" :size="23" color="#afadb2"></tui-icon>
                        <text class="tui-list-cell_name">取消常驻通知保活</text>
                        <view class="tui-right"></view>
                    </view>
                </tui-list-cell>
            </tui-list-view> -->
            
            <tui-list-view title="权限操作">
                <tui-list-cell :arrow="!hasOpenLocation">
                    <view class="tui-item-box">
                        <text class="tui-list-cell_name">定位</text>
                        <view class="tui-ml-auto" v-if="!hasOpenLocation">
                            <tui-tag @click="changeHasOpenLocationSwitch" padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green"
                                shape="circle">去设置</tui-tag>
                        </view>
                        <view class="tui-ml-auto" v-else>
                            <tui-switch :checked="hasOpenLocation" :disabled="hasOpenLocation" color="#07c160" :scaleRatio="0.7"></tui-switch>
                        </view>
                    </view>
                </tui-list-cell>
                <tui-list-cell :arrow="!hasManageStorage">
                    <view class="tui-item-box">
                        <text class="tui-list-cell_name">申请所有文件读取权限</text>
                        <view class="tui-ml-auto" v-if="!hasManageStorage">
                            <tui-tag @click="changeHasManageStorageSwitch" padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green"
                                shape="circle">去设置</tui-tag>
                        </view>
                        <view class="tui-ml-auto" v-else>
                            <tui-switch :checked="hasManageStorage" :disabled="hasManageStorage" color="#07c160" :scaleRatio="0.7"></tui-switch>
                        </view>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="reqAlertWindow" :arrow="true" last="true">
                    <view class="tui-item-box">
                        <text class="tui-list-cell_name">悬浮窗权限</text>
                        <view class="tui-right"></view>
                    </view>
                </tui-list-cell>
            </tui-list-view>
            
            <tui-list-view title="">
                <tui-list-cell @click="goAppDetails" :arrow="true">
                    <view class="tui-item-box">
                        <text class="tui-list-cell_name">跳转到应用详情</text>
                        <view class="tui-right"></view>
                    </view>
                </tui-list-cell>
                <tui-list-cell @click="goIgnoreBattery" :arrow="true">
                    <view class="tui-item-box">
                        <view class="tui-list-cell_name">跳转到电池优化设置页</view>
                        <view class="tui-ml-auto">
                            <tui-tag padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green"
                                shape="circle">去设置</tui-tag>
                        </view>
                    </view>
                </tui-list-cell>
            </tui-list-view>
        </view>
    </view>
</template>

<script>
    const permission = uni.requireNativePlugin('Ba-Permissions')
    export default {
        onLoad: function(options) {},
        data() {
            return {
                hasIgnoringBattery:false, // 是否开启电池优化
                hasKeepAlive:false, // 是否开启保活
                hasOpenLocation:false, // 是否开启定位功能
                hasManageStorage:false, // 所有文件读取权限
                time: ''
            };
        },
        created() {},
        mounted() {
            var _this = this;
            this.checkHasIgnoringBattery();
            
            // 检查定位权限
            this.checkPermission('android.permission.ACCESS_FINE_LOCATION',function(status,res){
                _this.hasOpenLocation = status;
            })
            // 检查读取文件权限
            this.checkPermission('android.permission.MANAGE_EXTERNAL_STORAGE',function(status,res){
                _this.hasManageStorage = status;
            })
        },
        methods: {
            //检查是否加入电池优化白名单
            checkHasIgnoringBattery(callback=null) {
                var _this = this
                this.ba.keepAliveSuit.isIgnoringBattery(function(status){
                    _this.hasIgnoringBattery = status
                    callback && callback(status)
                })
            },
            // switch 开关调用是否开启电池优化
            changeIgnoringBatterySwitch: function(e) {
                var _this = this
                // 检查
                this.checkHasIgnoringBattery(function(status){
                    if(!status){
                        // 尝试去开启电池优化功能
                        permission.request({
                            permissions: ['android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS'],
                            //perTitle:"自定义权限说明标题",//可不传，有默认值
                            //perMsg:"自定义权限说明内容"//可不传，有默认值
                        },
                        (res) => {
                            if (res.data) {
                                if(!res.data.doNotAskAgain){
                                    // 取消授权 则 调用方式二
                                    _this.ba.keepAliveSuit.requestIgnoreBattery(function(res){
                                        // 重新检查是否授权
                                        _this.checkHasIgnoringBattery();
                                    })
                                }
                                if(!res.data.allGranted){
                                    // 同意授权
                                    // 重新检查是否授权
                                    _this.checkHasIgnoringBattery();
                                }
                            }
                        });
                    }else{
                        // 重新检查是否授权
                        _this.checkHasIgnoringBattery();
                    }
                })
            },
            //通知保活
            changeOnKeep() { 
                var _this = this
                if(!!this.hasKeepAlive){
                    return false
                }
                this.ba.keepAliveSuit.onKeep({},function(res){
                    _this.hasKeepAlive = res.ok
                    if(!res.ok){
                        // 调用 常驻通知保活
                        _this.ba.keepAliveSuit.onShowNotify(function(resShow){
                            _this.hasKeepAlive = resShow.ok
                        })
                    }
                })
            },
            onAutoStart() { //去设置自启动、后台运行
                this.ba.keepAliveSuit.onAutoStart()
            },
            goIgnoreBattery() { //跳转到电池优化设置页
                this.ba.keepAliveSuit.goIgnoreBattery()
            },
            onCancelNotify() { //取消常驻通知保活
                this.ba.keepAliveSuit.onCancelNotify()
            },
            detail(e) {
                console.log('detail')
                this.tui.toast('正在开发中...')
            },
            
            
            // ===============================================================
            // ===============================================================
            // ===============================================================
            // 权限相关
            // 根据单个权限名称检查权限是否同意授权了 eg:'android.permission.CAMERA'
            checkPermission(permissionName='',callback=null){
                let that = this;
                permission.isGranted({
                    permissions: [permissionName]
                },
                (res) => {
                    if(res.data){
                        callback && callback(res.data.isGranted,res);
                    }
                });
            },
            changeHasOpenLocationSwitch(e){
                //申请位置权限
                var _this = this;
                permission.reqLocation((res) => {
                    if(res.data){
                        if(!!res.data.doNotAskAgain){
                            console.log('拒绝授权',res)
                            // 询问时候拒绝授权
                            _this.tui.toast('您拒绝了授权')
                        }
                        if(!!res.data.allGranted){
                            // 同意了授权
                        }
                        
                    }
                });
            },
            // 权限相关
            changeHasManageStorageSwitch() { //申请所有文件读取权限
                var that = this;
                this.checkPermission('android.permission.MANAGE_EXTERNAL_STORAGE',function(status,res){
                    if(!status){
                        // 通过打开文件去授权
                        that.helper.files.selectFiles({}, function(file) {
                        })
                    }else{
                        console.log('ok')
                        that.hasManageStorage = true;
                    }
                })
            },
            goAppDetails() {//跳转应用详情
                let that = this;
                permission.goAppDetails(
                    (res) => {
                        that.showResult(res)
                    });
            },
            reqAlertWindow() { //申请悬浮窗权限
                let that = this;
                permission.reqAlertWindow(
                    (res) => {
                        that.showResult(res)
                    });
                // permission.request({
                //     permissions: ['android.permission.SYSTEM_ALERT_WINDOW'],
                //     //perTitle:"自定义权限说明标题",//可不传，有默认值
                //     //perMsg:"自定义权限说明内容"//可不传，有默认值
                // },
                // (res) => {
                //     that.showResult(res)
                // });
            },
            showResult(res) {
                console.log(res);
                //this.msgList.unshift(JSON.stringify(res))
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            }
        },
        onPageScroll(e) {

        },
        onPullDownRefresh() {
            setTimeout(() => {
                uni.stopPullDownRefresh();
            }, 200);
        },
        onReachBottom: function() {

        }
    };
</script>

<style lang="scss" scoped>
    .tui-content-box {
        /* width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	position: relative;
	top: -72rpx;
	z-index: 10; */
    }

    /* ====================== */
    .tui-item-box {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .tui-list-cell_name {
        padding-left: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tui-ml-auto {
        margin-left: auto;
    }

    .tui-right {
        margin-left: auto;
        margin-right: 34rpx;
        font-size: 26rpx;
        color: #999;
    }

    .tui-logo {
        height: 52rpx;
        width: 52rpx;
        flex-shrink: 0;
    }

    .tui-list-view {
        margin-bottom: 8rpx !important;
    }
</style>