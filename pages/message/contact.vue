<template>
  <view class="contact-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <view class="title">联系人</view>
    </view>
    
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-bar">
        <image src="/static/icons/search.png" class="search-icon"></image>
        <input 
          type="text" 
          v-model="searchKey"
          placeholder="搜索联系人" 
          placeholder-class="search-placeholder"
          @input="onSearch"
        />
      </view>
    </view>
    
    <!-- 联系人列表 -->
    <scroll-view class="contact-list" scroll-y>
      <!-- 索引列表 -->
      <view class="index-list">
        <view 
          v-for="(group, index) in contactGroups" 
          :key="index"
        >
          <!-- 分组标题 -->
          <view class="group-title">{{group.title}}</view>
          
          <!-- 分组内容 -->
          <view class="contact-group">
            <view 
              class="contact-item" 
              v-for="contact in group.items" 
              :key="contact.id"
              @tap="openChat(contact)"
            >
              <image 
                :src="contact.avatar" 
                class="avatar" 
                mode="aspectFill"
              ></image>
              <view class="info">
                <text class="name">{{contact.name}}</text>
                <text class="description">{{contact.description}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 右侧索引条 -->
      <view class="index-bar">
        <text 
          v-for="(letter, index) in indexList" 
          :key="index"
          class="index-item"
          @tap="scrollToLetter(letter)"
        >
          {{letter}}
        </text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKey: '',
      indexList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      contactGroups: [
        {
          title: '最近联系',
          items: [
            {
              id: 1,
              name: '张三',
              avatar: '/static/avatar/default.png',
              description: '最近联系: 1小时前'
            },
            {
              id: 2,
              name: '李四',
              avatar: '/static/avatar/default.png',
              description: '最近联系: 2小时前'
            }
          ]
        },
        {
          title: 'A',
          items: [
            {
              id: 3,
              name: 'Alex',
              avatar: '/static/avatar/default.png',
              description: '在线'
            },
            {
              id: 4,
              name: 'Alice',
              avatar: '/static/avatar/default.png',
              description: '离线'
            }
          ]
        },
        {
          title: 'B',
          items: [
            {
              id: 5,
              name: 'Bob',
              avatar: '/static/avatar/default.png',
              description: '在线'
            }
          ]
        }
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    
    onSearch(e) {
      // TODO: 实现搜索逻辑
      console.log('搜索:', this.searchKey)
    },
    
    openChat(contact) {
      uni.navigateTo({
        url: `/pages/message/chat?userId=${contact.id}&userName=${contact.name}`
      })
    },
    
    scrollToLetter(letter) {
      // TODO: 实现滚动到对应字母分组
      console.log('滚动到:', letter)
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-container {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  height: 88rpx;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  position: relative;
  
  .back-btn {
    padding: 20rpx;
    margin-left: -20rpx;
  }
  
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32rpx;
    font-weight: 500;
  }
}

.search-box {
  background: #fff;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #eee;
  
  .search-bar {
    display: flex;
    align-items: center;
    background: #f5f5f5;
    border-radius: 8rpx;
    padding: 16rpx;
    
    .search-icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 16rpx;
    }
    
    input {
      flex: 1;
      font-size: 28rpx;
    }
  }
}

.contact-list {
  flex: 1;
  position: relative;
}

.index-list {
  padding-bottom: 40rpx;
  
  .group-title {
    padding: 16rpx 30rpx;
    background: #f5f5f5;
    font-size: 24rpx;
    color: #999;
  }
  
  .contact-group {
    background: #fff;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #eee;
    
    &:active {
      background: #f5f5f5;
    }
    
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    
    .info {
      flex: 1;
      
      .name {
        font-size: 32rpx;
        color: #333;
        margin-bottom: 4rpx;
      }
      
      .description {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}

.index-bar {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 20rpx 10rpx;
  background: rgba(0,0,0,0.3);
  border-radius: 30rpx;
  margin-right: 10rpx;
  
  .index-item {
    display: block;
    font-size: 24rpx;
    color: #fff;
    padding: 4rpx 10rpx;
    
    &:active {
      color: #007AFF;
    }
  }
}
</style>
