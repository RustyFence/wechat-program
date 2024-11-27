<template>
  <view class="selling-container">
    <!-- 商品列表 -->
    <scroll-view 
      class="goods-list" 
      scroll-y 
      @scrolltolower="loadMore"
      :refresher-enabled="true"
      @refresherrefresh="refresh"
    >
      <view class="goods-grid">
        <view 
          class="goods-item" 
          v-for="item in sellingList" 
          :key="item.id"
        >
          <goods-preview :goods="item"></goods-preview>
          <!-- 操作按钮 -->
          <view class="action-bar">
            <button class="action-btn edit" @tap="editGoods(item)">编辑</button>
            <button class="action-btn delete" @tap="deleteGoods(item)">下架</button>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="sellingList.length === 0">
        <image src="/static/icons/empty-selling.png" class="empty-icon"></image>
        <text>还没有在售商品</text>
        <button class="publish-btn" @tap="navigateToPublish">去发布</button>
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
      sellingList: [
        {
          id: 1,
          title: 'MacBook Pro M2',
          price: '12999.00',
          description: '2023年新款，带包装',
          image: '/static/goods/macbook.jpg'
        }
        // ... 更多在售商品
      ]
    }
  },
  methods: {
    editGoods(goods) {
      uni.navigateTo({
        url: `/pages/publish/publish?id=${goods.id}`
      })
    },
    
    deleteGoods(goods) {
      uni.showModal({
        title: '提示',
        content: '确定要下架该商品吗？',
        success: (res) => {
          if (res.confirm) {
            // TODO: 实现下架逻辑
          }
        }
      })
    },
    
    navigateToPublish() {
      uni.switchTab({
        url: '/pages/publish/publish'
      })
    },
    
    loadMore() {
      // TODO: 加载更多在售商品
    },
    
    refresh() {
      // TODO: 刷新在售列表
    }
  },
  navigationBarTitleText: '在售商品'  // 设置原生导航栏标题
}
</script>

<style lang="scss" scoped>
.selling-container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-top: 20rpx;
}

.goods-list {
  height: calc(100vh - 20rpx);
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 20rpx;
}

.goods-item {
  .action-bar {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    background: #fff;
    border-radius: 0 0 8rpx 8rpx;
    margin-top: -8rpx;
    
    .action-btn {
      flex: 1;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 24rpx;
      margin: 0 10rpx;
      
      &.edit {
        background: #007AFF;
        color: #fff;
      }
      
      &.delete {
        background: #fff;
        color: #ff4d4f;
        border: 1px solid #ff4d4f;
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
    margin-bottom: 30rpx;
  }
  
  .publish-btn {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #007AFF;
    color: #fff;
    font-size: 28rpx;
    border-radius: 40rpx;
  }
}
</style> 