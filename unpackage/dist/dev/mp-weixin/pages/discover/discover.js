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
      currentFilter: 0,
      filters: ["全部", "最新", "热门", "附近", "低价", "高价"],
      categories: ["数码", "服装", "美食", "图书", "运动", "生活", "家居", "其他"],
      goodsList: [
        {
          id: 7,
          title: "戴森吸尘器 V15",
          price: "3999.00",
          description: "全新未拆封，顺丰包邮",
          image: "/static/goods/dyson.jpg"
        },
        {
          id: 8,
          title: "Switch OLED",
          price: "1999.00",
          description: "95新，带两个游戏",
          image: "/static/goods/switch.jpg"
        },
        {
          id: 9,
          title: "iPad Pro 12.9",
          price: "6999.00",
          description: "2022款，带妙控键盘",
          image: "/static/goods/ipad.jpg"
        },
        {
          id: 10,
          title: "索尼降噪耳机",
          price: "1799.00",
          description: "WH-1000XM5，全新",
          image: "/static/goods/headphone.jpg"
        },
        {
          id: 11,
          title: "理光GR3x",
          price: "4999.00",
          description: "9成新，带UV镜",
          image: "/static/goods/camera.jpg"
        },
        {
          id: 12,
          title: "机械键盘",
          price: "899.00",
          description: "HHKB Pro 3，带包装",
          image: "/static/goods/keyboard.jpg"
        },
        {
          id: 13,
          title: "显示器",
          price: "2999.00",
          description: "LG 27寸4K显示器",
          image: "/static/goods/monitor.jpg"
        },
        {
          id: 14,
          title: "游戏主机",
          price: "3699.00",
          description: "PS5光驱版，全新",
          image: "/static/goods/ps5.jpg"
        }
      ]
    };
  },
  methods: {
    selectFilter(index) {
      this.currentFilter = index;
    }
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
    b: common_vendor.f($data.filters, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: $data.currentFilter === index ? 1 : "",
        d: common_vendor.o(($event) => $options.selectFilter(index), index)
      };
    }),
    c: common_vendor.f($data.categories, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    d: common_vendor.f($data.goodsList, (item, index, i0) => {
      return {
        a: index,
        b: "06bf36a7-0-" + i0,
        c: common_vendor.p({
          goods: item
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
