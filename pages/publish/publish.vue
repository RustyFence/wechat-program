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

          <!-- 标签输入区域 -->
      <view class="form-item">
        <view class="tags-title">添加标签</view>
        
        <!-- 预设标签区域 -->
        <view class="preset-tags">
          <view 
            class="preset-tag" 
            v-for="(tag, index) in presetTags" 
            :key="index"
            @tap="selectPresetTag(tag)"
          >
            {{tag}}
          </view>
        </view>
        
        <!-- 原有的标签输入区域 -->
        <view class="tags-input-area">
          <input 
            type="text" 
            v-model="tagInput"
            placeholder="输入标签后点击添加(多个标签用空格分隔)" 
            class="tag-input"
            @confirm="addTags"
          />
          <button class="add-tag-btn" @click="addTags">添加</button>
        </view>
        
        <!-- 已选标签显示区域 -->
        <view class="tags-list" v-if="tags.length > 0">
          <view class="tag-item" v-for="(tag, index) in tags" :key="index">
            {{tag}}
            <text class="delete-tag" @click="removeTag(index)">×</text>
          </view>
        </view>
      </view>
    </view>


    
    <!-- 发布按钮 -->
    <view class="publish-btn-area">
      <button class="publish-btn" @click="handlePublish">发布商品</button>
    </view>

  </view>
</template>

<script>
import { apiUrl } from '@/config.js';

export default {
  data() {
    return {
      title: '',
      price: '',
      description: '',
      images: [],
      tags: [],
      tagInput: '',
      presetTags: ['数码', '服装', '美食', '图书', '运动', '生活', '居家', '其他']
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
    
    // 添加标签
    addTags() {
      if (this.tagInput.trim()) {
        const newTags = this.tagInput.split(' ').filter(tag => tag);
        this.tags = [...this.tags, ...newTags];
        this.tagInput = '';
      }
    },
    
    // 删除标签
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    
    // 发布商品
    async handlePublish() {
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
      
      try {
        const uploadResults = []
        for(let i = 0; i < this.images.length; i++){
          const uploadResult = await uni.uploadFile({
            url: `${apiUrl}/upload`,
            filePath: this.images[i],
            name: 'image',
            formData: {
              title: this.title,
              price: this.price,
              description: this.description,
            },  
          })
          const tempFilePaths=JSON.parse(uploadResult.data)
          uploadResults.push(tempFilePaths.data.url)
          console.log('uploadResults', uploadResults)
        } 
        const res = await uni.request({
          url: `${apiUrl}/goods`,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          },
          data: {
            title: this.title,
            price: this.price,
            description: this.description,
            images: JSON.stringify(uploadResults),
            tags: JSON.stringify(this.tags)
          },  
        })
        if(res.statusCode === 200){
          uni.showToast({
            title: '发布成功',
            icon: 'success',
          })
        }else{
          uni.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      } catch (error) {
        uni.showToast({
          title: '发布失败',
          icon: 'none'
        });
        console.error(error);
      }
    },
    
    // 添加选择预设标签的方法
    selectPresetTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
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

.tags-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
}

.tags-input-area {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.tag-input {
  flex: 1;
  height: 88rpx;
  border: 1px solid #eee;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.add-tag-btn {
  margin-left: 20rpx;
  background: #007AFF;
  color: #fff;
  border-radius: 12rpx;
  height: 88rpx;
  line-height: 88rpx;
  padding: 0 30rpx;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.tag-item {
  background: #f0f0f0;
  border-radius: 12rpx;
  padding: 10rpx 20rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
}

.delete-tag {
  margin-left: 10rpx;
  color: #ff4d4f;
  cursor: pointer;
}

.preset-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-bottom: 20rpx;
}

.preset-tag {
  padding: 10rpx 20rpx;
  background-color: #f5f5f5;
  border-radius: 12rpx;
  font-size: 28rpx;
  color: #333;
  
  
}
</style>
