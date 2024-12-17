<template>
  <view class="sold-container">
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
          v-for="item in soldList" 
          :key="item.goodsId"
        >
          <goods-preview :goods="item"></goods-preview>
          <!-- 操作按钮 -->
          <view class="action-bar">
            <button class="action-btn relist" @tap="relistGoods(item)">重新上架</button>
            <button class="action-btn delete" @tap="deleteGoods(item)">删除</button>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="soldList.length === 0">
        <image src="/static/icons/empty-sold.png" class="empty-icon"></image>
        <text>还没有已下架商品</text>
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
      soldList: [],
      publisherId: uni.getStorageSync('userId') // 当前用户ID为发布者ID
    }
  },
  mounted() {
    this.loadSoldGoods();
    uni.$on('refreshSoldList', this.loadSoldGoods);
  },
  beforeDestroy() {
    uni.$off('refreshSoldList', this.loadSoldGoods);
  },
  methods: {
    async loadSoldGoods() {
      try {
        const res = await uni.request({
          url: '/api/goods/myGoods',
          method: 'GET',
          header: {
            Authorization: 'Bearer ' + uni.getStorageSync('token')
          }
        });

        if (res.data.code === 200) {
          // 解析 images 和 tags 字段
          const parsedData = res.data.data.map(item => ({
            ...item,
            images: JSON.parse(item.images),
            tags: JSON.parse(item.tags)
          }));
          this.soldList = parsedData.filter(goods => !goods.isActive);
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取已下架商品失败:', error);
        uni.showToast({
          title: '获取已下架商品失败',
          icon: 'none'
        });
      }
    },

    async relistGoods(goods) {
      uni.showModal({
        title: '提示',
        content: '确定要重新上架该商品吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              const response = await uni.request({
                url: `/api/goods/${goods.goodsId}`,
                method: 'PUT',
                header: {
                  Authorization: 'Bearer ' + uni.getStorageSync('token')
                },
                data: { isActive: true }
              });

              if (response.data.code === 204) {
                uni.showToast({
                  title: '商品已重新上架',
                  icon: 'success'
                });
                this.loadSoldGoods(); // Refresh the list
              } else {
                uni.showToast({
                  title: response.data.msg,
                  icon: 'none'
                });
              }
            } catch (error) {
              console.error('重新上架商品失败:', error);
              uni.showToast({
                title: '重新上架商品失败',
                icon: 'none'
              });
            }
          }
        }
      });
    },

    async deleteGoods(goods) {
      uni.showModal({
        title: '提示',
        content: '确定要删除该商品吗？此操作不可撤销。',
        success: async (res) => {
          if (res.confirm) {
            try {
              const response = await uni.request({
                url: `/api/goods/${goods.goodsId}`,
                method: 'DELETE',
                header: {
                  Authorization: 'Bearer ' + uni.getStorageSync('token')
                }
              });

              if (response.data.code === 204) {
                uni.showToast({
                  title: '商品已删除',
                  icon: 'success'
                });
                this.loadSoldGoods(); // Refresh the list
              } else {
                uni.showToast({
                  title: response.data.msg,
                  icon: 'none'
                });
              }
            } catch (error) {
              console.error('删除商品失败:', error);
              uni.showToast({
                title: '删除商品失败',
                icon: 'none'
              });
            }
          }
        }
      });
    },
    
    loadMore() {
      // TODO: 加载更多已下架商品
    },
    
    refresh() {
      this.loadSoldGoods();
    }
  },
  navigationBarTitleText: '已下架商品'  // 设置原生导航栏标题
}
</script>

<style lang="scss" scoped>
.sold-container {
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
      
      &.relist {
        background: #28a745;
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
}
</style> 