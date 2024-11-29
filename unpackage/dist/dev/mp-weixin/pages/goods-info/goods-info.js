"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      goods: {
        id: "",
        title: "",
        price: "",
        description: ""
      },
      goodsImages: [],
      comments: [
        {
          id: 1,
          userAvatar: "/static/avatar/user1.png",
          userName: "张三",
          rating: 5,
          content: "商品质量非常好，和卖家描述的一样，发货速度也很快，很满意的一次购物！",
          time: "2024-01-15 14:30"
        },
        {
          id: 2,
          userAvatar: "/static/avatar/user2.png",
          userName: "李四",
          rating: 4,
          content: "整体不错，就是发货稍微有点慢，其他都挺好的。",
          time: "2024-01-14 16:45"
        },
        {
          id: 3,
          userAvatar: "/static/avatar/user3.png",
          userName: "王五",
          rating: 5,
          content: "卖家服务态度很好，商品完全符合预期，下次还会继续购买！",
          time: "2024-01-13 09:20"
        }
      ],
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
    loadGoodsInfo(id) {
      const mockGoodsDatabase = {
        // home页面的商品
        1: {
          id: 1,
          title: "iPhone 14 Pro Max",
          price: "7999.00",
          description: "全新未拆封，256G 暗紫色//测试字数溢出",
          images: ["/static/goods/iphone14.jpg"]
        },
        2: {
          id: 2,
          title: "耐克运动鞋",
          price: "599.00",
          description: "Nike Air Max 270，9成新",
          images: ["/static/goods/nike.jpg"]
        },
        3: {
          id: 3,
          title: "索尼相机 A7M4",
          price: "15999.00",
          description: "95新，快门数3000次以内",
          images: ["/static/goods/sony.jpg"]
        },
        4: {
          id: 4,
          title: "MacBook Pro M2",
          price: "12999.00",
          description: "2023年新款，带包装",
          images: ["/static/goods/macbook.jpg"]
        },
        5: {
          id: 5,
          title: "华为手表 GT4",
          price: "1499.00",
          description: "全新未拆封，46mm",
          images: ["/static/goods/watch.jpg"]
        },
        6: {
          id: 6,
          title: "AirPods Pro 2",
          price: "1299.00",
          description: "99新，带包装盒",
          images: ["/static/goods/airpods.jpg"]
        },
        // discover页面的商品
        7: {
          id: 7,
          title: "戴森吸尘器 V15",
          price: "3999.00",
          description: "全新未拆封，顺丰包邮",
          images: ["/static/goods/dyson.jpg"]
        },
        8: {
          id: 8,
          title: "Switch OLED",
          price: "1999.00",
          description: "95新，带两个游戏",
          images: ["/static/goods/switch.jpg"]
        },
        9: {
          id: 9,
          title: "iPad Pro 12.9",
          price: "6999.00",
          description: "2022款，带妙控键盘",
          images: ["/static/goods/ipad.jpg"]
        },
        10: {
          id: 10,
          title: "索尼降噪耳机",
          price: "1799.00",
          description: "WH-1000XM5，全新",
          images: ["/static/goods/headphone.jpg"]
        },
        11: {
          id: 11,
          title: "理光GR3x",
          price: "4999.00",
          description: "9成新，带UV镜",
          images: ["/static/goods/camera.jpg"]
        },
        12: {
          id: 12,
          title: "机械键盘",
          price: "899.00",
          description: "HHKB Pro 3，带包装",
          images: ["/static/goods/keyboard.jpg"]
        },
        13: {
          id: 13,
          title: "显示器",
          price: "2999.00",
          description: "LG 27寸4K显示器",
          images: ["/static/goods/monitor.jpg"]
        },
        14: {
          id: 14,
          title: "游戏主机",
          price: "3699.00",
          description: "PS5光驱版，全新",
          images: ["/static/goods/ps5.jpg"]
        }
      };
      const goodsInfo = mockGoodsDatabase[id];
      if (goodsInfo) {
        this.goods = {
          id: goodsInfo.id,
          title: goodsInfo.title,
          price: goodsInfo.price,
          description: goodsInfo.description
        };
        this.goodsImages = goodsInfo.images;
      } else {
        common_vendor.index.showToast({
          title: "商品不存在",
          icon: "none",
          complete: () => {
            common_vendor.index.navigateBack({
              delta: 1
            });
          }
        });
      }
      this.calculateAverageRating();
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
        id: this.comments.length + 1,
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
    toggleCollect() {
      this.isCollected = !this.isCollected;
      common_vendor.index.showToast({
        title: this.isCollected ? "已收藏" : "已取消收藏",
        icon: "success"
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
    a: common_vendor.f($data.goodsImages, (img, index, i0) => {
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
    v: common_vendor.o((...args) => $options.toggleCollect && $options.toggleCollect(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
