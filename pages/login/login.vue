<template>
  <view class="login-container">
    <!-- 登录表单 -->
    <view class="login-form">
      <input type="text" v-model="username" placeholder="请输入用户名" />
      <input type="password" v-model="password" placeholder="请输入密码" />
      
      <!-- 登录和注册按钮行 -->
      <view class="btn-row">
        <button class="login-btn" @click="handleLogin">登录</button>
        <button class="register-btn" @click="goToRegister">注册</button>
      </view>
      
      <!-- 微信登录按钮 -->
      <button class="wechat-login-btn" type="primary" @click="handleWXLogin">
        微信登录
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 普通登录
    handleLogin() {
      // 这里添加登录逻辑
      if (!this.username || !this.password) {
        uni.showToast({
          title: '请输入用户名和密码',
          icon: 'none'
        })
        return
      }
      // 模拟登录,暂不调用后端API
      if(this.username === 'admin' && this.password === '123456') {
        uni.navigateTo({ url: '/pages/home/home' })
      } else {
        uni.showToast({
          title: '用户名或密码错误',
          icon: 'none'
        })
      }
    },
    
    // 微信登录
    handleWXLogin() {
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
              // TODO: 将code发送到后端换取用户token
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
  padding: 50rpx;
}

.login-form {
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

.btn-row {
  display: flex;
  gap: 20rpx;
}

.login-btn {
  flex: 1;
  background: #007AFF;
  color: #fff;
  border-radius: 44rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.register-btn {
  flex: 1;
  background: #fff;
  color: #007AFF;
  border: 1px solid #007AFF;
  border-radius: 44rpx;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
}

.wechat-login-btn {
  margin-top: 30rpx;
  background: #07C160;
  color: #fff;
  border-radius: 44rpx;
  height: 88rpx;
  line-height: 88rpx;
}
</style>
