"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const _sfc_main = {
  data() {
    return {
      title: "",
      price: "",
      description: "",
      images: [],
      tags: [],
      tagInput: "",
      presetTags: ["数码", "服装", "美食", "图书", "运动", "生活", "居家", "其他"]
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
    // 添加标签
    addTags() {
      if (this.tagInput.trim()) {
        const newTags = this.tagInput.split(" ").filter((tag) => tag);
        this.tags = [...this.tags, ...newTags];
        this.tagInput = "";
      }
    },
    // 删除标签
    removeTag(index) {
      this.tags.splice(index, 1);
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
        const uploadResults = [];
        for (let i = 0; i < this.images.length; i++) {
          const uploadResult = await common_vendor.index.uploadFile({
            url: `${config.apiUrl}/upload`,
            filePath: this.images[i],
            name: "image",
            formData: {
              title: this.title,
              price: this.price,
              description: this.description
            }
          });
          const tempFilePaths = JSON.parse(uploadResult.data);
          uploadResults.push(tempFilePaths.data.url);
          console.log("uploadResults", uploadResults);
        }
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/goods`,
          method: "POST",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
          },
          data: {
            title: this.title,
            price: this.price,
            description: this.description,
            images: JSON.stringify(uploadResults),
            tags: JSON.stringify(this.tags)
          }
        });
        if (res.statusCode === 200) {
          common_vendor.index.showToast({
            title: "发布成功",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "发布失败",
          icon: "none"
        });
        console.error(error);
      }
    },
    // 添加选择预设标签的方法
    selectPresetTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
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
    j: common_vendor.f($data.presetTags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index,
        c: common_vendor.o(($event) => $options.selectPresetTag(tag), index)
      };
    }),
    k: common_vendor.o((...args) => $options.addTags && $options.addTags(...args)),
    l: $data.tagInput,
    m: common_vendor.o(($event) => $data.tagInput = $event.detail.value),
    n: common_vendor.o((...args) => $options.addTags && $options.addTags(...args)),
    o: $data.tags.length > 0
  }, $data.tags.length > 0 ? {
    p: common_vendor.f($data.tags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: common_vendor.o(($event) => $options.removeTag(index), index),
        c: index
      };
    })
  } : {}, {
    q: common_vendor.o((...args) => $options.handlePublish && $options.handlePublish(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bfce3555"]]);
wx.createPage(MiniProgramPage);
