import Mock from 'mockjs'
import { userList } from './data'  // 引入数据模块

// 模拟登录接口
function login(username, password) {
  const user = userList.find(user => user.userName === username && user.password === password)

  if (user) {
    return {
      success: true,
      token: 'mock-token',
      userId: user.userId,
      userName: user.userName,
      userAvatar: user.userAvatar
    }
  } else {
    throw new Error('Invalid credentials')
  }
}

// 模拟注册接口
function register(username, password) {
  const existingUser = userList.find(user => user.userName === username);
  if (existingUser) {
    return {
      success: false,
      message: '用户已存在'
    };
  }

  const newUser = {
    userId: Mock.Random.guid(),
    userName: username,
    password: password,
    userAvatar: Mock.Random.image('100x100', '#50B347', '#FFF', 'Mock.js')
  };
  userList.push(newUser);

  return {
    success: true,
    message: 'Registration successful',
    userId: newUser.userId
  };
}

export { register, login }

Mock.mock('/api/user/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body)
  const user = userList.find(user => user.userName === username && user.password === password)

  if (user) {
    return {
      code: 200,
      data: {
        userId: user.userId,
        userName: user.userName,
        userAvatar: user.userAvatar
      },
      message: '登录成功'
    }
  } else {
    return {
      code: 401,
      data: null,
      message: '用户名或密码错误'
    }
  }
})