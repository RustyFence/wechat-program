import Mock from 'mockjs'
// 商品列表数据
const goodsList = {   //>>>>>goodsList模拟数据库的goods表<<<<<
    //home页面的商品
    1: {
        id: 1,
        title: 'iPhone 14 Pro Max',
        price: '7999.00',
        description: '全新未拆封，256G 暗紫色//测试字数溢出',
        images: ['/static/goods/iphone14.jpg'],
        tags: ['数码', '电子产品', '苹果', '热销'],
        isActive: true,
        publisherId: 1   // 标记商品的发布者
      },
      2: {
        id: 2,
        title: '耐克运动鞋',
        price: '599.00',
        description: 'Nike Air Max 270，9成新',
        images: ['/static/goods/nike.jpg'],
        tags: ['运动', '鞋子', '耐克', '推荐'],
        isActive: true,
        publisherId: 1
      },
      3: {
        id: 3,
        title: '索尼相机 A7M4',
        price: '15999.00',
        description: '95新，快门数3000次以内',
        images: ['/static/goods/sony.jpg'],
        tags: ['数码', '相机', '索尼', '优惠'],
        isActive: true,
        publisherId: 1
      },
      4: {
        id: 4,
        title: 'MacBook Pro M2',
        price: '12999.00',
        description: '2023年新款，带包装',
        images: ['/static/goods/macbook.jpg'],
        tags: ['数码', '笔记本', '苹果', '活动'],
        isActive: true,
        publisherId: 1
      },
      5: {
        id: 5,
        title: '华为手表 GT4',
        price: '1499.00',
        description: '全新未拆封，46mm',
        images: ['/static/goods/watch.jpg'],
        tags: ['数码', '手表', '华为', '热销'],
        isActive: true,
        publisherId: 1
      },
      6: {
        id: 6,
        title: 'AirPods Pro 2',
        price: '1299.00',
        description: '99新，带包装盒',
        images: ['/static/goods/airpods.jpg'],
        tags: ['数码', '耳机', '苹果', '推荐'],
        isActive: true,
        publisherId: 1
      },
      // discover页面的商品
      7: {
        id: 7,
        title: '戴森吸尘器 V15',
        price: '3999.00',
        description: '全新未拆封，顺丰包邮',
        images: ['/static/goods/dyson.jpg'],
        tags: ['居家', '吸尘器', '戴森', '优惠'],
        isActive: true,
        publisherId: 1
      },
      8: {
        id: 8,
        title: 'Switch OLED',
        price: '1999.00',
        description: '95新，带两��手柄',
        images: ['/static/goods/switch.jpg'],
        tags: ['数码', '游戏机', '任天堂', '活动'],
        isActive: true,
        publisherId: 1
      },
      9: {
        id: 9,
        title: 'iPad Pro 12.9',
        price: '6999.00',
        description: '2022款，带妙控键盘',
        images: ['/static/goods/ipad.jpg'],
        tags: ['数码', '平板', '苹果', '热销'],
        isActive: true,
        publisherId: 1
      },
      10: {
        id: 10,
        title: '索尼降噪耳机',
        price: '1799.00',
        description: 'WH-1000XM5，全新',
        images: ['/static/goods/headphone.jpg'],
        tags: ['数码', '耳机', '索尼', '推荐'],
        isActive: true,
        publisherId: 1
      },
      11: {
        id: 11,
        title: '理光GR3x',
        price: '4999.00',
        description: '9成新，带UV镜',
        images: ['/static/goods/camera.jpg'],
        tags: ['数码', '相机', '理光', '优惠'],
        isActive: true,
        publisherId: 1
      },
      12: {
        id: 12,
        title: '机械键盘',
        price: '899.00',
        description: 'HHKB Pro 3，带包装',
        images: ['/static/goods/keyboard.jpg'],
        tags: ['数码', '键盘', 'HHKB', '活动'],
        isActive: true,
        publisherId: 1
      },
      13: {
        id: 13,
        title: '显示器',
        price: '2999.00',
        description: 'LG 27寸4K显示器',
        images: ['/static/goods/monitor.jpg'],
        tags: ['数码', '显示器', 'LG', '热销'],
        isActive: true,
        publisherId: 1
      },
      14: {
        id: 14,
        title: '游戏主机',
        price: '3699.00',
        description: 'PS5光驱版，全新',
        images: ['/static/goods/ps5.jpg'],
        tags: ['数码', '游戏机', '索尼', '推荐'],
        isActive: true,
        publisherId: 1
      }
}
console.log(">>>>>goodsList<<<<<")
console.log(goodsList)

// 生成用户数据
const userList = Array.from({ length: 10 }, () => ({  //>>>>>模拟数据库的user表<<<<<
  userId: Mock.Random.guid(),
  userName: Mock.Random.cname(),
  userAvatar: '/static/avatar/user' + Mock.Random.integer(1, 5) + '.png',
  phone: Mock.Random.string('number', 11),  // 随机生成11位手机号
  email: Mock.Random.email(),  // 随机生成邮箱
  password: Mock.Random.string(8)  // 随机生成8位密码
}))
userList.push({  // 添加一个测试用户
  userId: 1,
  userName: 'test',
  userAvatar: '/static/avatar/user1.png',
  phone: '12345678901',
  email: 'test@example.com',
  password: '123456'
})
console.log(">>>>>userList<<<<<")
console.log(userList)

// 生成评论数据
const commentsData = {}  // 使用对象来存储评论数据，对请求传递对象而非json
Object.keys(goodsList).forEach(id => {      //>>>>>模拟查询出的评论数据对象<<<<<
  commentsData[id] = Array.from({ length: 5 }, () => {
    const user = userList[Mock.Random.integer(0, userList.length - 1)]
    return {
      id: Mock.Random.id(),
      goodsId: parseInt(id),
      userId: user.userId,
      userAvatar: user.userAvatar,
      userName: user.userName,
      rating: Mock.Random.integer(1, 5),
      content: Mock.Random.paragraph(1, 3),
      time: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
    }
  })
})
console.log(">>>>>commentsData<<<<<")
console.log(commentsData)

// 生成消息数据
export const messageList = [
  {
    userId: '1', // 测试用户
    messages: [
      { 
        senderId: '2',
        sender: 'Alice', 
        content: '你好，请问iPhone还在卖吗？', 
        time: '10:30 AM',
        avatar: '/static/avatar/user2.png'
      },
      { 
        senderId: '1',
        sender: 'You', 
        content: '是的，还在的，你要看看吗？', 
        time: '10:32 AM',
        avatar: '/static/avatar/user1.png'
      },
      {
        senderId: '2',
        sender: 'Alice',
        content: '可以发张实物图吗？',
        time: '10:35 AM',
        avatar: '/static/avatar/user2.png'
      }
    ]
  },
  {
    userId: '1',
    messages: [
      { 
        senderId: '3',
        sender: 'Bob', 
        content: '你发布的MacBook还在吗？', 
        time: '昨天',
        avatar: '/static/avatar/user3.png'
      },
      { 
        senderId: '1',
        sender: 'You', 
        content: '抱歉，已经卖出了', 
        time: '昨天',
        avatar: '/static/avatar/user1.png'
      }
    ]
  },
  {
    userId: '1',
    messages: [
      {
        senderId: '4',
        sender: 'Carol',
        content: '请问可以面交吗？',
        time: '星期一',
        avatar: '/static/avatar/user4.png'
      }
    ]
  }
];
console.log(">>>>>messageList<<<<<")
console.log(messageList)
