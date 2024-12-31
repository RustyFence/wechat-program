<template>
  <view class="container">
    <!-- 商品基本信息部分 -->
    <view class="goods-info">
      <swiper class="goods-swiper" indicator-dots autoplay circular>
        <swiper-item v-for="(img, index) in goods.images" :key="index">
          <image :src="img" mode="aspectFill" class="goods-image"></image>
        </swiper-item>
      </swiper>
      
      <view class="goods-detail">
        <view class="price">¥{{ goods.price }}</view>
        <view class="title">{{ goods.title }}</view>
        <view class="description">{{ goods.description }}</view>
      </view>
    </view>

    <!-- 发布者信息 -->
    <view class="publisher-info">
      <image :src="goods.publisherAvatar" class="publisher-avatar"></image>
      <text class="publisher-name">{{ goods.publisherName }}</text>
      <text class="publisher-phone">{{ goods.publisherPhone }}</text>
      <text class="publisher-email">{{ goods.publisherEmail }}</text>
    </view>

    <!-- 评价区域 -->
    <view class="comment-section">
      <view class="comment-header">
        <text class="section-title">商品评价</text>
        <text class="comment-count">({{ comments.length }}条评价)</text>
        <view class="overall-rating">
          <text class="rating-text">综合评分</text>
          <view class="stars">
            <uni-rate :value="averageRating" disabled size="15" />
          </view>
          <text class="rating-value">{{ formattedRating }}</text>
        </view>
      </view>

      <!-- 评论列表 -->
      <view class="comment-list">
        <view v-for="(comment, index) in comments" :key="index" class="comment-item">
          <view class="comment-user">
            <image :src="comment.avatar" class="user-avatar"></image>
            <view class="user-info">
              <text class="user-name">{{ comment.username }}</text>
              <uni-rate :value="comment.rating" disabled size="12" />
            </view>
            <text class="comment-time">{{ formatDate(comment.createdAt) }}</text>
          </view>
          <view class="comment-content">{{ comment.content }}</view>
          
          <!-- 删除评论按钮 -->
          <button 
            v-if="comment.username === currentUser"
            class="delete-comment-btn" 
            @click="deleteComment(comment.commentId)"
          >删除</button>
        </view>
      </view>

      <!-- 写评论按钮 -->
      <view class="comment-button" @tap="showCommentModal">
        <button type="primary">写评价</button>
      </view>
    </view>

    <!-- 评论弹窗 -->
    <uni-popup ref="commentPopup" type="bottom">
      <view class="comment-popup">
        <view class="popup-header">
          <text>发表评价</text>
          <text class="close-btn" @tap="closeCommentModal">×</text>
        </view>
        <view class="rating-input">
          <text>商品评分</text>
          <uni-rate v-model="userRating" />
        </view>
        <textarea 
          v-model="userComment" 
          placeholder="请输入您的评价内容..."
          class="comment-textarea"
        />
        <button @tap="submitComment" type="primary">提交评价</button>
      </view>
    </uni-popup>

    <!-- 添加收藏按钮 -->
    <view class="action-buttons">
      <button 
        class="collect-btn" 
        :class="{ active: isCollected }"
        @tap="toggleCollect"
      >
        <uni-icons :type="isCollected ? 'star-filled' : 'star'" size="20"></uni-icons>
        <text>{{ isCollected ? '已收藏' : '收藏' }}</text>
      </button>
      
      <button 
        class="contact-btn" 
        @tap="contactSeller"
      >
        <uni-icons type="chat" size="20"></uni-icons>
        <text>联系卖家</text>
      </button>
    </view>
  </view>
</template>

<script>
import { apiUrl } from '@/config.js';

