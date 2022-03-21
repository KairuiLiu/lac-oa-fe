```js
const BASE_URL = '/api/support';
```

- 获取获取系统信息(大屏显示用)

  - 地址`${BASE_URL}/sysdata`
  - 请求方式: `GET`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - 示例结果(类型解释见前)
    ```js
    {
      "code": 0,
      "data": {
        "searchYears": [2022, 2021, 2020],    // 搜索可用年份列表
        "plots": {
          "totleGoods": {           // 工作量
            "month": {
              "number": 100,
              "trend": [1, 3, 2, 4, 2, 6, 1]
            },
            "year": {
              "number": 1000,
              "trend": [9, 8, 7, 6, 5, 4, 3]
            }
          },
          "orderState": {           // 订单状态
            "totle": 7300,
            "detail": [
              {
                "type": "未发货",
                "value": 123
              },
              {
                "type": "已发货",
                "value": 123
              },
              {
                "type": "已收货",
                "value": 123
              },
              {
                "type": "已完成",
                "value": 123
              }
            ]
          },
          "orderWait": {          // 进行中订单
            "number": 1000,
            "trend": [9, 8, 7, 6, 5, 4, 3]
          },
          "orderGet": {           // 订单量
            "month": [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            "year": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          }
        }
      }
    },
    ```

- 获取订单列表

  - 地址`${BASE_URL}/ordersList`
  - 请求方式: `GET`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - query
    ```js
    filter,
    _limit: pageSize,
    _page: pageId,
    // filter{
    //  title:String
    //  year:Numer
    //  state: wait|ship|saved|done|all = 待发货|已发货|已收货|已完成|不限
    // }
    ```
  - 示例结果(类型解释见前)
    ```js
    {
      code: 0,
      data: [
        {
          "id": 123,            // 订单号
          "getTime": "2022-01-01 11:12:22",   // 下单时间
          "orderState": " 卖家已分批发货, 等待买家收货",  // 订单状态
          "orderAddress": "张三，15212346651，重庆市 北碚区 天生路2号西南大学 第一教学楼",
          "orderBatch": [     // 分批
            {
              "id": 1,        // 批次
              "expDate": "2022-11-11",    // 客户期望收货时间
              "shipState": "验货中",       // 该批次状态
              "goods": [                  // 商品
                {
                  "name": "机器猫",
                  "number": 2,
                  "specification": "20只",    // 规格
                  "custome": "AAA"            // 定制要求
                },
                {
                  "name": "机器猫1",
                  "number": 2,
                  "specification": "210只",
                  "custome": "A2AA"
                }
              ]
            },
            {
              "id": 2,
              "expDate": "2022-11-11",
              "shipState": "待发货",
              "goods": [
                {
                  "name": "机器猫",
                  "number": 2,
                  "specification": "20只",
                  "custome": "AAA"
                },
                {
                  "name": "机器猫1",
                  "number": 2,
                  "specification": "210只",
                  "custome": "A2AA"
                }
              ]
            },
            {
              "id": 3,
              "expDate": "2022-11-11",
              "shipState": "运输中",
              "goods": [
                {
                  "name": "机器猫",
                  "number": 2,
                  "specification": "20只",
                  "custome": "AAA"
                },
                {
                  "name": "机器猫1",
                  "number": 2,
                  "specification": "210只",
                  "custome": "A2AA"
                }
              ]
            }
          ],
          "totleDiscount": 12,
          "totleGoodsPrice": 22222,
          "shipPrice": 22,
          "finalPrice": 1111
        },
      ]
    }
    ```

- 添加商品
  - 地址`${BASE_URL}/addgood`
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
      supportId,
      config,           // 商品配置
    }
    // config{
    // id: string;
    // name: string;
    // class: string;
    // enable: boolean;
    // aduit: number;
    // goodPrice: {
    //   unit: string;
    //   perPrice: number;
    //   transPerPrice: number;
    //   transBasePrice: number;
    // };
    // goodStock: number;
    // shipTag: string[];         // 配送类型
    // customeType: string[];     // 支持定制类型
    // detail: string;            // 商品详情HTML
    // }
    ```
  - 示例结果
    ```js
    {
      code: 0,
    }
    ```
- 删除商品
  - 地址`${BASE_URL}/delgood`
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
      supportId,
      goodIds,
    }
    ```
  - 示例结果
    ```js
    {
      code: 0,
    }
    ```
- 更新商品
  - 地址`${BASE_URL}/upgoodlist`
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
      supportId,
      goodId,
      config,
    }
    // config{
    // id: string;
    // name: string;
    // class: string;
    // enable: boolean;
    // aduit: number;
    // goodPrice: {
    //   unit: string;
    //   perPrice: number;
    //   transPerPrice: number;
    //   transBasePrice: number;
    // };
    // goodStock: number;
    // shipTag: string[];         // 配送类型
    // customeType: string[];     // 支持定制类型
    // detail: string;            // 商品详情HTML
    // }
    ```
  - 示例结果
    ```js
    {
      code: 0,
    }
    ```
- 获取商品日志
  - 地址`${BASE_URL}/goodLog`
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
      goodId,
    }
    ```
  - 示例结果
    ```js
    {
      "code": 0,
      "data": ["[2022-1-1]: 创建商品", "[2022-1-2]: 上架商品", "[2022-1-3]: 下架商品", "[2022-1-4]: 删除商品", "[2022-1-5]: 上架商品"],
    }
    ```
