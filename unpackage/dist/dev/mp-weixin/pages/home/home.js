"use strict";
const common_vendor = require("../../common/vendor.js");
const GoodsPreview = () => "../../components/goods-preview/goods-preview.js";
const _sfc_main = {
  components: {
    GoodsPreview
  },
  data() {
    return {
      userId: common_vendor.index.setStorageSync("userId", 1),
      // 设置当前用户ID为1 ，测试用，后续改为从登录状态获取
      categories: [
        { name: "热销", icon: "/static/home/热销.svg" },
        { name: "推荐", icon: "/static/home/推荐1.svg" },
        { name: "优惠", icon: "/static/home/优惠.svg" },
        { name: "活动", icon: "/static/home/活动.svg" }
      ],
      goodsList: [
        {
          id: 1,
          title: "iPhone 14 Pro Max",
          price: "7999.00",
          description: "全新未拆封，256G 暗紫色//测试字数溢出",
          images: ["/static/goods/iphone14.jpg"]
        },
        {
          id: 2,
          title: "耐克运动鞋",
          price: "599.00",
          description: "Nike Air Max 270，9成新",
          images: ["/static/goods/nike.jpg"]
        },
        {
          id: 3,
          title: "索尼相机 A7M4",
          price: "15999.00",
          description: "95新，快门数3000次以内",
          images: ["/static/goods/sony.jpg"]
        },
        {
          id: 4,
          title: "MacBook Pro M2",
          price: "12999.00",
          description: "2023年新款，带包装",
          images: ["/static/goods/macbook.jpg"]
        },
        {
          id: 5,
          title: "华为手表 GT4",
          price: "1499.00",
          description: "全新未拆封，46mm",
          images: ["/static/goods/watch.jpg"]
        },
        {
          id: 6,
          title: "AirPods Pro 2",
          price: "1299.00",
          description: "99新，带包装盒",
          images: ["/static/goods/airpods.jpg"]
        }
      ],
      banners: [
        { name: "banner1", src: "/static/home/banner/banner1.png" },
        { name: "banner2", src: "/static/home/banner/banner2.png" },
        { name: "banner3", src: "/static/home/banner/banner3.png" }
      ]
    };
  },
  methods: {
    goToGoodsInfo(goodsId) {
      common_vendor.index.navigateTo({
        url: `/pages/goods-info/goods-info?id=${goodsId}`
      });
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
  return {
    a: common_vendor.p({
      type: "search",
      size: "18",
      color: "#666"
    }),
    b: common_vendor.f($data.banners, (item, index, i0) => {
      return {
        a: item.src,
        b: index
      };
    }),
    c: common_vendor.f($data.categories, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: index
      };
    }),
    d: common_vendor.f($data.goodsList, (item, index, i0) => {
      return {
        a: "44b96aab-1-" + i0,
        b: common_vendor.p({
          goods: item
        }),
        c: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
