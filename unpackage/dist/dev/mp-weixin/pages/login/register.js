"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
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
      if (!/^\d{11}$/.test(this.phone)) {
        common_vendor.index.showToast({
          title: "手机号格式不正确",
          icon: "none"
        });
        return;
      }
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/users/register`,
          method: "POST",
          data: {
            username: this.username,
            password: this.password,
            phone: this.phone
          }
        });
        if (res.data.code === 200) {
          common_vendor.index.showToast({
            title: "注册成功",
            icon: "none"
          });
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        } else {
          console.log(res.data);
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "注册失败",
          icon: "none"
        });
        console.error("注册失败:", error);
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
