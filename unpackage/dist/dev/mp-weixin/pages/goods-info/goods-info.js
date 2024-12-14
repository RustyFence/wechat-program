"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      goods: {
        id: "",
        title: "",
        price: "",
        description: "",
        images: [],
        publisherId: "",
        publisherName: ""
      },
      comments: [],
      userRating: 5,
      userComment: "",
      averageRating: 0,
      isCollected: false
    };
  },
  computed: {
    formattedRating() {
      return Number(this.averageRating).toFixed(1);
    }
  },
  onLoad(options) {
    const goodsId = options.id;
    this.loadGoodsInfo(goodsId);
  },
  methods: {
    async loadGoodsInfo(id) {
      try {
        const res = await common_vendor.index.request({
          url: `/api/goods/${id}`,
          method: "GET"
        });
        if (res.data.code === 200) {
          const goodsInfo = res.data.data;
          this.goods = { ...goodsInfo };
          this.loadPublisherInfo(goodsInfo.publisherId);
          this.loadComments(id);
        } else {
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取商品信息失败:", error);
        common_vendor.index.showToast({
          title: "获取商品信息失败",
          icon: "none"
        });
      }
    },
    async loadPublisherInfo(publisherId) {
      try {
        const res = await common_vendor.index.request({
          url: `/api/users/${publisherId}`,
          method: "GET"
        });
        if (res.data.code === 200) {
          this.goods.publisherName = res.data.data.name;
        } else {
          console.error("获取发布者信息失败:", res.data.message);
        }
      } catch (error) {
        console.error("获取发布者信息失败:", error);
      }
    },
    async loadComments(goodsId) {
      try {
        const res = await common_vendor.index.request({
          url: `/api/goods/${goodsId}/comments`,
          method: "GET"
        });
        if (res.data.code === 200) {
          this.comments = res.data.data.list;
          this.calculateAverageRating();
        }
      } catch (error) {
        console.error("获取评论失败:", error);
      }
    },
    showCommentModal() {
      this.$refs.commentPopup.open();
    },
    closeCommentModal() {
      this.$refs.commentPopup.close();
    },
    submitComment() {
      if (!this.userComment.trim()) {
        common_vendor.index.showToast({
          title: "请输入评价内容",
          icon: "none"
        });
        return;
      }
      const newComment = {
        id: Date.now(),
        userAvatar: "/static/avatar/default.png",
        userName: "用户" + Math.floor(Math.random() * 1e3),
        rating: this.userRating,
        content: this.userComment,
        time: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      this.comments.unshift(newComment);
      this.calculateAverageRating();
      this.userComment = "";
      this.userRating = 5;
      this.closeCommentModal();
      common_vendor.index.showToast({
        title: "评价成功",
        icon: "success"
      });
    },
    calculateAverageRating() {
      if (this.comments.length === 0) {
        this.averageRating = 0;
        return;
      }
      const sum = this.comments.reduce((acc, curr) => acc + curr.rating, 0);
      this.averageRating = Number((sum / this.comments.length).toFixed(1));
    },
    // 切换收藏状态
    async toggleCollect() {
      try {
        const res = await common_vendor.index.request({
          url: "/api/goods/favorite",
          method: "POST",
          data: {
            goodsId: this.goods.id,
            action: this.isCollected ? "remove" : "add"
          }
        });
        if (res.data.code === 200) {
          this.isCollected = res.data.data.isCollected;
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "success"
          });
        }
      } catch (error) {
        console.error("收藏操作失败:", error);
        common_vendor.index.showToast({
          title: "操作失败",
          icon: "none"
        });
      }
    },
    contactSeller() {
      common_vendor.index.navigateTo({
        url: `/pages/message/chat?senderId=${this.goods.publisherId}&userName=${this.goods.publisherName}`
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_rate2 + _easycom_uni_popup2 + _easycom_uni_icons2)();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_popup + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.goods.images, (img, index, i0) => {
      return {
        a: img,
        b: index
      };
    }),
    b: common_vendor.t($data.goods.price),
    c: common_vendor.t($data.goods.title),
    d: common_vendor.t($data.goods.description),
    e: common_vendor.t($data.comments.length),
    f: common_vendor.p({
      value: $data.averageRating,
      disabled: true,
      size: "15"
    }),
    g: common_vendor.t($options.formattedRating),
    h: common_vendor.f($data.comments, (comment, index, i0) => {
      return {
        a: comment.userAvatar,
        b: common_vendor.t(comment.userName),
        c: "1671962a-1-" + i0,
        d: common_vendor.p({
          value: comment.rating,
          disabled: true,
          size: "12"
        }),
        e: common_vendor.t(comment.time),
        f: common_vendor.t(comment.content),
        g: index
      };
    }),
    i: common_vendor.o((...args) => $options.showCommentModal && $options.showCommentModal(...args)),
    j: common_vendor.o((...args) => $options.closeCommentModal && $options.closeCommentModal(...args)),
    k: common_vendor.o(($event) => $data.userRating = $event),
    l: common_vendor.p({
      modelValue: $data.userRating
    }),
    m: $data.userComment,
    n: common_vendor.o(($event) => $data.userComment = $event.detail.value),
    o: common_vendor.o((...args) => $options.submitComment && $options.submitComment(...args)),
    p: common_vendor.sr("commentPopup", "1671962a-2"),
    q: common_vendor.p({
      type: "bottom"
    }),
    r: common_vendor.p({
      type: $data.isCollected ? "star-filled" : "star",
      size: "20"
    }),
    s: common_vendor.t($data.isCollected ? "已收藏" : "收藏"),
    t: $data.isCollected ? 1 : "",
    v: common_vendor.o((...args) => $options.toggleCollect && $options.toggleCollect(...args)),
    w: common_vendor.p({
      type: "chat",
      size: "20"
    }),
    x: common_vendor.o((...args) => $options.contactSeller && $options.contactSeller(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
