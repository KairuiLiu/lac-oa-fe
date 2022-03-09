```js
BASE_URL = '/api/admin';
```

```js
applyTypes = ['伦理审核', '采购申请'];
applyProps = ['教学用', '科研实验', '科研项目'];
applyStage = ['发起申请', '管理员审核', '审核人审核', '存档完成', '其他'];
applyState = ['草稿', '已提交', '待修改', '已通过', '已取消'];
applyAduitState = ['已拒绝', '已通过', '待审核'];
```

- 获取系统信息(大屏显示用)
  - 地址`${BASE_URL}/systemData`
  - 请求方式: `GET`
  - head
    ```js
    authorization: { token }
    ```
  - 示例结果
    ```ts
    {
      code: 0|1; // (0=成功, 1=失败)
      "data": {
        "sysAllocate": 12,                // 待分配申请数
        "sysProcess": 12,                 // 待处理申请数
        "sysDone": 12,                    // 已完成分配申请数
        "tottleApply": {                  // 申请总数
          "month": {                      // 本月申请数
            "number": 100,                // 总数
            "trend": [1, 3, 2, 4, 2, 6, 1]  // 近1,3..13天
          },
          "year": {                       // 半年申请数
            "number": 1000,               // 数目
            "trend": [9, 8, 7, 6, 5, 4, 3]  // 近6月申请数
          }
        },
        "taskType": {                     // 任务类型
          "totle": 66,                    // 近半月申请数
          "detail": [
            {
              "type": "伦理审查",
              "value": 44
            },
            {
              "type": "采购申请",
              "value": 22
            },
            {
              "type": "实验审核",
              "value": 44
            }
          ]
        },
        "totleWork": {                  // 工作量
          "month": {
            "number": 300,
            "trend": [1, 2, 3, 4, 5, 6, 7]
          },
          "year": {
            "number": 3000,
            "trend": [9, 8, 7, 6, 5, 4, 3]
          }
        },
        "ethicsAnimal": {               // 参与伦理审核动物统计
          "month": {
            "totle": 7300,
            "detail": [
              {
                "type": "鸡",
                "value": 123
              },
              {
                "type": "鸭",
                "value": 123
              },
              {
                "type": "鱼",
                "value": 123
              },
              {
                "type": "狗",
                "value": 123
              }
            ]
          },
          "year": {
            "totle": 72,
            "detail": [
              {
                "type": "鸡",
                "value": 1232
              },
              {
                "type": "鸭",
                "value": 1223
              },
              {
                "type": "鱼",
                "value": 1323
              },
              {
                "type": "狗",
                "value": 1123
              }
            ]
          }
        },
        "buyAnimal": {               // 参与采购申请动物统计
          "month": {
            "totle": 7300,
            "detail": [
              {
                "type": "鸡",
                "value": 123
              },
              {
                "type": "鸭",
                "value": 123
              },
            ]
          },
          "year": {
            "totle": 73200,
            "detail": [
              {
                "type": "鸡",
                "value": 123
              },
              {
                "type": "鸭",
                "value": 123
              },
            ]
          }
        },
        "expAnimal": {               // 参与实验动物统计
          "month": {
            "totle": 7300,
            "detail": [
              {
                "type": "鸡",
                "value": 123
              },
              {
                "type": "鸭",
                "value": 123
              },
            ]
          },
          "year": {
            "totle": 7300,
            "detail": [
              {
                "type": "鸡",
                "value": 123
              },
              {
                "type": "鸭",
                "value": 123
              },
            ]
          }
        },
        "newApply": {               // 新申请趋势(近30日与近12月)
          "month": [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
          "year": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        "applyNotify": [               // 通知
          {
            "title": "申请修改通知1",
            "date": "2022-1-1",
            "detail": "您好,乌拉乌拉乌拉",
            "applyId": 1
          },
          {
            "title": "申请修改通知2",
            "date": "2022-1-1",
            "detail": "您好,乌拉乌拉乌拉",
            "applyId": 2
          },
        ], 
        "applyType": {              // 申请类型
          "done": [                 // 已完成的申请统计
            {
              "type": "伦理",
              "value": 12
            },
            {
              "type": "采购",
              "value": 13
            },
          ],
          "doing": [                // 进行中的申请统计
            {
              "type": "伦理",
              "value": 122
            },
            {
              "type": "采购",
              "value": 13
            },
          ]
        },
        "applyProp": {              // 申请目的统计
          "ethic": [                // 伦理
            {
              "type": "教学",
              "value": 12
            },
            {
              "type": "采购",
              "value": 13
            },
          ],
          "buy": [                  // 采购
            {
              "type": "教学",
              "value": 122
            },
            {
              "type": "采购",
              "value": 132
            },
          ]
        },
        "doingApplyType": [       // 未完成申请统计
          {
            "type": "等待存档",
            "value": 291
          },
          {
            "type": "一周以上",
            "value": 10
          },
          {
            "type": "一周内",
            "value": 29
          }
        ], 
        "userInfo": {           // 人员概况
          "userType": [
            {
              "type": "申请人",
              "value": 12
            },
            {
              "type": "审核人",
              "value": 99
            },
          ],
          "aduitType": [
            {
              "type": "A领域专家",
              "value": 1
            },
            {
              "type": "B领域专家",
              "value": 2
            },
          ],
          "userStat": [
            {
              "type": "在线用户",
              "value": 4
            },
            {
              "type": "离线用户",
              "value": 5
            }
          ]
        },
        "operateInfo": [      // 操作记录
          {
            "applyId": 1,
            "title": "关于A的申请",
            "userName": "AAA",
            "date": "2022-1-1"
          },
          {
            "applyId": 2,
            "title": "关于A的申请",
            "userName": "AAA",
            "date": "2022-1-1"
          },
        ]
      }
    },
    ```
