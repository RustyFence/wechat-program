<template>
  <view class="login-container">
    <!-- 背景图片 -->
    <image class="bg-image" src="http://101.34.249.254:8080/ui/login/login.jpg" mode="aspectFill"></image>
    
    <!-- 登录表单 -->
    <view class="login-form">
      <view class="form-title">欢迎登录</view>
      
      <view class="input-group">
        <input type="text" v-model="username" placeholder="请输入用户名" />
        <input type="password" v-model="password" placeholder="请输入密码" />
      </view>
      
      <!-- 登录和注册按钮行 -->
      <view class="btn-row">
        <button class="login-btn" @click="handleLogin">登录</button>
        <button class="register-btn" @click="goToRegister">注册</button>
      </view>
      
      <!-- 微信登录按钮 -->
    </view>
  </view>
</template>

<script>
import { apiUrl } from '@/config.js';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    // 普通登录
    async handleLogin() {
      try { 
        const res = await uni.request({
          url: `${apiUrl}/users/login`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            username: this.username,
            password: this.password
          }
        });
        if (res.data.code === 200) {
          uni.showToast({
            title: '登录成功',
            icon: 'none'
          });
          console.log(res)
          uni.setStorageSync('token', res.data.data.token)
          uni.setStorageSync('userId',res.data.data.userId)
          uni.setStorageSync('userName',this.username)
          uni.switchTab({
            url: '/pages/home/home'
          });
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      } catch (error) {
        uni.showToast({
          title: '登录失败',
          icon: 'none'
        }); 
        console.error('登录失败:', error)
      }
    },
    
    // 微信登录
    async handleWXLogin() {
      // 获取微信登录授权
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          console.log(loginRes.code);
          // 获取用户信息
          uni.getUserInfo({
            provider: 'weixin',
            success: (infoRes) => {
              console.log('用户信息：', infoRes.userInfo);
              // TODO: 将code发送到后��换取用户token
            }
          });
        },
        fail: (err) => {
          console.error('微信登录失败：', err);
          uni.showToast({
            title: '微信登录失败',
            icon: 'none'
          })
        }
      });
    },
    
    // 跳转到注册页面
    goToRegister() {
      uni.navigateTo({
        url: '/pages/login/register'
      })
    }
  }
}
</script>

<style scoped>
.login-container {
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

.login-form {
  position: relative;
  z-index: 1;
  margin-top: 30vh;
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

.login-btn {
  flex: 1;
  background: #007AFF;
  color: #fff;
  border-radius: 12rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.register-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  color: #007AFF;
  border: 1px solid #007AFF;
  border-radius: 12rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.wechat-login-btn {
  width: 100%;
  background: #07C160;
  color: #fff;
  border-radius: 12rpx;
  height: 88rpx;
  line-height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iconfont {
  margin-right: 10rpx;
}
</style>
