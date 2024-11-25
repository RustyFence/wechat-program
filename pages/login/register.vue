<template>
  <view class="register-container">
    <view class="register-form">
      <input type="text" v-model="username" placeholder="请输入用户名" />
      <input type="password" v-model="password" placeholder="请输入密码" />
      <input type="password" v-model="confirmPassword" placeholder="请确认密码" />
      
      <button class="register-btn" @click="handleRegister">注册</button>
      
      <button class="back-btn" @click="goBack">返回登录</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    handleRegister() {
      if (!this.username || !this.password || !this.confirmPassword) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
        return
      }
      
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: '两次密码不一致',
          icon: 'none'
        })
        return
      }
      
      // TODO: 调用注册API
    },
    
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.register-container {
  padding: 50rpx;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

input {
  height: 88rpx;
  border: 1px solid #ddd;
  border-radius: 44rpx;
  padding: 0 30rpx;
}

.register-btn {
  background: #007AFF;
  color: #fff;
  border-radius: 44rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.back-btn {
  background: none;
  color: #007AFF;
  font-size: 28rpx;
}
</style>
