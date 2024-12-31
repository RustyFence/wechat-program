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
      <button class="publish-btn" @click="handlePublish">修改商品</button>
    </view>

  </view>
</template>

<script>
import { apiUrl } from '@/config.js';

export default {
  data() {
    return {
      goodsId: '',
      title: '',
      price: '',
      description: '',
      images: [],
      tags: [],
      tagInput: ''
    }
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    console.log(this.goodsId);
    this.loadGoodsInfo();
  },
  methods: {
    async loadGoodsInfo() {
      const res = await uni.request({
        url: `${apiUrl}/goods/${this.goodsId}`,
        method: 'GET',
      })
      if(res.statusCode === 200){
        const goodsInfo = res.data.data;
        console.log(goodsInfo);
        this.title = goodsInfo.title;
        this.price = goodsInfo.price;
        this.description = goodsInfo.description;
        this.images = JSON.parse(goodsInfo.images);
        this.tags = JSON.parse(goodsInfo.tags);
      }
    },
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
    
    //修改商品
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
          header: {
            Authorization: 'Bearer ' + uni.getStorageSync('token')
          },  
          url: `${apiUrl}/goods/${this.goodsId}`,
          method: 'PUT',
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
            title: '编辑成功',
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
          title: '编辑失败',
          icon: 'none'
        });
        console.error(error);
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
}

.image-item {
  width: 200rpx;
  height: 200rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  position: relative;
}

.image-item image {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.delete-btn {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  font-size: 24rpx;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 4rpx 8rpx;
  border-radius: 50%;
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

.tags-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
}

.tags-input-area {
  display: flex;
  align-items: center;
}

.tag-input {
  flex: 1;
  height: 88rpx;
  border: 1px solid #eee;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 32rpx;
}

.add-tag-btn {
  height: 88rpx;
  background: #007bff;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 32rpx;
  color: #fff;
  margin-left: 20rpx;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  background: #eee;
  border-radius: 12rpx;
  padding: 8rpx 16rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
  font-size: 28rpx;
  color: #333;
}

.delete-tag {
  font-size: 24rpx;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 4rpx 8rpx;
  border-radius: 50%;
  margin-left: 10rpx;
}

.publish-btn-area {
  margin-top: 30rpx;
  text-align: center;
}

.publish-btn {
  width: 200rpx;
  height: 80rpx;
  background: #007bff;
  border-radius: 12rpx;
  font-size: 32rpx;
  color: #fff;
}
</style> 