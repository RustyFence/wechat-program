"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "TabBar",
  data() {
    return {
      currentPath: "",
      unreadCount: 0
    };
  },
  computed: {
    formatUnreadCount() {
      return this.unreadCount > 99 ? "99+" : this.unreadCount.toString();
    }
  },
  created() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    this.currentPath = "/" + currentPage.route;
    common_vendor.index.$on("updateUnreadCount", this.updateUnreadCount);
    this.getUnreadCount();
  },
  beforeDestroy() {
    common_vendor.index.$off("updateUnreadCount", this.updateUnreadCount);
  },
  methods: {
    switchTab(url) {
      if (this.currentPath === url)
        return;
      common_vendor.index.switchTab({
        url
      });
    },
    updateUnreadCount(count) {
      this.unreadCount = count;
    },
    getUnreadCount() {
      this.unreadCount = 5;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  (_easycom_uni_icons2 + _easycom_uni_badge2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: $data.currentPath === "/pages/home/home" ? "home-filled" : "home",
      size: 24,
      color: $data.currentPath === "/pages/home/home" ? "#007AFF" : "#666"
    }),
    b: $data.currentPath === "/pages/home/home" ? 1 : "",
    c: common_vendor.o(($event) => $options.switchTab("/pages/home/home")),
    d: common_vendor.p({
      type: $data.currentPath === "/pages/discover/discover" ? "search-filled" : "search",
      size: 24,
      color: $data.currentPath === "/pages/discover/discover" ? "#007AFF" : "#666"
    }),
    e: $data.currentPath === "/pages/discover/discover" ? 1 : "",
    f: common_vendor.o(($event) => $options.switchTab("/pages/discover/discover")),
    g: common_vendor.p({
      type: "plusempty",
      size: 24,
      color: $data.currentPath === "/pages/publish/publish" ? "#007AFF" : "#666"
    }),
    h: $data.currentPath === "/pages/publish/publish" ? 1 : "",
    i: common_vendor.o(($event) => $options.switchTab("/pages/publish/publish")),
    j: common_vendor.p({
      type: $data.currentPath === "/pages/message/message" ? "chat-filled" : "chat",
      size: 24,
      color: $data.currentPath === "/pages/message/message" ? "#007AFF" : "#666"
    }),
    k: $data.unreadCount > 0
  }, $data.unreadCount > 0 ? {
    l: common_vendor.p({
      text: $options.formatUnreadCount,
      offset: [8, -8],
      size: "small",
      type: "error",
      absolute: "rightTop"
    })
  } : {}, {
    m: $data.currentPath === "/pages/message/message" ? 1 : "",
    n: common_vendor.o(($event) => $options.switchTab("/pages/message/message")),
    o: common_vendor.p({
      type: $data.currentPath === "/pages/myAccount/myAccount" ? "person-filled" : "person",
      size: 24,
      color: $data.currentPath === "/pages/myAccount/myAccount" ? "#007AFF" : "#666"
    }),
    p: $data.currentPath === "/pages/myAccount/myAccount" ? 1 : "",
    q: common_vendor.o(($event) => $options.switchTab("/pages/myAccount/myAccount"))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ffb3232c"]]);
wx.createComponent(Component);
