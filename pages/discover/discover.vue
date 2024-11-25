<template>
  <scroll-view class="discover-container" scroll-y="true" @scrolltolower="loadMore">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <text class="iconfont icon-filter"></text>
        <input type="text" placeholder="输入你要搜索的型号" />
      </view>
    </view>

    <!-- 商品网格 -->
    <view class="goods-grid">
      <view v-for="(item, index) in 10" :key="index" class="grid-item">
        <image class="item-image" src="/static/default-image.png" mode="aspectFill"></image>
      </view>
    </view>

    <!-- 底部商品列表 -->
    <view class="goods-list">
      <view v-for="(item, index) in goodsList" :key="index" class="goods-item">
        <image class="goods-image" :src="item.image || '/static/default-image.png'" mode="aspectFill"></image>
        <view class="goods-info">
          <text class="price">¥{{ item.price }}</text>
          <text class="time">{{ item.time }}</text>
        </view>
        <text class="desc">{{ item.desc }}</text>
        <view class="status-icon" v-if="item.status">
          <text class="iconfont icon-lightning"></text>
        </view>
      </view>
    </view>

    <!-- 加载更多提示 -->
    <view class="loading-more" v-if="isLoading">
      <text>加载中...</text>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [
        { 
          price: 200, 
          time: '2小时前', 
          desc: '商品描述信息11111', 
          status: true,
          image: '/static/default-image.png'
        },
        // ... 其他商品数据
      ],
      isLoading: false,
      page: 1
    }
  },
  methods: {
    loadMore() {
      if (this.isLoading) return
      this.isLoading = true
      
      // 模拟加载更多数据
      setTimeout(() => {
        const newItems = [...this.goodsList]
        this.goodsList = this.goodsList.concat(newItems)
        this.isLoading = false
        this.page++
      }, 1000)
    }
  }
}
</script>

<style scoped>
.discover-container {
  height: 100vh;
  padding: 20rpx;
  box-sizing: border-box;
}

.search-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  padding: 20rpx 0;
}

.search-input {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
}

.search-input input {
  flex: 1;
  padding: 10rpx;
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10rpx;
  margin: 20rpx 0;
}

.grid-item {
  aspect-ratio: 1;
  border-radius: 8rpx;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.goods-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.goods-item {
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.goods-image {
  width: 100%;
  height: 300rpx;
  object-fit: cover;
}

.goods-info {
  padding: 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff4d4f;
}

.time {
  color: #999;
  font-size: 24rpx;
}

.desc {
  padding: 0 16rpx 16rpx;
  font-size: 26rpx;
  color: #666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.status-icon {
  position: absolute;
  bottom: 16rpx;
  right: 16rpx;
}

.loading-more {
  text-align: center;
  padding: 20rpx 0;
  color: #999;
  font-size: 24rpx;
}
</style>
