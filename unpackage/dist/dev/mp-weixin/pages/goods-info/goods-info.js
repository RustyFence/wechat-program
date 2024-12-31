"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const _sfc_main = {
  data() {
    return {
      goods: {
        goodsId: "",
        title: "",
        price: "",
        description: "",
        images: [],
        publisherId: "",
        publisherName: "",
        updateAt: ""
      },
      currentUser: common_vendor.index.getStorageSync("userName"),
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
    this.checkIfCollected(goodsId);
  },
  methods: {
    async loadGoodsInfo(id) {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/goods/${id}`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
          }
        });
        if (res.data.code === 200) {
          const goodsInfo = res.data.data;
          this.goods = {
            ...goodsInfo,
            images: JSON.parse(goodsInfo.images),
            tags: JSON.parse(goodsInfo.tags)
          };
          console.log(this.goods);
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
    async loadComments(goodsId) {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/goods/${goodsId}/comments`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
          }
        });
        if (res.data.code === 200) {
          this.comments = res.data.data;
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
    async submitComment() {
      if (!this.userComment.trim()) {
        common_vendor.index.showToast({
          title: "请输入评价内容",
          icon: "none"
        });
        return;
      }
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/comments`,
          method: "POST",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
          },
          data: {
            goodsId: this.goods.goodsId,
            content: this.userComment,
            rating: this.userRating
          }
        });
        if (res.data.code === 201) {
          this.userComment = "";
          this.userRating = 5;
          this.closeCommentModal();
          common_vendor.index.showToast({
            title: "评价成功",
            icon: "success"
          });
          this.loadComments(this.goods.goodsId);
        } else {
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("添加评论失败:", error);
        common_vendor.index.showToast({
          title: "添加评论失败",
          icon: "none"
        });
      }
    },
    async deleteComment(commentId) {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/comments/${commentId}`,
          method: "DELETE",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
          }
        });
        console.log(res);
        if (res.data.code === 204) {
          common_vendor.index.showToast({
            title: "评论已删除",
            icon: "success"
          });
          this.loadComments(this.goods.goodsId);
        } else {
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      } catch (error) {
        console.error("删除评论失败:", error);
        common_vendor.index.showToast({
          title: "删除评论失败",
          icon: "none"
        });
      }
    },
    calculateAverageRating() {
      if (this.comments.length === 0) {
        this.averageRating = 0;
        return;
      }
      const sum = this.comments.reduce((acc, curr) => acc + curr.rating, 0);
      this.averageRating = Number((sum / this.comments.length).toFixed(1));
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(dateString).toLocaleDateString(void 0, options);
    },
    async checkIfCollected(goodsId) {
      try {
        const res = await common_vendor.index.request({
          url: `${config.apiUrl}/favorites`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
          }
        });
        if (res.data.code === 200) {
          this.isCollected = res.data.data.some((item) => item.goodsId === this.goods.goodsId);
        }
      } catch (error) {
        console.error("检查收藏状态失败:", error);
      }
    },
    // 切换收藏状态
    async toggleCollect() {
      if (this.isCollected) {
        try {
          const res = await common_vendor.index.request({
            url: `${config.apiUrl}/favorites/${this.goods.goodsId}`,
            method: "DELETE",
            header: {
              "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
            }
          });
          if (res.data.code === 204) {
            this.isCollected = false;
            common_vendor.index.showToast({
              title: "已取消收藏",
              icon: "success"
            });
          }
        } catch (error) {
          console.error("取消收藏失败:", error);
          common_vendor.index.showToast({
            title: "取消收藏失败",
            icon: "none"
          });
        }
      } else {
        try {
          const res = await common_vendor.index.request({
            url: `${config.apiUrl}/favorites`,
            method: "POST",
            header: {
              "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
            },
            data: {
              goodsId: this.goods.goodsId
            }
          });
          if (res.data.code === 201) {
            this.isCollected = true;
            common_vendor.index.showToast({
              title: "收藏成功",
              icon: "success"
            });
          }
        } catch (error) {
          console.error("收藏失败:", error);
          common_vendor.index.showToast({
            title: "收藏失败",
            icon: "none"
          });
        }
      }
    },
    contactSeller() {
      common_vendor.index.navigateTo({
        url: `/pages/message/chat?oppoUserId=${this.goods.publisherId}`
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
    e: $data.goods.publisherAvatar,
    f: common_vendor.t($data.goods.publisherName),
    g: common_vendor.t($data.goods.publisherPhone),
    h: common_vendor.t($data.goods.publisherEmail),
    i: common_vendor.t($data.comments.length),
    j: common_vendor.p({
      value: $data.averageRating,
      disabled: true,
      size: "15"
    }),
    k: common_vendor.t($options.formattedRating),
    l: common_vendor.f($data.comments, (comment, index, i0) => {
      return common_vendor.e({
        a: comment.avatar,
        b: common_vendor.t(comment.username),
        c: "1671962a-1-" + i0,
        d: common_vendor.p({
          value: comment.rating,
          disabled: true,
          size: "12"
        }),
        e: common_vendor.t($options.formatDate(comment.createdAt)),
        f: common_vendor.t(comment.content),
        g: comment.username === $data.currentUser
      }, comment.username === $data.currentUser ? {
        h: common_vendor.o(($event) => $options.deleteComment(comment.commentId), index)
      } : {}, {
        i: index
      });
    }),
    m: common_vendor.o((...args) => $options.showCommentModal && $options.showCommentModal(...args)),
    n: common_vendor.o((...args) => $options.closeCommentModal && $options.closeCommentModal(...args)),
    o: common_vendor.o(($event) => $data.userRating = $event),
    p: common_vendor.p({
      modelValue: $data.userRating
    }),
    q: $data.userComment,
    r: common_vendor.o(($event) => $data.userComment = $event.detail.value),
    s: common_vendor.o((...args) => $options.submitComment && $options.submitComment(...args)),
    t: common_vendor.sr("commentPopup", "1671962a-2"),
    v: common_vendor.p({
      type: "bottom"
    }),
    w: common_vendor.p({
      type: $data.isCollected ? "star-filled" : "star",
      size: "20"
    }),
    x: common_vendor.t($data.isCollected ? "已收藏" : "收藏"),
    y: $data.isCollected ? 1 : "",
    z: common_vendor.o((...args) => $options.toggleCollect && $options.toggleCollect(...args)),
    A: common_vendor.p({
      type: "chat",
      size: "20"
    }),
    B: common_vendor.o((...args) => $options.contactSeller && $options.contactSeller(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
