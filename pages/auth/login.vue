<template>
  <view class="login-container">
    <input v-model="username" placeholder="请输入用户名" />
    <input v-model="password" type="password" placeholder="请输入密码" />
    <button @click="login">登录</button>
    <text v-if="errorMessage" class="error-message">{{ errorMessage }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      // Reset error message
      this.errorMessage = '';

      // Validate input
      if (!this.username.trim()) {
        this.errorMessage = '用户名不能为空';
        return;
      }
      if (!this.password.trim()) {
        this.errorMessage = '密码不能为空';
        return;
      }

      try {
        const response = await uni.request({
          url: '/api/auth/login',
          method: 'POST',
          data: {
            username: this.username,
            password: this.password
          }
        });

        if (response.data.code === 200) {
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          });
          // Redirect to another page or perform other actions
        } else {
          this.errorMessage = response.data.message || '登录失败';
        }
      } catch (error) {
        console.error('登录请求失败:', error);
        this.errorMessage = '网络错误，请稍后重试';
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  padding: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style> 