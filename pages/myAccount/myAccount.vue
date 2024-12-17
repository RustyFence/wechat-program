<template>
  <view class="myaccount-container">
    <!-- 顶部用户信息卡片 -->
    <view class="user-card">
      <view class="avatar-section" @tap="changeAvatar">
        <image :src="userInfo.avatar" class="avatar" mode="aspectFill"></image>
        <text class="edit-hint">点击更换头像</text>
      </view>
      <view class="user-info">
        <text class="nickname">{{userInfo.username}}</text>
        <text class="user-id">ID: {{userInfo.userId}}</text>
      </view>
    </view>
    
    <!-- 信息列表 -->
    <view class="info-list">
      <view class="info-item" @tap="editInfo('username')">
        <text class="item-label">昵称</text>
        <view class="item-content">
          <text>{{userInfo.username}}</text>
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
        username: '用户昵称',
        userId: '10086',
        phone: '13800138000',
        email: 'example@email.com',
      },
      counts: {
        collection: 12,
        selling: 3,
        sold: 8
      }
    }
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    // 获取用户信息
    async fetchUserInfo() {
      try {
        const res = await uni.request({
          url: '/api/users',
          method: 'GET',
          header: {
            Authorization: 'Bearer ' + uni.getStorageSync('token')
          }
        });
        if (res.data.code === 200) {
          this.userInfo = res.data.data;
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
        uni.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        });
      }
    },
    
    // 更换头像
    async changeAvatar() {
      uni.chooseImage({
        count: 1,
        success: async (res) => {
          const filePath = res.tempFilePaths[0];
          try {
            const uploadResult = await uni.uploadFile({
              url: '/api/upload',
              filePath: filePath,
              name: 'image',
              header: {
                Authorization: 'Bearer ' + uni.getStorageSync('token')
              }
            });
            console.log(uploadResult)
            const response = JSON.parse(uploadResult.data);
            if (response.code === 201) {
              console.log(response.data.url)
              this.userInfo.avatar = response.data.url;
              this.updateUserInfo();
              uni.showToast({
                title: '头像上传成功',
                icon: 'success'
              });
            } else {
              uni.showToast({
                title: response.msg,
                icon: 'none'
              });
            }
          } catch (error) {
            console.error('头像上传失败:', error);
            uni.showToast({
              title: '头像上传失败',
              icon: 'none'
            });
          }
        }
      });
    },
    
    // 编辑信息
    editInfo(type) {
      let title = '';
      let content = '';
      switch(type) {
        case 'username':
          title = '修改昵称';
          content = this.userInfo.username;
          break;
        case 'phone':
          title = '修改手机号';
          content = this.userInfo.phone;
          break;
        case 'email':
          title = '修改邮箱';
          content = this.userInfo.email || '';
          break;
      }
      uni.showModal({
        title: title,
        editable: true,
        content: content,
        success: (res) => {
          if (res.confirm && res.content) {
            if (type === 'phone' && !/^1[3-9]\d{9}$/.test(res.content)) {
              uni.showToast({
                title: '手机号格式不正确',
                icon: 'none'
              });
              return;
            }
            if (type === 'email' && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(res.content)) {
              uni.showToast({
                title: '邮箱格式不正确',
                icon: 'none'
              });
              return;
            }
            this.userInfo[type] = res.content;
            this.updateUserInfo();
          }
        }
      });
    },
    
    // 更新用户信息
    async updateUserInfo() {
      try {
        const res = await uni.request({
          url: '/api/users',
          method: 'PUT',
          header: {
            Authorization: 'Bearer ' + uni.getStorageSync('token')
          },
          data: this.userInfo
        });
        if (res.data.code === 204) {
          uni.showToast({
            title: '信息更新成功',
            icon: 'success'
          });
          if(this.userInfo.username!==uni.getStorageSync('userName')){
            uni.reLaunch({
              url: '/pages/login/login'
            });
            uni.showToast({
              title:'用户名更改，本地令牌失效，请重新登录',
              icon: 'none'
            });
          }
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('更新用户信息失败:', error);
        uni.showToast({
          title: '更新用户信息失败',
          icon: 'none'
        });
      }
    },
    
    // 格式化手机号
    formatPhone(phone) {
      return phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '';
    },
    
    // 页面导航
    navigateTo(page) {
      uni.navigateTo({
        url: `/pages/myAccount/${page}`
      });
    },
    
    // 退出登录
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            uni.reLaunch({
              url: '/pages/login/login'
            });
          }
        }
      });
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
