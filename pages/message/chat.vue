<template>
  <view class="chat-container">
    <!-- 聊天内容区域 -->
    <scroll-view 
      class="chat-content" 
      scroll-y 
      :scroll-top="scrollTop"
      :scroll-into-view="lastMessageId"
      @scrolltoupper="loadMoreMessages"
    >
      <!-- 加载更多提示 -->
      <view class="loading-more" v-if="isLoading">加载中...</view>
      
      <!-- 消息列表 -->
      <view class="message-list">
        <view 
          class="message-item" 
          v-for="msg in messages" 
          :key="msg.id"
          :id="'msg-' + msg.id"
          :class="{ 'self': msg.isSelf }"
        >
          <!-- 头像 -->
          <image :src="msg.avatar" class="avatar" mode="aspectFill"></image>
          
          <!-- 消息内容 -->
          <view class="message-content">
            <!-- 文本消息 -->
            <view v-if="msg.type === 'text'" class="text-message">
              {{msg.content}}
            </view>
            <!-- 图片消息 -->
            <image 
              v-else-if="msg.type === 'image'" 
              :src="msg.content" 
              class="image-message"
              mode="widthFix"
              @tap="previewImage(msg.content)"
            ></image>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 底部输入区域 -->
    <view class="input-area">
      <!-- 语音/文字切换按钮 -->
      <view class="voice-btn" @tap="toggleInputMode">
        <text class="iconfont" :class="isVoiceMode ? 'icon-keyboard' : 'icon-voice'"></text>
      </view>
      
      <!-- 文本输入框/语音按钮 -->
      <view class="input-wrapper">
        <input 
          v-if="!isVoiceMode"
          type="text"
          v-model="inputMessage"
          class="text-input"
          placeholder="请输入消息"
          @confirm="sendMessage"
        />
        <view 
          v-else
          class="voice-input"
          @touchstart="startRecording"
          @touchend="stopRecording"
          @touchcancel="cancelRecording"
        >
          按住说话
        </view>
      </view>
      
      <!-- 表情按钮 -->
      <view class="emoji-btn" @tap="toggleEmoji">
        <text class="iconfont icon-emoji"></text>
      </view>
      
      <!-- 更多功能按钮 -->
      <view class="more-btn" @tap="toggleMore">
        <text class="iconfont icon-more"></text>
      </view>
    </view>
    
    <!-- 表情面板 -->
    <view class="emoji-panel" v-if="showEmoji">
      <!-- 表情网格 -->
    </view>
    
    <!-- 更多功能面板 -->
    <view class="more-panel" v-if="showMore">
      <view class="function-grid">
        <view class="function-item" @tap="chooseImage">
          <view class="function-icon">
            <text class="iconfont icon-image"></text>
          </view>
          <text class="function-text">图片</text>
        </view>
        <!-- 其他功能项 -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 0,
      chatTitle: '',
      messages: [],
      inputMessage: '',
      isVoiceMode: false,
      showEmoji: false,
      showMore: false,
      scrollTop: 0,
      lastMessageId: '',
      isLoading: false
    }
  },
  onLoad(options) {
    // 获取状态栏高度
    const systemInfo = uni.getSystemInfoSync()
    this.statusBarHeight = systemInfo.statusBarHeight
    
    this.chatTitle = options.userName || '聊天'
    // 模拟一些消息数据
    this.messages = [
      {
        id: 1,
        type: 'text',
        content: '你好，请问商品还在吗？',
        isSelf: true,
        avatar: '/static/avatar/default.png',
        time: new Date().getTime() - 3600000
      },
      {
        id: 2,
        type: 'text',
        content: '在的，有什么可以帮你的吗？',
        isSelf: false,
        avatar: '/static/avatar/seller.png',
        time: new Date().getTime() - 3500000
      }
    ]
    this.lastMessageId = 'msg-' + this.messages[this.messages.length - 1].id
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    
    toggleInputMode() {
      this.isVoiceMode = !this.isVoiceMode
    },
    
    toggleEmoji() {
      this.showEmoji = !this.showEmoji
      this.showMore = false
    },
    
    toggleMore() {
      this.showMore = !this.showMore
      this.showEmoji = false
    },
    
    sendMessage() {
      if (!this.inputMessage.trim()) return
      
      const newMessage = {
        id: this.messages.length + 1,
        type: 'text',
        content: this.inputMessage,
        isSelf: true,
        avatar: '/static/avatar/default.png',
        time: new Date().getTime()
      }
      
      this.messages.push(newMessage)
      this.inputMessage = ''
      this.lastMessageId = 'msg-' + newMessage.id
      
      // 模拟回复
      setTimeout(() => {
        const reply = {
          id: this.messages.length + 1,
          type: 'text',
          content: '好的，我知道了',
          isSelf: false,
          avatar: '/static/avatar/seller.png',
          time: new Date().getTime()
        }
        this.messages.push(reply)
        this.lastMessageId = 'msg-' + reply.id
      }, 1000)
    },
    
    chooseImage() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          const newMessage = {
            id: this.messages.length + 1,
            type: 'image',
            content: res.tempFilePaths[0],
            isSelf: true,
            avatar: '/static/avatar/default.png',
            time: new Date().getTime()
          }
          this.messages.push(newMessage)
          this.lastMessageId = 'msg-' + newMessage.id
          this.showMore = false
        }
      })
    },
    
    previewImage(url) {
      uni.previewImage({
        urls: [url]
      })
    },
    
    loadMoreMessages() {
      if (this.isLoading) return
      this.isLoading = true
      
      // 模拟加载更多消息
      setTimeout(() => {
        const moreMessages = [
          {
            id: 'history-' + this.messages.length,
            type: 'text',
            content: '这是历史消息',
            isSelf: false,
            avatar: '/static/avatar/seller.png',
            time: new Date().getTime() - 7200000
          }
        ]
        this.messages.unshift(...moreMessages)
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.chat-content {
  flex: 1;
  padding: 20rpx;
  
  .message-item {
    display: flex;
    margin-bottom: 30rpx;
    
    &.self {
      flex-direction: row-reverse;
      
      .message-content {
        margin-right: 20rpx;
        margin-left: 0;
        
        .text-message {
          background: #007AFF;
          color: #fff;
          
          &:after {
            border-left-color: #007AFF;
            right: -16rpx;
            left: auto;
            border-right-color: transparent;
          }
        }
      }
    }
    
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
    
    .message-content {
      margin-left: 20rpx;
      max-width: 60%;
      
      .text-message {
        background: #fff;
        padding: 20rpx;
        border-radius: 10rpx;
        position: relative;
        word-break: break-all;
        
        &:after {
          content: '';
          position: absolute;
          left: -16rpx;
          top: 20rpx;
          border: 8rpx solid transparent;
          border-right-color: #fff;
        }
      }
      
      .image-message {
        max-width: 100%;
        border-radius: 10rpx;
      }
    }
  }
}

.input-area {
  background: #fff;
  padding: 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #eee;
  
  .voice-btn, .emoji-btn, .more-btn {
    padding: 20rpx;
    
    .iconfont {
      font-size: 48rpx;
      color: #666;
    }
  }
  
  .input-wrapper {
    flex: 1;
    margin: 0 20rpx;
    
    .text-input {
      background: #f5f5f5;
      border-radius: 8rpx;
      padding: 20rpx;
      font-size: 28rpx;
    }
    
    .voice-input {
      background: #f5f5f5;
      border-radius: 8rpx;
      padding: 20rpx;
      text-align: center;
      color: #666;
    }
  }
}

.emoji-panel, .more-panel {
  height: 400rpx;
  background: #fff;
  border-top: 1rpx solid #eee;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 30rpx;
  gap: 20rpx;
  
  .function-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .function-icon {
      width: 100rpx;
      height: 100rpx;
      background: #f5f5f5;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10rpx;
      
      .iconfont {
        font-size: 48rpx;
        color: #666;
      }
    }
    
    .function-text {
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style>
