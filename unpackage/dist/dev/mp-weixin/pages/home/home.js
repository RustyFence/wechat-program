"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const TabBar = () => "../../components/tab-bar/tab-bar.js";
const _sfc_main = {
  components: {
    TabBar
  }
};
if (!Array) {
  const _easycom_tab_bar2 = common_vendor.resolveComponent("tab-bar");
  _easycom_tab_bar2();
}
const _easycom_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  _easycom_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.f(3, (item, index, i0) => {
      return {
        a: index
      };
    }),
    c: common_vendor.f(4, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: index
      };
    }),
    d: common_vendor.f(6, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
