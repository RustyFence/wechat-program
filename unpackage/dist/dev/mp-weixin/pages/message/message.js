"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      messageList: [],
      currentUserId: common_vendor.index.getStorageSync("userId")
      // 获取当前用户ID
    };
  },
  onShow() {
    this.getMessageList();
  },
  methods: {
    navigateToContacts() {
      common_vendor.index.showToast({
        title: "联系人功能锐意开发中，\n敬请期待",
        icon: "none",
        duration: 2e3
      });
    },
    openChat(item) {
      this.markAsRead(item.senderId);
      common_vendor.index.navigateTo({
        url: `/pages/message/chat?senderId=${item.senderId}&userName=${item.sender}`
      });
    },
    async markAsRead(messageId) {
      try {
        const message = this.messageList.find((msg) => msg.senderId === messageId);
        if (message) {
          message.unread = 0;
        }
      } catch (error) {
        console.error("标记已读失败:", error);
      }
    },
    async getMessageList() {
      try {
        const response = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: `/api/messages?userId=${this.currentUserId}`,
            method: "GET",
            success: (res) => {
              try {
                const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
                if (data && data.code === 200 && Array.isArray(data.data.messages)) {
                  resolve(data);
                } else {
                  reject(new Error("Invalid response format or error code"));
                }
              } catch (error) {
                reject(new Error("Failed to parse response data"));
              }
            },
            fail: (error) => {
              console.error("Request failed:", error);
              reject(error);
            }
          });
        });
        this.messageList = this.processMessageList(response.data.messages);
        common_vendor.index.setStorageSync("messages", response.data.messages);
      } catch (error) {
        console.error("获取消息列表失败:", error.message || "未知错误");
      }
    },
    processMessageList(messages) {
      if (!Array.isArray(messages)) {
        console.error("Invalid messages format:", messages);
        return [];
      }
      const lastMessagesMap = /* @__PURE__ */ new Map();
      messages.forEach((msg) => {
        lastMessagesMap.set(msg.senderId, msg);
      });
      return Array.from(lastMessagesMap.values()).map((msg) => ({
        senderId: msg.senderId,
        sender: msg.sender,
        avatar: msg.avatar,
        lastMessage: msg.content,
        time: msg.time,
        unread: 0
        // 可以根据需求修改未读消息的逻辑
      }));
    },
    async fetchAllMessages() {
      try {
        const response = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: `/api/messages?userId=${this.currentUserId}`,
            method: "GET",
            success: resolve,
            fail: reject
          });
        });
        const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
        if (response.statusCode === 200 && data && data.data && Array.isArray(data.data.messages)) {
          this.$store.commit("setMessages", data.data.messages);
        } else {
          console.error("获取消息列表失败:", data.message || "响应格式不正确");
        }
      } catch (error) {
        console.error("获取消息列表失败:", error);
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "contact",
      size: "24",
      color: "#333"
    }),
    b: common_vendor.o((...args) => $options.navigateToContacts && $options.navigateToContacts(...args)),
    c: common_vendor.p({
      type: "search",
      size: "20",
      color: "#666"
    }),
    d: common_vendor.f($data.messageList, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: item.unread
      }, item.unread ? {
        c: common_vendor.t(item.unread)
      } : {}, {
        d: common_vendor.t(item.sender),
        e: common_vendor.t(item.time),
        f: common_vendor.t(item.lastMessage),
        g: index,
        h: common_vendor.o(($event) => $options.openChat(item), index)
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c1b26cf"]]);
wx.createPage(MiniProgramPage);
