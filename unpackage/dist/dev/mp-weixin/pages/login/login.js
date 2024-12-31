"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    // 普通登录
    async handleLogin() {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/users/login`,
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            username: this.username,
            password: this.password
          }
        });
        if (res.data.code === 200) {
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "none"
          });
          console.log(res);
          common_vendor.index.setStorageSync("token", res.data.data.token);
          common_vendor.index.setStorageSync("userId", res.data.data.userId);
          common_vendor.index.setStorageSync("userName", this.username);
          common_vendor.index.switchTab({
            url: "/pages/home/home"
          });
        } else {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "登录失败",
          icon: "none"
        });
        console.error("登录失败:", error);
      }
    },
    // 微信登录
    async handleWXLogin() {
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
