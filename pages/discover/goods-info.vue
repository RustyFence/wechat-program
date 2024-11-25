<template>
  <view class="goods-container">
    <!-- 商品图片轮播 -->
    <swiper class="goods-swiper" indicator-dots autoplay circular>
      <swiper-item v-for="(img, index) in goodsImages" :key="index">
        <image :src="img" mode="aspectFill" class="goods-image"></image>
      </swiper-item>
    </swiper>
    
    <!-- 商品信息区域 -->
    <view class="goods-info">
      <!-- 价格和收藏 -->
      <view class="price-row">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="value">{{price}}</text>
        </view>
        <view class="collect-btn" @click="toggleCollect">
          <image :src="isCollected ? '/static/icons/collected.png' : '/static/icons/collect.png'" 
                 class="collect-icon"></image>
          <text :class="['collect-text', { active: isCollected }]">
            {{isCollected ? '已收藏' : '收藏'}}
          </text>
        </view>
      </view>
      
      <!-- 标题 -->
      <view class="title">{{title}}</view>
      
      <!-- 卖家信息 -->
      <view class="seller-info">
        <image :src="sellerAvatar" class="seller-avatar"></image>
        <text class="seller-name">{{sellerName}}</text>
      </view>
      
      <!-- 商品描述 -->
      <view class="description-section">
        <view class="section-title">商品描述</view>
        <view class="description-content">{{description}}</view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <button class="contact-btn" @click="contactSeller">联系卖家</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsImages: [
        '/static/goods/demo1.jpg',
        '/static/goods/demo2.jpg'
      ],
      price: '299.99',
      title: '商品标题示例',
      description: '这是一段商品描述文本，详细介绍商品的各种信息和特点。',
      sellerAvatar: '/static/avatar/default.png',
      sellerName: '卖家昵称',
      isCollected: false
    }
  },
  methods: {
    // 切换收藏状态
    toggleCollect() {
      this.isCollected = !this.isCollected
      uni.showToast({
        title: this.isCollected ? '收藏成功' : '已取消收藏',
        icon: 'success'
      })
    },
    
    // 联系卖家
    contactSeller() {
      uni.navigateTo({
        url: `/pages/chat/chat?userId=${sellerId}&userName=${sellerName}`
      })
    }
  },
  onLoad(options) {
    // 获取商品ID
    const goodsId = options.id
    // TODO: 根据ID获取商品详情
    this.loadGoodsDetail(goodsId)
  },
  methods: {
    loadGoodsDetail(id) {
      // TODO: 实现加载商品详情的逻辑
      console.log('加载商品ID:', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 100rpx;
}

.goods-swiper {
  width: 100%;
  height: 750rpx;
  
  .goods-image {
    width: 100%;
    height: 100%;
  }
}

.goods-info {
  background: #fff;
  padding: 30rpx;
  margin-top: 20rpx;
  
  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    
    .price {
      display: flex;
      align-items: baseline;
      
      .symbol {
        font-size: 32rpx;
        color: #ff4d4f;
        margin-right: 4rpx;
      }
      
      .value {
        font-size: 48rpx;
        color: #ff4d4f;
        font-weight: bold;
      }
    }
    
    .collect-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .collect-icon {
        width: 40rpx;
        height: 40rpx;
        margin-bottom: 4rpx;
      }
      
      .collect-text {
        font-size: 24rpx;
        color: #999;
        
        &.active {
          color: #ff4d4f;
        }
      }
    }
  }
  
  .title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .seller-info {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1px solid #f5f5f5;
    
    .seller-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;
      margin-right: 20rpx;
    }
    
    .seller-name {
      font-size: 28rpx;
      color: #333;
    }
  }
  
  .description-section {
    margin-top: 30rpx;
    
    .section-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }
    
    .description-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
    }
  }
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
  
  .contact-btn {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    background: #007AFF;
    color: #fff;
    border-radius: 40rpx;
    font-size: 32rpx;
  }
}
</style>
