<template>
  <view class="collection-container">
    <!-- 商品列表 -->
    <scroll-view 
      class="goods-list" 
      scroll-y 
      @scrolltolower="loadMore"
      :refresher-enabled="true"
      @refresherrefresh="refresh"
    >
      <view class="goods-grid">
        <goods-preview 
          v-for="item in collectionList" 
          :key="item.id"
          :goods="item"
        ></goods-preview>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="collectionList.length === 0">
        <image src="/static/icons/empty-collection.png" class="empty-icon"></image>
        <text>还没有收藏任何商品</text>
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
      collectionList: [
        {
          id: 1,
          title: 'iPhone 14 Pro Max',
          price: '7999.00',
          description: '全新未拆封，256G 暗紫色',
          image: '/static/goods/iphone.jpg'
        },
        {
          id: 2,
          title: '耐克运动鞋',
          price: '599.00',
          description: 'Nike Air Max 270，9成新',
          image: '/static/goods/nike.jpg'
        }
        // ... 更多收藏商品
      ]
    }
  },
  methods: {
    loadMore() {
      // TODO: 加载更多收藏商品
    },
    
    refresh() {
      // TODO: 刷新收藏列表
    }
  },
  navigationBarTitleText: '我的收藏'  // 设置原生导航栏标题
}
</script>

<style lang="scss" scoped>
.collection-container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-top: 20rpx; /* 添加顶部间距 */
}

.goods-list {
  height: calc(100vh - 20rpx); /* 调整高度，减去顶部间距 */
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 20rpx;
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