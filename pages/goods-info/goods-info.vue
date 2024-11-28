<template>
  <view class="container">
    <!-- 商品基本信息部分 -->
    <view class="goods-info">
      <swiper class="goods-swiper" indicator-dots autoplay circular>
        <swiper-item v-for="(img, index) in goodsImages" :key="index">
          <image :src="img" mode="aspectFill" class="goods-image"></image>
        </swiper-item>
      </swiper>
      
      <view class="goods-detail">
        <view class="price">¥{{ goods.price }}</view>
        <view class="title">{{ goods.title }}</view>
        <view class="description">{{ goods.description }}</view>
      </view>
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
            <image :src="comment.userAvatar" class="user-avatar"></image>
            <view class="user-info">
              <text class="user-name">{{ comment.userName }}</text>
              <uni-rate :value="comment.rating" disabled size="12" />
            </view>
            <text class="comment-time">{{ comment.time }}</text>
          </view>
          <view class="comment-content">{{ comment.content }}</view>
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
  </view>
</template>

<script>
export default {
  data() {
    return {
      goods: {
        id: '',
        title: '',
        price: '',
        description: ''
      },
      goodsImages: [],
      comments: [
        {
          id: 1,
          userAvatar: '/static/avatar/user1.png',
          userName: '张三',
          rating: 5,
          content: '商品质量非常好，和卖家描述的一样，发货速度也很快，很满意的一次购物！',
          time: '2024-01-15 14:30'
        },
        {
          id: 2,
          userAvatar: '/static/avatar/user2.png',
          userName: '李四',
          rating: 4,
          content: '整体不错，就是发货稍微有点慢，其他都挺好的。',
          time: '2024-01-14 16:45'
        },
        {
          id: 3,
          userAvatar: '/static/avatar/user3.png',
          userName: '王五',
          rating: 5,
          content: '卖家服务态度很好，商品完全符合预期，下次还会继续购买！',
          time: '2024-01-13 09:20'
        }
      ],
      userRating: 5,
      userComment: '',
      averageRating: 0
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
  },
  methods: {
    loadGoodsInfo(id) {
      // 模拟商品数据库
      const mockGoodsDatabase = {
        // home页面的商品
        1: {
          id: 1,
          title: 'iPhone 14 Pro Max',
          price: '7999.00',
          description: '全新未拆封，256G 暗紫色//测试字数溢出',
          images: ['/static/goods/iphone14.jpg']
        },
        2: {
          id: 2,
          title: '耐克运动鞋',
          price: '599.00',
          description: 'Nike Air Max 270，9成新',
          images: ['/static/goods/nike.jpg']
        },
        3: {
          id: 3,
          title: '索尼相机 A7M4',
          price: '15999.00',
          description: '95新，快门数3000次以内',
          images: ['/static/goods/sony.jpg']
        },
        4: {
          id: 4,
          title: 'MacBook Pro M2',
          price: '12999.00',
          description: '2023年新款，带包装',
          images: ['/static/goods/macbook.jpg']
        },
        5: {
          id: 5,
          title: '华为手表 GT4',
          price: '1499.00',
          description: '全新未拆封，46mm',
          images: ['/static/goods/watch.jpg']
        },
        6: {
          id: 6,
          title: 'AirPods Pro 2',
          price: '1299.00',
          description: '99新，带包装盒',
          images: ['/static/goods/airpods.jpg']
        },
        // discover页面的商品
        7: {
          id: 7,
          title: '戴森吸尘器 V15',
          price: '3999.00',
          description: '全新未拆封，顺丰包邮',
          images: ['/static/discover/goods/dyson.jpg']
        },
        8: {
          id: 8,
          title: 'Switch OLED',
          price: '1999.00',
          description: '95新，带两个游戏',
          images: ['/static/discover/goods/switch.jpg']
        },
        9: {
          id: 9,
          title: 'iPad Pro 12.9',
          price: '6999.00',
          description: '2022款，带妙控键盘',
          images: ['/static/discover/goods/ipad.jpg']
        },
        10: {
          id: 10,
          title: '索尼降噪耳机',
          price: '1799.00',
          description: 'WH-1000XM5，全新',
          images: ['/static/discover/goods/headphone.jpg']
        },
        11: {
          id: 11,
          title: '理光GR3x',
          price: '4999.00',
          description: '9成新，带UV镜',
          images: ['/static/discover/goods/camera.jpg']
        },
        12: {
          id: 12,
          title: '机械键盘',
          price: '899.00',
          description: 'HHKB Pro 3，带包装',
          images: ['/static/discover/goods/keyboard.jpg']
        },
        13: {
          id: 13,
          title: '显示器',
          price: '2999.00',
          description: 'LG 27寸4K显示器',
          images: ['/static/discover/goods/monitor.jpg']
        },
        14: {
          id: 14,
          title: '游戏主机',
          price: '3699.00',
          description: 'PS5光驱版，全新',
          images: ['/static/discover/goods/ps5.jpg']
        }
      }

      // 根据ID获取对应商品信息
      const goodsInfo = mockGoodsDatabase[id]
      
      if (goodsInfo) {
        this.goods = {
          id: goodsInfo.id,
          title: goodsInfo.title,
          price: goodsInfo.price,
          description: goodsInfo.description
        }
        this.goodsImages = goodsInfo.images
      } else {
        // 修改返回逻辑
        uni.showToast({
          title: '商品不存在',
          icon: 'none',
          complete: () => {
            uni.navigateBack({
              delta: 1
            })
          }
        })
      }
      
      // 计算平均评分
      this.calculateAverageRating()
    },
    showCommentModal() {
      this.$refs.commentPopup.open()
    },
    closeCommentModal() {
      this.$refs.commentPopup.close()
    },
    submitComment() {
      if (!this.userComment.trim()) {
        uni.showToast({
          title: '请输入评价内容',
          icon: 'none'
        })
        return
      }
      
      // 构造评论对象
      const newComment = {
        id: this.comments.length + 1,
        userAvatar: '/static/avatar/default.png',
        userName: '用户' + Math.floor(Math.random() * 1000),
        rating: this.userRating,
        content: this.userComment,
        time: new Date().toLocaleString()
      }
      
      // 添加到评论列表开头
      this.comments.unshift(newComment)
      
      // 重新计算平均评分
      this.calculateAverageRating()
      
      // 清空输入
      this.userComment = ''
      this.userRating = 5
      
      // 关闭弹窗
      this.closeCommentModal()
      
      uni.showToast({
        title: '评价成功',
        icon: 'success'
      })
    },
    calculateAverageRating() {
      if (this.comments.length === 0) {
        this.averageRating = 0
        return
      }
      const sum = this.comments.reduce((acc, curr) => acc + curr.rating, 0)
      this.averageRating = Number((sum / this.comments.length).toFixed(1))
    }
  }
}
</script>

<style lang="scss">
.container {
  padding-bottom: 100rpx;
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
    display: flex;
    align-items: center;
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
</style>