- 获取申请列表
  - 地址`${BASE_URL}/allocateApplyList`
  - 请求方式: `GET`
  - head
    ```js
    authorization: { token }
    ```
  - query
    ```ts
    {
      _limit: pageSize,         // 分页大小
      _page: pageId,            // 页数
      condition: JSON.stringify(condition), // 搜索条件
    },
    // interface ISearchCondition {
    //   applyId?: string | number;  // 申请编号
    //   applyUserName?: string;     // 申请人
    //   applyDate?: number;         // 申请日期
    //   applyType?: number;         // -1 = 不限, 其他为申请类型applyTypes下标
    //   applyProp?: number;         // -1 = 不限, 其他为申请目的applyProps下标
    //   applyTitle?: string;        // 申请名
    //   notFirst?: number;          // 首次申请? -1 = 不限, 0 = 非首次申请 1 = 首次申请 
    //   completeMatching?: number;  // 0 = 模糊匹配 1 = 精确匹配
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
        "allocated": 2,       // 已分配审核人数
        "adminPassed": 0      // 管理员是否已经通过
      },
    ],
    }
    ```
- 获取审核人列表
  - 地址`${BASE_URL}/allocateAduitList`
  - 请求方式: `GET`
  - head
    ```js
    authorization: { token }
    ```
  - query
    ```ts
    {
      _limit: pageSize,
      _page: pageId,
      condition: JSON.stringify(condition),
      applyId,    // 申请Id
    }
    // IAduitSearchCondition {
    //   userName?: string;
    //   type?: string;       // 用户类型
    //   onWork?: number;     // 5min内是否在线 -1 = 不限, 0 不在, 1 在
    //   workings?: number;   // 审核人待处理的任务数
    // }
    ```
  - 示例结果
    ```js
    {
      code: 0,
      data: [
        {
          "userId": 1,
          "userName": "张1",
          "type": "社会人士",
          "onWork": false,
          "workings": 2
        },
      ],
    }
    ```
- 分配审核
  - 地址`${BASE_URL}/allocateWork`
  - 请求方式: `POST`
  - head
    ```js
    authorization: { token }
    ```
  - query
    ```ts
    { 
      userId,       // 审核人Id
      applyId,
    }
    ```
  - 示例结果
    ```js
    {
      code: 0,
    }
    ```
- 获取用户类型列表
  - 地址`${BASE_URL}/aduitType`
  - 请求方式: `GET`
  - head
    ```js
    authorization: { token }
    ```
  - 示例结果
    ```js
    {
      "code": 0,
      "data": [
        {
          "name": "伦理审核人员",
          "subType": [
            {
              "name": "社会人士"
            },
            {
              "name": "A领域专家"
            },
          ]
        },
        {
          "name": "采购审核人员",
          "subType": [
            {
              "name": "社会人士"
            },
            {
              "name": "A领域专家"
            },
          ]
        },
        {
          "name": "供应商",
          "subType": [
            {
              "name": "全部供应商"
            }
          ]
        },
        {
          "name": "管理员",
          "subType": [
            {
              "name": "全部管理员"
            }
          ]
        },
        {
          "name": "申请人",
          "subType": [
            {
              "name": "教师"
            },
            {
              "name": "2019本科生"
            },
          ]
        }
      ]
    }
    ```
- 获取用户列表
  - 地址`${BASE_URL}/aduitList`
  - 请求方式: `GET`
  - head
    ```js
    authorization: { token }
    ```
  - query
    ```js
    {
      aduitType: ['伦理审核人员', '社会人士']   // [一级类型, 二级类型]
    }
    ```
  - 示例结果
    ```js
		"code": 0,
		"data": [
			{
				"userName": "张1",
				"userId": 1234561,
				"enable": true,
				"email": "123@t.com",
				"department": "计算机学院",
				"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
				"phone": 13423232323
			},
		]
    ```
- 删除二级用户组
  - 地址`${BASE_URL}/delAduitGroup`
  - 请求方式: `POST`
  - head
    ```js
    authorization: { token }
    ```
  - body
    ```ts
    { 
      aduitType     // 一级用户组
    }
    ```
  - 示例结果
    ```js
    {
      code: 0,
    }
    ```
- 增加二级用户组
  - 地址`${BASE_URL}/addAduitGroup`
  - 请求方式: `POST`
  - head
    ```js
    authorization: { token }
    ```
  - body
    ```ts
    { 
      aduitType     // 一级用户组
      groupName     // 新二级用户组
    }
    ```
  - 示例结果
    ```js
    {
      code: 0,
    }
    ```
- 禁用用户
  - 地址`${BASE_URL}/userDisable`
  - 请求方式: `POST`
  - head
    ```js
    authorization: { token }
    ```
  - body
    ```ts
    { 
      userId
    }
    ```
  - 示例结果
    ```js
    {
      code: 0,
    }
    ```
- 启用用户
  - 地址`${BASE_URL}/userEnable`
  - 请求方式: `POST`
  - head
    ```js
    authorization: { token }
    ```
  - body
    ```ts
    { 
      userId     
    }
    ```
  - 示例结果
    ```js
    {
      code: 0,
    }
    ```
- 修改用户信息(不太对)
- 获取供应商商品列表
  - 地址`${BASE_URL}/goodList`
  - 请求方式: `GET`
  - head
    ```js
    authorization: { token }
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
- 添加商品
  - 地址`${BASE_URL}/addgood`
  - 请求方式: `POST`
  - head
    ```js
    authorization: { token }
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
    authorization: { token }
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
    authorization: { token }
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
    authorization: { token }
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
    authorization: { token }
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


