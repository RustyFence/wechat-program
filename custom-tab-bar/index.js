Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#007AFF",
    list: [{
      pagePath: "/pages/home/home",
      text: "首页"
    }, {
      pagePath: "/pages/discover/discover",
      text: "发现"
    }, {
      pagePath: "/pages/publish/publish",
      text: "发布"
    }, {
      pagePath: "/pages/message/message",
      text: "消息"
    }, {
      pagePath: "/pages/myAccount/myAccount",
      text: "我的"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
}) 