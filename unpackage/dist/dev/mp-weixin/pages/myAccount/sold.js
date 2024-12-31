"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const common_assets = require("../../common/assets.js");
const GoodsPreview = () => "../../components/goods-preview/goods-preview.js";
const _sfc_main = {
  components: {
    GoodsPreview
  },
  data() {
    return {
      soldList: [],
      publisherId: common_vendor.index.getStorageSync("userId")
      // 当前用户ID为发布者ID
    };
  },
  mounted() {
    this.loadSoldGoods();
    common_vendor.index.$on("refreshSoldList", this.loadSoldGoods);
  },
  beforeDestroy() {
    common_vendor.index.$off("refreshSoldList", this.loadSoldGoods);
  },
  methods: {
    async loadSoldGoods() {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/goods/myGoods`,
          method: "GET",
          header: {
            Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
          }
        });
        if (res.data.code === 200) {
          const parsedData = res.data.data.map((item) => ({
            ...item,
            images: JSON.parse(item.images),
            tags: JSON.parse(item.tags)
          }));
          this.soldList = parsedData.filter((goods) => !goods.isActive);
        } else {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取已下架商品失败:", error);
        common_vendor.index.showToast({
          title: "获取已下架商品失败",
          icon: "none"
        });
      }
    },
    async relistGoods(goods) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要重新上架该商品吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              const response = await common_vendor.index.request({
                url: `${config.apiUrl}/goods/${goods.goodsId}`,
                method: "PUT",
                header: {
                  Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
                },
                data: { isActive: true }
              });
              if (response.data.code === 204) {
                common_vendor.index.showToast({
                  title: "商品已重新上架",
                  icon: "success"
                });
                this.loadSoldGoods();
              } else {
                common_vendor.index.showToast({
                  title: response.data.msg,
                  icon: "none"
                });
              }
            } catch (error) {
              console.error("重新上架商品失败:", error);
              common_vendor.index.showToast({
                title: "重新上架商品失败",
                icon: "none"
              });
            }
          }
        }
      });
    },
    async deleteGoods(goods) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除该商品吗？此操作不可撤销。",
        success: async (res) => {
          if (res.confirm) {
            try {
              const response = await common_vendor.index.request({
                url: `${config.apiUrl}/goods/${goods.goodsId}`,
                method: "DELETE",
                header: {
                  Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
                }
              });
              if (response.data.code === 204) {
                common_vendor.index.showToast({
                  title: "商品已删除",
                  icon: "success"
                });
                this.loadSoldGoods();
              } else {
                common_vendor.index.showToast({
                  title: response.data.msg,
                  icon: "none"
                });
              }
            } catch (error) {
              console.error("删除商品失败:", error);
              common_vendor.index.showToast({
                title: "删除商品失败",
                icon: "none"
              });
            }
          }
        }
      });
    },
    loadMore() {
    },
    refresh() {
      this.loadSoldGoods();
    }
  },
  navigationBarTitleText: "已下架商品"
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
        c: common_vendor.o(($event) => $options.relistGoods(item), item.goodsId),
        d: common_vendor.o(($event) => $options.deleteGoods(item), item.goodsId),
        e: item.goodsId
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
