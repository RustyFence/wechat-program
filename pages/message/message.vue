<template>
  <view class="message-container">
    <scroll-view class="message-list" scroll-y>
      <view 
        class="message-item" 
        v-for="(conversation, index) in conversations" 
        :key="index"
        @click="openChat(conversation)"
      >
        <view class="avatar">
          <image 
            :src="conversation.conversationAvatar" 
            alt="User Avatar"
            mode="aspectFill"
          />
          <!-- Badge for unread messages, if applicable -->
          <view v-if="conversation.unreadCount > 0" class="badge">{{ conversation.unreadCount }}</view>
        </view>
        <view class="content">
          <view class="top-row">
            <text class="name">{{ conversation.conversationName }}</text>
            <text class="time">{{ formatTime(conversation.timestamp) }}</text>
          </view>
          <view class="bottom-row">
            <text class="preview">{{ conversation.lastMessage }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { apiUrl } from '@/config.js';

export default {
  data() {
    return {
      conversations: []
    }
  },
  onLoad() {
    this.fetchConversations();
  },
  methods: {
    async fetchConversations() {
      try {
        const res = await uni.request({
          url: `${apiUrl}/conversations`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          }
        });

        if (res.data.code === 200) {
          this.conversations = res.data.data;
        } else {
          console.error('Failed to fetch conversations:', res.data.msg);
        }
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    },

    openChat(conversation) {
      // Navigate to chat page with the opponent's user ID
      uni.navigateTo({
        url: `/pages/message/chat?oppoUserId=${conversation.oppoUserId}`
      });
    },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    }
  }
}
</script>

<style lang="scss" scoped>
.message-list {
  flex: 1;
  background: #fff;
}

.message-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
}

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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
