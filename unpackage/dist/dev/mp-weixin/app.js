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
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
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
