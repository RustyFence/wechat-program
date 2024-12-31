<template>
  <view class="chat-container">
    <scroll-view class="chat-list" scroll-y>
      <view 
        class="chat-item" 
        v-for="(msg, index) in chatMessages" 
        :key="msg.messageId"
        :class="{ 'from-me': msg.senderId === currentUserId, 'from-them': msg.senderId !== currentUserId }"
      >
        <view class="avatar-and-name">
          <image 
            class="user-avatar" 
            :src="msg.senderId === currentUserId ? currentUserAvatar : oppoUserAvatar" 
            alt="User Avatar"
          />
          <text class="username">
            {{ msg.senderId === currentUserId ? currentUserName : oppoUserName }}
          </text>
        </view>
        <view class="message-bubble">
          <text class="message-content">{{ msg.content }}</text>
        </view>
        <text class="message-time">{{ formatTime(msg.timestamp) }}</text>
      </view>
    </scroll-view>

    <view class="input-bar">
      <input v-model="newMessage" placeholder="输入消息..." />
      <button @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script>
import { apiUrl } from '@/config.js';

export default {
  data() {
    return {
      chatMessages: [],
      newMessage: '',
      oppoUserId: 0,
      oppoUserName: '',
      oppoUserAvatar: '',
      currentUserId: 0,
      currentUserName: '',
      currentUserAvatar: ''
    }
  },
  onLoad({ oppoUserId }) {
    this.oppoUserId = Number(oppoUserId);
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      console.log(this.oppoUserId)
      console.log(uni.getStorageSync('token'))
      try {
        const res = await uni.request({
          url: `${apiUrl}/messages`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          },
          data: {
            oppoUserId: this.oppoUserId
          }
        });
        if (res.data.code === 200) {
          const { messages, users } = res.data.data;
          this.chatMessages = messages;
          this.currentUserId = users.currentUser.userId;
          this.currentUserName = users.currentUser.username;
          this.currentUserAvatar = users.currentUser.avatar;
          this.oppoUserName = users.oppoUser.username;
          this.oppoUserAvatar = users.oppoUser.avatar;
        } else {
          console.log(res.data)
          console.error('Failed to fetch messages:', res.data.msg);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim()) return;
      try {
        const res = await uni.request({
          url: `${apiUrl}/messages`,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          },
          data: {
            receiverId: this.oppoUserId,
            content: this.newMessage
          }
        });
        if (res.data.code === 201) {
          this.chatMessages.push({
            messageId: res.data.data.messageId,
            senderId: this.currentUserId,
            content: this.newMessage,
            timestamp: new Date().toISOString(),
            isRead: false
          });
          this.newMessage = '';
        } else {
          console.error('发送消息失败:', res.data.msg);
        }
      } catch (error) {
        console.error('发送消息失败:', error);
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
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f8f8;
}

.chat-list {
  flex: 1;
  padding: 5px;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  align-items: flex-end;
  margin-bottom: 5px;
  max-width: 90%;
  position: relative;
}

.from-me {
  align-self: flex-end;
  flex-direction: row-reverse;
  margin-left: auto;
}

.from-them {
  align-self: flex-start;
  margin-right: auto;
}

.avatar-and-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 2px;
  object-fit: cover;
}

.username {
  font-size: 12px;
  color: #666;
}

.message-bubble {
  background-color: #e5e5ea;
  padding: 6px;
  border-radius: 8px;
  position: relative;
  color: #000;
}

.from-me .message-bubble {
  background-color: #007aff;
  color: #fff;
}

.message-content {
  font-size: 14px;
}

.message-time {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
  align-self: flex-end;
}

.input-bar {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
}

.input-bar input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.input-bar button {
  padding: 8px 16px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
