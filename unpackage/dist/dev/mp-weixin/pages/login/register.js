"use strict";
const common_vendor = require("../../common/vendor.js");
const mock_auth = require("../../mock/auth.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      phone: "",
      errorMessage: ""
    };
  },
  methods: {
    async handleRegister() {
      if (!this.username || !this.password || !this.confirmPassword || !this.phone) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
        return;
      }
      if (this.password !== this.confirmPassword) {
        common_vendor.index.showToast({
          title: "两次输入的密码不一致",
          icon: "none"
        });
        return;
      }
      try {
        const response = await mock_auth.register(this.username, this.password);
        if (response && response.success) {
          console.log("Registration successful:", response);
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        } else {
          common_vendor.index.showToast({
            title: response.message || "Registration failed",
            icon: "none"
          });
        }
      } catch (error) {
        this.errorMessage = error.message || "An error occurred during registration";
      }
    },
    goBack() {
      common_vendor.index.navigateBack();
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
    f: $data.confirmPassword,
    g: common_vendor.o(($event) => $data.confirmPassword = $event.detail.value),
    h: $data.phone,
    i: common_vendor.o(($event) => $data.phone = $event.detail.value),
    j: common_vendor.o((...args) => $options.handleRegister && $options.handleRegister(...args)),
    k: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-838b72c9"]]);
wx.createPage(MiniProgramPage);
