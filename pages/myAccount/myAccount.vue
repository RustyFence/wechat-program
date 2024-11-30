<template>
  <view class="myaccount-container">
    <!-- 顶部用户信息卡片 -->
    <view class="user-card">
      <view class="avatar-section" @tap="changeAvatar">
        <image :src="userInfo.avatar" class="avatar" mode="aspectFill"></image>
        <text class="edit-hint">点击更换头像</text>
      </view>
      <view class="user-info">
        <text class="nickname">{{userInfo.nickname}}</text>
        <text class="user-id">ID: {{userInfo.userId}}</text>
      </view>
    </view>
    
    <!-- 信息列表 -->
    <view class="info-list">
      <view class="info-item" @tap="editInfo('nickname')">
        <text class="item-label">昵称</text>
        <view class="item-content">
          <text>{{userInfo.nickname}}</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>
      
      <view class="info-item" @tap="editInfo('phone')">
        <text class="item-label">手机号</text>
        <view class="item-content">
          <text>{{formatPhone(userInfo.phone)}}</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>
      
      <view class="info-item" @tap="editInfo('email')">
        <text class="item-label">邮箱</text>
        <view class="item-content">
          <text>{{userInfo.email || '未设置'}}</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>
      
      <view class="info-item" @tap="editInfo('address')">
        <text class="item-label">收货地址</text>
        <view class="item-content">
          <text>{{userInfo.address ? '已设置' : '未设置'}}</text>
          <text class="iconfont icon-right"></text>
        </view>
      </view>
    </view>
    
    <!-- 功能按钮组 -->
    <view class="function-list">
      <view class="function-item" @tap="navigateTo('collection')">
        <text class="iconfont icon-collection"></text>
        <text>我的收藏</text>
        <text class="count" v-if="counts.collection">{{counts.collection}}</text>
      </view>
      
      <view class="function-item" @tap="navigateTo('selling')">
        <text class="iconfont icon-selling"></text>
        <text>在售商品</text>
        <text class="count" v-if="counts.selling">{{counts.selling}}</text>
      </view>
      
      <view class="function-item" @tap="navigateTo('sold')">
        <text class="iconfont icon-sold"></text>
        <text>已下架</text>
        <text class="count" v-if="counts.sold">{{counts.sold}}</text>
      </view>
    </view>
    
    <!-- 退出登录按钮 -->
    <view class="logout-btn" @tap="logout">
      退出登录
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: '/static/avatar/default.png',
        nickname: '用户昵称',
        userId: '10086',
        phone: '13800138000',
        email: 'example@email.com',
        address: ''
      },
      counts: {
        collection: 12,
        selling: 3,
        sold: 8
      }
    }
  },
  methods: {
    // 更换头像
    changeAvatar() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          // TODO: 上传头像
          this.userInfo.avatar = res.tempFilePaths[0]
        }
      })
    },
    
    // 编辑信息
    editInfo(type) {
      switch(type) {
        case 'nickname':
          uni.showModal({
            title: '修改昵称',
            editable: true,
            content: this.userInfo.nickname,
            success: (res) => {
              if (res.confirm && res.content) {
                this.userInfo.nickname = res.content
              }
            }
          })
          break
        
        case 'phone':
          uni.showModal({
            title: '修改手机号',
            editable: true,
            content: this.userInfo.phone,
            success: (res) => {
              if (res.confirm && res.content) {
                // 验证手机号格式
                if (/^1[3-9]\d{9}$/.test(res.content)) {
                  this.userInfo.phone = res.content
                } else {
                  uni.showToast({
                    title: '手机号格式不正确',
                    icon: 'none'
                  })
                }
              }
            }
          })
          break
        
        case 'email':
          uni.showModal({
            title: '修改邮箱',
            editable: true,
            content: this.userInfo.email || '',
            success: (res) => {
              if (res.confirm && res.content) {
                // 验证邮箱格式
                if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(res.content)) {
                  this.userInfo.email = res.content
                } else {
                  uni.showToast({
                    title: '邮箱格式不正确',
                    icon: 'none'
                  })
                }
              }
            }
          })
          break
        
        case 'address':
          // 使用地址选择器
          uni.chooseLocation({
            success: (res) => {
              this.userInfo.address = res.address
              // 可以保存更详细的地址信息
              this.userInfo.addressDetail = {
                name: res.name,
                address: res.address,
                latitude: res.latitude,
                longitude: res.longitude
              }
            },
            fail: () => {
              // 如果没有选择地址，打开手动输入
              uni.showModal({
                title: '修改地址',
                editable: true,
                content: this.userInfo.address || '',
                success: (res) => {
                  if (res.confirm && res.content) {
                    this.userInfo.address = res.content
                  }
                }
              })
            }
          })
          break
      }
    },
    
    // 格式化手机号
    formatPhone(phone) {
      return phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : ''
    },
    
    // 页面导航
    navigateTo(page) {
      uni.navigateTo({
        url: `/pages/myAccount/${page}`
      })
    },
    
    // 退出登录
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // TODO: 清除登录状态
            uni.reLaunch({
              url: '/pages/login/login'
            })
          }
        }
      })
    },
    
    // 保存信息到服务器
    saveUserInfo() {
      // TODO: 实现保存逻辑
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.myaccount-container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 100rpx;
}

.user-card {
  background: #fff;
  padding: 40rpx 30rpx;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  
  .avatar-section {
    position: relative;
    margin-right: 30rpx;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
    }
    
    .edit-hint {
      position: absolute;
      bottom: -30rpx;
      left: 50%;
      transform: translateX(-50%);
      font-size: 20rpx;
      color: #999;
      white-space: nowrap;
    }
  }
  
  .user-info {
    .nickname {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
      display: block;
    }
    
    .user-id {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.info-list {
  background: #fff;
  margin-bottom: 20rpx;
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;
    
    .item-label {
      font-size: 28rpx;
      color: #333;
    }
    
    .item-content {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      color: #666;
      
      .iconfont {
        margin-left: 10rpx;
        color: #999;
      }
    }
  }
}

.function-list {
  background: #fff;
  margin-bottom: 20rpx;
  
  .function-item {
    display: flex;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;
    
    .iconfont {
      font-size: 40rpx;
      margin-right: 20rpx;
      color: #007AFF;
    }
    
    text {
      font-size: 28rpx;
      color: #333;
    }
    
    .count {
      margin-left: auto;
      background: #f5f5f5;
      padding: 4rpx 12rpx;
      border-radius: 20rpx;
      font-size: 24rpx;
      color: #666;
    }
  }
}

.logout-btn {
  margin: 40rpx 30rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background: #fff;
  border-radius: 8rpx;
  color: #ff4d4f;
  font-size: 32rpx;
  
  &:active {
    opacity: 0.8;
  }
}
</style>
