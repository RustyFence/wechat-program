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
      collectionList: []
    };
  },
  mounted() {
    this.loadCollection();
  },
  methods: {
    async loadCollection() {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/favorites`,
          method: "GET",
          header: {
            Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
          }
        });
        if (res.data.code === 200) {
          this.collectionList = res.data.data.map((item) => ({
            ...item,
            images: JSON.parse(item.images)
          }));
        } else {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取收藏列表失败:", error);
        common_vendor.index.showToast({
          title: "获取收藏列表失败",
          icon: "none"
        });
      }
    },
    async removeFromCollection(goodsId) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要取消收藏该商品吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              const response = await common_vendor.index.request({
                url: `${config.apiUrl}/favorites/${goodsId}`,
                method: "DELETE",
                header: {
                  Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
                }
              });
              if (response.data.code === 204) {
                common_vendor.index.showToast({
                  title: "已取消收藏",
                  icon: "success"
                });
                this.loadCollection();
              } else {
                common_vendor.index.showToast({
                  title: response.data.msg,
                  icon: "none"
                });
              }
            } catch (error) {
              console.error("取消收藏失败:", error);
              common_vendor.index.showToast({
                title: "取消收藏失败",
                icon: "none"
              });
            }
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
        a: item.goodsId,
        b: common_vendor.o(($event) => $options.removeFromCollection(item.goodsId), item.goodsId),
        c: "1edd1d20-0-" + i0,
        d: common_vendor.p({
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
