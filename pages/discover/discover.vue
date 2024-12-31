<template>
  <view class="discover-container">
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-bar">
        <uni-icons type="search" size="18" color="#666"></uni-icons>
        <input type="text" placeholder="搜索" placeholder-class="search-placeholder" v-model="keywords" @input="loadGoodsList"/>
      </view>
    </view>

    <!-- 分类筛选区 -->
    <scroll-view class="filter-section" scroll-x>
      <view class="filter-list">
        <view 
          class="filter-item" 
          v-for="(item) in filters" 
          :key="item"
          :class="{ active: currentFilter === item }"
          @click="selectFilter(item)"
        >
          {{ item }}
        </view>
      </view>
    </scroll-view>

    <!-- 内容区域 -->
    <scroll-view class="content-area" scroll-y>
      <!-- 分区导航 -->
      <view class="category-nav">
        <view 
          class="category-item" 
          v-for="(item) in categories" 
          :key="item.name"
          @click="selectCategory(item.name)"  
        >
          <image 
            :src="item.icon" 
            mode="aspectFit"
            class="category-icon"
          ></image>
          <text class="category-text">{{item.name}}</text>
        </view>
      </view>

      <!-- 商品列表 -->
      <view class="goods-section">
        <view class="content-grid">
          <view 
            class="grid-item" 
            v-for="(item, index) in goodsList" 
            :key="item.goodsId"
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
import { apiUrl } from '@/config.js';

export default {
  components: {
    GoodsPreview
  },
  data() {
    return {
      keywords: '',
      currentFilter: '',
      currentCategory: '',
      filters: ['全部', '最新', '低价', '高价', '热门', '附近'],
      categories: [
        { name: '数码', icon: 'http://101.34.249.254:8080/ui/discover/数码.svg' },
        { name: '服装', icon: 'http://101.34.249.254:8080/ui/discover/服装.svg' },
        { name: '美食', icon: 'http://101.34.249.254:8080/ui/discover/美食.svg' },
        { name: '图书', icon: 'http://101.34.249.254:8080/ui/discover/图书.svg' },
        { name: '运动', icon: 'http://101.34.249.254:8080/ui/discover/运动.svg' },
        { name: '生活', icon: 'http://101.34.249.254:8080/ui/discover/生活.svg' },
        { name: '居家', icon: 'http://101.34.249.254:8080/ui/discover/居家.svg' },
        { name: '其他', icon: 'http://101.34.249.254:8080/ui/discover/其他.svg' }
      ],
      goodsList: [] // 初始化为空数组
    }
  },
  methods: {
    selectFilter(item) {
      this.currentFilter = item;
      if (item === '全部') {
        this.currentCategory = '';
        this.loadGoodsList();
      } else if (item === '最新') {
        this.goodsList = this.goodsList.sort((a, b) => {
          const timeA = new Date(a.updateAt).getTime() || 0;
          const timeB = new Date(b.updateAt).getTime() || 0;
          return timeB - timeA;
        });
      } else if (item === '低价') {
        this.goodsList = this.goodsList.sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return priceA - priceB;
        });
      } else if (item === '高价') {
        this.goodsList = this.goodsList.sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return priceB - priceA;
        });
      }
      console.log('筛选后的商品列表:', this.goodsList);
    },
    selectCategory(name) {
      this.currentCategory = name
      this.loadGoodsList()
    },
    async loadGoodsList() {
      try {
        const res = await uni.request({
          url: `${apiUrl}/goods?keywords=${this.keywords}&tags=${this.currentCategory}`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          }
        });
        if (res.data.code === 200) {
          const parsedData = res.data.data.map(item => ({
            ...item,
            images: JSON.parse(item.images),
            tags: JSON.parse(item.tags),
          }));
          this.goodsList = parsedData.filter(goods => goods.isActive);
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取商品列表失败:', error);
      }
    }
  },
  onLoad() {
    this.loadGoodsList();
  }
}
</script>

<style lang="scss">
.discover-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
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

.filter-section {
  background: #fff;
  padding: 10px 0;
  white-space: nowrap;
  width: 100%;
  
  .filter-list {
    display: inline-flex;
    padding: 0 15px;
    flex-wrap: nowrap;
    width: auto;
  }
  
  .filter-item {
    display: inline-block;
    padding: 6px 16px;
    margin-right: 10px;
    font-size: 14px;
    color: #666;
    background: #f5f5f5;
    border-radius: 16px;
    white-space: nowrap;
    
    &:last-child {
      margin-right: 0;
    }
    
    &.active {
      color: #fff;
      background: #007AFF;
    }
  }
}

.category-nav {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
  background: #fff;
  
  .category-item {
    width: 25%; // 每行4个
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 0;
    
    
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

.goods-section {
  background-color: #ffffff;
  padding: 15px;

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



</style>
