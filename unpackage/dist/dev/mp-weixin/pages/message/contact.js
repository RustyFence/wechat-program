"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKey: "",
      friends: [],
      letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    };
  },
  computed: {
    // 按字母分组的好友列表
    groupedFriends() {
      const groups = {};
      this.friends.forEach((friend) => {
        const name = friend.remark || friend.username;
        const firstLetter = name.charAt(0).toUpperCase();
        if (!groups[firstLetter]) {
          groups[firstLetter] = [];
        }
        groups[firstLetter].push(friend);
      });
      Object.keys(groups).forEach((letter) => {
        groups[letter].sort((a, b) => {
          const nameA = (a.remark || a.username).toUpperCase();
          const nameB = (b.remark || b.username).toUpperCase();
          return nameA.localeCompare(nameB);
        });
      });
      return groups;
    }
  },
  onShow() {
    this.getFriendsList();
  },
  methods: {
    // 获取好友列表
    async getFriendsList() {
      try {
        this.friends = [
          {
            id: 1,
            username: "张三",
            remark: "老张",
            avatar: "/static/avatar/default.png",
            signature: "这是个性签名"
          },
          {
            id: 2,
            username: "李四",
            avatar: "/static/avatar/default.png",
            signature: "这是个性签名"
          }
          // ... 更多好友数据
        ];
      } catch (error) {
        console.error("获取好友列表失败:", error);
      }
    },
    // 搜索好友
    onSearch() {
      if (!this.searchKey) {
        this.getFriendsList();
        return;
      }
      this.friends = this.friends.filter((friend) => {
        const name = friend.remark || friend.username;
        return name.toLowerCase().includes(this.searchKey.toLowerCase());
      });
    },
    // 打开聊天
    openChat(friend) {
      common_vendor.index.navigateTo({
        url: `/pages/message/chat?userId=${friend.id}&userName=${friend.remark || friend.username}`
      });
    },
    // 滚动到指定字母分组
    scrollToLetter(letter) {
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
      type: "search",
      size: "20",
      color: "#666"
    }),
    b: common_vendor.o([($event) => $data.searchKey = $event.detail.value, (...args) => $options.onSearch && $options.onSearch(...args)]),
    c: $data.searchKey,
    d: common_vendor.f($options.groupedFriends, (group, letter, i0) => {
      return {
        a: common_vendor.t(letter),
        b: common_vendor.f(group, (friend, k1, i1) => {
          return common_vendor.e({
            a: friend.avatar || "/static/avatar/default.png",
            b: common_vendor.t(friend.remark || friend.username),
            c: friend.signature
          }, friend.signature ? {
            d: common_vendor.t(friend.signature)
          } : {}, {
            e: friend.id,
            f: common_vendor.o(($event) => $options.openChat(friend), friend.id)
          });
        }),
        c: letter
      };
    }),
    e: common_vendor.f($data.letters, (letter, k0, i0) => {
      return {
        a: common_vendor.t(letter),
        b: letter,
        c: common_vendor.o(($event) => $options.scrollToLetter(letter), letter)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