- 获取商品详情
  - 地址`${BASE_URL}/goodDetail`
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
      goodId,
    }
    ```
  - 示例结果(类型解释见前)
    ```js
    {
      "code": 0,
      "data": {
        "id": "123",
        "name": "机器猫",
        "class": "猫",
        "goodPrice": {
          "unit": "只",
          "perPrice": 10085,
          "transPerPrice": 1,
          "transBasePrice": 12
        },
        "goodStock": 212,
        "shipTag": ["同城配送", "次日达", "分批配送"],
        "customeType": ["性别定制", "年龄定制"],
        "detail": "<h1 id=\"mq6sv\">你好啊😁</h1><p>欢迎购买机器猫</p>",
        "enable": true,
        "aduit": -1
      }
    },
    ```
- 获取商品列表
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
    //   type: string;        // [all, enable, disable, bin] = [全部商品, 上架商品, 下架商品, 商品回收站]
    //   goodName?: string;
    //   addTime?: any;
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
      },
    ],
    ```
- 获取快递公司名

  - 地址`${BASE_URL}/shipCompList`
  - 请求方式: `GET`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - 示例结果
    ```js
    "code": 0,
    "data": {
      "code": 0,
      "data": [
        {
          "id": 1,
          "name": "顺丰快递"
        },
        {
          "id": 2,
          "name": "顺水快递"
        },
      ]
    }
    ```

- 获取订单详情

  - 地址`${BASE_URL}/orderDetail`
  - 请求方式: `GET`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - query
    ```js
    orderId;
    ```
  - 示例结果(类型解释见前)
    ```js
    {
      "code": 0,
      "data": {
        "getTime": "2022-01-01 11:12:22",     // 下单时间
        "shipTime": "2022-01-22 11:12:22",    // 发货时间
        "orderState": " 卖家已分批发货, 等待买家收货",  // 订单状态
        "userName": "张三",                   // 用户昵称
        "payMethod": "到付",                  // 付款方式
        "orderAddress": "张三，15212346651，重庆市 北碚区 天生路2号西南大学 第一教学楼",
        "shipInfo": [                       // 分批物流信息
          {
            "id": 1,
            "expDate": "2022-11-11",        // 客户希望到达时间
            "shipComp": "顺丰冷链",
            "shipNumber": "9620067407253",
            "deliveryTime": "2022-02-11"    // 发货时间
          }
        ],
        "orderBatch": [     // 分批
          {
            "id": 1,        // 批次
            "goods": [
              {
                "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                "name": "机器猫",
                "number": 2,
                "specification": "20只",
                "custome": "AAA",
                "price": 200
              },
              {
                "face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                "name": "机器猫1",
                "number": 2,
                "specification": "210只",
                "custome": "A2AA",
                "price": 2020
              }
            ],
            "totlePrice": 2222      // 该批价格小计
          }
        ],
        "totleDiscount": 12,        // 总优惠
        "totleGoodsPrice": 22222,   // 商品总价
        "shipPrice": 22,            // 运费
        "finalPrice": 1111          // 最终价格
      }
    }
    ```

- 获取物流

  - 地址`${BASE_URL}/shipDetail`
  - 请求方式: `GET`
  - head
    ```js
    authorization: {
    	token;
    }
    ```
  - query
    ```js
    shipNumber;
    ```
  - 示例结果(类型解释见前)
    ```js
    {
      "code": 0,
      "data": [
        "2021-11-20 17:49:00  到达【顺丰西北枢纽(西安)",
        "2021-11-20 20:45:08  离开【顺丰西北枢纽(西安)】，下一站【顺丰重庆两江中转】  ",
        "2021-11-21 05:35:58  到达【重庆】",
        "2021-11-21 06:55:38  到达【顺丰重庆两江中转】",
        "2021-11-21 07:39:29  离开【顺丰重庆两江中转】，下一站【顺丰西南大学投递点】",
        "2021-11-21 09:49:18  离开【顺丰西南大学投递点】正在投递 电话: 13349886616",
        "2021-11-21 09:49:18  离开【顺丰西南大学投递点】验货中，投递员: 李佳欣"
      ]
    },
    ```

- 发货
  - 地址`${BASE_URL}/addShipId`
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
      shipInfo,
    }
    // shipInfo{
    //  orderId: string;    // 订单号
    //  batch: string;      // 批次
    //  company?: string;   // 物流公司
    //  shipId?: string;    // 运单号
    //  selfShip: Boolean;  // 自行配送? 为True时候物流公司&运单号无效
    // }
    ```
  - 示例结果
    ```js
    {
      code: 0,
    }
    ```
