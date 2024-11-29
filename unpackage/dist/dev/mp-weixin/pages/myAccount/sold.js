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
      soldList: [
        {
          id: 1,
          title: "AirPods Pro 2",
          price: "1299.00",
          description: "99新，带包装盒",
          image: "/static/goods/airpods.jpg",
          soldTime: "2024-03-20 15:30"
        }
        // ... 更多下架商品
      ]
    };
  },
  methods: {
    // 重新上架商品
    relistGoods(goods) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要重新上架该商品吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "上架成功",
              icon: "success"
            });
          }
        }
      });
    },
    loadMore() {
    },
    refresh() {
    }
  },
  navigationBarTitleText: "已售商品"
  // 设置原生导航栏标题
};
if (!Array) {
  const _easycom_goods_preview2 = common_vendor.resolveComponent("goods-preview");
  _easycom_goods_preview2();
}
const _easycom_goods_preview = () => "../../components/goods-preview/goods-preview.js";
if (!Math) {
  _easycom_goods_preview();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.soldList, (item, k0, i0) => {
      return {
        a: "8f7ac795-0-" + i0,
        b: common_vendor.p({
          goods: item
        }),
        c: common_vendor.t(item.soldTime),
        d: common_vendor.o(($event) => $options.relistGoods(item), item.id),
        e: item.id
      };
    }),
    b: $data.soldList.length === 0
  }, $data.soldList.length === 0 ? {
    c: common_assets._imports_0$3
  } : {}, {
    d: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    e: common_vendor.o((...args) => $options.refresh && $options.refresh(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8f7ac795"]]);
wx.createPage(MiniProgramPage);
