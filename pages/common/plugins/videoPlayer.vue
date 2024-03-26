<template>
    <div>
        <BenBen-VideoPlayer ref="video" videoEvent='videoGlobalEvent' style='width:390;height:210'
        :data='configData' ></BenBen-VideoPlayer>
        <button @click="play"> 播放 </button>
        <button @click="pause"> 暂停 </button>
        <button @click="seek"> 跳转 </button>
        <button @click="updateResource"> 切换视频源 </button>
        <button @click="full"> 全屏播放 </button>
        <button @click="exitFull"> 退出全屏 </button>
        <button @click="remove"> 移除播放器 </button>
        <button @click="getDuration"> 获取时长</button>
        <button @click="getIsFull"> 获取是否是全屏</button>
    </div>
</template>

<script>
    // BenBen-VideoPlayer : https://ext.dcloud.net.cn/plugin?id=12956
    export default {
        data() {
            return {
                configData: {
                    showBackButton: false, //返回按钮是否显示小屏幕
                    autoPlay: true, //自动播放 默认ture
                    data: [{
                        vid: '10086', //选填
                        title: 'airpods新品发布会',
                        index: '01', //选填
                        thumb: 'http://leyin.njzb.vip/uploads/images/21/b7162cc8c5f2f672f79eb79330609b.jpg',
                        url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
                        danmu:[
                            {
                                time: '10',
                                text: '随机增加一条弹幕'
                            },
                            {
                                time: '18',
                                text: '撒满族乡才能装招贤纳才吗，牛仔裤类型错了你看擦擦时空来电'
                            }
                        ]
                    }]
                }
                
            }
        },
        onLoad(options) {
            let video_url = decodeURI(options.url)
            console.log(options,video_url)
            this.configData.data = [{
                url: video_url,
                title:'视频播放'
            }];
            // #ifdef APP-PLUS
            
            // #endif
        },
        onReady() {
            //事件监听
            //0 小屏状态下返回按钮点击 
            //1 正在播放 
            //2 暂停
            //3 准备播放
            //4 大小屏切换 
            //5 播放结束 
            //6 跳转结束 
            //7 播放进度 
            //8 播放错误 
            var globalEvent = weex.requireModule('globalEvent');            
            globalEvent.addEventListener('videoGlobalEvent', function(e) {
                console.log('videoGlobalEvent',e)
                // let code = e.code;
                // let detail = e.detail;
                // // modal.toast({
                // //     message: JSON.stringify(e),
                // //     duration: 1.5
                // // });
                // if (code == 0) {
                //     uni.navigateBack({
                //         delta: 1,
                //         animationType: 'pop-out',
                //         animationDuration: 200
                //     })
                // } else if (code == 1) {

                // } else if (code == 2) {

                // } else if (code == 3) {

                // }
            })
        },
        methods: {
            play() {
                this.$refs.video.play()
            },

            pause() {
                this.$refs.video.pause()
            },

            seek() {
                this.$refs.video.seek({
                    'time':15  //跳转事件 单位秒
                }) 
            },
            updateResource() {
                this.$refs.video.updateResource({
                    data: [{
                        vid: '10086',
                        title: '视频播放器component',
                        index: '02',
                        thumb: 'http://leyin.njzb.vip/uploads/images/b3/27b0ede30df691749d29f9797e0229.jpeg',
                        url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
                        danmu:[
                            {
                                time: '34',
                                text: '这是一个新的视频'
                            },
                            {
                                time: '55',
                                text: '苹果十大贫困没看你看你家后备箱打了卡大叔大妈那是'
                            }
                        ]
                    }]
                })
            },

            full() {
                this.$refs.video.full()
            },

            remove() {
                this.$refs.video.remove()
            },

            getDuration() {
                this.$refs.video.getDuration({

                    },
                    (ret) => {
                        uni.showModal({
                            title: '提示',
                            content: "getDuration: " + JSON.stringify(ret)
                        })
                    }
                )
            },

            getIsFull() {
                this.$refs.video.getIsFull({

                    },
                    (ret) => {
                        uni.showModal({
                            title: '提示',
                            content: "getIsFull: " + JSON.stringify(ret)
                        })
                    }
                )
            }
        }
    }
</script>

<style>

</style>
