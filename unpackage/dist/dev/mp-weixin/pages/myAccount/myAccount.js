"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        avatar: "/static/avatar/default.png",
        username: "没有登录信息",
        userId: "666",
        phone: "13800138000",
        email: "example@email.com"
      },
      counts: {
        collection: 0,
        selling: 0,
        sold: 0
      }
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    // 获取用户信息
    async fetchUserInfo() {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/users`,
          method: "GET",
          header: {
            Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
          }
        });
        if (res.data.code === 200) {
          this.userInfo = res.data.data;
        } else {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取用户信息失败:", error);
        common_vendor.index.showToast({
          title: "获取用户信息失败",
          icon: "none"
        });
      }
    },
    // 更换头像
    async changeAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        success: async (res) => {
          const filePath = res.tempFilePaths[0];
          try {
            const uploadResult = await common_vendor.index.uploadFile({
              url: `${config.apiUrl}/upload`,
              filePath,
              name: "image",
              header: {
                Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
              }
            });
            console.log(uploadResult);
            const response = JSON.parse(uploadResult.data);
            if (response.code === 201) {
              console.log(response.data.url);
              this.userInfo.avatar = response.data.url;
              this.updateUserInfo();
              common_vendor.index.showToast({
                title: "头像上传成功",
                icon: "success"
              });
            } else {
              common_vendor.index.showToast({
                title: response.msg,
                icon: "none"
              });
            }
          } catch (error) {
            console.error("头像上传失败:", error);
            common_vendor.index.showToast({
              title: "头像上传失败",
              icon: "none"
            });
          }
        }
      });
    },
    // 编辑信息
    editInfo(type) {
      let title = "";
      let content = "";
      switch (type) {
        case "username":
          title = "修改昵称";
          content = this.userInfo.username;
          break;
        case "phone":
          title = "修改手机号";
          content = this.userInfo.phone;
          break;
        case "email":
          title = "修改邮箱";
          content = this.userInfo.email || "";
          break;
      }
      common_vendor.index.showModal({
        title,
        editable: true,
        content,
        success: (res) => {
          if (res.confirm && res.content) {
            if (type === "phone" && !/^1[3-9]\d{9}$/.test(res.content)) {
              common_vendor.index.showToast({
                title: "手机号格式不正确",
                icon: "none"
              });
              return;
            }
            if (type === "email" && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(res.content)) {
              common_vendor.index.showToast({
                title: "邮箱格式不正确",
                icon: "none"
              });
              return;
            }
            this.userInfo[type] = res.content;
            this.updateUserInfo();
          }
        }
      });
    },
    // 更新用户信息
    async updateUserInfo() {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/users`,
          method: "PUT",
          header: {
            Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
          },
          data: this.userInfo
        });
        if (res.data.code === 204) {
          common_vendor.index.showToast({
            title: "信息更新成功",
            icon: "success"
          });
          if (this.userInfo.username !== common_vendor.index.getStorageSync("userName")) {
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
            common_vendor.index.showToast({
              title: "用户名更改，本地令牌失效，请重新登录",
              icon: "none"
            });
          }
        } else {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("更新用户信息失败:", error);
        common_vendor.index.showToast({
          title: "更新用户信息失败",
          icon: "none"
        });
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.avatar,
    b: common_vendor.o((...args) => $options.changeAvatar && $options.changeAvatar(...args)),
    c: common_vendor.t($data.userInfo.username),
    d: common_vendor.t($data.userInfo.userId),
    e: common_vendor.t($data.userInfo.username),
    f: common_vendor.o(($event) => $options.editInfo("username")),
    g: common_vendor.t($options.formatPhone($data.userInfo.phone)),
    h: common_vendor.o(($event) => $options.editInfo("phone")),
    i: common_vendor.t($data.userInfo.email || "未设置"),
    j: common_vendor.o(($event) => $options.editInfo("email")),
    k: $data.counts.collection
  }, $data.counts.collection ? {
    l: common_vendor.t($data.counts.collection)
  } : {}, {
    m: common_vendor.o(($event) => $options.navigateTo("collection")),
    n: $data.counts.selling
  }, $data.counts.selling ? {
    o: common_vendor.t($data.counts.selling)
  } : {}, {
    p: common_vendor.o(($event) => $options.navigateTo("selling")),
    q: $data.counts.sold
  }, $data.counts.sold ? {
    r: common_vendor.t($data.counts.sold)
  } : {}, {
    s: common_vendor.o(($event) => $options.navigateTo("sold")),
    t: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0628a342"]]);
wx.createPage(MiniProgramPage);
