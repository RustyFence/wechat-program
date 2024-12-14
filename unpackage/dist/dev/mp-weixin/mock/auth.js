"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("../common/vendor.js");
const mock_data = require("./data.js");
function login(username, password) {
  const user = mock_data.userList.find((user2) => user2.userName === username && user2.password === password);
  if (user) {
    return {
      success: true,
      token: "mock-token",
      userId: user.userId,
      userName: user.userName,
      userAvatar: user.userAvatar
    };
  } else {
    throw new Error("Invalid credentials");
  }
}
function register(username, password) {
  const existingUser = mock_data.userList.find((user) => user.userName === username);
  if (existingUser) {
    return {
      success: false,
      message: "用户已存在"
    };
  }
  const newUser = {
    userId: common_vendor.Mock.Random.guid(),
    userName: username,
    password,
    userAvatar: common_vendor.Mock.Random.image("100x100", "#50B347", "#FFF", "Mock.js")
  };
  mock_data.userList.push(newUser);
  return {
    success: true,
    message: "Registration successful",
    userId: newUser.userId
  };
}
common_vendor.Mock.mock("/api/user/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body);
  const user = mock_data.userList.find((user2) => user2.userName === username && user2.password === password);
  if (user) {
    return {
      code: 200,
      data: {
        userId: user.userId,
        userName: user.userName,
        userAvatar: user.userAvatar
      },
      message: "登录成功"
    };
  } else {
    return {
      code: 401,
      data: null,
      message: "用户名或密码错误"
    };
  }
});
exports.login = login;
exports.register = register;
