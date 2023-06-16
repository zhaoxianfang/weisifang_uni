<template>
    <view class="async-switch">
        <switch :checked="checked" :disabled="disabled" :color="changeColor" />
        <button @click="onChange"></button>
    </view>
</template>

<script>
    // 该组件的作用在于 switch 组件 change 之后，无法手动设置状态为开还是关
    // 该组件点击之后需要开发者手动修改 checked 对应的值来显示状态
    export default {
        name: 'wsf-switch',
        props: {
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: '#007aff'
            },
            disabledColor: {
                type: String,
                default: '#e5e5e5'
            }
        },
        data() {
            return {

            };
        },
        computed: {
            changeColor() {
                return (this.disabled ? this.disabledColor : this.color)
            }
        },
        methods: {
            onChange() {
                /* 禁用状态不返回事件 */
                if (this.disabled) {
                    return;
                }
                this.$emit("change");
            }
        }
    }
</script>

<style scoped lang="scss">
    .async-switch {
        display: inline-block;
        position: relative;

        &>switch {
            margin: 0;
        }

        &>button {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
</style>
