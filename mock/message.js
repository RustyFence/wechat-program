import Mock from 'mockjs';
import { messageList } from './data.js';

// 获取消息列表
Mock.mock(/\/api\/messages\?userId=\d+/, 'get', (options) => {
  const userId = options.url.match(/userId=(\d+)/)[1];
  const userMessages = messageList.filter(message => message.userId === userId);

  if (userMessages && userMessages.length > 0) {

    const allMessages = userMessages.flatMap(conversation => conversation.messages);

    return {
      code: 200,
      data: { messages: allMessages },
      message: '获取消息列表成功'
    };
  }

  return {
    code: 200,
    data: { messages: [] },
    message: '获取消息列表成功'
  };
});

// 发送消息
Mock.mock('/api/messages/send', 'post', (options) => {
  const { userId, senderId, content } = JSON.parse(options.body);
  const newMessage = {
    senderId: userId,
    sender: `User ${userId}`,
    content: content,
    time: new Date().toLocaleString(),
    avatar: '/static/avatar/user1.png'
  };

  // 假设将新消息添加到某个用户的消息列表中
  const userMessages = messageList.find(message => message.userId === userId);
  if (userMessages) {
    userMessages.messages.push(newMessage);
  } else {
    messageList.push({
      userId: userId,
      messages: [newMessage]
    });
  }

  return {
    code: 200,
    message: '消息发送成功'
  };
});

export { messageList };