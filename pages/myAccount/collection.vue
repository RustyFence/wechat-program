<template>
  <view class="collection-container">
    <!-- 商品列表 -->
    <scroll-view class="content-area" scroll-y>
      <view class="goods-section">
        <view class="content-grid">
          <goods-preview 
            v-for="(item, index) in collectionList" 
            :key="index"
            :goods="item"
          ></goods-preview>
        </view>
      </view>
    </scroll-view>

    <!-- 空状态提示 -->
    <view class="empty-state" v-if="collectionList.length === 0">
      <image src="/static/empty/empty-collection.png" mode="aspectFit" class="empty-image"></image>
      <text class="empty-text">暂无收藏商品</text>
    </view>
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
          images: ['/static/goods/iphone14.jpg']
        },
        {
          id: 8,
          title: 'Switch OLED',
          price: '1999.00',
          description: '95新，带两个游戏',
          images: ['/static/goods/switch.jpg']
        },
        {
          id: 11,
          title: '理光GR3x',
          price: '4999.00',
          description: '9成新，带UV镜',
          images: ['/static/goods/camera.jpg']
        }
      ]
    }
  },
  methods: {
    // 取消收藏
    removeFromCollection(goodsId) {
      uni.showModal({
        title: '提示',
        content: '确定要取消收藏该商品吗？',
        success: (res) => {
          if (res.confirm) {
            this.collectionList = this.collectionList.filter(item => item.id !== goodsId)
            uni.showToast({
              title: '已取消收藏',
              icon: 'success'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.collection-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding: 20rpx;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
  
  .empty-image {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
  
  .empty-text {
    color: #999;
    font-size: 28rpx;
  }
}
</style> 