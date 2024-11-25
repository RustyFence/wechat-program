<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar"></view>
    
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-bar">
        <image src="/static/icons/search.png" class="search-icon"></image>
        <input type="text" placeholder="搜索" placeholder-class="search-placeholder"/>
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-area" scroll-y>
      <!-- 轮播图 -->
      <swiper class="banner" indicator-dots autoplay circular>
        <swiper-item v-for="(item, index) in 3" :key="index">
          <view class="banner-item"></view>
        </swiper-item>
      </swiper>

      <!-- 分类导航 -->
      <view class="category-nav">
        <view class="category-item" v-for="(item, index) in 4" :key="index">
          <view class="category-icon"></view>
          <text class="category-text">分类{{index + 1}}</text>
        </view>
      </view>

      <!-- 推荐内容 -->
      <view class="recommend-section">
        <view class="section-title">推荐内容</view>
        <view class="content-grid">
          <view class="content-item" v-for="(item, index) in 6" :key="index">
            <view class="content-image"></view>
            <view class="content-info">
              <text class="content-title">标题{{index + 1}}</text>
              <text class="content-desc">描述文本</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部导航栏 -->
    <view class="nav-bar">
      <view class="nav-item" v-for="(item, index) in navItems" :key="index" @click="navigateTo(item.page)">
        <image :src="item.icon" class="nav-icon"></image>
        <text :class="['nav-text', currentPage === item.page ? 'active' : '']">{{item.text}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 'home',
      navItems: [
        { text: '发现', icon: '/static/icons/discover.png', page: 'discover' },
        { text: '发布', icon: '/static/icons/publish.png', page: 'publish' },
        { text: '消息', icon: '/static/icons/message.png', page: 'message' },
        { text: '我的', icon: '/static/icons/account.png', page: 'account' }
      ]
    }
  },
  methods: {
    navigateTo(page) {
      uni.navigateTo({
        url: `/pages/${page}/${page}`
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.status-bar {
  height: var(--status-bar-height);
  background-color: #ffffff;
}

.search-box {
  background-color: #ffffff;
  padding: 10px 15px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 8px 15px;
  
  .search-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  
  input {
    flex: 1;
    font-size: 14px;
  }
}

.content-area {
  flex: 1;
  overflow: hidden;
}

.banner {
  height: 150px;
  
  .banner-item {
    width: 100%;
    height: 100%;
    background-color: #e0e0e0;
  }
}

.category-nav {
  display: flex;
  padding: 15px;
  background-color: #ffffff;
  margin: 10px 0;
  
  .category-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .category-icon {
      width: 40px;
      height: 40px;
      background-color: #e0e0e0;
      border-radius: 50%;
      margin-bottom: 5px;
    }
    
    .category-text {
      font-size: 12px;
      color: #333;
    }
  }
}

.recommend-section {
  background-color: #ffffff;
  padding: 15px;
  
  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    
    .content-item {
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      
      .content-image {
        height: 120px;
        background-color: #e0e0e0;
      }
      
      .content-info {
        padding: 8px;
        
        .content-title {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 4px;
        }
        
        .content-desc {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}

.nav-bar {
  height: 50px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .nav-icon {
      width: 24px;
      height: 24px;
      margin-bottom: 2px;
    }
    
    .nav-text {
      font-size: 12px;
      color: #666;
      
      &.active {
        color: #007AFF;
      }
    }
  }
}

// 适配底部安全区
.nav-bar {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>