<template>
  <view class="content-item" @click.stop="goToGoodsInfo">
    <view class="content-image-wrapper">
      <image :src="goods.images?.[0] || goods.image || '/static/goods/default.png'" 
             mode="aspectFill" 
             class="content-image"></image>
      <view class="price-tag">
        <text class="price-symbol">¥</text>
        <text class="price-value">{{goods.price || '0.00'}}</text>
      </view>
    </view>
    <view class="content-info">
      <text class="content-title text-ellipsis">{{goods.title || '商品标题'}}</text>
      <text class="content-desc text-ellipsis">{{goods.description || '商品描述'}}</text>
      <text class="content-date">{{ formatDate(goods.updateAt) }}</text>
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
    goToGoodsInfo() {
      uni.navigateTo({
        url: `/pages/goods-info/goods-info?id=${this.goods.goodsId}`
      })
    },
    formatDate(dateString) {
      if (!dateString) return '未知时间';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
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
    }
    
    .content-desc {
      font-size: 12px;
      color: #666;
    }

    .content-date {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
}
</style> 