"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/tab-bar/tab-bar.js";
const _sfc_main = {
  components: {
    TabBar
  },
  data() {
    return {
      userInfo: {
        avatar: "/static/avatar/default.png",
        nickname: "用户昵称",
        userId: "10086",
        phone: "13800138000",
        email: "example@email.com",
        address: ""
      },
      counts: {
        collection: 12,
        selling: 3,
        sold: 8
      }
    };
  },
  methods: {
    // 更换头像
    changeAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          this.userInfo.avatar = res.tempFilePaths[0];
        }
      });
    },
    // 编辑信息
    editInfo(type) {
      switch (type) {
        case "nickname":
          common_vendor.index.showModal({
            title: "修改昵称",
            editable: true,
            content: this.userInfo.nickname,
            success: (res) => {
              if (res.confirm && res.content) {
                this.userInfo.nickname = res.content;
              }
            }
          });
          break;
        case "phone":
          common_vendor.index.showModal({
            title: "修改手机号",
            editable: true,
            content: this.userInfo.phone,
            success: (res) => {
              if (res.confirm && res.content) {
                if (/^1[3-9]\d{9}$/.test(res.content)) {
                  this.userInfo.phone = res.content;
                } else {
                  common_vendor.index.showToast({
                    title: "手机号格式不正确",
                    icon: "none"
                  });
                }
              }
            }
          });
          break;
        case "email":
          common_vendor.index.showModal({
            title: "修改邮箱",
            editable: true,
            content: this.userInfo.email || "",
            success: (res) => {
              if (res.confirm && res.content) {
                if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(res.content)) {
                  this.userInfo.email = res.content;
                } else {
                  common_vendor.index.showToast({
                    title: "邮箱格式不正确",
                    icon: "none"
                  });
                }
              }
            }
          });
          break;
        case "address":
          common_vendor.index.chooseLocation({
            success: (res) => {
              this.userInfo.address = res.address;
              this.userInfo.addressDetail = {
                name: res.name,
                address: res.address,
                latitude: res.latitude,
                longitude: res.longitude
              };
            },
            fail: () => {
              common_vendor.index.showModal({
                title: "修改地址",
                editable: true,
                content: this.userInfo.address || "",
                success: (res) => {
                  if (res.confirm && res.content) {
                    this.userInfo.address = res.content;
                  }
                }
              });
            }
          });
          break;
      }
    },
    // 格式化手机号
    formatPhone(phone) {
      return phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : "";
    },
    // 页面导航
    navigateTo(page) {
      common_vendor.index.navigateTo({
        url: `/pages/myAccount/${page}`
      });
    },
    // 退出登录
    logout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
          }
        }
      });
    },
    // 保存信息到服务器
    saveUserInfo() {
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success"
      });
    }
  }
};
if (!Array) {
  const _easycom_tab_bar2 = common_vendor.resolveComponent("tab-bar");
  _easycom_tab_bar2();
}
const _easycom_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  _easycom_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.avatar,
    b: common_vendor.o((...args) => $options.changeAvatar && $options.changeAvatar(...args)),
    c: common_vendor.t($data.userInfo.nickname),
    d: common_vendor.t($data.userInfo.userId),
    e: common_vendor.t($data.userInfo.nickname),
    f: common_vendor.o(($event) => $options.editInfo("nickname")),
    g: common_vendor.t($options.formatPhone($data.userInfo.phone)),
    h: common_vendor.o(($event) => $options.editInfo("phone")),
    i: common_vendor.t($data.userInfo.email || "未设置"),
    j: common_vendor.o(($event) => $options.editInfo("email")),
    k: common_vendor.t($data.userInfo.address ? "已设置" : "未设置"),
    l: common_vendor.o(($event) => $options.editInfo("address")),
    m: $data.counts.collection
  }, $data.counts.collection ? {
    n: common_vendor.t($data.counts.collection)
  } : {}, {
    o: common_vendor.o(($event) => $options.navigateTo("collection")),
    p: $data.counts.selling
  }, $data.counts.selling ? {
    q: common_vendor.t($data.counts.selling)
  } : {}, {
    r: common_vendor.o(($event) => $options.navigateTo("selling")),
    s: $data.counts.sold
  }, $data.counts.sold ? {
    t: common_vendor.t($data.counts.sold)
  } : {}, {
    v: common_vendor.o(($event) => $options.navigateTo("sold")),
    w: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0628a342"]]);
wx.createPage(MiniProgramPage);
