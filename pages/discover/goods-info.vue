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
      goodsId: null,
      goodsImages: [],
      price: '',
      title: '',
      description: '',
      sellerAvatar: '/static/avatar/default.png',
      sellerName: '',
      isCollected: false,
      // 合并 home 和 discover 页面的商品列表
      goodsList: [
        {
          id: 1,
          title: 'iPhone 14 Pro Max',
          price: '7999.00',
          description: '全新未拆封，256G 暗紫色',
          image: '/static/home/goods/iphone14.jpg'
        },
        {
          id: 2,
          title: '耐克运动鞋',
          price: '599.00',
          description: 'Nike Air Max 270，9成新',
          image: '/static/home/goods/nike.jpg'
        },
        {
          id: 3,
          title: '索尼相机 A7M4',
          price: '15999.00',
          description: '95新，快门数3000次以内',
          image: '/static/home/goods/sony.jpg'
        },
        {
          id: 4,
          title: 'MacBook Pro M2',
          price: '12999.00',
          description: '2023年新款，带包装',
          image: '/static/home/goods/macbook.jpg'
        },
        {
          id: 5,
          title: '华为手表 GT4',
          price: '1499.00',
          description: '全新未拆封，46mm',
          image: '/static/home/goods/watch.jpg'
        },
        {
          id: 6,
          title: 'AirPods Pro 2',
          price: '1299.00',
          description: '99新，带包装盒',
          image: '/static/home/goods/airpods.jpg'
        },
        {
          id: 7,
          title: '戴森吸尘器 V15',
          price: '3999.00',
          description: '全新未拆封，顺丰包邮',
          image: '/static/discover/goods/dyson.jpg'
        },
        {
          id: 8,
          title: 'Switch OLED',
          price: '1999.00',
          description: '95新，带两个游戏',
          image: '/static/discover/goods/switch.jpg'
        },
        {
          id: 9,
          title: 'iPad Pro 12.9',
          price: '6999.00',
          description: '2022款，带妙控键盘',
          image: '/static/discover/goods/ipad.jpg'
        },
        {
          id: 10,
          title: '索尼降噪耳机',
          price: '1799.00',
          description: 'WH-1000XM5，全新',
          image: '/static/discover/goods/headphone.jpg'
        },
        {
          id: 11,
          title: '理光GR3x',
          price: '4999.00',
          description: '9成新，带UV镜',
          image: '/static/discover/goods/camera.jpg'
        },
        {
          id: 12,
          title: '机械键盘',
          price: '899.00',
          description: 'HHKB Pro 3，带包装',
          image: '/static/discover/goods/keyboard.jpg'
        },
        {
          id: 13,
          title: '显示器',
          price: '2999.00',
          description: 'LG 27寸4K显示器',
          image: '/static/discover/goods/monitor.jpg'
        },
        {
          id: 14,
          title: '游戏主机',
          price: '3699.00',
          description: 'PS5光驱版，全新',
          image: '/static/discover/goods/ps5.jpg'
        }
      ]
    }
  },
  onLoad(options) {
    // 获取商品ID
    this.goodsId = options.id
    if (!this.goodsId) {
      uni.showToast({
        title: '商品ID无效',
        icon: 'none'
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
      return
    }
    
    this.loadGoodsDetail()
  },
  methods: {
    // 修改加载商品详情方法，从本地goodsList获取数据
    loadGoodsDetail() {
      uni.showLoading({
        title: '加载中...'
      })
      
      // 从本地商品列表查找对应ID的商品
      const goods = this.goodsList.find(item => item.id === Number(this.goodsId))
      
      if (goods) {
        // 更新数据 - 注意image和images的区别
        this.goodsImages = [goods.image] // 将单张图片转换为数组
        this.price = goods.price
        this.title = goods.title
        this.description = goods.description
        // 由于商品列表中没有seller信息，暂时使用默认值
        this.sellerAvatar = '/static/avatar/default.png'
        this.sellerName = '卖家'
        
        uni.hideLoading()
      } else {
        uni.hideLoading()
        uni.showToast({
          title: '商品不存在',
          icon: 'none'
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    },
    
    // 联系卖家
    contactSeller() {
      if (!this.goodsId) {
        uni.showToast({
          title: '商品信息无效',
          icon: 'none'
        })
        return
      }
      
      uni.navigateTo({
        url: `/pages/chat/chat?userId=${this.goodsId}&userName=${this.sellerName}`
      })
    },
    
    // 切换收藏状态
    toggleCollect() {
      // TODO: 调用收藏API
      this.isCollected = !this.isCollected
      uni.showToast({
        title: this.isCollected ? '收藏成功' : '已取消收藏',
        icon: 'success'
      })
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
