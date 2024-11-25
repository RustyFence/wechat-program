<template>
  <view class="tabbar">
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/home/home' }"
      @click="switchTab('/pages/home/home')"
    >
      <text class="iconfont icon-home"></text>
      <text>首页</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/discover/discover' }"
      @click="switchTab('/pages/discover/discover')"
    >
      <text class="iconfont icon-discover"></text>
      <text>发现</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/publish/publish' }"
      @click="switchTab('/pages/publish/publish')"
    >
      <text class="iconfont icon-publish"></text>
      <text>发布</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/message/message' }"
      @click="switchTab('/pages/message/message')"
    >
      <view class="icon-wrapper">
        <text class="iconfont icon-message"></text>
        <view class="badge" v-if="unreadCount > 0">{{formatUnreadCount}}</view>
      </view>
      <text>消息</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/myAccount/myAccount' }"
      @click="switchTab('/pages/myAccount/myAccount')"
    >
      <text class="iconfont icon-my"></text>
      <text>我的</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      currentPath: '',
      unreadCount: 0 // 未读消息数量
    }
  },
  computed: {
    formatUnreadCount() {
      return this.unreadCount > 99 ? '99+' : this.unreadCount
    }
  },
  created() {
    // 获取当前页面路径
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    this.currentPath = '/' + currentPage.route
    
    // 监听未读消息数量变化
    uni.$on('updateUnreadCount', this.updateUnreadCount)
    
    // 初始化未读消息数量
    this.getUnreadCount()
  },
  beforeDestroy() {
    // 移除事件监听
    uni.$off('updateUnreadCount', this.updateUnreadCount)
  },
  methods: {
    switchTab(url) {
      if (this.currentPath === url) return
      uni.switchTab({
        url
      })
    },
    
    // 更新未读消息数量
    updateUnreadCount(count) {
      this.unreadCount = count
    },
    
    // 获取未读消息数量
    getUnreadCount() {
      // TODO: 从服务器获取未读消息数量
      // 这里模拟一些未读消息
      this.unreadCount = 5
    }
  }
}
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #fff;
  display: flex;
  border-top: 1px solid #eee;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #666;
}

.tab-item.active {
  color: #007AFF;
}

.tab-item .iconfont {
  font-size: 40rpx;
  margin-bottom: 4rpx;
}

.icon-wrapper {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  right: -12rpx;
  top: -6rpx;
  min-width: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  background: #ff4d4f;
  color: #fff;
  font-size: 20rpx;
  border-radius: 16rpx;
  padding: 0 6rpx;
  transform: scale(0.8);
  transform-origin: right top;
}
</style>