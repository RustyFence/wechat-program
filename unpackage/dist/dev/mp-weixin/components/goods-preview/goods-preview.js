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
    goToGoodsInfo() {
      common_vendor.index.navigateTo({
        url: `/pages/goods-info/goods-info?id=${this.goods.goodsId}`
      });
    },
    formatDate(dateString) {
      if (!dateString)
        return "未知时间";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return {
    a: ((_a = $props.goods.images) == null ? void 0 : _a[0]) || $props.goods.image || "/static/goods/default.png",
    b: common_vendor.t($props.goods.price || "0.00"),
    c: common_vendor.t($props.goods.title || "商品标题"),
    d: common_vendor.t($props.goods.description || "商品描述"),
    e: common_vendor.t($options.formatDate($props.goods.updateAt)),
    f: common_vendor.o((...args) => $options.goToGoodsInfo && $options.goToGoodsInfo(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4d8bc7a2"]]);
wx.createComponent(Component);
