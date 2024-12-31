"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const _sfc_main = {
  data() {
    return {
      goodsId: "",
      title: "",
      price: "",
      description: "",
      images: [],
      tags: [],
      tagInput: ""
    };
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    console.log(this.goodsId);
    this.loadGoodsInfo();
  },
  methods: {
    async loadGoodsInfo() {
      const res = await common_vendor.index.request({
        url: `${config.apiUrl}/goods/${this.goodsId}`,
        method: "GET"
      });
      if (res.statusCode === 200) {
        const goodsInfo = res.data.data;
        console.log(goodsInfo);
        this.title = goodsInfo.title;
        this.price = goodsInfo.price;
        this.description = goodsInfo.description;
        this.images = JSON.parse(goodsInfo.images);
        this.tags = JSON.parse(goodsInfo.tags);
      }
    },
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
    //修改商品
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
          header: {
            Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
          },
          url: `${config.apiUrl}/goods/${this.goodsId}`,
          method: "PUT",
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
            title: "编辑成功",
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
          title: "编辑失败",
          icon: "none"
        });
        console.error(error);
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
    j: common_vendor.o((...args) => $options.addTags && $options.addTags(...args)),
    k: $data.tagInput,
    l: common_vendor.o(($event) => $data.tagInput = $event.detail.value),
    m: common_vendor.o((...args) => $options.addTags && $options.addTags(...args)),
    n: $data.tags.length > 0
  }, $data.tags.length > 0 ? {
    o: common_vendor.f($data.tags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: common_vendor.o(($event) => $options.removeTag(index), index),
        c: index
      };
    })
  } : {}, {
    p: common_vendor.o((...args) => $options.handlePublish && $options.handlePublish(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-00cc285f"]]);
wx.createPage(MiniProgramPage);
