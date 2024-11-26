<template>
  <view class="sold-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <uni-icons type="back" size="24" color="#333"></uni-icons>
      </view>
      <view class="title">已下架</view>
    </view>
    
    <!-- 商品列表 -->
    <scroll-view 
      class="goods-list" 
      scroll-y 
      @scrolltolower="loadMore"
      :refresher-enabled="true"
      @refresherrefresh="refresh"
    >
      <view class="sold-list">
        <view 
          class="sold-item" 
          v-for="item in soldList" 
          :key="item.id"
        >
          <goods-preview :goods="item"></goods-preview>
          <view class="sold-info">
            <text class="sold-time">下架时间：{{item.soldTime}}</text>
            <button class="relist-btn" @tap="relistGoods(item)">重新上架</button>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="soldList.length === 0">
        <image src="/static/icons/empty-sold.png" class="empty-icon"></image>
        <text>还没有下架的商品</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import GoodsPreview from '@/components/goods-preview/goods-preview.vue'

export default {
  components: {
    GoodsPreview
  },
  data() {
    return {
      soldList: [
        {
          id: 1,
          title: 'AirPods Pro 2',
          price: '1299.00',
          description: '99新，带包装盒',
          image: '/static/goods/airpods.jpg',
          soldTime: '2024-03-20 15:30'
        }
        // ... 更多下架商品
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    
    // 重新上架商品
    relistGoods(goods) {
      uni.showModal({
        title: '提示',
        content: '确定要重新上架该商品吗？',
        success: (res) => {
          if (res.confirm) {
            // TODO: 实现重新上架逻辑
            uni.showToast({
              title: '上架成功',
              icon: 'success'
            })
          }
        }
      })
    },
    
    loadMore() {
      // TODO: 加载更多下架商品
    },
    
    refresh() {
      // TODO: 刷新下架列表
    }
  }
}
</script>

<style lang="scss" scoped>
.sold-container {
  min-height: 100vh;
  background: #f8f8f8;
}

.nav-bar {
  height: 88rpx;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  position: relative;
  
  .back-btn {
    padding: 20rpx;
    margin-left: -20rpx;
  }
  
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32rpx;
    font-weight: 500;
  }
}

.goods-list {
  height: calc(100vh - 88rpx);
}

.sold-list {
  padding: 20rpx;
  
  .sold-item {
    margin-bottom: 20rpx;
    
    .sold-info {
      background: #fff;
      padding: 20rpx;
      border-radius: 0 0 8rpx 8rpx;
      margin-top: -8rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24rpx;
      
      .sold-time {
        color: #666;
      }
      
      .relist-btn {
        margin: 0;
        padding: 0 20rpx;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 24rpx;
        background: #007AFF;
        color: #fff;
        border-radius: 24rpx;
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
  
  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
  
  text {
    font-size: 28rpx;
    color: #999;
  }
}
</style> 