<template>
  <view class="collection-container">
    <!-- 商品列表 -->
    <scroll-view class="content-area" scroll-y>
      <view class="goods-section">
        <view class="content-grid">
          <goods-preview 
            v-for="(item, index) in collectionList" 
            :key="item.goodsId"
            :goods="item"
            @remove="removeFromCollection(item.goodsId)"
          ></goods-preview>
        </view>
      </view>
    </scroll-view>

    <!-- 空状态提示 -->
    <view class="empty-state" v-if="collectionList.length === 0">
      <image src="/static/empty/empty-collection.png" mode="aspectFit" class="empty-image"></image>
      <text class="empty-text">暂无收藏商品</text>
    </view>
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
      collectionList: []
    }
  },
  mounted() {
    this.loadCollection();
  },
  methods: {
    async loadCollection() {
      try {
        const res = await uni.request({
          url: '/api/favorites',
          method: 'GET',
          header: {
            Authorization: 'Bearer ' + uni.getStorageSync('token')
          }
        });

        if (res.data.code === 200) {
          this.collectionList = res.data.data.map(item => ({
            ...item,
            images: JSON.parse(item.images)
          }));
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取收藏列表失败:', error);
        uni.showToast({
          title: '获取收藏列表失败',
          icon: 'none'
        });
      }
    },

    async removeFromCollection(goodsId) {
      uni.showModal({
        title: '提示',
        content: '确定要取消收藏该商品吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              const response = await uni.request({
                url: `/api/favorites/${goodsId}`,
                method: 'DELETE',
                header: {
                  Authorization: 'Bearer ' + uni.getStorageSync('token')
                }
              });

              if (response.data.code === 204) {
                uni.showToast({
                  title: '已取消收藏',
                  icon: 'success'
                });
                this.loadCollection(); // Refresh the list
              } else {
                uni.showToast({
                  title: response.data.msg,
                  icon: 'none'
                });
              }
            } catch (error) {
              console.error('取消收藏失败:', error);
              uni.showToast({
                title: '取消收藏失败',
                icon: 'none'
              });
            }
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
.collection-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding: 20rpx;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
  
  .empty-image {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
  
  .empty-text {
    color: #999;
    font-size: 28rpx;
  }
}
</style> 