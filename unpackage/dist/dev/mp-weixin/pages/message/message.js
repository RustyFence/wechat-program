"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const _sfc_main = {
  data() {
    return {
      conversations: []
    };
  },
  onLoad() {
    this.fetchConversations();
  },
  methods: {
    async fetchConversations() {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/conversations`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
          }
        });
        if (res.data.code === 200) {
          this.conversations = res.data.data;
        } else {
          console.error("Failed to fetch conversations:", res.data.msg);
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    },
    openChat(conversation) {
      common_vendor.index.navigateTo({
        url: `/pages/message/chat?oppoUserId=${conversation.oppoUserId}`
      });
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.conversations, (conversation, index, i0) => {
      return common_vendor.e({
        a: conversation.conversationAvatar,
        b: conversation.unreadCount > 0
      }, conversation.unreadCount > 0 ? {
        c: common_vendor.t(conversation.unreadCount)
      } : {}, {
        d: common_vendor.t(conversation.conversationName),
        e: common_vendor.t($options.formatTime(conversation.timestamp)),
        f: common_vendor.t(conversation.lastMessage),
        g: index,
        h: common_vendor.o(($event) => $options.openChat(conversation), index)
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c1b26cf"]]);
wx.createPage(MiniProgramPage);
