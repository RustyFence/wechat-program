"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      messages: [],
      senderId: null,
      userId: common_vendor.index.getStorageSync("userId"),
      // 获取当前用户ID
      newMessage: ""
    };
  },
  onLoad(options) {
    this.senderId = options.senderId;
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      const allMessages = common_vendor.index.getStorageSync("messages") || [];
      this.messages = allMessages.filter((msg) => msg.senderId === this.senderId);
      console.log(`>>>>>与senderId:${this.senderId}<<<<<的聊天记录`);
      console.log("messages", this.messages);
    },
    async sendMessage() {
      if (!this.newMessage.trim()) {
        console.error("消息内容不能为空");
        return;
      }
      try {
        const response = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: `/api/messages/send`,
            method: "POST",
            data: {
              userId: this.userId,
              senderId: this.senderId,
              content: this.newMessage
            },
            success: (res) => {
              const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
              if (data && data.code === 200) {
                resolve(data);
              } else {
                reject(new Error("发送消息失败"));
              }
            },
            fail: (error) => {
              console.error("Request failed:", error);
              reject(error);
            }
          });
        });
        console.log("消息发送成功:", response.message);
        this.messages.push({
          sender: "You",
          content: this.newMessage,
          time: (/* @__PURE__ */ new Date()).toLocaleString()
        });
        this.newMessage = "";
      } catch (error) {
        console.error("发送消息失败:", error.message || "未知错误");
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.messages, (msg, index, i0) => {
      return {
        a: common_vendor.t(msg.content),
        b: common_vendor.t(msg.time),
        c: index,
        d: common_vendor.n(msg.sender === "You" ? "sent" : "received")
      };
    }),
    b: $data.newMessage,
    c: common_vendor.o(($event) => $data.newMessage = $event.detail.value),
    d: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-013fa921"]]);
wx.createPage(MiniProgramPage);
