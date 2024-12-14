"use strict";
const common_vendor = require("../common/vendor.js");
const mock_data = require("./data.js");
common_vendor.Mock.mock("/api/publish", "post", (options) => {
  const { title, price, description, images } = JSON.parse(options.body);
  if (title && price && description && images.length > 0) {
    const newGoodsId = Object.keys(mock_data.goodsList).length + 1;
    mock_data.goodsList[newGoodsId] = {
      id: newGoodsId,
      title,
      price,
      description,
      images,
      publisherId: 1
    };
    console.log(">>>>>发布成功后的goodsList<<<<<", mock_data.goodsList);
    return {
      code: 200,
      message: "发布成功"
    };
  } else {
    return {
      code: 400,
      message: "发布失败，信息不完整"
    };
  }
});
