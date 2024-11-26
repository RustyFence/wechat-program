"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "GoodsPreview",
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    openGoodsDetail() {
      common_vendor.index.navigateTo({
        url: `/pages/discover/goods-info?id=${this.goods.id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.goods.image || "/static/goods/default.png",
    b: common_vendor.t($props.goods.price || "0.00"),
    c: common_vendor.t($props.goods.title || "商品标题"),
    d: common_vendor.t($props.goods.description || "商品描述"),
    e: common_vendor.o((...args) => $options.openGoodsDetail && $options.openGoodsDetail(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4d8bc7a2"]]);
wx.createComponent(Component);
