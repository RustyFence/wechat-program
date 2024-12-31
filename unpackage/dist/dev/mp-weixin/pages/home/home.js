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
      categories: [
        { name: "热销", icon: "http://101.34.249.254:8080/ui/home/热销.svg" },
        { name: "推荐", icon: "http://101.34.249.254:8080/ui/home/推荐1.svg" },
        { name: "优惠", icon: "http://101.34.249.254:8080/ui/home/优惠.svg" },
        { name: "活动", icon: "http://101.34.249.254:8080/ui/home/活动.svg" }
      ],
      goodsList: [],
      currentPage: 1,
      loading: false,
      banners: [
        { name: "banner1", src: "http://101.34.249.254:8080/ui//home/banner/banner1.png" },
        { name: "banner2", src: "http://101.34.249.254:8080/ui/home/banner/banner2.png" },
        { name: "banner3", src: "http://101.34.249.254:8080/ui/home/banner/banner3.png" }
      ]
    };
  },
  methods: {
    async loadGoodsList() {
      if (this.loading)
        return;
      this.loading = true;
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/goods?tags=home${this.currentPage}`,
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
          if (parsedData.length === 0) {
            common_vendor.index.showToast({
              title: "没有更多商品了",
              icon: "none"
            });
          } else {
            this.goodsList = [...this.goodsList, ...parsedData.filter((goods) => goods.isActive)];
            this.currentPage++;
          }
        } else {
          console.log(res);
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取商品列表失败:", error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1e3);
      }
    },
    loadMore() {
      console.log("request page:home" + this.currentPage);
      this.loadGoodsList();
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
      return common_vendor.e({
        a: item.isActive
      }, item.isActive ? {
        b: "44b96aab-1-" + i0,
        c: common_vendor.p({
          goods: item
        })
      } : {}, {
        d: index
      });
    }),
    e: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
