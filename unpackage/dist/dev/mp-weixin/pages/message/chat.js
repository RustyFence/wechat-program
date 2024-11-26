"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 0,
      chatTitle: "",
      messages: [],
      inputMessage: "",
      isVoiceMode: false,
      showEmoji: false,
      showMore: false,
      scrollTop: 0,
      lastMessageId: "",
      isLoading: false
    };
  },
  onLoad(options) {
    const systemInfo = common_vendor.index.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
    this.chatTitle = options.userName || "聊天";
    this.messages = [
      {
        id: 1,
        type: "text",
        content: "你好，请问商品还在吗？",
        isSelf: true,
        avatar: "/static/avatar/default.png",
        time: (/* @__PURE__ */ new Date()).getTime() - 36e5
      },
      {
        id: 2,
        type: "text",
        content: "在的，有什么可以帮你的吗？",
        isSelf: false,
        avatar: "/static/avatar/seller.png",
        time: (/* @__PURE__ */ new Date()).getTime() - 35e5
      }
    ];
    this.lastMessageId = "msg-" + this.messages[this.messages.length - 1].id;
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    toggleInputMode() {
      this.isVoiceMode = !this.isVoiceMode;
    },
    toggleEmoji() {
      this.showEmoji = !this.showEmoji;
      this.showMore = false;
    },
    toggleMore() {
      this.showMore = !this.showMore;
      this.showEmoji = false;
    },
    sendMessage() {
      if (!this.inputMessage.trim())
        return;
      const newMessage = {
        id: this.messages.length + 1,
        type: "text",
        content: this.inputMessage,
        isSelf: true,
        avatar: "/static/avatar/default.png",
        time: (/* @__PURE__ */ new Date()).getTime()
      };
      this.messages.push(newMessage);
      this.inputMessage = "";
      this.lastMessageId = "msg-" + newMessage.id;
      setTimeout(() => {
        const reply = {
          id: this.messages.length + 1,
          type: "text",
          content: "好的，我知道了",
          isSelf: false,
          avatar: "/static/avatar/seller.png",
          time: (/* @__PURE__ */ new Date()).getTime()
        };
        this.messages.push(reply);
        this.lastMessageId = "msg-" + reply.id;
      }, 1e3);
    },
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          const newMessage = {
            id: this.messages.length + 1,
            type: "image",
            content: res.tempFilePaths[0],
            isSelf: true,
            avatar: "/static/avatar/default.png",
            time: (/* @__PURE__ */ new Date()).getTime()
          };
          this.messages.push(newMessage);
          this.lastMessageId = "msg-" + newMessage.id;
          this.showMore = false;
        }
      });
    },
    previewImage(url) {
      common_vendor.index.previewImage({
        urls: [url]
      });
    },
    loadMoreMessages() {
      if (this.isLoading)
        return;
      this.isLoading = true;
      setTimeout(() => {
        const moreMessages = [
          {
            id: "history-" + this.messages.length,
            type: "text",
            content: "这是历史消息",
            isSelf: false,
            avatar: "/static/avatar/seller.png",
            time: (/* @__PURE__ */ new Date()).getTime() - 72e5
          }
        ];
        this.messages.unshift(...moreMessages);
        this.isLoading = false;
      }, 1e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLoading
  }, $data.isLoading ? {} : {}, {
    b: common_vendor.f($data.messages, (msg, k0, i0) => {
      return common_vendor.e({
        a: msg.avatar,
        b: msg.type === "text"
      }, msg.type === "text" ? {
        c: common_vendor.t(msg.content)
      } : msg.type === "image" ? {
        e: msg.content,
        f: common_vendor.o(($event) => $options.previewImage(msg.content), msg.id)
      } : {}, {
        d: msg.type === "image",
        g: msg.id,
        h: "msg-" + msg.id,
        i: msg.isSelf ? 1 : ""
      });
    }),
    c: $data.scrollTop,
    d: $data.lastMessageId,
    e: common_vendor.o((...args) => $options.loadMoreMessages && $options.loadMoreMessages(...args)),
    f: common_vendor.n($data.isVoiceMode ? "icon-keyboard" : "icon-voice"),
    g: common_vendor.o((...args) => $options.toggleInputMode && $options.toggleInputMode(...args)),
    h: !$data.isVoiceMode
  }, !$data.isVoiceMode ? {
    i: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args)),
    j: $data.inputMessage,
    k: common_vendor.o(($event) => $data.inputMessage = $event.detail.value)
  } : {
    l: common_vendor.o((...args) => _ctx.startRecording && _ctx.startRecording(...args)),
    m: common_vendor.o((...args) => _ctx.stopRecording && _ctx.stopRecording(...args)),
    n: common_vendor.o((...args) => _ctx.cancelRecording && _ctx.cancelRecording(...args))
  }, {
    o: common_vendor.o((...args) => $options.toggleEmoji && $options.toggleEmoji(...args)),
    p: common_vendor.o((...args) => $options.toggleMore && $options.toggleMore(...args)),
    q: $data.showEmoji
  }, $data.showEmoji ? {} : {}, {
    r: $data.showMore
  }, $data.showMore ? {
    s: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-013fa921"]]);
wx.createPage(MiniProgramPage);
