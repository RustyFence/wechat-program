"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/tab-bar/tab-bar.js";
const _sfc_main = {
  components: {
    TabBar
  },
  data() {
    return {
      messageList: [
        {
          id: 1,
          name: "张三",
          avatar: "/static/avatar/default.png",
          lastMessage: "请问商品还在吗？",
          time: "12:30",
          unread: 2
        },
        {
          id: 2,
          name: "李四",
          avatar: "/static/avatar/default.png",
          lastMessage: "好的，我知道了",
          time: "昨天",
          unread: 3
        }
      ]
    };
  },
  onShow() {
    this.updateTotalUnread();
  },
  methods: {
    navigateToContacts() {
      common_vendor.index.navigateTo({
        url: "/pages/message/contact"
      });
    },
    openChat(item) {
      if (item.unread > 0) {
        item.unread = 0;
        this.updateTotalUnread();
      }
      common_vendor.index.navigateTo({
        url: `/pages/message/chat?userId=${item.id}&userName=${item.name}`
      });
    },
    updateTotalUnread() {
      const totalUnread = this.messageList.reduce((sum, msg) => sum + (msg.unread || 0), 0);
      console.log("计算得到未读数:", totalUnread);
      common_vendor.index.$emit("updateUnreadCount", totalUnread);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_tab_bar2 = common_vendor.resolveComponent("tab-bar");
  (_easycom_uni_icons2 + _easycom_tab_bar2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "contact",
      size: "24",
      color: "#333"
    }),
    b: common_vendor.o((...args) => $options.navigateToContacts && $options.navigateToContacts(...args)),
    c: common_vendor.p({
      type: "search",
      size: "20",
      color: "#666"
    }),
    d: common_vendor.f($data.messageList, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: item.unread
      }, item.unread ? {
        c: common_vendor.t(item.unread)
      } : {}, {
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.time),
        f: common_vendor.t(item.lastMessage),
        g: index,
        h: common_vendor.o(($event) => $options.openChat(item), index)
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c1b26cf"]]);
wx.createPage(MiniProgramPage);