export default {
  data() {
    return {
      goods: {
        goodsId : '',
        title: '',
        price: '',
        description: '',
        images: [],
        publisherId: '',
        publisherName: '',
        updateAt: ''
      },
      currentUser:uni.getStorageSync('userName'),
      comments: [],
      userRating: 5,
      userComment: '',
      averageRating: 0,
      isCollected: false
    }
  },
  computed: {
    formattedRating() {
      return Number(this.averageRating).toFixed(1)
    }
  },
  onLoad(options) {
    const goodsId = options.id
    this.loadGoodsInfo(goodsId)
    this.checkIfCollected(goodsId)
  },
  methods: {
    async loadGoodsInfo(id) {
      try {
        const res = await uni.request({
          url: `${apiUrl}/goods/${id}`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          }
        })
        if (res.data.code === 200) {  

          const goodsInfo = res.data.data  
          this.goods = { ...goodsInfo,
            images: JSON.parse(goodsInfo.images),
            tags: JSON.parse(goodsInfo.tags),
           }
           console.log(this.goods)
          // 获取商品评论
          this.loadComments(id)
        } else {
          uni.showToast({
            title: res.data.message,  
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('获取商品信息失败:', error)
        uni.showToast({
          title: '获取商品信息失败',
          icon: 'none'
        })
      }
    },
    
    
    async loadComments(goodsId) {
      try {
        const res = await uni.request({
          url: `${apiUrl}/goods/${goodsId}/comments`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          }
        })
        if (res.data.code === 200) {
          this.comments = res.data.data
          this.calculateAverageRating()
        }
      } catch (error) {
        console.error('获取评论失败:', error)
      }
    },
    showCommentModal() {
      this.$refs.commentPopup.open()
    },
    closeCommentModal() {
      this.$refs.commentPopup.close()
    },
    async submitComment() {
      if (!this.userComment.trim()) {
        uni.showToast({
          title: '请输入评价内容',
          icon: 'none'
        })
        return
      }
      try {
        const res = await uni.request({
          url: `${apiUrl}/comments`,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          },
          data: {
            goodsId: this.goods.goodsId,
            content: this.userComment,
            rating: this.userRating
          }
        })
        if (res.data.code === 201) {
          // 清空输入并关闭弹窗
          this.userComment = ''
          this.userRating = 5
          this.closeCommentModal()

          uni.showToast({
            title: '评价成功',
            icon: 'success'
          })
          this.loadComments(this.goods.goodsId)
        } else {
          uni.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('添加评论失败:', error)
        uni.showToast({
          title: '添加评论失败',
          icon: 'none'
        })
      }
    },
    async deleteComment(commentId) {
      try {
        const res = await uni.request({
          url: `${apiUrl}/comments/${commentId}`,
          method: 'DELETE',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          }
        })
        console.log(res)
        if (res.data.code === 204) {
          uni.showToast({
            title: '评论已删除',
            icon: 'success'
          })
          this.loadComments(this.goods.goodsId) // 重新加载评论列表
        } else {
          uni.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('删除评论失败:', error)
        uni.showToast({
          title: '删除评论失败',
          icon: 'none'
        })
      }
    },
    calculateAverageRating() {
      if (this.comments.length === 0) {
        this.averageRating = 0
        return
      }
      const sum = this.comments.reduce((acc, curr) => acc + curr.rating, 0)
      this.averageRating = Number((sum / this.comments.length).toFixed(1))
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async checkIfCollected(goodsId) {
      try {
        const res = await uni.request({
          url: `${apiUrl}/favorites`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          }
        })
        if (res.data.code === 200) {
          this.isCollected = res.data.data.some(item => item.goodsId === this.goods.goodsId)
        }
      } catch (error) {
        console.error('检查收藏状态失败:', error)
      }
    },
    // 切换收藏状态
    async toggleCollect() {
      if (this.isCollected) {
        // 取消收藏
        try {
          const res = await uni.request({
            url: `${apiUrl}/favorites/${this.goods.goodsId}`,
            method: 'DELETE',
            header: {
              'Authorization': `Bearer ${uni.getStorageSync('token')}`
            }
          });
          if (res.data.code === 204) {
            this.isCollected = false;
            uni.showToast({
              title: '已取消收藏',
              icon: 'success'
            });
          }
        } catch (error) {
          console.error('取消收藏失败:', error);
          uni.showToast({
            title: '取消收藏失败',
            icon: 'none'
          });
        }
      } else {
        // 添加收藏
        try {
          const res = await uni.request({
            url: `${apiUrl}/favorites`,
            method: 'POST',
            header: {
              'Authorization': `Bearer ${uni.getStorageSync('token')}`
            },
            data: {
              goodsId: this.goods.goodsId
            }
          });
          if (res.data.code === 201) {
            this.isCollected = true;
            uni.showToast({
              title: '收藏成功',
              icon: 'success'
            });
          }
        } catch (error) {
          console.error('收藏失败:', error);
          uni.showToast({
            title: '收藏失败',
            icon: 'none'
          });
        }
      }
    },
    contactSeller() {
      uni.navigateTo({
        url: `/pages/message/chat?oppoUserId=${this.goods.publisherId}`
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  padding-bottom: 100rpx;
}

@mixin flex-center {
  display: flex;
  align-items: center;
}

@mixin text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.goods-swiper {
  height: 750rpx;
  
  .goods-image {
    width: 100%;
    height: 100%;
  }
}

.goods-detail {
  padding: 20rpx;
  background: #fff;
  
  .price {
    color: #ff4400;
    font-size: 40rpx;
    font-weight: bold;
  }
  
  .title {
    font-size: 32rpx;
    margin: 10rpx 0;
    @include text-ellipsis;
  }
  
  .description {
    font-size: 28rpx;
    color: #666;
  }
}

.comment-section {
  margin-top: 20rpx;
  background: #fff;
  padding: 20rpx;
  
  .comment-header {
    border-bottom: 1rpx solid #eee;
    padding-bottom: 20rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
    }
    
    .comment-count {
      font-size: 24rpx;
      color: #999;
      margin-left: 10rpx;
    }
  }
}

.comment-item {
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
  
  .comment-user {
    @include flex-center;
    margin-bottom: 10rpx;
    
    .user-avatar {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    
    .user-info {
      flex: 1;
      
      .user-name {
        font-size: 28rpx;
      }
    }
    
    .comment-time {
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .comment-content {
    font-size: 28rpx;
    color: #333;
    line-height: 1.5;
  }
  
  .delete-comment-btn {
    margin-top: 10rpx;
    background: #ff4d4f;
    color: #fff;
    border-radius: 8rpx;
    padding: 5rpx 15rpx;
    font-size: 24rpx;
    cursor: pointer;
    border: none;
    transition: background 0.3s;
    
    &:hover {
      background: #e60000;
    }
  }
}

.comment-popup {
  background: #fff;
  padding: 30rpx;
  border-radius: 20rpx 20rpx 0 0;
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
    
    .close-btn {
      font-size: 40rpx;
      color: #999;
    }
  }
  
  .rating-input {
    margin-bottom: 20rpx;
  }
  
  .comment-textarea {
    width: 100%;
    height: 200rpx;
    border: 1rpx solid #eee;
    border-radius: 10rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
  }
}

.overall-rating {
  display: flex;
  align-items: center;
  margin-top: 10rpx;
  
  .rating-text {
    font-size: 24rpx;
    color: #666;
    margin-right: 20rpx;
  }
  
  .rating-value {
    font-size: 24rpx;
    color: #ff4400;
    margin-left: 10rpx;
  }
}

.action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background: #fff;
  border-top: 1rpx solid #eee;
  
  .collect-btn, .contact-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80rpx;
    border-radius: 40rpx;
    width: 48%;
    font-size: 28rpx;
    
    text {
      margin-left: 10rpx;
    }
  }
  
  .collect-btn {
    background: #f5f5f5;
    
    &.active {
      color: #ff6b00;
      background: #fff0e6;
    }
  }
  
  .contact-btn {
    background: #ff6b00;
    color: #fff;
  }
}

.publisher-info {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  border-bottom: 1rpx solid #eee;

  .publisher-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 20rpx;
    border: 2rpx solid #ddd;
  }

  .publisher-name {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
  }

  .publisher-phone,
  .publisher-email {
    font-size: 24rpx;
    color: #666;
    margin-left: 10rpx;
  }
}
</style>