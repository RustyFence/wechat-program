<template>
  <view class="publish-container">
    <!-- 商品信息表单 -->
    <view class="publish-form">
      <!-- 标题输入 -->
      <view class="form-item">
        <input type="text" v-model="title" placeholder="请输入商品标题" class="title-input" />
      </view>
      
      <!-- 价格输入 -->
      <view class="form-item price-row">
        <text class="price-symbol">¥</text>
        <input type="digit" v-model="price" placeholder="请输入价格" class="price-input" />
      </view>
      
      <!-- 商品描述 -->
      <view class="form-item">
        <textarea v-model="description" placeholder="请输入商品描述" class="description-input" />
      </view>
      
      <!-- 图片上传区域 -->
      <view class="upload-section">
        <view class="upload-title">添加图片</view>
        <view class="image-list">
          <view class="image-item" v-for="(img, index) in images" :key="index">
            <image :src="img" mode="aspectFill" />
            <text class="delete-btn" @click="deleteImage(index)">×</text>
          </view>
          <view class="upload-btn" @click="chooseImage" v-if="images.length < 9">
            <text class="plus">+</text>
            <text class="upload-text">上传图片</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 发布按钮 -->
    <view class="publish-btn-area">
      <button class="publish-btn" @click="handlePublish">发布商品</button>
    </view>
    
    <!-- 添加底部导航栏 -->
    <tab-bar></tab-bar>
  </view>
</template>

<script>
import TabBar from '@/components/tab-bar/tab-bar.vue'

export default {
  components: {
    TabBar
  },
  data() {
    return {
      title: '',
      price: '',
      description: '',
      images: []
    }
  },
  methods: {
    // 添加 URL 生成辅助函数
    getPageUrl(page) {
      return `/pages/${page}/${page}`
    },
    
    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: 9 - this.images.length,
        success: (res) => {
          this.images = [...this.images, ...res.tempFilePaths]
        }
      })
    },
    
    // 删除图片
    deleteImage(index) {
      this.images.splice(index, 1)
    },
    
    // 发布商品
    handlePublish() {
      if (!this.title || !this.price || !this.description) {
        uni.showToast({
          title: '请填写完整商品信息',
          icon: 'none'
        })
        return
      }
      
      if (this.images.length === 0) {
        uni.showToast({
          title: '请至少上传一张商品图片',
          icon: 'none'
        })
        return
      }
      
      // TODO: 实现发布逻辑
      uni.showToast({
        title: '发布成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            uni.switchTab({
              url: this.getPageUrl('home') // 使用辅助函数生成 URL
            })
          }, 1500)
        }
      })
    }
  }
}
</script>

<style scoped>
.publish-container {
  padding: 30rpx;
  padding-bottom: 120rpx;
}

.publish-form {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
}

.form-item {
  margin-bottom: 30rpx;
}

.title-input {
  height: 88rpx;
  border-bottom: 1px solid #eee;
  padding: 0 20rpx;
  font-size: 32rpx;
}

.price-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 20rpx;
}

.price-symbol {
  font-size: 40rpx;
  color: #333;
  margin-right: 20rpx;
}

.price-input {
  flex: 1;
  height: 88rpx;
  font-size: 32rpx;
}

.description-input {
  width: 100%;
  height: 200rpx;
  border: 1px solid #eee;
  border-radius: 12rpx;
  padding: 20rpx;
  font-size: 28rpx;
}

.upload-section {
  margin-top: 30rpx;
}

.upload-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-item {
  position: relative;
  width: 200rpx;
  height: 200rpx;
}

.image-item image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}

.delete-btn {
  position: absolute;
  right: -10rpx;
  top: -10rpx;
  width: 40rpx;
  height: 40rpx;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
}

.upload-btn {
  width: 200rpx;
  height: 200rpx;
  border: 1px dashed #ddd;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.plus {
  font-size: 60rpx;
  color: #999;
  margin-bottom: 10rpx;
}

.upload-text {
  font-size: 24rpx;
  color: #999;
}

.publish-btn-area {
  margin-top: 40rpx;
  padding: 0 30rpx;
}

.publish-btn {
  background: #007AFF;
  color: #fff;
  border-radius: 12rpx;
  height: 88rpx;
  line-height: 88rpx;
}
</style>
