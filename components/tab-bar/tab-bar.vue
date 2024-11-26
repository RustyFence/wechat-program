<template>
  <view class="tabbar">
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/home/home' }"
      @click="switchTab('/pages/home/home')"
    >
      <uni-icons :type="currentPath === '/pages/home/home' ? 'home-filled' : 'home'" :size="24" :color="currentPath === '/pages/home/home' ? '#007AFF' : '#666'"></uni-icons>
      <text>首页</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/discover/discover' }"
      @click="switchTab('/pages/discover/discover')"
    >
      <uni-icons :type="currentPath === '/pages/discover/discover' ? 'search' : 'search'" :size="24" :color="currentPath === '/pages/discover/discover' ? '#007AFF' : '#666'"></uni-icons>
      <text>发现</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/publish/publish' }"
      @click="switchTab('/pages/publish/publish')"
    >
      <uni-icons type="plusempty" :size="24" :color="currentPath === '/pages/publish/publish' ? '#007AFF' : '#666'"></uni-icons>
      <text>发布</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/message/message' }"
      @click="switchTab('/pages/message/message')"
    >
      <view class="icon-wrapper">
        <uni-icons :type="currentPath === '/pages/message/message' ? 'chat-filled' : 'chat'" :size="24" :color="currentPath === '/pages/message/message' ? '#007AFF' : '#666'"></uni-icons>
        <uni-badge 
          :text="formatUnreadCount" 
          :offset="[8, -8]"
          size="small"
          type="error"
          v-if="unreadCount > 0"
          absolute="rightTop"
        ></uni-badge>
      </view>
      <text>消息</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentPath === '/pages/myAccount/myAccount' }"
      @click="switchTab('/pages/myAccount/myAccount')"
    >
      <uni-icons :type="currentPath === '/pages/myAccount/myAccount' ? 'person-filled' : 'person'" :size="24" :color="currentPath === '/pages/myAccount/myAccount' ? '#007AFF' : '#666'"></uni-icons>
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
      unreadCount: 0
    }
  },
  computed: {
    formatUnreadCount() {
      return this.unreadCount > 99 ? '99+' : this.unreadCount.toString()
    }
  },
  created() {
    this.initCurrentPath()
    
    // 监听页面切换
    uni.$on('tabChange', this.initCurrentPath)
    // 监听未读消息数量变化
    uni.$on('updateUnreadCount', this.updateUnreadCount)
    
    // 初始化未读消息数量
    this.getUnreadCount()
  },
  beforeDestroy() {
    uni.$off('tabChange', this.initCurrentPath)
    uni.$off('updateUnreadCount', this.updateUnreadCount)
  },
  methods: {
    initCurrentPath() {
      // 获取当前页面路径
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      this.currentPath = '/' + currentPage.route
    },
    
    switchTab(url) {
      if (this.currentPath === url) return
      uni.switchTab({
        url,
        success: () => {
          this.currentPath = url
          uni.$emit('tabChange')
        }
      })
    },
    
    updateUnreadCount(count) {
      this.unreadCount = count
    },
    
    getUnreadCount() {
      this.unreadCount = 5
    }
  },
  onShow() {
    this.initCurrentPath()
  }
}
</script>

<style>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #fff;
  display: flex;
  border-top: 1px solid #eee;
  z-index: 999;
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

.icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 4rpx;
}

.tab-item text {
  margin-top: 4rpx;
}
</style>