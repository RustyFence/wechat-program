<template>
  <view class="chat-container">
    <scroll-view class="chat-list" scroll-y>
      <view 
        class="chat-item" 
        v-for="(msg, index) in chatMessages" 
        :key="msg.messageId"
        :class="{ 'from-me': msg.senderId === this.receiverId, 'from-them': msg.receiverId !== this.receiverId }"
      >
        <text class="message-content">{{ msg.content }}</text>
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
export default {
  data() {
    return {
      chatMessages: [],
      newMessage: '',
      receiverId: null
    }
  },
  onLoad(options) {
    this.receiverId = parseInt(options.senderId);
    this.loadChatMessages();
  },
  methods: {
    async loadChatMessages() {
      try {
        const res = await uni.request({
          url: `/api/messages`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          }
        });
        if (res.data.code === 200) {
          this.chatMessages = res.data.data
        } else {
          console.error('获取聊天记录失败:', res.data.msg);
        }
      } catch (error) {
        console.error('获取聊天记录失败:', error);
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim()) return;

      try {
        const res = await uni.request({
          url: `/api/messages`,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${uni.getStorageSync('token')}`
          },
          data: {
            receiverId: this.receiverId,
            content: this.newMessage
          }
        });
        if (res.data.code === 201) {
          this.chatMessages.push({
            messageId: res.data.data.messageId,
            senderId: this.receiverId,
            receiverId: this.receiverId,
            content: this.newMessage,
            timestamp: new Date().toISOString()
          })
          this.newMessage = ''
        } else {
          console.error('发送消息失败:', res.data.msg)
        }
      } catch (error) {
        console.error('发送消息失败:', error)
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
  padding: 10px;
  overflow-y: auto;
}

.chat-item {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  max-width: 70%;
  padding: 8px;
  border-radius: 8px;
  position: relative;
}

.from-me {
  align-self: flex-end;
  background-color: #007aff;
  color: #fff;
}

.from-them {
  align-self: flex-start;
  background-color: #e5e5ea;
  color: #000;
}

.message-content {
  font-size: 14px;
}

.message-time {
  font-size: 12px;
  color: #999;
  align-self: flex-end;
  margin-top: 4px;
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
