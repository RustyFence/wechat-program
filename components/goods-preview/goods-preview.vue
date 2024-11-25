<template>
  <view class="content-item" @click="openGoodsDetail">
    <view class="content-image-wrapper">
      <image :src="goods.image || '/static/goods/default.png'" 
             mode="aspectFill" 
             class="content-image"></image>
      <view class="price-tag">
        <text class="price-symbol">¥</text>
        <text class="price-value">{{goods.price || '0.00'}}</text>
      </view>
    </view>
    <view class="content-info">
      <text class="content-title">{{goods.title || '商品标题'}}</text>
      <text class="content-desc">{{goods.description || '商品描述'}}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'GoodsPreview',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    openGoodsDetail() {
      uni.navigateTo({
        url: `/pages/discover/goods-info?id=${this.goods.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-item {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  
  .content-image-wrapper {
    position: relative;
    height: 120px;
    
    .content-image {
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
    }
    
    .price-tag {
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      padding: 4rpx 12rpx;
      border-radius: 0 8rpx 0 0;
      display: flex;
      align-items: center;
      
      .price-symbol {
        color: #fff;
        font-size: 24rpx;
        margin-right: 2rpx;
      }
      
      .price-value {
        color: #fff;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
  }
  
  .content-info {
    padding: 8px;
    
    .content-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .content-desc {
      font-size: 12px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style> 