```js
const BASE_URL = '/api/aduit';
```

- 获取申请列表
  - 地址`${BASE_URL}/applylist`
  - 请求方式: `GET`
  - head
    ```js
    authorization: { token }
    ```
  - query
    ```js
    {
      filter,
      condition,
      _limit: pageSize,
      _page: pageId,
    }
    // Condition {  条件同前
    //   applyId?: string | number;
    //   applyUserName?: string;
    //   applyDate?: number;
    //   applyType?: number;
    //   applyProp?: number;
    //   applyTitle?: string;
    //   notFirst?: number;
    //   completeMatching?: number;
    // }

    // filter {
    //    title=string
    //    year=all|20xx
    //    type=all|buy|ethic
    //    state=all|wait|pass|notpass
    // }
    ```
  - 示例结果(类型解释见前)
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
          "aduitPassed": 2
        },
      ]
    }
    ```
- 获取获取系统信息(大屏显示用)
  - 地址`${BASE_URL}/sysdata`
  - 请求方式: `GET`
  - head
    ```js
    authorization: { token }
    ```
  - 示例结果(类型解释见前)
    ```js
		"code": 0,
		"data": {
			"searchYears": [2022, 2021],    // 搜索可用年度
			"plots": {
				"totleApply": {     // 工作量
					"month": {
						"number": 100,
						"trend": [1, 3, 2, 4, 2, 6, 1]
					},
					"year": {
						"number": 1000,
						"trend": [9, 8, 7, 6, 5, 4, 3]
					}
				},
				"applyRes": {       // 月度审核结果统计
					"totle": 7300,
					"detail": [
						{
							"type": "审核通过",
							"value": 123
						},
						{
							"type": "审核未通过",
							"value": 123
						},
						{
							"type": "待审核",
							"value": 123
						}
					]
				},
				"applyWait": {        // 待处理工作
					"number": 1000,
					"trend": [9, 8, 7, 6, 5, 4, 3]
				},
				"workRank": {         // 工作排名(前%)
					"number": 40,
					"trend": [9, 8, 7, 6, 5, 4, 3]
				}
			}
		}
    ```
