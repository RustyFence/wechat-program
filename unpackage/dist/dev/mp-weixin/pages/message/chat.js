"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const _sfc_main = {
  data() {
    return {
      chatMessages: [],
      newMessage: "",
      oppoUserId: 0,
      oppoUserName: "",
      oppoUserAvatar: "",
      currentUserId: 0,
      currentUserName: "",
      currentUserAvatar: ""
    };
  },
  onLoad({ oppoUserId }) {
    this.oppoUserId = Number(oppoUserId);
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      console.log(this.oppoUserId);
      console.log(common_vendor.index.getStorageSync("token"));
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/messages`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
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
          console.log(res.data);
          console.error("Failed to fetch messages:", res.data.msg);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    },
    async sendMessage() {
      if (!this.newMessage.trim())
        return;
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/messages`,
          method: "POST",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
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
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            isRead: false
          });
          this.newMessage = "";
        } else {
          console.error("发送消息失败:", res.data.msg);
        }
      } catch (error) {
        console.error("发送消息失败:", error);
      }
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.chatMessages, (msg, index, i0) => {
      return {
        a: msg.senderId === $data.currentUserId ? $data.currentUserAvatar : $data.oppoUserAvatar,
        b: common_vendor.t(msg.senderId === $data.currentUserId ? $data.currentUserName : $data.oppoUserName),
        c: common_vendor.t(msg.content),
        d: common_vendor.t($options.formatTime(msg.timestamp)),
        e: msg.messageId,
        f: msg.senderId === $data.currentUserId ? 1 : "",
        g: msg.senderId !== $data.currentUserId ? 1 : ""
      };
    }),
    b: $data.newMessage,
    c: common_vendor.o(($event) => $data.newMessage = $event.detail.value),
    d: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-013fa921"]]);
wx.createPage(MiniProgramPage);
