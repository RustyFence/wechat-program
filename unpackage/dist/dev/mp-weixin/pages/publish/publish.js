"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "",
      price: "",
      description: "",
      images: []
    };
  },
  methods: {
    // 添加 URL 生成辅助函数
    getPageUrl(page) {
      return `/pages/${page}/${page}`;
    },
    // 选择图片
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 9 - this.images.length,
        success: (res) => {
          this.images = [...this.images, ...res.tempFilePaths];
        }
      });
    },
    // 删除图片
    deleteImage(index) {
      this.images.splice(index, 1);
    },
    // 发布商品
    async handlePublish() {
      if (!this.title || !this.price || !this.description) {
        common_vendor.index.showToast({
          title: "请填写完整商品信息",
          icon: "none"
        });
        return;
      }
      if (this.images.length === 0) {
        common_vendor.index.showToast({
          title: "请至少上传一张商品图片",
          icon: "none"
        });
        return;
      }
      try {
        const response = await new Promise((resolve, reject) => {
          common_vendor.index.request({
            url: "/api/publish",
            method: "POST",
            data: {
              title: this.title,
              price: this.price,
              description: this.description,
              images: this.images
            },
            success: (res) => {
              const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
              if (data && data.code === 200) {
                resolve(data);
              } else {
                reject(new Error("发布失败"));
              }
            },
            fail: (error) => {
              console.error("Request failed:", error);
              reject(error);
            }
          });
        });
        common_vendor.index.showToast({
          title: "发布成功",
          icon: "success",
          success: () => {
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: this.getPageUrl("home")
              });
            }, 1500);
          }
        });
      } catch (error) {
        common_vendor.index.showToast({
          title: "发布失败",
          icon: "none"
        });
        console.error("发布失败:", error.message || "未知错误");
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.title,
    b: common_vendor.o(($event) => $data.title = $event.detail.value),
    c: $data.price,
    d: common_vendor.o(($event) => $data.price = $event.detail.value),
    e: $data.description,
    f: common_vendor.o(($event) => $data.description = $event.detail.value),
    g: common_vendor.f($data.images, (img, index, i0) => {
      return {
        a: img,
        b: common_vendor.o(($event) => $options.deleteImage(index), index),
        c: index
      };
    }),
    h: $data.images.length < 9
  }, $data.images.length < 9 ? {
    i: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    j: common_vendor.o((...args) => $options.handlePublish && $options.handlePublish(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bfce3555"]]);
wx.createPage(MiniProgramPage);
