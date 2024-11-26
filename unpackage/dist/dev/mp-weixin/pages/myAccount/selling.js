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
      sellingList: [
        {
          id: 1,
          title: "MacBook Pro M2",
          price: "12999.00",
          description: "2023年新款，带包装",
          image: "/static/goods/macbook.jpg"
        }
        // ... 更多在售商品
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    editGoods(goods) {
      common_vendor.index.navigateTo({
        url: `/pages/publish/publish?id=${goods.id}`
      });
    },
    deleteGoods(goods) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要下架该商品吗？",
        success: (res) => {
          if (res.confirm)
            ;
        }
      });
    },
    navigateToPublish() {
      common_vendor.index.switchTab({
        url: "/pages/publish/publish"
      });
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
    c: common_vendor.f($data.sellingList, (item, k0, i0) => {
      return {
        a: "116c5b3f-1-" + i0,
        b: common_vendor.p({
          goods: item
        }),
        c: common_vendor.o(($event) => $options.editGoods(item), item.id),
        d: common_vendor.o(($event) => $options.deleteGoods(item), item.id),
        e: item.id
      };
    }),
    d: $data.sellingList.length === 0
  }, $data.sellingList.length === 0 ? {
    e: common_assets._imports_0$3,
    f: common_vendor.o((...args) => $options.navigateToPublish && $options.navigateToPublish(...args))
  } : {}, {
    g: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    h: common_vendor.o((...args) => $options.refresh && $options.refresh(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-116c5b3f"]]);
wx.createPage(MiniProgramPage);
