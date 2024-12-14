"use strict";
const common_vendor = require("../../common/vendor.js");
const mock_auth = require("../../mock/auth.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    // 普通登录
    async handleLogin() {
      try {
        const response = await mock_auth.login(this.username, this.password);
        if (response.success) {
          console.log("Login successful:", response.token);
          common_vendor.index.setStorageSync("userToken", response.token);
          common_vendor.index.setStorageSync("userId", response.userId);
          common_vendor.index.switchTab({
            url: "/pages/home/home"
          });
        }
      } catch (error) {
        this.errorMessage = error.message || "Login failed";
      }
    },
    // 微信登录
    handleWXLogin() {
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => {
          console.log(loginRes.code);
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: (infoRes) => {
              console.log("用户信息：", infoRes.userInfo);
            }
          });
        },
        fail: (err) => {
          console.error("微信登录失败：", err);
          common_vendor.index.showToast({
            title: "微信登录失败",
            icon: "none"
          });
        }
      });
    },
    // 跳转到注册页面
    goToRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/login/register"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: $data.username,
    c: common_vendor.o(($event) => $data.username = $event.detail.value),
    d: $data.password,
    e: common_vendor.o(($event) => $data.password = $event.detail.value),
    f: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args)),
    g: common_vendor.o((...args) => $options.goToRegister && $options.goToRegister(...args)),
    h: common_vendor.o((...args) => $options.handleWXLogin && $options.handleWXLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
