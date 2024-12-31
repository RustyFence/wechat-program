"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/login/login.js";
  "./pages/discover/discover.js";
  "./pages/publish/publish.js";
  "./pages/message/message.js";
  "./pages/myAccount/myAccount.js";
  "./pages/login/register.js";
  "./pages/goods-info/goods-info.js";
  "./pages/message/chat.js";
  "./pages/message/contact.js";
  "./pages/myAccount/collection.js";
  "./pages/myAccount/selling.js";
  "./pages/myAccount/sold.js";
  "./pages/myAccount/edit.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
    setTimeout(() => {
      this.checkUnreadMessages();
    }, 0);
  },
  onShow: function() {
    this.checkUnreadMessages();
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    async checkUnreadMessages() {
      try {
        const messageList = this.globalData.messageList || [];
        const unreadCount = messageList.reduce((sum, msg) => sum + (msg.unread || 0), 0);
        this.globalData.messageUnreadCount = unreadCount;
        if (unreadCount > 0) {
          const pages = getCurrentPages();
          const currentPage = pages[pages.length - 1];
          if (currentPage && currentPage.route && ["pages/home/home", "pages/discover/discover", "pages/publish/publish", "pages/message/message", "pages/myAccount/myAccount"].includes(currentPage.route)) {
            common_vendor.index.setTabBarBadge({
              index: 3,
              text: String(unreadCount)
            });
          }
        } else {
          const pages = getCurrentPages();
          const currentPage = pages[pages.length - 1];
          if (currentPage && currentPage.route && ["pages/home/home", "pages/discover/discover", "pages/publish/publish", "pages/message/message", "pages/myAccount/myAccount"].includes(currentPage.route)) {
            common_vendor.index.removeTabBarBadge({
              index: 3
            });
          }
        }
      } catch (error) {
        console.error("检查未读消息失败:", error);
      }
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
