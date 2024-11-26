"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const TabBar = () => "../../components/tab-bar/tab-bar.js";
const GoodsPreview = () => "../../components/goods-preview/goods-preview.js";
const _sfc_main = {
  components: {
    TabBar,
    GoodsPreview
  },
  data() {
    return {
      goodsList: [
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
        },
        {
          id: 3,
          title: "索尼相机 A7M4",
          price: "15999.00",
          description: "95新，快门数3000次以内",
          image: "/static/goods/sony.jpg"
        },
        {
          id: 4,
          title: "MacBook Pro M2",
          price: "12999.00",
          description: "2023年新款，带包装",
          image: "/static/goods/macbook.jpg"
        },
        {
          id: 5,
          title: "华为手表 GT4",
          price: "1499.00",
          description: "全新未拆封，46mm",
          image: "/static/goods/watch.jpg"
        },
        {
          id: 6,
          title: "AirPods Pro 2",
          price: "1299.00",
          description: "99新，带包装盒",
          image: "/static/goods/airpods.jpg"
        }
      ]
    };
  }
};
if (!Array) {
  const _easycom_goods_preview2 = common_vendor.resolveComponent("goods-preview");
  const _easycom_tab_bar2 = common_vendor.resolveComponent("tab-bar");
  (_easycom_goods_preview2 + _easycom_tab_bar2)();
}
const _easycom_goods_preview = () => "../../components/goods-preview/goods-preview.js";
const _easycom_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  (_easycom_goods_preview + _easycom_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.f(3, (item, index, i0) => {
      return {
        a: index
      };
    }),
    c: common_vendor.f(4, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: index
      };
    }),
    d: common_vendor.f($data.goodsList, (item, index, i0) => {
      return {
        a: index,
        b: "1dd46367-0-" + i0,
        c: common_vendor.p({
          goods: item
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
