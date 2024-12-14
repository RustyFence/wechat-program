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

// 模拟编辑商品接口
Mock.mock('/api/goods/edit', 'post', (options) => {
  const { id, title, price, description, images } = JSON.parse(options.body);
  const goods = goodsList[id];

  if (goods) {
    goods.title = title;
    goods.price = price;
    goods.description = description;
    goods.images = images;
    console.log('>>>>>编辑后的goodsList<<<<<', goodsList);
    return {
      code: 200,
      message: '编辑成功'
    };
  } else {
    return {
      code: 404,
      message: '商品不存在'
    };
  }
});

// 模拟下架商品接口
Mock.mock('/api/goods/remove', 'post', (options) => {
  const { id } = JSON.parse(options.body);
  const goods = goodsList[id];

  if (goods) {
    goods.isActive = false; // 将商品标记为不可用
    console.log('>>>>>下架后的goodsList<<<<<', goodsList);
    return {
      code: 200,
      message: '商品已下架'
    };
  } else {
    return {
      code: 404,
      message: '商品不存在'
    };
  }
});

// 模拟重新上架商品接口
Mock.mock('/api/goods/relist', 'post', (options) => {
  const { goodsId } = JSON.parse(options.body)
  const goods = goodsList[goodsId]
  
  if (goods) {
    goods.isActive = true  // 将商品标记为可用
    return {
      code: 200,
      data: goods,
      message: '商品已重新上架'
    }
  } else {
    return {
      code: 404,
      data: null,
      message: '商品不存在'
    }
  }
})

