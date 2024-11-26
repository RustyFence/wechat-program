"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const GoodsPreview = () => "../../components/goods-preview/goods-preview.js";
const _sfc_main = {
  components: {
    GoodsPreview
  },
  data() {
    return {
      collectionList: [
        {
          id: 1,
          title: "iPhone 14 Pro Max",
          price: "7999.00",
          description: "全新未拆封，256G 暗紫色",
          image: "/static/goods/iphone.jpg"
        },
        {
          id: 2,
          title: "耐克运动鞋",
          price: "599.00",
          description: "Nike Air Max 270，9成新",
          image: "/static/goods/nike.jpg"
        }
        // ... 更多收藏商品
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    loadMore() {
    },
    refresh() {
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_goods_preview2 = common_vendor.resolveComponent("goods-preview");
  (_easycom_uni_icons2 + _easycom_goods_preview2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_goods_preview = () => "../../components/goods-preview/goods-preview.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_goods_preview)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "back",
      size: "24",
      color: "#333"
    }),
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.f($data.collectionList, (item, k0, i0) => {
      return {
        a: item.id,
        b: "a3f0690f-1-" + i0,
        c: common_vendor.p({
          goods: item
        })
      };
    }),
    d: $data.collectionList.length === 0
  }, $data.collectionList.length === 0 ? {
    e: common_assets._imports_0$2
  } : {}, {
    f: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    g: common_vendor.o((...args) => $options.refresh && $options.refresh(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a3f0690f"]]);
wx.createPage(MiniProgramPage);
