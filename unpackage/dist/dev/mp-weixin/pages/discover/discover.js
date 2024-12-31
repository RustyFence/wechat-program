"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const GoodsPreview = () => "../../components/goods-preview/goods-preview.js";
const _sfc_main = {
  components: {
    GoodsPreview
  },
  data() {
    return {
      keywords: "",
      currentFilter: "",
      currentCategory: "",
      filters: ["全部", "最新", "低价", "高价", "热门", "附近"],
      categories: [
        { name: "数码", icon: "http://101.34.249.254:8080/ui/discover/数码.svg" },
        { name: "服装", icon: "http://101.34.249.254:8080/ui/discover/服装.svg" },
        { name: "美食", icon: "http://101.34.249.254:8080/ui/discover/美食.svg" },
        { name: "图书", icon: "http://101.34.249.254:8080/ui/discover/图书.svg" },
        { name: "运动", icon: "http://101.34.249.254:8080/ui/discover/运动.svg" },
        { name: "生活", icon: "http://101.34.249.254:8080/ui/discover/生活.svg" },
        { name: "居家", icon: "http://101.34.249.254:8080/ui/discover/居家.svg" },
        { name: "其他", icon: "http://101.34.249.254:8080/ui/discover/其他.svg" }
      ],
      goodsList: []
      // 初始化为空数组
    };
  },
  methods: {
    selectFilter(item) {
      this.currentFilter = item;
      if (item === "全部") {
        this.currentCategory = "";
        this.loadGoodsList();
      } else if (item === "最新") {
        this.goodsList = this.goodsList.sort((a, b) => {
          const timeA = new Date(a.updateAt).getTime() || 0;
          const timeB = new Date(b.updateAt).getTime() || 0;
          return timeB - timeA;
        });
      } else if (item === "低价") {
        this.goodsList = this.goodsList.sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return priceA - priceB;
        });
      } else if (item === "高价") {
        this.goodsList = this.goodsList.sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return priceB - priceA;
        });
      }
      console.log("筛选后的商品列表:", this.goodsList);
    },
    selectCategory(name) {
      this.currentCategory = name;
      this.loadGoodsList();
    },
    async loadGoodsList() {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/goods?keywords=${this.keywords}&tags=${this.currentCategory}`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
          }
        });
        if (res.data.code === 200) {
          const parsedData = res.data.data.map((item) => ({
            ...item,
            images: JSON.parse(item.images),
            tags: JSON.parse(item.tags)
          }));
          this.goodsList = parsedData.filter((goods) => goods.isActive);
        } else {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取商品列表失败:", error);
      }
    }
  },
  onLoad() {
    this.loadGoodsList();
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
    b: common_vendor.o([($event) => $data.keywords = $event.detail.value, (...args) => $options.loadGoodsList && $options.loadGoodsList(...args)]),
    c: $data.keywords,
    d: common_vendor.f($data.filters, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item,
        c: $data.currentFilter === item ? 1 : "",
        d: common_vendor.o(($event) => $options.selectFilter(item), item)
      };
    }),
    e: common_vendor.f($data.categories, (item, k0, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: item.name,
        d: common_vendor.o(($event) => $options.selectCategory(item.name), item.name)
      };
    }),
    f: common_vendor.f($data.goodsList, (item, index, i0) => {
      return common_vendor.e({
        a: item.isActive
      }, item.isActive ? {
        b: "8c4a8c2a-1-" + i0,
        c: common_vendor.p({
          goods: item
        })
      } : {}, {
        d: item.goodsId
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
