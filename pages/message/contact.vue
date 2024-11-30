<template>
  <view class="contact-container">
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-bar">
        <uni-icons type="search" size="20" color="#666"></uni-icons>
        <input 
          type="text" 
          v-model="searchKey"
          placeholder="搜索好友" 
          placeholder-class="search-placeholder"
          @input="onSearch"
        />
      </view>
    </view>
    
    <!-- 好友列表 -->
    <scroll-view class="contact-list" scroll-y>
      <view class="index-list">
        <!-- 字母分组 -->
        <template v-for="(group, letter) in groupedFriends" :key="letter">
          <view class="group-title">{{letter}}</view>
          <view class="contact-group">
            <view 
              class="contact-item" 
              v-for="friend in group" 
              :key="friend.id"
              @tap="openChat(friend)"
            >
              <image :src="friend.avatar || '/static/avatar/default.png'" class="avatar"></image>
              <view class="info">
                <text class="name">{{friend.remark || friend.username}}</text>
                <text class="description" v-if="friend.signature">{{friend.signature}}</text>
              </view>
            </view>
          </view>
        </template>
      </view>
    </scroll-view>

    <!-- 字母导航 -->
    <view class="index-bar">
      <text 
        v-for="letter in letters" 
        :key="letter"
        class="index-item"
        @tap="scrollToLetter(letter)"
      >
        {{letter}}
      </text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKey: '',
      friends: [],
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  },

  computed: {
    // 按字母分组的好友列表
    groupedFriends() {
      const groups = {}
      this.friends.forEach(friend => {
        const name = friend.remark || friend.username
        const firstLetter = name.charAt(0).toUpperCase()
        if (!groups[firstLetter]) {
          groups[firstLetter] = []
        }
        groups[firstLetter].push(friend)
      })
      
      // 对每个分组内的好友按名字排序
      Object.keys(groups).forEach(letter => {
        groups[letter].sort((a, b) => {
          const nameA = (a.remark || a.username).toUpperCase()
          const nameB = (b.remark || b.username).toUpperCase()
          return nameA.localeCompare(nameB)
        })
      })
      
      return groups
    }
  },

  onShow() {
    this.getFriendsList()
  },

  methods: {
    // 获取好友列表
    async getFriendsList() {
      try {
        // 这里先用模拟数据，后续替换为实际API
        this.friends = [
          {
            id: 1,
            username: '张三',
            remark: '老张',
            avatar: '/static/avatar/default.png',
            signature: '这是个性签名'
          },
          {
            id: 2,
            username: '李四',
            avatar: '/static/avatar/default.png',
            signature: '这是个性签名'
          }
          // ... 更多好友数据
        ]
      } catch (error) {
        console.error('获取好友列表失败:', error)
      }
    },

    // 搜索好友
    onSearch() {
      if (!this.searchKey) {
        this.getFriendsList()
        return
      }
      
      this.friends = this.friends.filter(friend => {
        const name = friend.remark || friend.username
        return name.toLowerCase().includes(this.searchKey.toLowerCase())
      })
    },

    // 打开聊天
    openChat(friend) {
      uni.navigateTo({
        url: `/pages/message/chat?userId=${friend.id}&userName=${friend.remark || friend.username}`
      })
    },

    // 滚动到指定字母分组
    scrollToLetter(letter) {
      // 实现滚动到对应字母分组的逻辑
    }
  }
}
</script>

<style lang="scss">
.contact-container {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
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
