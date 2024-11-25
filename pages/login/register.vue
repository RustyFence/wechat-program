<template>
  <view class="register-container">
    <!-- 背景图片 -->
    <image class="bg-image" src="/static/login.jpg" mode="aspectFill"></image>
    
    <!-- 注册表单 -->
    <view class="register-form">
      <view class="form-title">用户注册</view>
      
      <view class="input-group">
        <input type="text" v-model="username" placeholder="请输入用户名" />
        <input type="password" v-model="password" placeholder="请输入密码" />
        <input type="password" v-model="confirmPassword" placeholder="请确认密码" />
        <input type="text" v-model="phone" placeholder="请输入手机号" />
      </view>
      
      <!-- 注册按钮行 -->
      <view class="btn-row">
        <button class="register-btn" @click="handleRegister">注册</button>
        <button class="back-btn" @click="goBack">返回登录</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      phone: ''
    }
  },
  methods: {
    async handleRegister() {
      if (!this.username || !this.password || !this.confirmPassword || !this.phone) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
        return
      }
      
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: '两次输入的密码不一致',
          icon: 'none'
        })
        return
      }
      
      // TODO: 实现注册逻辑
      uni.showToast({
        title: '注册成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1500)
        }
      })
    },
    
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.register-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.bg-image {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  z-index: 0;
  animation: zoomInOut 20s ease-in-out infinite;
}

@keyframes zoomInOut {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(0.55);
  }
  100% {
    transform: scale(0.5);
  }
}

.register-form {
  position: relative;
  z-index: 1;
  margin-top: 20vh;
  padding: 40rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  margin-left: 40rpx;
  margin-right: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
  color: #333;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

input {
  height: 88rpx;
  border: 1px solid #eee;
  border-radius: 12rpx;
  padding: 0 30rpx;
  background: rgba(255, 255, 255, 0.8);
}

.btn-row {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.register-btn {
  flex: 1;
  background: #007AFF;
  color: #fff;
  border-radius: 12rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.back-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  color: #007AFF;
  border: 1px solid #007AFF;
  border-radius: 12rpx;
  height: 88rpx;
  line-height: 88rpx;
}
</style>
