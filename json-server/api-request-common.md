- 登录
  - 地址`/api/user/login`
  - 请求方式: `POST`
  - body
    ```ts
    {
      userid: String,
      passWord: String,
    }
    ```
  - 示例结果
    ```ts
    {
      code: 0|1; // (0=成功, 1=失败)
      userInfo: {
    		"token": "123",
    		"userId": "1234561",
    		"username": "张1",
    		"email": "123@t.com",
    		"department": "计算机学院",
    		"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    		"phone": "12345678900",
    		"group": ["管理员", "全部管理员"]
    	},
    }
    ```
- 采用 Token 登录
  - 地址`/api/user/login`
  - 请求方式: `POST`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - 示例结果
    ```ts
    {
      code: 0|1; // (0=成功, 1=失败)
      userInfo: {
    		"token": "123",
    		"userId": "1234561",
    		"username": "张1",
    		"email": "123@t.com",
    		"department": "计算机学院",
    		"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    		"phone": "12345678900",
    		"group": ["管理员", "全部管理员"]
    	},
    }
    ```
- 更新用户信息
  - 地址`/api/user/upduserinfo`
  - 请求方式: `POST`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - body
    ```ts
    {
      config: {
        userId?: string;
        username?: string;
        email?: string;
        department?: string;
        face?: string;
        phone?: string;
        password?: string;
        group?: string[];
      }
    }
    ```
  - 示例结果
    ```ts
    {
    	code: 0 | 1; // (0=成功, 1=失败)
    }
    ```
- 提交申请(再想想)
- 获取申请流转过程
  - 地址`/api/applyProcess`
  - 请求方式: `GET`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - query
    ```ts
    {
      applyId: String,
    }
    ```
  - 示例结果
    ```ts
    "applyProcess": {
      "code": 0,
      "data": {
        "process": [
          {
            "userName": "申请人1",
            "note": "发起申请",
            "error": false,
            "end": false,
            "dateTime": "2022-1-1:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 0
          },
          {
            "userName": "管理员2",
            "note": "审核不通过, 发回修改",
            "error": true,
            "end": false,
            "dateTime": "2022-1-2:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 1
          },
          {
            "userName": "申请人1",
            "note": "发起申请",
            "error": false,
            "end": false,
            "dateTime": "2022-1-3:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 10
          },
          {
            "userName": "管理员2",
            "note": "审核通过, 发往审核人",
            "error": false,
            "end": false,
            "dateTime": "2022-1-4:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 11
          },
          {
            "userName": "审核人1",
            "note": "审核通过",
            "error": false,
            "end": false,
            "dateTime": "2022-1-5:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 12
          },
          {
            "userName": "审核人2",
            "note": "审核不通过, 修改意见: 不知道",
            "error": true,
            "end": false,
            "dateTime": "2022-1-6:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 12
          },
          {
            "userName": "申请人1",
            "note": "发起申请",
            "error": false,
            "end": false,
            "dateTime": "2022-1-7:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 20
          },
          {
            "userName": "管理员2",
            "note": "审核通过, 发往审核人",
            "error": false,
            "end": false,
            "dateTime": "2022-1-8:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 21
          },
          {
            "userName": "审核人1",
            "note": "审核通过",
            "error": false,
            "end": false,
            "dateTime": "2022-1-9:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 22
          },
          {
            "userName": "审核人2",
            "note": "审核通过",
            "error": false,
            "end": false,
            "dateTime": "2022-1-16:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 22
          },
          {
            "userName": "申请人1",
            "note": "存档完成",
            "error": false,
            "end": true,
            "dateTime": "2022-1-19:09:00:01",
            "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "stage": 23
          }
        ]
      }
    },
    // 申请阶段: ['发起申请', '管理员审核', '审核人审核', '存档完成', '其他'], 使用stage%10表示下标
    // stage/10 表示第几轮申请
    ```
- 删除申请
  - 地址`/api/applyDel`
  - 请求方式: `POST`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - body
    ```ts
    {
      applyId: String,
    }
    ```
  - 示例结果
    ```ts
    {
    	code: 0 | 1; // (0=成功, 1=失败)
    }
    ```
- 图片上传接口(有两个, 我整理下)
