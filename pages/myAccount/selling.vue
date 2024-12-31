<template>
  <view class="selling-container">
    <!-- 商品列表 -->
    <scroll-view 
      class="goods-list" 
      scroll-y 
      @scrolltolower="loadMore"
      :refresher-enabled="true"
      @refresherrefresh="refresh"
    >
      <view class="goods-grid">
        <view 
          class="goods-item" 
          v-for="item in sellingList" 
          :key="item.goodsId"
        >
          <goods-preview :goods="item"></goods-preview>
          <!-- 操作按钮 -->
          <view class="action-bar">
            <button class="action-btn edit" @tap="editGoods(item)">编辑</button>
            <button class="action-btn delete" @tap="deactivateGoods(item)">下架</button>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="sellingList.length === 0">
        <image src="/static/icons/empty-selling.png" class="empty-icon"></image>
        <text>还没有在售商品</text>
        <button class="publish-btn" @tap="navigateToPublish">去发布</button>
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
      sellingList: [],
      publisherId: uni.getStorageSync('userId') // 当前用户ID为发布者ID
    }
  },
  mounted() {
    this.loadSellingGoods();
    uni.$on('refreshSellingList', this.loadSellingGoods);
  },
  beforeDestroy() {
    uni.$off('refreshSellingList', this.loadSellingGoods);
  },
  methods: {
    async loadSellingGoods() {
      try {
        const res = await uni.request({
          url: `${apiUrl}/goods/myGoods`,
          method: 'GET',
          header: {
            Authorization: `Bearer ${uni.getStorageSync('token')}`
          }
        });

        if (res.data.code === 200) {
          // 解析 images 和 tags 字段
          const parsedData = res.data.data.map(item => ({
            ...item,
            images: JSON.parse(item.images),
            tags: JSON.parse(item.tags)
          }));
          this.sellingList = parsedData.filter(goods => goods.isActive);
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取在售商品失败:', error);
        uni.showToast({
          title: '获取在售商品失败',
          icon: 'none'
        });
      }
    },

    async editGoods(goods) {
      uni.navigateTo({
        url: `/pages/myAccount/edit?goodsId=${goods.goodsId}`
      });
    },
    
    async deactivateGoods(goods) {
      uni.showModal({
        title: '提示',
        content: '确定要下架该商品吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              const response = await uni.request({
                url: `${apiUrl}/goods/${goods.goodsId}`,
                method: 'PUT',
                header: {
                  Authorization: 'Bearer ' + uni.getStorageSync('token')
                },
                data: { isActive: false }
              });

              if (response.data.code === 204) {
                uni.showToast({
                  title: '商品已下架',
                  icon: 'success'
                });
                this.loadSellingGoods(); // Refresh the list
              } else {
                uni.showToast({
                  title: response.data.msg,
                  icon: 'none'
                });
              }
            } catch (error) {
              console.error('下架商品失败:', error);
              uni.showToast({
                title: '下架商品失败',
                icon: 'none'
              });
            }
          }
        }
      });
    },
    
    navigateToPublish() {
      uni.switchTab({
        url: '/pages/publish/publish'
      });
    },
    
    loadMore() {
      // TODO: 加载更多在售商品
    },
    
    refresh() {
      this.loadSellingGoods();
    }
  },
  navigationBarTitleText: '在售商品'  // 设置原生导航栏标题
}
</script>

<style lang="scss" scoped>
.selling-container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-top: 20rpx;
}

.goods-list {
  height: calc(100vh - 20rpx);
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 20rpx;
}

.goods-item {
  background: #fff;
  border-radius: 8rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);

  .action-bar {
    display: flex;
    justify-content: space-between;
    padding: 10rpx;
    background: #f5f5f5;
    
    .action-btn {
      flex: 1;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 24rpx;
      margin: 0 5rpx;
      
      &.edit {
        background: #007AFF;
        color: #fff;
      }
      
      &.delete {
        background: #fff;
        color: #ff4d4f;
        border: 1px solid #ff4d4f;
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
  
  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
  
  text {
    font-size: 28rpx;
    color: #999;
    margin-bottom: 30rpx;
  }
  
  .publish-btn {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #007AFF;
    color: #fff;
    font-size: 28rpx;
    border-radius: 40rpx;
  }
}

.content-item {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  
  .content-image-wrapper {
    position: relative;
    height: 120px; // 确保高度足够显示图片
    
    .content-image {
      width: 100%;
      height: 100%;
      background-color: #e0e0e0; // 确保背景色不会影响图片显示
    }
  }
}
</style> 