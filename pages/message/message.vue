<template>
  <view class="message-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="title">消息</view>
      <view class="contact-btn" @click="navigateToContacts">
        <uni-icons type="contact" size="24" color="#333"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-bar">
        <uni-icons type="search" size="20" color="#666"></uni-icons>
        <input type="text" placeholder="搜索消息" placeholder-class="search-placeholder"/>
      </view>
    </view>

    <!-- 消息列表 -->
    <scroll-view class="message-list" scroll-y>
      <view 
        class="message-item" 
        v-for="(item, index) in messageList" 
        :key="index"
        @click="openChat(item)"
      >
        <!-- 头像 -->
        <view class="avatar">
          <image :src="item.avatar" mode="aspectFill"></image>
          <view class="badge" v-if="item.unread">{{item.unread}}</view>
        </view>
        
        <!-- 消息内容 -->
        <view class="content">
          <view class="top-row">
            <text class="name">{{item.name}}</text>
            <text class="time">{{item.time}}</text>
          </view>
          <view class="bottom-row">
            <text class="preview">{{item.lastMessage}}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <tab-bar></tab-bar>
  </view>
</template>

<script>
import TabBar from '@/components/tab-bar/tab-bar.vue'

export default {
  components: {
    TabBar
  },
  data() {
    return {
      messageList: [
        {
          id: 1,
          name: '张三',
          avatar: '/static/avatar/default.png',
          lastMessage: '请问商品还在吗？',
          time: '12:30',
          unread: 2
        },
        {
          id: 2,
          name: '李四',
          avatar: '/static/avatar/default.png',
          lastMessage: '好的，我知道了',
          time: '昨天',
          unread: 3
        }
      ]
    }
  },
  onShow() {
    this.updateTotalUnread()
  },
  methods: {
    navigateToContacts() {
      uni.navigateTo({
        url: '/pages/message/contact'
      })
    },
    
    openChat(item) {
      if (item.unread > 0) {
        item.unread = 0
        this.updateTotalUnread()
      }
      
      uni.navigateTo({
        url: `/pages/message/chat?userId=${item.id}&userName=${item.name}`
      })
    },
    
    updateTotalUnread() {
      const totalUnread = this.messageList.reduce((sum, msg) => sum + (msg.unread || 0), 0)
      console.log('计算得到未读数:', totalUnread)
      uni.$emit('updateUnreadCount', totalUnread)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.message-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}

.nav-bar {
  background: #fff;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 15px;
  
  .title {
    font-size: 16px;
    font-weight: 500;
  }
  
  .contact-btn {
    position: absolute;
    right: 15px;
    padding: 8px;
  }
}

.search-box {
  background-color: #ffffff;
  padding: 10px 15px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 8px 15px;
  
  .search-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  
  input {
    flex: 1;
    font-size: 14px;
  }
}

.message-list {
  flex: 1;
  background: #fff;
}

.message-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  
  .avatar {
    position: relative;
    margin-right: 12px;
    
    image {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
    
    .badge {
      position: absolute;
      right: -6px;
      top: -6px;
      background: #ff4d4f;
      color: #fff;
      font-size: 12px;
      min-width: 18px;
      height: 18px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
    }
  }
  
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    .top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      
      .name {
        font-size: 16px;
        color: #333;
        font-weight: 500;
      }
      
      .time {
        font-size: 12px;
        color: #999;
      }
    }
    
    .bottom-row {
      .preview {
        font-size: 14px;
        color: #666;
        @include text-ellipsis;
      }
    }
  }
  
  &:active {
    background-color: #f5f5f5;
  }
}
</style>
