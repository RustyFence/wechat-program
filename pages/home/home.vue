<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar"></view>
    
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-bar">
        <uni-icons type="search" size="18" color="#666"></uni-icons>
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
          <goods-preview 
            v-for="(item, index) in goodsList" 
            :key="index"
            :goods="item"
          ></goods-preview>
        </view>
      </view>
    </scroll-view>

    <!-- 使用底部导航栏组件 -->
    <tab-bar></tab-bar>
  </view>
</template>

<script>
import TabBar from '@/components/tab-bar/tab-bar.vue'
import GoodsPreview from '@/components/goods-preview/goods-preview.vue'

export default {
  components: {
    TabBar,
    GoodsPreview
  },
  data() {
    return {
      goodsList: [
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
        },
        {
          id: 3,
          title: '索尼相机 A7M4',
          price: '15999.00',
          description: '95新，快门数3000次以内',
          image: '/static/goods/sony.jpg'
        },
        {
          id: 4,
          title: 'MacBook Pro M2',
          price: '12999.00',
          description: '2023年新款，带包装',
          image: '/static/goods/macbook.jpg'
        },
        {
          id: 5,
          title: '华为手表 GT4',
          price: '1499.00',
          description: '全新未拆封，46mm',
          image: '/static/goods/watch.jpg'
        },
        {
          id: 6,
          title: 'AirPods Pro 2',
          price: '1299.00',
          description: '99新，带包装盒',
          image: '/static/goods/airpods.jpg'
        }
      ]
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
  padding-bottom: 50px; /* 为系统tabBar预留空间 */
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
  
  input {
    flex: 1;
    font-size: 14px;
    margin-left: 8px;
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
        }
        
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

/* 添加一个默认的图标字体样式 */
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1234567_abcdefg.ttf') format('truetype');
}

.iconfont {
  font-family: 'iconfont';
}
</style>