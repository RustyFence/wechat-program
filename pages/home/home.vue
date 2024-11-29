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
        <swiper-item v-for="(item, index) in banners" :key="index">
          <image 
            :src="item.src" 
            mode="aspectFit" 
            class="banner-item"
          ></image> 
        </swiper-item>
      </swiper>

      <!-- 分类导航 -->
      <view class="category-nav">
        <view class="category-item" v-for="(item, index) in categories" :key="index">
          <image 
            :src="item.icon" 
            mode="aspectFit"
            class="category-icon"
          ></image>
          <text class="category-text">{{item.name}}</text>
        </view>
      </view>

      <!-- 推荐内容 -->
      <view class="recommend-section">
        <view class="section-title">推荐内容</view>
        <view class="content-grid">
          <view 
            class="grid-item" 
            v-for="(item, index) in goodsList" 
            :key="index"
          >
            <goods-preview :goods="item"></goods-preview>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 使用底部导航栏组件 -->
    <!-- <tab-bar></tab-bar> -->
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
      categories: [
        { name: '热销', icon: '/static/home/热销.svg' },
        { name: '推荐', icon: '/static/home/推荐1.svg' },
        { name: '优惠', icon: '/static/home/优惠.svg' },
        { name: '活动', icon: '/static/home/活动.svg' }
      ],
      goodsList: [
        {
          id: 1,
          title: 'iPhone 14 Pro Max',
          price: '7999.00',
          description: '全新未拆封，256G 暗紫色//测试字数溢出',
          images: ['/static/goods/iphone14.jpg']
        },
        {
          id: 2,
          title: '耐克运动鞋',
          price: '599.00',
          description: 'Nike Air Max 270，9成新',
          images: ['/static/goods/nike.jpg']
        },
        {
          id: 3,
          title: '索尼相机 A7M4',
          price: '15999.00',
          description: '95新，快门数3000次以内',
          images: ['/static/goods/sony.jpg']
        },
        {
          id: 4,
          title: 'MacBook Pro M2',
          price: '12999.00',
          description: '2023年新款，带包装',
          images: ['/static/goods/macbook.jpg']
        },
        {
          id: 5,
          title: '华为手表 GT4',
          price: '1499.00',
          description: '全新未拆封，46mm',
          images: ['/static/goods/watch.jpg']
        },
        {
          id: 6,
          title: 'AirPods Pro 2',
          price: '1299.00',
          description: '99新，带包装盒',
          images: ['/static/goods/airpods.jpg']
        }
      ],
      banners: [
        {name : 'banner1', src : '/static/home/banner/banner1.png'},
        {name : 'banner2', src : '/static/home/banner/banner2.png'},
        {name : 'banner3', src : '/static/home/banner/banner3.png'}
      ]
    }
  },
  methods: {
    goToGoodsInfo(goodsId) {
      uni.navigateTo({
        url: `/pages/goods-info/goods-info?id=${goodsId}`
      })
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
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 10rpx;
    }
    
    .category-text {
      font-size: 24rpx;
      color: #333;
    }
  }
}

.recommend-section {
  background-color: #ffffff;
  padding: 30rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
  }
  
  .content-grid {
    display: flex;
    flex-wrap: wrap;
    
    .grid-item {
      width: 50%;
      padding: 10rpx;
      box-sizing: border-box;
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