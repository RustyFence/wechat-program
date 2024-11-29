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
          images: ["/static/goods/iphone14.jpg"]
        },
        {
          id: 8,
          title: "Switch OLED",
          price: "1999.00",
          description: "95新，带两个游戏",
          images: ["/static/goods/switch.jpg"]
        },
        {
          id: 11,
          title: "理光GR3x",
          price: "4999.00",
          description: "9成新，带UV镜",
          images: ["/static/goods/camera.jpg"]
        }
      ]
    };
  },
  methods: {
    // 取消收藏
    removeFromCollection(goodsId) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要取消收藏该商品吗？",
        success: (res) => {
          if (res.confirm) {
            this.collectionList = this.collectionList.filter((item) => item.id !== goodsId);
            common_vendor.index.showToast({
              title: "已取消收藏",
              icon: "success"
            });
          }
        }
      });
    }
  }
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
    a: common_vendor.f($data.collectionList, (item, index, i0) => {
      return {
        a: index,
        b: "1edd1d20-0-" + i0,
        c: common_vendor.p({
          goods: item
        })
      };
    }),
    b: $data.collectionList.length === 0
  }, $data.collectionList.length === 0 ? {
    c: common_assets._imports_0$1
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
