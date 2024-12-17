<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar"></view>

    <!-- 内容区域 -->
    <scroll-view 
      class="content-area" 
      scroll-y 
      @scrolltolower="loadMore"
      style="height: 90vh;"
    >
        <!-- 搜索框 -->
        <view class="search-box" >
      <view class="search-bar">
        <uni-icons type="search" size="18" color="#666"></uni-icons>
        <input type="text" placeholder="搜索" placeholder-class="search-placeholder"/>
      </view>
    </view>
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
            <goods-preview :goods="item" v-if="item.isActive"></goods-preview>
          </view>
        </view>
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
      categories: [
        { name: '热销', icon: '/static/home/热销.svg' },
        { name: '推荐', icon: '/static/home/推荐1.svg' },
        { name: '优惠', icon: '/static/home/优惠.svg' },
        { name: '活动', icon: '/static/home/活动.svg' }
      ],
      goodsList: [],
      currentPage: 1,
      loading: false,
      banners: [
        {name : 'banner1', src : '/static/home/banner/banner1.png'},
        {name : 'banner2', src : '/static/home/banner/banner2.png'},
        {name : 'banner3', src : '/static/home/banner/banner3.png'}
      ]
    }
  },
  methods: {
    async loadGoodsList() {
      if (this.loading) return;
      this.loading = true;
      try {
        const res = await uni.request({
          url: `/api/goods?tags=home${this.currentPage}`,
          method: 'GET',
        });
        if (res.data.code === 200) {
          // 解析 images 和 tags 字段
          const parsedData = res.data.data.map(item => ({
            ...item,
            images: JSON.parse(item.images),
            tags: JSON.parse(item.tags)
          }));
          if (parsedData.length === 0) {
            uni.showToast({
              title: '没有更多商品了',
              icon: 'none'
            });
          }else{
            this.goodsList = [...this.goodsList, ...parsedData.filter(goods => goods.isActive)];
            this.currentPage++;
          } 
        } else {
          console.log(res);
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取商品列表失败:', error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    loadMore() {
      console.log('request page:home'+this.currentPage);
      this.loadGoodsList();
    }
  },
  onLoad() {
    this.loadGoodsList();
  }
}
</script>

<style lang="scss">s

.container {
  min-height: 100vh;
  height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
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