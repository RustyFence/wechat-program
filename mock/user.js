import Mock from 'mockjs';

// 模拟用户数据
const users = [
  { id: '1', name: 'Alice', avatar: '/static/avatar/user1.png' },
  { id: '2', name: 'Bob', avatar: '/static/avatar/user2.png' },
  { id: '3', name: 'Carol', avatar: '/static/avatar/user3.png' }
];

// 获取用户信息
Mock.mock(/\/api\/users\/\d+/, 'get', (options) => {
  const userId = options.url.match(/\/api\/users\/(\d+)/)[1];
  const user = users.find(u => u.id === userId);

  if (user) {
    return {
      code: 200,
      data: user,
      message: '获取用户信息成功'
    };
  }

  return {
    code: 404,
    message: '用户不存在'
  };
});

export { users }; 