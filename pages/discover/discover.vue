<template>
  <view class="discover-container">
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-bar">
        <uni-icons type="search" size="18" color="#666"></uni-icons>
        <input type="text" placeholder="搜索" placeholder-class="search-placeholder"/>
      </view>
    </view>

    <!-- 分类筛选区 -->
    <scroll-view class="filter-section" scroll-x>
      <view class="filter-list">
        <view 
          class="filter-item" 
          v-for="(item, index) in filters" 
          :key="index"
          :class="{ active: currentFilter === index }"
          @click="selectFilter(index)"
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
          v-for="(item, index) in categories" 
          :key="index"
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
          <goods-preview 
            v-for="(item, index) in goodsList" 
            :key="index"
            :goods="item"
          ></goods-preview>
        </view>
      </view>
    </scroll-view>

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
      currentFilter: 0,
      filters: ['全部', '最新', '热门', '附近', '低价', '高价'],
      categories: [
        { name: '数码', icon: '/static/discover/数码.svg' },
        { name: '服装', icon: '/static/discover/服装.svg' },
        { name: '美食', icon: '/static/discover/美食.svg' },
        { name: '图书', icon: '/static/discover/图书.svg' },
        { name: '运动', icon: '/static/discover/运动.svg' },
        { name: '生活', icon: '/static/discover/生活.svg' },
        { name: '居家', icon: '/static/discover/居家.svg' },
        { name: '其他', icon: '/static/discover/其他.svg' }
      ],
      goodsList: [
        {
          id: 7,
          title: '戴森吸尘器 V15',
          price: '3999.00',
          description: '全新未拆封，顺丰包邮',
          images: ['/static/goods/dyson.jpg']
        },
        {
          id: 8,
          title: 'Switch OLED',
          price: '1999.00',
          description: '95新，带两个游戏',
          images: ['/static/goods/switch.jpg']
        },
        {
          id: 9,
          title: 'iPad Pro 12.9',
          price: '6999.00',
          description: '2022款，带妙控键盘',
          images: ['/static/goods/ipad.jpg']
        },
        {
          id: 10,
          title: '索尼降噪耳机',
          price: '1799.00',
          description: 'WH-1000XM5，全新',
          images: ['/static/goods/headphone.jpg']
        },
        {
          id: 11,
          title: '理光GR3x',
          price: '4999.00',
          description: '9成新，带UV镜',
          images: ['/static/goods/camera.jpg']
        },
        {
          id: 12,
          title: '机械键盘',
          price: '899.00',
          description: 'HHKB Pro 3，带包装',
          images: ['/static/goods/keyboard.jpg']
        },
        {
          id: 13,
          title: '显示器',
          price: '2999.00',
          description: 'LG 27寸4K显示器',
          images: ['/static/goods/monitor.jpg']
        },
        {
          id: 14,
          title: '游戏主机',
          price: '3699.00',
          description: 'PS5光驱版，全新',
          images: ['/static/goods/ps5.jpg']
        }
      ]
    }
  },
  methods: {
    selectFilter(index) {
      this.currentFilter = index
      // TODO: 实现筛选逻辑
    }
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
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
