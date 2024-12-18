"use strict";
const common_vendor = require("../../common/vendor.js");
const GoodsPreview = () => "../../components/goods-preview/goods-preview.js";
const _sfc_main = {
  components: {
    GoodsPreview
  },
  data() {
    return {
      currentFilter: 0,
      filters: ["全部", "最新", "热门", "附近", "低价", "高价"],
      categories: [
        { name: "数码", icon: "/static/discover/数码.svg" },
        { name: "服装", icon: "/static/discover/服装.svg" },
        { name: "美食", icon: "/static/discover/美食.svg" },
        { name: "图书", icon: "/static/discover/图书.svg" },
        { name: "运动", icon: "/static/discover/运动.svg" },
        { name: "生活", icon: "/static/discover/生活.svg" },
        { name: "居家", icon: "/static/discover/居家.svg" },
        { name: "其他", icon: "/static/discover/其他.svg" }
      ],
      goodsList: [
        {
          id: 7,
          title: "戴森吸尘器 V15",
          price: "3999.00",
          description: "全新未拆封，顺丰包邮",
          images: ["/static/goods/dyson.jpg"]
        },
        {
          id: 8,
          title: "Switch OLED",
          price: "1999.00",
          description: "95新，带两个游戏",
          images: ["/static/goods/switch.jpg"]
        },
        {
          id: 9,
          title: "iPad Pro 12.9",
          price: "6999.00",
          description: "2022款，带妙控键盘",
          images: ["/static/goods/ipad.jpg"]
        },
        {
          id: 10,
          title: "索尼降噪耳机",
          price: "1799.00",
          description: "WH-1000XM5，全新",
          images: ["/static/goods/headphone.jpg"]
        },
        {
          id: 11,
          title: "理光GR3x",
          price: "4999.00",
          description: "9成新，带UV镜",
          images: ["/static/goods/camera.jpg"]
        },
        {
          id: 12,
          title: "机械键盘",
          price: "899.00",
          description: "HHKB Pro 3，带包装",
          images: ["/static/goods/keyboard.jpg"]
        },
        {
          id: 13,
          title: "显示器",
          price: "2999.00",
          description: "LG 27寸4K显示器",
          images: ["/static/goods/monitor.jpg"]
        },
        {
          id: 14,
          title: "游戏主机",
          price: "3699.00",
          description: "PS5光驱版，全新",
          images: ["/static/goods/ps5.jpg"]
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
        a: item.icon,
        b: common_vendor.t(item.name),
        c: index
      };
    }),
    d: common_vendor.f($data.goodsList, (item, index, i0) => {
      return {
        a: index,
        b: "8c4a8c2a-1-" + i0,
        c: common_vendor.p({
          goods: item
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
