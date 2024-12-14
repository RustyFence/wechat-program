"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("../common/vendor.js");
const mock_data = require("./data.js");
common_vendor.Mock.mock(/\/api\/messages\?userId=\d+/, "get", (options) => {
  const userId = options.url.match(/userId=(\d+)/)[1];
  const userMessages = mock_data.messageList.filter((message) => message.userId === userId);
  if (userMessages && userMessages.length > 0) {
    const allMessages = userMessages.flatMap((conversation) => conversation.messages);
    return {
      code: 200,
      data: { messages: allMessages },
      message: "获取消息列表成功"
    };
  }
  return {
    code: 200,
    data: { messages: [] },
    message: "获取消息列表成功"
  };
});
common_vendor.Mock.mock("/api/messages/send", "post", (options) => {
  const { userId, senderId, content } = JSON.parse(options.body);
  const newMessage = {
    senderId: userId,
    sender: `User ${userId}`,
    content,
    time: (/* @__PURE__ */ new Date()).toLocaleString(),
    avatar: "/static/avatar/user1.png"
  };
  const userMessages = mock_data.messageList.find((message) => message.userId === userId);
  if (userMessages) {
    userMessages.messages.push(newMessage);
  } else {
    mock_data.messageList.push({
      userId,
      messages: [newMessage]
    });
  }
  return {
    code: 200,
    message: "消息发送成功"
  };
});
exports.messageList = mock_data.messageList;
