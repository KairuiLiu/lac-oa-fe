```js
const BASE_URL = '/api/applicant';
```

- 获取申请类型与二级列表
  - 地址`${BASE_URL}/applytypes`
  - 请求方式: `GET`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - 示例结果
    ```js
    {
      "code": 0,
      "data": [
        {
          "name": "全部申请",
          "subType": [
            {
              "name": "2021"
            },
            {
              "name": "2022"
            }
          ]
        },
        {
          "name": "采购申请",
          "subType": [
            {
              "name": "2021"
            },
            {
              "name": "2022"
            }
          ]
        },
        {
          "name": "伦理审核申请",
          "subType": [
            {
              "name": "2021"
            },
            {
              "name": "2022"
            }
          ]
        }
      ]
    }
    ```
- 获取申请列表
  - 地址`${BASE_URL}/applyList`
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
      _limit: pageSize,         // 分页大小
      _page: pageId,            // 页数
      type, // [一级列表, 二级列表] -> `[采购申请-2021]`
      sort, // 排序字段
    },
    // sort{
    //   pos: 0=正序 1=倒序
    //   data: 部分[Value], 其中
    //      value: 'applyId', label: '编号'
    //      value: 'applyTitle', label: '标题'
    //      value: 'applyType', label: '申请类型'
    //      value: 'applyProp', label: '申请用途'
    //      value: 'applyDate', label: '申请日期'
    //      value: 'applyState', label: '审核状态'
    // }
    ```
  - 示例结果
    ```js
    {
      code: 0,
      data: [
        {
          "applyId": 1,
          "applyTitle": "研究1的申请",
          "applyUserName": "张三",
          "applyDate": "2022-1-1",
          "applyType": 0,
          "applyProp": 1,
          "allocated": 2,
          "applyState": 0,
        },
      ]
    }
    ```
- 请求商品列表(用于获得许可证编号)
  - 地址`${BASE_URL}/goodList`
  - 请求方式: `GET`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - query
    ```js
    {
      supportId,
      condition,
      _limit: pageSize,   // 分页
      _page: pageId,
    }
    // Condition {
    //   shopName: String,  // 商品名
    //   compName: String,  // 公司名
    // }
    ```
  - 示例结果
    ```js
    "code": 0,
    "data": [
      {
        "goodId": 1,
        "goodName": "鸡1",
        "goodPrice": {
          "perPrice": 1.23,       // 单价
          "transPerPrice": 1,     // 每件运费
          "unit": "只",           // 单位
          "transBasePrice": 1     // 基础运费
        },
        "goodAduit": 1,           // 是否需要审核
        "goodEnable": false,      // 是否上架
        "goodStock": 123,         // 库存
        "goodAddTime": "2022-1-1:09:00:01"    // 加入时间
        "goodLicense": "A123",    // 许可证号
        "compName": "A公司"        // 公司名
      },
    ],
    ```
- 增加许可证
  - 地址`${BASE_URL}/addLicense`
  - 请求方式: `GET`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - query
    ```js
    {
    	license;
    }
    // license {
    //    comp = '公司名';
    //    id = '许可证编号';
    //    imgs = [许可证图片地址组];
    // }
    ```
  - 示例结果
    ```js
    "code": 0,
    "data": 'XX公司-SYXK(川)K2017-2008'
    ```
