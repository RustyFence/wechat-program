# Uni-App Project

## 项目结构

```
├── components              # 自定义组件
│   ├── goods-preview       # 商品预览组件
│   └── ...                 # 更多组件
├── pages                   # 页面文件
│   ├── home                # 首页
│   │   └── home.vue
│   ├── login               # 登录页
│   │   └── login.vue
│   ├── discover            # 发现页
│   │   └── discover.vue
│   ├── publish             # 发布页
│   │   └── publish.vue
│   ├── message             # 消息页
│   │   └── message.vue
│   ├── myAccount           # 我的账户页
│   │   └── myAccount.vue
│   └── ...                 # 更多页面
├── static                  # 静态资源
│   ├── images              # 图片资源
│   └── ...                 # 更多静态资源
├── uni_modules             # uni-ui 组件库
│   ├── uni-list            # 列表组件
│   ├── uni-badge           # 角标组件
│   └── ...                 # 更多uni-ui组件
├── mock                    # 模拟数据
│   └── data.js             # 模拟数据文件
├── App.vue                 # 应用配置
├── main.js                 # Vue 初始化入口文件
├── manifest.json           # 应用打包配置
├── pages.json              # 页面配置
└── package.json            # 项目依赖配置
```

## 简介
这是一个基于 `uni-app` 的多端应用项目，支持多种平台，包括微信小程序、H5、App等。项目使用了 `uni-ui` 组件库，提供了丰富的UI组件以提升用户体验。

## 安装说明

### 使用 HBuilderX
1. 下载并安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)。
2. 克隆项目到本地：
   ```bash
   git clone git@github.com:RustyFence/wechat-program.git
   ```
3. 使用 HBuilderX 打开项目。

### 使用 npm
1. 确保已安装 [Node.js](https://nodejs.org/)。
2. 克隆项目到本地：
   ```bash
   git clone git@github.com:RustyFence/wechat-program.git
   ```
3. 进入项目目录并安装依赖：
   ```bash
   npm install
   ```

## 使用说明

### 运行项目
- 在 HBuilderX 中，选择运行到指定平台（如微信小程序、H5等）。
- 或者使用命令行：
  ```bash
  npm run dev:mp-weixin  # 运行到微信小程序
  npm run dev:h5         # 运行到H5
  ```
