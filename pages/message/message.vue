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
        :key="item.messageId"
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
            <text class="name">{{item.senderName}}</text>
            <text class="time">{{formatTime(item.timestamp)}}</text>
          </view>
          <view class="bottom-row">
            <text class="preview">{{item.content}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      messageList: [],
      currentUserId: uni.getStorageSync('userId') // 获取当前用户ID
    }
  },
  onShow() {
    this.getMessageList();
  },
  methods: {
    navigateToContacts() {
      uni.showToast({
        title: '联系人功能锐意开发中，\n敬请期待',
        icon: 'none', 
        duration: 2000
      });
    },
    
    openChat(item) {
      this.markAsRead(item.messageId);
      
      uni.navigateTo({
        url: `/pages/message/chat?senderId=${item.senderId}&userName=${item.senderName}`
      });
    },
    
    async markAsRead(messageId) {
      try {
        const message = this.messageList.find(msg => msg.messageId === messageId);
        if (message) {
          message.unread = 0;
        }
      } catch (error) {
        console.error('标记已读失败:', error);
      }
    },
    
    async getMessageList() {
      try {
        const response = await uni.request({
          url: `/api/messages`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          }
        });

        if (response.data.code === 200) {
          const messages = response.data.data;
          const uniqueConversations = {};

          messages.forEach(msg => {
            const userId = msg.senderId === this.receiverId ? msg.receiverId : msg.senderId;
            if (!uniqueConversations[userId]) {
              uniqueConversations[userId] = msg;
            }
          });

          this.messageList = Object.values(uniqueConversations).map(msg => ({
            messageId: msg.messageId,
            senderId: msg.senderId,
            senderName: msg.senderName,
            avatar: msg.avatar || '/static/default-avatar.png',
            content: msg.content,
            timestamp: msg.timestamp,
            unread: msg.isRead ? 0 : 1
          }));
        } else {
          console.error('获取消息列表失败:', response.data.msg);
        }
      } catch (error) {
        console.error('获取消息列表失败:', error);
      }
    },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
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
