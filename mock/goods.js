import Mock from 'mockjs'
import './auth'  // 引入auth.js以注册登录接口
import { goodsList, userList ,commentsData} from './data'  // 引入数据模块

// 导出 Mock 实例，以便其他地方可以使用
export default Mock



// 模拟获取商品详情接口
Mock.mock(/\/api\/goods\/\d+$/, 'get', (options) => {
  const id = parseInt(options.url.split('/').pop())
  const goods = goodsList[id]      //>>>>>goodsList[id]模拟数据库查询<<<<<
  
  if (goods) {
    return {
      code: 200,
      data: goods,
      message: 'success'
    }
  } else {
    return {
      code: 404,
      data: null,
      message: '商品不存在'
    }
  }
})

// 模拟商品评论数据
Mock.mock(/\/api\/goods\/\d+\/comments$/, 'get', (options) => {
  const id = parseInt(options.url.split('/').slice(-2, -1)[0])
  const comments = commentsData[id] || []  // 从对象中获取评论列表
  return {
    code: 200,
    data: {
      list: comments,
      total: comments.length
    },
    message: 'success'
  }
})

// 模拟收藏商品接口
Mock.mock('/api/goods/favorite', 'post', (options) => {
  const { goodsId, action } = JSON.parse(options.body)
  return {
    code: 200,
    data: {
      isCollected: action === 'add'
    },
    message: action === 'add' ? '收藏成功' : '取消收藏成功'
  }
})

// 模拟聊天接口
Mock.mock('/api/chat/send', 'post', (options) => {
  const { senderId, receiverId, message } = JSON.parse(options.body)
  return {
    code: 200,
    data: {
      senderId,
      receiverId,
      message,
      time: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
    },
    message: '消息发送成功'
  }
})

// 模拟下架商品接口
Mock.mock('/api/goods/remove', 'post', (options) => {
  const { goodsId } = JSON.parse(options.body)
  const goods = goodsList[goodsId]
  
  if (goods) {
    goods.isActive = false  // 将商品标记为不可用
    return {
      code: 200,
      data: goods,
      message: '商品已下架'
    }
  } else {
    return {
      code: 404,
      data: null,
      message: '商品不存在'
    }
  }
})

// 模拟删除商品接口
Mock.mock('/api/goods/delete', 'post', (options) => {
  const { goodsId } = JSON.parse(options.body)
  
  if (goodsList[goodsId]) {
    delete goodsList[goodsId]  // 从列表中移除商品
    return {
      code: 200,
      data: null,
      message: '商品已删除'
    }
  } else {
    return {
      code: 404,
      data: null,
      message: '商品不存在'
    }
  }
})

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

// 模拟发布商品接口
Mock.mock('/api/user/publish', 'post', (options) => {
  const { userId, goodsId, action } = JSON.parse(options.body)
  const goods = goodsList[goodsId]

  if (goods) {
    if (action === 'add') {
      goods.publisherId = userId  // 设置商品的发布者
      return {
        code: 200,
        data: goods,
        message: '商品发布成功'
      }
    } else if (action === 'remove') {
      if (goods.publisherId === userId) {
        goods.publisherId = null  // 移除商品的发布者
        return {
          code: 200,
          data: goods,
          message: '商品取消发布成功'
        }
      } else {
        return {
          code: 403,
          data: null,
          message: '无权限取消发布'
        }
      }
    } else {
      return {
        code: 400,
        data: null,
        message: '无效的操作'
      }
    }
  } else {
    return {
      code: 404,
      data: null,
      message: '商品不存在'
    }
  }
})

// 模拟获取用户发布的商品接口
Mock.mock(/\/api\/user\/published\?userId=\d+/, 'get', (options) => {
  const userId = options.url.split('?userId=')[1];

  // 过滤出符合条件的商品
  const publishedGoods = Object.values(goodsList).filter(goods => goods.publisherId === parseInt(userId));

  return {
    code: 200,
    data: publishedGoods,  
    message: '获取成功'
  };
});

// 将 goodsList 对象转换为数组
const goodsArray = Object.values(goodsList);

// 根据 publisherId 获取商品列表
Mock.mock(/\/api\/goods\?publisherId=\d+/, 'get', (options) => {
  const publisherId = options.url.match(/publisherId=(\d+)/)[1];
  const publishedGoods = goodsArray.filter(goods => goods.publisherId == publisherId);

  return {
    code: 200,
    data: publishedGoods,
    message: '获取发布者商品列表成功'
  };
});

export { goodsList };

