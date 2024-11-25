"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "TabBar",
  data() {
    return {
      currentPath: ""
    };
  },
  created() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    this.currentPath = "/" + currentPage.route;
  },
  methods: {
    switchTab(url) {
      if (this.currentPath === url)
        return;
      common_vendor.index.switchTab({
        url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.currentPath === "/pages/home/home" ? 1 : "",
    b: common_vendor.o(($event) => $options.switchTab("/pages/home/home")),
    c: $data.currentPath === "/pages/discover/discover" ? 1 : "",
    d: common_vendor.o(($event) => $options.switchTab("/pages/discover/discover")),
    e: $data.currentPath === "/pages/publish/publish" ? 1 : "",
    f: common_vendor.o(($event) => $options.switchTab("/pages/publish/publish")),
    g: $data.currentPath === "/pages/message/message" ? 1 : "",
    h: common_vendor.o(($event) => $options.switchTab("/pages/message/message")),
    i: $data.currentPath === "/pages/myAccount/myAccount" ? 1 : "",
    j: common_vendor.o(($event) => $options.switchTab("/pages/myAccount/myAccount"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ffb3232c"]]);
wx.createComponent(Component);
