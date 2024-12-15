# API 文档

## 用户相关 API

### 用户注册

- **Endpoint**: `POST /api/users/register`
- **请求数据**:
  ```json
  {
    "username": "string",
    "password": "string",
    "phone": "string"
  }
  ```
- **响应数据**:
  ```json
  {
    "code": 201,
    "msg": "User registered successfully",
  }
  ```

### 用户登录

- **Endpoint**: `POST /api/users/login`
- **请求数据**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **响应数据**:
  ```json
  {
    "code": 200,
    "msg": "Login successful",
    "data": {
      "token": "string",
    }
  }
  ```

### 获取用户信息

- **Endpoint**: `GET /api/users`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**: 无
- **响应数据**:
  ```json
  {
    "code": 200,
    "msg": "User information retrieved successfully",
    "data": {
      "username": "string",
      "email": "string",   // 可以为 null
      "phone": "string",
      "avatar": "string"
    }
  }
  ```
### 修改用户信息

- **Endpoint**: `PUT /api/users`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**:
  ```json
  {
    "username": "string",
    "email": "string",
    "phone": "string",
    "avatar": "string"
  }
  ```
- **响应数据**:
  ```json
  {
    "code": 204,
    "msg": "User information updated successfully"
  }
  ```

## 商品信息相关 API

### 获取商品列表

- **Endpoint**: `GET /api/goods?keywords={keywords}&tags={tags}`
- **请求数据**: 无
- **响应数据**:
  ```json
  {
    "code": 200,
    "msg": "Goods retrieved successfully",
    "data": [
      {
        "goodsId": "int",
        "title": "string",
        "description": "string",
        "price": "decimal",
        "images": ["string"],
        "tags": ["string"], // 可以为 null，即商品没有标签
        "isActive": "boolean",
        "publisherId": "int"
      }
    ]
  }
  ```

### 获取商品详情

- **Endpoint**: `GET /api/goods/{goodsId}`
- **请求数据**: 无
- **响应数据**:
  ```json
  {
    "code": 200,
    "msg": "Goods details retrieved successfully",
    "data": {
      "goodsId": "int",
      "title": "string",
      "description": "string",
      "price": "decimal",
      "images": ["string"],
      "tags": ["string"],
      "isActive": "boolean",
      "publisherId": "int"
    }
  }
  ```

### 获取商品评论信息

- **Endpoint**: `GET /api/goods/{goodsId}/comments`
- **请求数据**: 无 
- **响应数据**:
  ```json
  {
    "code": 200,
    "msg": "Comments retrieved successfully",
    "data": [
      {
        "commentId": "int",
        "username": "string",
        "avatar": "string",
        "content": "string",
        "rating": "int",
        "createdAt": "string"
      }
    ]
  }
  ```

### 商品管理 API

#### 发布商品

- **Endpoint**: `POST /api/goods`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**:
  ```json
  {
    "title": "string",
    "description": "string",
    "price": "decimal",
    "images": ["string"],
    "tags": ["string"],
    "publisherId": "int"
  }
  ```
- **响应数据**:
  ```json
  {
    "code": 201,
    "msg": "Goods published successfully",
    "data": {
      "goodsId": "int"
    }
  }
  ```

#### 删除商品

- **Endpoint**: `DELETE /api/goods/{goodsId}`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**: 无
- **响应数据**:
  ```json
  {
    "code": 204,
    "msg": "Goods deleted successfully"
  }
  ```

### 修改商品信息

- **Endpoint**: `PUT /api/goods/{goodsId}`  
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**: 
  ```json
  {
    "title": "string",
    "description": "string",
    "price": "decimal",
    "images": ["string"],
    "tags": ["string"]
  }
  ```
- **响应数据**:
  ```json
  {
    "code": 204,
    "msg": "Goods updated successfully"
  }
  ```

## 消息相关 API

### 发送消息

- **Endpoint**: `POST /api/messages`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**:
  ```json
  {
    "receiverId": "int",
    "content": "string"
  }
  ```
- **响应数据**:
  ```json
  {
    "code": 201,
    "msg": "Message sent successfully",
    "data": {
      "messageId": "int"
    }
  }
  ```

### 获取消息列表

- **Endpoint**: `GET /api/messages`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**: 无 
- **响应数据**:
  ```json
  {
    "code": 200,
    "msg": "Messages retrieved successfully",
    "data": [
      {
        "messageId": "int",
        "senderId": "int",
        "receiverId": "int",
        "content": "string",
        "timestamp": "string",
        "isRead": "boolean"
      }
    ]
  }
  ```

## 评论相关 API

### 添加评论

- **Endpoint**: `POST /api/comments`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**:
  ```json
  {
    "goodsId": "int",
    "content": "string",
    "rating": "int"
  }
  ```
- **响应数据**:
  ```json
  {
    "code": 201,
    "msg": "Comment added successfully",
    "data": {
      "commentId": "int"
    }
  }
  ```

### 删除评论

- **Endpoint**: `DELETE /api/comments/{commentId}`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**: 无
- **响应数据**:
  ```json
  {
    "code": 204,
    "msg": "Comment deleted successfully"
  }
  ```

## 收藏相关 API

### 添加收藏

- **Endpoint**: `POST /api/favorites` 
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**:
  ```json
  {
    "goodsId": "int"
  }
  ```
- **响应数据**:
  ```json
  {
    "code": 201,
    "msg": "Favorite added successfully",
    "data": null
  }
  ```

### 取消收藏

- **Endpoint**: `DELETE /api/favorites/{goodsId}`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**: 无
- **响应数据**:
  ```json
  {
    "code": 204,
    "msg": "Favorite removed successfully"
  }
  ```

### 获取用户收藏

- **Endpoint**: `GET /api/favorites`
- **请求头**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **请求数据**: 无
- **响应数据**:
  ```json
  {
    "code": 200,
    "msg": "Favorites retrieved successfully",
    "data": [
      {
        "goodsId": "int",
        "title": "string",
        "price": "decimal",
        "images": ["string"]
      }
    ]
  }
  ```

## 图片上传接口
- **Endpoint**: `POST /api/upload` 
- **请求头**:
  ```json
  {
    "Content-Type": "multipart/form-data"
  }
  ```
- **请求数据**:
  ```json
  {
    "image": "file"
  }
  ```
- **响应数据**:
  ```json
  {
    "code": 201,
    "msg": "Image uploaded successfully",
    "data": {
      "url": "string"
    }
  }
  ```
