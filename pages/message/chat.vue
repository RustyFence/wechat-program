<template>
  <view class="chat-container">
    <scroll-view class="chat-list" scroll-y>
      <view v-for="(msg, index) in messages" :key="index" :class="['chat-message', msg.sender === 'You' ? 'sent' : 'received']">
        <text class="message-content">{{ msg.content }}</text>
        <text class="time">{{ msg.time }}</text>
      </view>
    </scroll-view>

    <view class="chat-input">
      <input v-model="newMessage" placeholder="输入消息..." />
      <button @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      messages: [],
      senderId: null,
      userId: uni.getStorageSync('userId'), // 获取当前用户ID
      newMessage: ''
    }
  },
  onLoad(options) {
    this.senderId = options.senderId;
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      // 从本地存储中获取所有消息
      const allMessages = uni.getStorageSync('messages') || [];

      // 过滤出与特定 senderId 相关的所有消息
      this.messages = allMessages.filter(msg => msg.senderId === this.senderId);
      console.log(`>>>>>与senderId:${this.senderId}<<<<<的聊天记录`);
      console.log('messages', this.messages);
    },

    async sendMessage() {
      if (!this.newMessage.trim()) {
        console.error('消息内容不能为空');
        return;
      }

      try {
        const response = await new Promise((resolve, reject) => {
          uni.request({
            url: `/api/messages/send`,
            method: 'POST',
            data: {
              userId: this.userId,
              senderId: this.senderId,
              content: this.newMessage
            },
            success: (res) => {
              const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
              if (data && data.code === 200) {
                resolve(data);
              } else {
                reject(new Error('发送消息失败'));
              }
            },
            fail: (error) => {
              console.error('Request failed:', error);
              reject(error);
            }
          });
        });

        console.log('消息发送成功:', response.message);
        this.messages.push({
          sender: 'You',
          content: this.newMessage,
          time: new Date().toLocaleString()
        });
        this.newMessage = '';
      } catch (error) {
        console.error('发送消息失败:', error.message || '未知错误');
      }
    }
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f8f8;
}

.chat-list {
  flex: 1;
  padding: 10px;
}

.chat-message {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  max-width: 70%;
  padding: 8px;
  border-radius: 8px;
  position: relative;
}

.sent {
  align-self: flex-end;
  background-color: #007aff;
  color: #fff;
}

.received {
  align-self: flex-start;
  background-color: #e5e5ea;
  color: #000;
}

.message-content {
  font-size: 14px;
}

.time {
  font-size: 12px;
  color: #999;
  align-self: flex-end;
  margin-top: 4px;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
  }

  button {
    padding: 8px 16px;
    background-color: #007aff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
