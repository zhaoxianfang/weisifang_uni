export default {
  value: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    default() {
      return []
    }
  },
  bgColor: {
    type: String,
    default: '#fff'
  },
  padding: {
    type: String,
    default: '0'
  },
  color: {
    type: String,
    default: '#333'
  },
  activeColor: {
    type: String,
    default: '#2979ff'
  },
  fontSize: {
    type: String,
    default: '28rpx'
  },
  activeFontSize: {
    type: String,
    default: '32rpx'
  },
  bold: {
    type: Boolean,
    default: false
  },
  scroll: {
    type: Boolean,
    default: true
  },
  height: {
    type: String,
    default: '70rpx'
  },
  lineColor: {
    type: String,
    default: '#2979ff'
  },
  lineHeight: {
    type: [String, Number],
    default: '10rpx'
  },
  lineScale: {
    type: Number,
    default: 0.5
  },
  lineRadius: {
    type: String,
    default: '10rpx'
  },
  pills: {
    type: Boolean,
    default: false
  },
  pillsColor: {
    type: String,
    default: '#2979ff'
  },
  pillsBorderRadius: {
    type: String,
    default: '10rpx'
  },
  field: {
    type: String,
    default: ''
  },
  fixed: {
    type: Boolean,
    default: false
  },
  paddingItem: {
    type: String,
    default: '0 22rpx'
  },
  lineAnimation: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 1993
  },
  // zxf 新增
  // tabs 栏是否禁止点击
  forbidChange: {
      type: Boolean,
      default: false
  },
  // tabs最右侧 是否展示设置按钮
  showSetup: {
      type: Boolean,
      default: false
  },
  // 开启showSetup时设置自定义的设置按钮图标，基于 thorui 的icon图标
  setupIcon: {
      type: String,
      default: 'setup'
  }
  // zxf 新增 end
}
