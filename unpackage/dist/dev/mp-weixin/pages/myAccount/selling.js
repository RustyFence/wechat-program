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
      sellingList: [],
      publisherId: common_vendor.index.getStorageSync("userId")
      // 当前用户ID为发布者ID
    };
  },
  mounted() {
    this.loadSellingGoods();
    common_vendor.index.$on("refreshSellingList", this.loadSellingGoods);
  },
  beforeDestroy() {
    common_vendor.index.$off("refreshSellingList", this.loadSellingGoods);
  },
  methods: {
    async loadSellingGoods() {
      try {
        const res = await common_vendor.index.request({
          url: `/api/user/published?userId=${this.publisherId}`,
          method: "GET"
        });
        if (res.data.code === 200) {
          this.sellingList = res.data.data;
        } else {
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取在售商品失败:", error);
        common_vendor.index.showToast({
          title: "获取在售商品失败",
          icon: "none"
        });
      }
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
  },
  navigationBarTitleText: "在售商品"
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
    a: common_vendor.f($data.sellingList, (item, k0, i0) => {
      return {
        a: "116c5b3f-0-" + i0,
        b: common_vendor.p({
          goods: item
        }),
        c: common_vendor.o(($event) => $options.editGoods(item), item.id),
        d: common_vendor.o(($event) => $options.deleteGoods(item), item.id),
        e: item.id
      };
    }),
    b: $data.sellingList.length === 0
  }, $data.sellingList.length === 0 ? {
    c: common_assets._imports_0$2,
    d: common_vendor.o((...args) => $options.navigateToPublish && $options.navigateToPublish(...args))
  } : {}, {
    e: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    f: common_vendor.o((...args) => $options.refresh && $options.refresh(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-116c5b3f"]]);
wx.createPage(MiniProgramPage);
