import Mock from 'mockjs';
import { goodsList } from './data.js';
// 模拟发布商品接口
Mock.mock('/api/publish', 'post', (options) => {
  const { title, price, description, images } = JSON.parse(options.body);

  if (title && price && description && images.length > 0) {
    const newGoodsId = Object.keys(goodsList).length + 1;
    goodsList[newGoodsId] = {
      id: newGoodsId,
      title,
      price,
      description,
      images,
      publisherId: 1
    };
    console.log('>>>>>发布成功后的goodsList<<<<<', goodsList);
    return {
      code: 200,
      message: '发布成功'

    };
  } else {
    return {
      code: 400,
      message: '发布失败，信息不完整'
    };
  }
});
