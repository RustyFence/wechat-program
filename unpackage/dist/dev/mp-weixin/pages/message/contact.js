"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKey: "",
      indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      contactGroups: [
        {
          title: "最近联系",
          items: [
            {
              id: 1,
              name: "张三",
              avatar: "/static/avatar/default.png",
              description: "最近联系: 1小时前"
            },
            {
              id: 2,
              name: "李四",
              avatar: "/static/avatar/default.png",
              description: "最近联系: 2小时前"
            }
          ]
        },
        {
          title: "A",
          items: [
            {
              id: 3,
              name: "Alex",
              avatar: "/static/avatar/default.png",
              description: "在线"
            },
            {
              id: 4,
              name: "Alice",
              avatar: "/static/avatar/default.png",
              description: "离线"
            }
          ]
        },
        {
          title: "B",
          items: [
            {
              id: 5,
              name: "Bob",
              avatar: "/static/avatar/default.png",
              description: "在线"
            }
          ]
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    onSearch(e) {
      console.log("搜索:", this.searchKey);
    },
    openChat(contact) {
      common_vendor.index.navigateTo({
        url: `/pages/message/chat?userId=${contact.id}&userName=${contact.name}`
      });
    },
    scrollToLetter(letter) {
      console.log("滚动到:", letter);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "back",
      size: "24",
      color: "#333"
    }),
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.p({
      type: "search",
      size: "20",
      color: "#666"
    }),
    d: common_vendor.o([($event) => $data.searchKey = $event.detail.value, (...args) => $options.onSearch && $options.onSearch(...args)]),
    e: $data.searchKey,
    f: common_vendor.f($data.contactGroups, (group, index, i0) => {
      return {
        a: common_vendor.t(group.title),
        b: common_vendor.f(group.items, (contact, k1, i1) => {
          return {
            a: "857908fa-2-" + i0 + "-" + i1,
            b: common_vendor.t(contact.name),
            c: common_vendor.t(contact.description),
            d: contact.id,
            e: common_vendor.o(($event) => $options.openChat(contact), contact.id)
          };
        }),
        c: index
      };
    }),
    g: common_vendor.p({
      type: "contact",
      size: "40",
      color: "#666"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-857908fa"]]);
wx.createPage(MiniProgramPage);
