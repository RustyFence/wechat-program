"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("../common/vendor.js");
require("./auth.js");
const mock_data = require("./data.js");
common_vendor.Mock.mock(/\/api\/goods\/\d+$/, "get", (options) => {
  const id = parseInt(options.url.split("/").pop());
  const goods = mock_data.goodsList[id];
  if (goods) {
    return {
      code: 200,
      data: goods,
      message: "success"
    };
  } else {
    return {
      code: 404,
      data: null,
      message: "商品不存在"
    };
  }
});
common_vendor.Mock.mock(/\/api\/goods\/\d+\/comments$/, "get", (options) => {
  const id = parseInt(options.url.split("/").slice(-2, -1)[0]);
  const comments = mock_data.commentsData[id] || [];
  return {
    code: 200,
    data: {
      list: comments,
      total: comments.length
    },
    message: "success"
  };
});
common_vendor.Mock.mock("/api/goods/favorite", "post", (options) => {
  const { goodsId, action } = JSON.parse(options.body);
  return {
    code: 200,
    data: {
      isCollected: action === "add"
    },
    message: action === "add" ? "收藏成功" : "取消收藏成功"
  };
});
common_vendor.Mock.mock("/api/chat/send", "post", (options) => {
  const { senderId, receiverId, message } = JSON.parse(options.body);
  return {
    code: 200,
    data: {
      senderId,
      receiverId,
      message,
      time: common_vendor.Mock.Random.datetime("yyyy-MM-dd HH:mm:ss")
    },
    message: "消息发送成功"
  };
});
common_vendor.Mock.mock("/api/goods/remove", "post", (options) => {
  const { goodsId } = JSON.parse(options.body);
  const goods = mock_data.goodsList[goodsId];
  if (goods) {
    goods.isActive = false;
    return {
      code: 200,
      data: goods,
      message: "商品已下架"
    };
  } else {
    return {
      code: 404,
      data: null,
      message: "商品不存在"
    };
  }
});
common_vendor.Mock.mock("/api/goods/delete", "post", (options) => {
  const { goodsId } = JSON.parse(options.body);
  if (mock_data.goodsList[goodsId]) {
    delete mock_data.goodsList[goodsId];
    return {
      code: 200,
      data: null,
      message: "商品已删除"
    };
  } else {
    return {
      code: 404,
      data: null,
      message: "商品不存在"
    };
  }
});
common_vendor.Mock.mock("/api/goods/relist", "post", (options) => {
  const { goodsId } = JSON.parse(options.body);
  const goods = mock_data.goodsList[goodsId];
  if (goods) {
    goods.isActive = true;
    return {
      code: 200,
      data: goods,
      message: "商品已重新上架"
    };
  } else {
    return {
      code: 404,
      data: null,
      message: "商品不存在"
    };
  }
});
common_vendor.Mock.mock("/api/user/publish", "post", (options) => {
  const { userId, goodsId, action } = JSON.parse(options.body);
  const goods = mock_data.goodsList[goodsId];
  if (goods) {
    if (action === "add") {
      goods.publisherId = userId;
      return {
        code: 200,
        data: goods,
        message: "商品发布成功"
      };
    } else if (action === "remove") {
      if (goods.publisherId === userId) {
        goods.publisherId = null;
        return {
          code: 200,
          data: goods,
          message: "商品取消发布成功"
        };
      } else {
        return {
          code: 403,
          data: null,
          message: "无权限取消发布"
        };
      }
    } else {
      return {
        code: 400,
        data: null,
        message: "无效的操作"
      };
    }
  } else {
    return {
      code: 404,
      data: null,
      message: "商品不存在"
    };
  }
});
common_vendor.Mock.mock(/\/api\/user\/published\?userId=\d+/, "get", (options) => {
  const userId = options.url.split("?userId=")[1];
  const publishedGoods = Object.values(mock_data.goodsList).filter((goods) => goods.publisherId === parseInt(userId));
  return {
    code: 200,
    data: publishedGoods,
    message: "获取成功"
  };
});
const goodsArray = Object.values(mock_data.goodsList);
common_vendor.Mock.mock(/\/api\/goods\?publisherId=\d+/, "get", (options) => {
  const publisherId = options.url.match(/publisherId=(\d+)/)[1];
  const publishedGoods = goodsArray.filter((goods) => goods.publisherId == publisherId);
  return {
    code: 200,
    data: publishedGoods,
    message: "获取发布者商品列表成功"
  };
});
exports.default = common_vendor.Mock;
exports.goodsList = mock_data.goodsList;
