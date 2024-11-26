"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      goodsImages: [
        "/static/goods/demo1.jpg",
        "/static/goods/demo2.jpg"
      ],
      price: "299.99",
      title: "商品标题示例",
      description: "这是一段商品描述文本，详细介绍商品的各种信息和特点。",
      sellerAvatar: "/static/avatar/default.png",
      sellerName: "卖家昵称",
      isCollected: false
    };
  },
  methods: {
    // 切换收藏状态
    toggleCollect() {
      this.isCollected = !this.isCollected;
      common_vendor.index.showToast({
        title: this.isCollected ? "收藏成功" : "已取消收藏",
        icon: "success"
      });
    },
    // 联系卖家
    contactSeller() {
      common_vendor.index.navigateTo({
        url: `/pages/chat/chat?userId=${sellerId}&userName=${sellerName}`
      });
    }
  },
  onLoad(options) {
    const goodsId = options.id;
    this.loadGoodsDetail(goodsId);
  },
  methods: {
    loadGoodsDetail(id) {
      console.log("加载商品ID:", id);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.goodsImages, (img, index, i0) => {
      return {
        a: img,
        b: index
      };
    }),
    b: common_vendor.t($data.price),
    c: $data.isCollected ? "/static/icons/collected.png" : "/static/icons/collect.png",
    d: common_vendor.t($data.isCollected ? "已收藏" : "收藏"),
    e: common_vendor.n({
      active: $data.isCollected
    }),
    f: common_vendor.o((...args) => $options.toggleCollect && $options.toggleCollect(...args)),
    g: common_vendor.t($data.title),
    h: $data.sellerAvatar,
    i: common_vendor.t($data.sellerName),
    j: common_vendor.t($data.description),
    k: common_vendor.o((...args) => $options.contactSeller && $options.contactSeller(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9d1b2f90"]]);
wx.createPage(MiniProgramPage);
