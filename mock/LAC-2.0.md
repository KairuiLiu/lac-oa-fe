## /暂时可以不做的 API

```text
## 可以不实现的😁

- common API
    - 图片上传*2
- 申请人API
    - 增加许可证
    - 请求商品列表
- 供应商API
- 整合商品API


## 如果没时间也不是不可以不实现的😥

- common API
    - 更新用户信息
- 申请API
    - 教学用表单实现
```

## /CommonAPI

```text
注意, 我这边JSON-SERVER只支持使用GET请求获取, 所以假数据的是GET请求, 上线前修复~~~~
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /CommonAPI/帐号密码登录

```text
type有: 'admin', 'applicant', 'aduit', 'support'
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/user/login

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名   | 示例值 | 参数类型 | 是否必填 | 参数描述    |
| -------- | ------ | -------- | -------- | ----------- |
| userid   | admin  | String   | 是       | 帐号 String |
| passWord | 123    | String   | 是       | 密码 String |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
	"code": 0,
	"data": {
		"userInfo": {
			"token": "123",
			"userId": "1234561",
			"username": "张1",
			"email": "123@t.com",
			"department": "计算机学院",
			"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
			"phone": "12345678900",
			"group": [
				"管理员",
				"全部管理员"
			]
		},
		"type": "admin"
	}
}
```

#### 错误响应示例

```javascript
{
	"code": 1
}
```

## /CommonAPI/token 登录

```text
authorization看起来有点问题
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/user/loginToken

#### 请求方式

> POST

#### Content-Type

> form-data

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
	"code": 0,
	"data": {
		"userInfo": {
			"token": "123",
			"userId": "1234561",
			"username": "张1",
			"email": "123@t.com",
			"department": "计算机学院",
			"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
			"phone": "12345678900",
			"group": [
				"管理员",
				"全部管理员"
			]
		},
		"type": "admin"
	}
}
```

#### 错误响应示例

```javascript
{
	"code": 1
}
```

## /CommonAPI/更新用户信息

````text
config参数:

```ts
{
    userId?: string;              // id
    username?: string;       // 用户名
    email?: string;                // 邮箱, 已校验合法性
    department?: string;     // 学院, 没有限制
    face?: string;                    // 头像地址
    phone?: string;                // 手机号, 已经校验
    password?: string;            // 密码, 如果有就修改密码, 没有则忽略
    group?: string[];                // 所在用户组, 已校验, 该参数只有管理员可用
}
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/user/updateuserinfo

#### 请求方式
> POST

#### Content-Type
> form-data

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
config | - | Object | 是 | 见接口说明
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code":0
}
```

#### 错误响应示例

```javascript
{
    "code":1,
    "msg": "您无权操作"
}
```

## /CommonAPI/富文本编辑器图片上传

```text
相见[WangEditor](https://www.wangeditor.com/doc/pages/07-%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87/01-%E9%85%8D%E7%BD%AE%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%8E%A5%E5%8F%A3.html)
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/upload/wangimg

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名   | 示例值                                                         | 参数类型 | 是否必填 | 参数描述 |
| -------- | -------------------------------------------------------------- | -------- | -------- | -------- |
| 文件名   | /home/liukairui/Pictures/插头.png                              | Text     | 是       | -        |
| 文件名 2 | /home/liukairui/Desktop/深度截图\_选择区域\_20220323164156.png | Text     | 是       | -        |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    // errno 即错误代码，0 表示没有错误。
    //       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
    "errno": 0,

    // data 是一个数组，返回图片Object，Object中包含需要包含url、alt和href三个属性,它们分别代表图片地址、图片文字说明和跳转链接,alt和href属性是可选的，可以不设置或设置为空字符串,需要注意的是url是一定要填的。
    "data": [
        {
            url: "图片地址",
            alt: "图片文字说明",
            href: "跳转链接"
        },
        {
            url: "图片地址1",
            alt: "图片文字说明1",
            href: "跳转链接1"
        },
        "……"
    ]
}
```

## /CommonAPI/头像/证书上传 API

```text
详见  [AntDV](https://next.antdv.com/components/upload-cn#API)
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/upload/img

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名 | 示例值                                                         | 参数类型 | 是否必填 | 参数描述 |
| ------ | -------------------------------------------------------------- | -------- | -------- | -------- |
| file   | /home/liukairui/Desktop/深度截图\_选择区域\_20220323164156.png | Text     | 是       | -        |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /申请 API

```text
务必注意, 申请ID应该保证在伦理审核, 采购申请两表中唯一
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /申请 API/教学用伦理审核表单格式

````text
**这个理论上可以先不做**

教学用伦理申请表单
```ts
base: {
		department: string;    // 院系（单位）

		tel: string;            // 电话, 已校验,
		major: string;            // 专业
		class: string;            // 班级
		study: string;            // 教学课程名称
		animals: animal[];        // 动物品种 见下
                animalsOthers: string;        // 其他动物名称
		mOrganism: {                // 动物微生物级别
			state: number;       // 微生物级别, 见下
			detial: string;    // 说明
		};
		source: string;            // 动物来源
		producNo: number;            // 生产许可证有无
		certNo: number;            // 质量合格证明
		checkNo: number;            //检疫合格证明
		expType: {                // 动物实验类别
			state: number;    // 1=常规, 0=非常规（请注明）
			detial: string;      // 非常规注明
		};
		aniQM: number;            // 雄性动物数
		aniQF: number;            // 雌性动物数
		directorTel: string;        // 负责人电话
		directorName: string;        // 负责人姓名
		directorEmail: string;       // 负责人邮箱
};
overview: string;        // 动物实验必要性、实验操作步骤、3R主要措施、实验终末点及动物处置方式、是否使用毒（害）物质：
promiseDate: Date;      // 声明日期
facApprDate: Date;       // 申请人所在单位教学管理部门意见公章时间
illApprDate: Date;      // 实验动物伦理审查委员会审批意见公章时间
illApprState: number;    //  实验动物伦理审查委员会审批意见
facApprState: number     // 申请人所在单位教学管理部门意见
````

mOrganism.state 参数

```
0->普通级
1->清洁级
2->SPF级
3->其他
```

animals 参数

```
0鸡
1鸽
2鸭
3鹅
4小鼠
5大鼠
6兔
7犬
8牛
9羊
10猪
11犬
12其他
```

````
## /申请API/科研用伦理审核表单格式
```text
科研用伦理审核表单

```js
"applyType": "ethic",            // 伦理审核 ethic, 采购申请 buy
"applyProps": "lab",             // 教学用 tech, 科研用 lab, 科研项目 project
"formData": {
	"head": {                                // 都需要后端生成
		"applDate": "2022-01-01",        // 申请时间
		"apprDate": null,                // 批准时间
		"iacucNo": null                  // 批准编号(这个目前不用管, 直接返回null)
	},
	"base": {
		"name": "关于哆啦A梦身上有多少螺丝钉的研究",        // 课题名称
		"enname": "A study on how many screws Doraemon has on his body", // 选填, 课程名称英文
                "source": "漫画书",                                // 课题来源
		"director": "胡图图",                             // 课题负责人
		"directorEn": "HUTUTU",                           // 课题负责人, 英文, 选填
		"degree": "professor",                            // 职称/学位, 参数见后
		"tel": "13403693631",                             // 电话, 已校验
		"departmant": "计算机学院",                        // 学院, 随便写
		"email": "me@hututtu.me",                         // 邮箱, 已校验
		"pexptime": [                                    // 预计实验时间
			"2022-05-02T20:12:59.075Z",
			"2022-05-18T20:12:59.075Z"
		]
	},
	"expers": [{                        // 参与实验人员信息

			"name": "张1",
			"degree": "professor",
			"response": "拆解机器猫",            // 职责
			"experLicense": "SWU_LAC-20210732",   // 实验编号,
			"tel": "13403693631",                 // 电话,  已校验
			"error": [],                          // 忽略这个参数
			"loading": false                      // 忽略这个参数
		},
	],
	"animal": {                                        // 拟使用动物及设施信息
		"animalOrigin": "时光机进口",                // 动物来源
		"productionNo": 1,                            // 生产许可证 无需校验
		"certNo": 1,                        //质量合格证明
		"inspecRepo": 1,                       //检疫合格证明
		"detail": [{
				"species": "猫", // 物种

				"strain": "机器猫",  // 品系/亚种/品种

				"ageWS": "3/10", // 大致年龄/体重String

				"sexQF": 1,  // 雌性数量
				"sexQM": 0,  // 雄性数量
				"bacterio": "Ordinary",    // 细菌学状态, 参数见下
				"viral": "yes",        // 病毒状态, 参数见下
				"error": []            // 忽略这个参数
			},
		],
		"facilitiesLicense": "不知道",            // 动物实验设施许可证编号
		"facilityAddress": "西南大学25教"        // 设施地址
	},
	"detail": {
		"necessity": "图一乐",//动物实验项目的目的、必要性和意义
		"reason": "图一乐",//阐述使用动物的原理（包括不能使用非动物模型的原因，以及所选用的动物物种
		"expDesign": "图一乐",//阐述实验设计和动物操作程序（包括动物标识、动物运输、保定装置的应用、给药后的护理和观察、是否需要非标准饲养等）
		"harms": "图一乐",//详细列出操作程序中预期可能对动物造成的伤害或不适，以及拟采取的将痛苦减至最低的措施
		"disposal": {// 实验终末点及动物处置方式
			"state": [// 多选
				"live",    // 存活
				"death"    // 死亡
			],
			"detail": "",        // 忽略这个参数
			"disposal": "图一乐"  // 实力处理方式(若未勾选死亡可以不写)
		},
		"poisonous": {// 是否使用有毒（害）物质（感染、放射、化学毒、其他）
			"state": 1,    // 1=有 ,0=无
			"declear": "图一乐"// 详细阐述
		},
		"institutionOpinion": {        // 申报单位意见
			"date": null,            // 时间对象
			"state": 0,            // 审核状态, 见下
			"principal": "",        // 单位负责人
			"date2": null            // 申请人声明日期
		},
		"committeeOption": {            // 实验动物伦理审查委员会审批意见
			"state": 0,            // 审核状态, 见下
			"suggest": "图一乐"       // 审核人意见
		},
		"commitTime": {
			"state": 0,
			"value": 1
		}
	}
}
````

degree 参数

```
professor
associateProfessor
researcher
associateResearcher
lecturer
experimenter
phDStudent
Postgraduate
Undergraduate
other
```

bacterio 参数

```
Ordinary
clean
spf
sterile
```

viral 参数

```
yes
no
```

institutionOpinion.state 参数

```
2 -> 作必要修改后同意
1 -> 同意
0 -> 不同意
-1 -> 暂无
```

committeeOption.state 参数

```
3 -> 作必要修改后同意
2 -> 作必要修改后重审
1 -> 同意
0 -> 不同意
-1 -> 暂无
```

````
## /申请API/获取申请表
```text
暂无描述
````

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/apply/getapply?t=1648025982137&id=2

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名 | 示例值        | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------------- | --------- | -------- | -------- |
| t      | 1648025982137 | TimeStamp | 是       | 防止缓存 |
| id     | 2             | String    | 是       | 申请 ID  |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
	"code": 0,
	"data": {
		"applyType": "ethic",
		"applyProps": "lab",
		"formData": {
			"head": {
				"applDate": "2022-01-01",
				"apprDate": null,
				"iacucNo": null
			},
			"base": {
				"name": "关于哆啦A梦身上有多少螺丝钉的研究",
				"source": "漫画书",
				"enname": "A study on how many screws Doraemon has on his body",
				"director": "胡图图",
				"degree": "professor",
				"tel": "13403693631",
				"departmant": "计算机学院",
				"email": "me@hututtu.me",
				"pexptime": [
					"2022-05-02T20:12:59.075Z",
					"2022-05-18T20:12:59.075Z"
				]
			},
			"expers": [
				{
					"name": "张1",
					"degree": "professor",
					"response": "拆解机器猫",
					"experLicense": "SWU_LAC-20210732",
					"tel": "13403693631",
					"error": [],
					"loading": false
				},
				{
					"name": "张2",
					"degree": "associateProfessor",
					"response": "组装机器猫",
					"experLicense": "SWU_LAC-20210733",
					"tel": "13403693631",
					"error": [],
					"loading": false
				},
				{
					"name": "张3",
					"degree": "researcher",
					"response": "撰写报告",
					"experLicense": "SWU_LAC-20210734",
					"tel": "13403693631",
					"error": [],
					"loading": false
				}
			],
			"animal": {
				"animalOrigin": "时光机进口",
				"productionNo": 1,
				"certNo": 1,
				"inspecRepo": 1,
				"detail": [
					{
						"species": "猫",
						"strain": "机器猫",
						"ageWS": "3/10",
						"sexQF": 1,
						"sexQM": 0,
						"bacterio": "Ordinary",
						"viral": "yes",
						"error": []
					},
					{
						"species": "猫",
						"strain": "玩偶猫",
						"ageWS": "4/5",
						"sexQF": 0,
						"sexQM": 1,
						"bacterio": "clean",
						"viral": "no",
						"error": []
					}
				],
				"facilitiesLicense": "不知道",
				"facilityAddress": "西南大学25教"
			},
			"detail": {
				"necessity": "图一乐",
				"reason": "图一乐",
				"expDesign": "图一乐",
				"harms": "图一乐",
				"disposal": {
					"state": [
						"live",
						"death"
					],
					"detail": "",
					"disposal": "图一乐"
				},
				"poisonous": {
					"state": 1,
					"declear": "图一乐"
				},
				"institutionOpinion": {
					"date": null,
					"state": 0,
					"principal": "",
					"date2": null
				},
				"committeeOption": {
					"state": 0,
					"suggest": "图一乐"
				},
				"commitTime": {
					"state": 0,
					"value": 1
				}
			}
		}
	}
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "一些原因"
}
```

## /申请 API/保存申请

```text
- 有id则直接upadate
- 没有id则新建申请并save, 状态为草稿
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/apply/saveapply

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------ | --------- | -------- | -------- |
| t      | 213    | TimeStamp | 是       | 防止缓存 |
| id     | ET123  | String    | 否       | 申请 Id  |
| data   | {}     | Object    | 是       | 表单数据 |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "请勿重复提交审核意见"
}
```

## /申请 API/删除申请

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/apply/delapply

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------ | --------- | -------- | -------- |
| t      | 213    | TimeStamp | 是       | 防止缓存 |
| id     | ET123  | String    | 否       | 申请 Id  |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "请勿重复提交审核意见"
}
```

## /申请 API/审核人审批

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/apply/aduitapply

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述     |
| ------ | ------ | --------- | -------- | ------------ |
| t      | 213    | TimeStamp | 是       | 防止缓存     |
| id     | ET123  | String    | 是       | 申请 Id      |
| data   | {}     | Object    | 是       | 整个表单数据 |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "请勿重复提交审核意见"
}
```

## /申请 API/管理员审批

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/apply/aduitadminapply

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------ | --------- | -------- | -------- |
| t      | 213    | TimeStamp | 是       | 防止缓存 |
| data   | false  | Boolean   | 是       | 是否通过 |
| id     | ET123  | String    | 是       | 申请 Id  |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "请勿重复提交审核意见"
}
```

## /申请 API/提交申请

```text
- 没data: 直接提交
- 有id: 先save再提交
- 没有id: 新建id, save数据, 提交
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/apply/newsubmitapply

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------ | --------- | -------- | -------- |
| t      | 213    | TimeStamp | 是       | 防止缓存 |
| id     | ET123  | String    | 是       | 申请 Id  |
| data   | {}     | Object    | 是       | 表单数据 |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "请勿重复提交审核意见"
}
```

## /申请 API/请求流转过程

````text
返回数据解释
```json
{
"userName": 操作者,
"note": 备注
"error": 是否被拒绝(主要用户现实红色X),
"end": 是否结束了, 比如被超管干掉, 审批完成
"dateTime": 完成时间,
"face": 主人公头像地址
"stage": 0
},
````

stage 解释:

- stage 的个位表示申请状态`['发起申请', '管理员审核', '审核人审核', '存档完成', '其他'];`的下标
- `stage//10`表示申请次数-1
  例如`stage=22`表示下图第三行第三个审核人审核

![深度截图_选择区域_20220323164156.png](https://img.cdn.apipost.cn/client/user/1015222/avatar/ec7f77cc9e07b8e3f1d4deeab2693b9f623add68c527e.png)

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/apply/applyProcess?t=123456&applyId=ET123456

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 123456 | TimeStamp | 是 | 防止缓存
applyId | ET123456 | String | 是 | 申请ID
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
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
}
```

#### 错误响应示例

```javascript
{
	code: 1;
}
```

## /申请 API/科研用伦理审核相关

```text
暂无描述
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /申请 API/科研用伦理审核相关/动物从业实验许可证校验

````text
row结构
```ts
row {
name, // 用户名
experLicense, //
}
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/apply/ethicLabCheckLicense?t=1648039585818&row={name, experLicense}

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 1648039585818 | TimeStamp | 是 | 防缓存
row | {name, experLicense} | String | 是 | 用户名与许可证号码
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
	"code": 0,
	"data": ["错误1", "错误2"]
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /申请 API/科研用伦理审核相关/动物实验从业证书编号搜索

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/apply/ethicLabLicenseSuggest?t=1648039585818&keyword=张

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名  | 示例值        | 参数类型  | 是否必填 | 参数描述 |
| ------- | ------------- | --------- | -------- | -------- |
| t       | 1648039585818 | TimeStamp | 是       | 防缓存   |
| keyword | 张            | String    | 是       | 用户名   |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
	"code": 0,
	"data": [
		{
			"name": "赵钱孙李",
			"license": "SWU_LAC-20210732"
		},
		{
			"name": "张3",
			"license": "SWU_LAC-20210733"
		},
		{
			"name": "张2",
			"license": "SWU_LAC-20210734"
		},
		{
			"name": "张5",
			"license": "SWU_LAC-20210735"
		},
		{
			"name": "张4",
			"license": "SWU_LAC-20210736"
		},
		{
			"name": "张6",
			"license": "SWU_LAC-20210737"
		},
		{
			"name": "张8",
			"license": "SWU_LAC-20210738"
		},
		{
			"name": "张88",
			"license": "SWU_LAC-20210739"
		},
		{
			"name": "张7",
			"license": "SWU_LAC-20210740"
		},
		{
			"name": "张90",
			"license": "SWU_LAC-20210741"
		}
	]
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /管理员 API

```text
applyTypes = ['伦理审核', '采购申请'];
applyProps = ['教学用', '科研实验', '科研项目'];
applyStage = ['发起申请', '管理员审核', '审核人审核', '存档完成', '其他'];
applyState = ['草稿', '已提交', '待修改', '已通过', '已取消'];
applyAduitState = ['已拒绝', '已通过', '待审核'];
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /管理员 API/获取系统信息(用于首页展示)

````text
相应格式
```ts    {
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
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/admin/systemData?t=213

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | TimeStamp | 是 | 防止缓存
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
	"code": 0,
	"data": {
		"sysAllocate": 12,
		"sysProcess": 12,
		"sysDone": 12,
		"tottleApply": {
			"month": {
				"number": 100,
				"trend": [
					1,
					3,
					2,
					4,
					2,
					6,
					1
				]
			},
			"year": {
				"number": 1000,
				"trend": [
					9,
					8,
					7,
					6,
					5,
					4,
					3
				]
			}
		},
		"taskType": {
			"totle": 66,
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
		"totleWork": {
			"month": {
				"number": 300,
				"trend": [
					1,
					2,
					3,
					4,
					5,
					6,
					7
				]
			},
			"year": {
				"number": 3000,
				"trend": [
					9,
					8,
					7,
					6,
					5,
					4,
					3
				]
			}
		},
		"ethicsAnimal": {
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
		"buyAnimal": {
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
					{
						"type": "鱼",
						"value": 123
					},
					{
						"type": "狗",
						"value": 123
					}
				]
			}
		},
		"expAnimal": {
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
			}
		},
		"newApply": {
			"month": [
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				0,
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				0,
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				0
			],
			"year": [
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12
			]
		},
		"applyNotify": [
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
			{
				"title": "申请修改通知3",
				"date": "2022-1-1",
				"detail": "您好,乌拉乌拉乌拉",
				"applyId": 3
			},
			{
				"title": "申请修改通知4",
				"date": "2022-1-1",
				"detail": "您好,乌拉乌拉乌拉",
				"applyId": 4
			},
			{
				"title": "申请修改通知5",
				"date": "2022-1-1",
				"detail": "您好,乌拉乌拉乌拉",
				"applyId": 5
			},
			{
				"title": "申请修改通知6",
				"date": "2022-1-1",
				"detail": "您好,乌拉乌拉乌拉",
				"applyId": 6
			},
			{
				"title": "申请修改通知7",
				"date": "2022-1-1",
				"detail": "您好,乌拉乌拉乌拉",
				"applyId": 7
			},
			{
				"title": "申请修改通知8",
				"date": "2022-1-1",
				"detail": "您好,乌拉乌拉乌拉",
				"applyId": 8
			},
			{
				"title": "申请修改通知9",
				"date": "2022-1-1",
				"detail": "您好,乌拉乌拉乌拉",
				"applyId": 9
			}
		],
		"applyType": {
			"done": [
				{
					"type": "伦理",
					"value": 12
				},
				{
					"type": "采购",
					"value": 13
				},
				{
					"type": "实验",
					"value": 14
				},
				{
					"type": "供应",
					"value": 15
				}
			],
			"doing": [
				{
					"type": "伦理",
					"value": 122
				},
				{
					"type": "采购",
					"value": 13
				},
				{
					"type": "实验",
					"value": 14
				},
				{
					"type": "供应",
					"value": 15
				}
			]
		},
		"applyProp": {
			"ethic": [
				{
					"type": "教学",
					"value": 12
				},
				{
					"type": "采购",
					"value": 13
				},
				{
					"type": "实验",
					"value": 14
				}
			],
			"buy": [
				{
					"type": "教学",
					"value": 122
				},
				{
					"type": "采购",
					"value": 132
				},
				{
					"type": "实验",
					"value": 14
				}
			]
		},
		"doingApplyType": [
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
		"userInfo": {
			"userType": [
				{
					"type": "申请人",
					"value": 12
				},
				{
					"type": "审核人",
					"value": 99
				},
				{
					"type": "供应商",
					"value": 1
				}
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
				{
					"type": "C领域专家",
					"value": 3
				},
				{
					"type": "D领域专家",
					"value": 4
				},
				{
					"type": "E领域专家",
					"value": 5
				}
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
		"operateInfo": [
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
			{
				"applyId": 3,
				"title": "关于A的申请",
				"userName": "AAA",
				"date": "2022-1-1"
			},
			{
				"applyId": 4,
				"title": "关于A的申请",
				"userName": "AAA",
				"date": "2022-1-1"
			},
			{
				"applyId": 5,
				"title": "关于A的申请",
				"userName": "AAA",
				"date": "2022-1-1"
			},
			{
				"applyId": 6,
				"title": "关于A的申请",
				"userName": "AAA",
				"date": "2022-1-1"
			}
		]
	}
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /管理员 API/申请相关

```text
暂无描述
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /管理员 API/申请相关/获取申请列表

````text
```js
{
      _limit: pageSize,         // 分页大小
      _page: pageId,            // 页数
      condition: JSON.stringify(condition), // 搜索条件
    },
````

```js
condition: {
    applyId?: string | number;  // 申请编号
    applyUserName?: string;     // 申请人
    applyDate?: number;         // 申请日期
    applyAduitState?: number;         // -1~3 = 不限, 待审核 通过 拒绝 待分配
    applyProp?: number;         // -1 = 不限, 其他为申请目的applyProps下标
    applyTitle?: string;        // 申请名
    notFirst?: number;          // 首次申请? -1 = 不限, 0 = 非首次申请 1 = 首次申请
    completeMatching?: number;  // 0 = 模糊匹配 1 = 精确匹配
}
```

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/admin/allocateApplyList?t=213&_limit=2&_page=2&condition={}

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | TimeStamp | 是 | 防止缓存
_limit | 2 | Number | 是 | 每页长度
_page | 2 | Number | 是 | 页号
condition | {} | String | 是 | 搜索条件
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
      "code": 0,
      "data": [
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

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "登录信息过期"
}
```

## /管理员 API/申请相关/获取审核人列表

````text
```js
condition = {
    userName?: string;
    type?: string;       // 用户类型
    onWork?: number;     // 5min内是否在线 -1 = 不限, 0 不在, 1 在
    workings?: number;   // 审核人待处理的任务数
}
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/admin/allocateAduitList?t=213&_limit=5&_page=2&condition={}&applyId=ET213

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | TimeStamp | 是 | 防止缓存
_limit | 5 | Number | 是 | 每页长度
_page | 2 | Number | 是 | 页号
condition | {} | String | 是 | 搜索条件, JSON.stringfy()后
applyId | ET213 | String | 是 | 申请ID
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
	"code": 0,
	"data": [
		{
			"userId": 6,
			"userName": "张6",
			"type": "A领域专家",
			"onWork": false,
			"workings": 12
		},
		{
			"userId": 7,
			"userName": "张7",
			"type": "A领域专家",
			"onWork": true,
			"workings": 22
		},
		{
			"userId": 8,
			"userName": "张8",
			"type": "B领域专家",
			"onWork": false,
			"workings": 22
		},
		{
			"userId": 9,
			"userName": "张9",
			"type": "B领域专家",
			"onWork": false,
			"workings": 2
		},
		{
			"userId": 10,
			"userName": "张三0",
			"type": "B领域专家",
			"onWork": true,
			"workings": 21
		}
	]
}
```

#### 错误响应示例

```javascript
{
	"code": 1
}
```

## /管理员 API/申请相关/分配审核

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/admin/allocateWork

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名  | 示例值 | 参数类型 | 是否必填 | 参数描述  |
| ------- | ------ | -------- | -------- | --------- |
| userId  | 123    | String   | 是       | 审核人 ID |
| applyId | ET213  | String   | 是       | 申请 ID   |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
  "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /管理员 API/人员管理相关

```text
暂无描述
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /管理员 API/人员管理相关/获取用户类型列表

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/admin/aduitType?t=213

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------ | --------- | -------- | -------- |
| t      | 213    | TimeStamp | 是       | 防止缓存 |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
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
				{
					"name": "B领域专家"
				},
				{
					"name": "C领域专家"
				},
				{
					"name": "D领域专家"
				}
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
				{
					"name": "B领域专家"
				},
				{
					"name": "C领域专家"
				},
				{
					"name": "D领域专家"
				}
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
				{
					"name": "2020本科生"
				}
			]
		}
	]
}
```

#### 错误响应示例

```javascript
{
    "code":1
}
```

## /管理员 API/人员管理相关/获取用户列表

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/admin/aduitList?t=213&aduitType=['伦理审核人员', '社会人士']

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名    | 示例值                       | 参数类型  | 是否必填 | 参数描述             |
| --------- | ---------------------------- | --------- | -------- | -------------------- |
| t         | 213                          | TimeStamp | 是       | 防止缓存             |
| aduitType | ['伦理审核人员', '社会人士'] | String    | 是       | [一级类型, 二级类型] |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
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
		{
			"userName": "张2",
			"userId": 1234562,
			"enable": false,
			"email": "123@t.com",
			"department": "计算机学院",
			"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
			"phone": 13423232323
		},
		{
			"userName": "张3",
			"userId": 1234563,
			"enable": true,
			"email": "123@t.com",
			"department": "计算机学院",
			"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
			"phone": 13423232323
		},
		{
			"userName": "张4",
			"userId": 1234564,
			"enable": true,
			"email": "123@t.com",
			"department": "计算机学院",
			"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
			"phone": 13423232323
		},
		{
			"userName": "张5",
			"userId": 1234565,
			"enable": false,
			"email": "123@t.com",
			"department": "计算机学院",
			"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
			"phone": 13423232323
		},
		{
			"userName": "张6",
			"userId": 1234566,
			"enable": true,
			"email": "123@t.com",
			"department": "计算机学院",
			"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
			"phone": 13423232323
		},
		{
			"userName": "张7",
			"userId": 1234567,
			"enable": true,
			"email": "123@t.com",
			"department": "计算机学院",
			"face": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
			"phone": 13423232323
		}
	]
}
```

#### 错误响应示例

```javascript
{
	"code": 1,
	"data": "无权访问"
}
```

## /管理员 API/人员管理相关/增加二级用户组

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/admin/addAduitGroup

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名    | 示例值       | 参数类型  | 是否必填 | 参数描述     |
| --------- | ------------ | --------- | -------- | ------------ |
| groupName | 社会人士     | String    | 是       | 新二级用户组 |
| aduitType | 伦理审核人员 | String    | 是       | 一级用户组   |
| t         | 213          | TimeStamp | 是       | 防缓存       |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /管理员 API/人员管理相关/删除二级用户组

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/admin/delAduitGroup

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名    | 示例值                       | 参数类型  | 是否必填 | 参数描述   |
| --------- | ---------------------------- | --------- | -------- | ---------- |
| aduitType | ['伦理审核人员', '社会人士'] | String    | 是       | 一级用户组 |
| t         | 213                          | TimeStamp | 是       | 防缓存     |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /管理员 API/人员管理相关/修改用户信息

````text
userInfo参数
```js
{
userId,
username,
phone,
department,
email
grp: 用户组,同前, 该参数仅管理员可以用
}
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/admin/delAduitGroup

#### 请求方式
> POST

#### Content-Type
> form-data

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
userInfo | {} | String | 是 | 用户信息
t | 213 | TimeStamp | 是 | 防缓存
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /管理员 API/人员管理相关/启用用户

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/admin/userEnable

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------ | --------- | -------- | -------- |
| userId | ET123  | String    | 是       | 用户 ID  |
| t      | 213    | TimeStamp | 是       | 防缓存   |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /管理员 API/人员管理相关/禁用用户

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/admin/userDisable

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------ | --------- | -------- | -------- |
| userId | ET123  | String    | 是       | 用户 ID  |
| t      | 213    | TimeStamp | 是       | 防缓存   |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /审核人 API

```text
暂无描述
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /审核人 API/获取系统信息(用于首页展示)

````text
相应格式

```ts    {
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
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/aduit/sysdata?t=213

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | TimeStamp | 是 | 防止缓存
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
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

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /审核人 API/获取申请列表

````text
Condition参数
```ts
Condition {  条件同前
  applyId?: string | number;
  applyUserName?: string;
  applyDate?: number;
  applyType?: number;
  applyProp?: number;
  applyTitle?: string;
  notFirst?: number;
  completeMatching?: number;
}
````

filter 参数

```ts
filter {
   title=string
   year=all|20xx
   type=all|buy|ethic
   state=all|wait|pass|notpass
}
```

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/aduit/applylist?t=213&_limit=2&_page=2&condition={}&filter=

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | TimeStamp | 是 | 防止缓存
_limit | 2 | Number | 是 | 每页长度
_page | 2 | Number | 是 | 页号
condition | {} | String | 是 | 搜索条件 见上
filter | - | String | 是 | 过滤条件 见上
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
[
	{
		applyId: 3,
		applyTitle: '研究3的申请',
		applyUserName: '张3',
		applyDate: '2022-1-3',
		applyType: 0,
		applyProp: 0,
		aduitPassed: 0,
	},
	{
		applyId: 4,
		applyTitle: '研究4的申请',
		applyUserName: '张4',
		applyDate: '2022-1-4',
		applyType: 0,
		applyProp: 1,
		aduitPassed: 2,
	},
];
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "登录信息过期"
}
```

## /申请人 API

```text
暂无描述
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /申请人 API/获取申请类型与二级列表

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/applicant/applytypes?t=213

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------ | --------- | -------- | -------- |
| t      | 213    | TimeStamp | 是       | 防缓存   |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
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

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /申请人 API/获取申请列表

````text
sort结构
```ts
sort{
  pos: 0=正序 1=倒序
  data: 部分[Value], 其中
     value: 'applyId', label: '编号'
     value: 'applyTitle', label: '标题'
     value: 'applyType', label: '申请类型'
     value: 'applyProp', label: '申请用途'
     value: 'applyDate', label: '申请日期'
     value: 'applyState', label: '审核状态'
}
```~~~~
````

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/applicant/applyList?t=1648039585818&_limit=10&_page=1&type=[全部申请,2021]&sort={}

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名  | 示例值          | 参数类型 | 是否必填 | 参数描述             |
| ------- | --------------- | -------- | -------- | -------------------- |
| t       | 1648039585818   | Text     | 是       | 防缓存               |
| \_limit | 10              | Number   | 是       | 页大小               |
| \_page  | 1               | Number   | 是       | 页号                 |
| type    | [全部申请,2021] | String   | 是       | [一级列表, 二级列表] |
| sort    | {}              | String   | 是       | 排序字段, 见上       |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
[
	{
		applyId: 1,
		applyTitle: '研究1的申请',
		applyUserName: '张三',
		applyDate: '2022-1-1',
		applyType: 0,
		applyProp: 1,
		allocated: 2,
		applyState: 0,
		adminPassed: 0,
	},
	{
		applyId: 2,
		applyTitle: '研究2的申请',
		applyUserName: '张2',
		applyDate: '2022-1-2',
		applyType: 0,
		applyProp: 2,
		allocated: 1,
		applyState: 1,
		adminPassed: 1,
	},
	{
		applyId: 3,
		applyTitle: '研究3的申请',
		applyUserName: '张3',
		applyDate: '2022-1-3',
		applyType: 0,
		applyProp: 0,
		allocated: 3,
		applyState: 2,
		adminPassed: 0,
	},
	{
		applyId: 4,
		applyTitle: '研究4的申请',
		applyUserName: '张4',
		applyDate: '2022-1-4',
		applyType: 0,
		applyProp: 1,
		allocated: 1,
		applyState: 3,
		adminPassed: 1,
	},
	{
		applyId: 5,
		applyTitle: '研究5的申请',
		applyUserName: '张5',
		applyDate: '2022-1-5',
		applyType: 0,
		applyProp: 2,
		allocated: 1,
		applyState: 0,
		adminPassed: 1,
	},
	{
		applyId: 6,
		applyTitle: '研究6的申请',
		applyUserName: '张6',
		applyDate: '2022-1-6',
		applyType: 0,
		applyProp: 0,
		allocated: 1,
		applyState: 1,
		adminPassed: 0,
	},
	{
		applyId: 7,
		applyTitle: '研究17的申请',
		applyUserName: '张三7',
		applyDate: '2022-1-17',
		applyType: 0,
		applyProp: 1,
		allocated: 2,
		applyState: 2,
		adminPassed: 0,
	},
	{
		applyId: 8,
		applyTitle: '研究28的申请',
		applyUserName: '张28',
		applyDate: '2022-1-28',
		applyType: 0,
		applyProp: 2,
		allocated: 1,
		applyState: 3,
		adminPassed: 1,
	},
	{
		applyId: 9,
		applyTitle: '研究9的申请',
		applyUserName: '张9',
		applyDate: '2022-1-9',
		applyType: 0,
		applyProp: 0,
		allocated: 3,
		applyState: 0,
		adminPassed: 0,
	},
	{
		applyId: 10,
		applyTitle: '研究41的申请',
		applyUserName: '张41',
		applyDate: '2022-1-1',
		applyType: 0,
		applyProp: 1,
		allocated: 1,
		applyState: 1,
		adminPassed: 1,
	},
];
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /申请人 API/增加许可证

```text
这个API的调用者被我删除了, 让我找找~~~~
```

#### 接口状态

> 需修改

#### 接口 URL

> https://lac.liukairui.me/api/applicant/addLicense

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名  | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------- | ------ | -------- | -------- | -------- |
| t       | -      | Text     | 是       | 防缓存   |
| license | -      | Text     | 是       | -        |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
[
	{
		applyId: 1,
		applyTitle: '研究1的申请',
		applyUserName: '张三',
		applyDate: '2022-1-1',
		applyType: 0,
		applyProp: 1,
		allocated: 2,
		applyState: 0,
		adminPassed: 0,
	},
	{
		applyId: 2,
		applyTitle: '研究2的申请',
		applyUserName: '张2',
		applyDate: '2022-1-2',
		applyType: 0,
		applyProp: 2,
		allocated: 1,
		applyState: 1,
		adminPassed: 1,
	},
	{
		applyId: 3,
		applyTitle: '研究3的申请',
		applyUserName: '张3',
		applyDate: '2022-1-3',
		applyType: 0,
		applyProp: 0,
		allocated: 3,
		applyState: 2,
		adminPassed: 0,
	},
	{
		applyId: 4,
		applyTitle: '研究4的申请',
		applyUserName: '张4',
		applyDate: '2022-1-4',
		applyType: 0,
		applyProp: 1,
		allocated: 1,
		applyState: 3,
		adminPassed: 1,
	},
	{
		applyId: 5,
		applyTitle: '研究5的申请',
		applyUserName: '张5',
		applyDate: '2022-1-5',
		applyType: 0,
		applyProp: 2,
		allocated: 1,
		applyState: 0,
		adminPassed: 1,
	},
	{
		applyId: 6,
		applyTitle: '研究6的申请',
		applyUserName: '张6',
		applyDate: '2022-1-6',
		applyType: 0,
		applyProp: 0,
		allocated: 1,
		applyState: 1,
		adminPassed: 0,
	},
	{
		applyId: 7,
		applyTitle: '研究17的申请',
		applyUserName: '张三7',
		applyDate: '2022-1-17',
		applyType: 0,
		applyProp: 1,
		allocated: 2,
		applyState: 2,
		adminPassed: 0,
	},
	{
		applyId: 8,
		applyTitle: '研究28的申请',
		applyUserName: '张28',
		applyDate: '2022-1-28',
		applyType: 0,
		applyProp: 2,
		allocated: 1,
		applyState: 3,
		adminPassed: 1,
	},
	{
		applyId: 9,
		applyTitle: '研究9的申请',
		applyUserName: '张9',
		applyDate: '2022-1-9',
		applyType: 0,
		applyProp: 0,
		allocated: 3,
		applyState: 0,
		adminPassed: 0,
	},
	{
		applyId: 10,
		applyTitle: '研究41的申请',
		applyUserName: '张41',
		applyDate: '2022-1-1',
		applyType: 0,
		applyProp: 1,
		allocated: 1,
		applyState: 1,
		adminPassed: 1,
	},
];
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /申请人 API/请求商品列表

````text
```ts
sort{
  pos: 0=正序 1=倒序
  data: 部分[Value], 其中
     value: 'applyId', label: '编号'
     value: 'applyTitle', label: '标题'
     value: 'applyType', label: '申请类型'
     value: 'applyProp', label: '申请用途'
     value: 'applyDate', label: '申请日期'
     value: 'applyState', label: '审核状态'
}
```~~~~
````

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/applicant/goodList?t=1648039585818&_limit=10&_page=1&condition={}

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名    | 示例值        | 参数类型  | 是否必填 | 参数描述       |
| --------- | ------------- | --------- | -------- | -------------- |
| t         | 1648039585818 | TimeStamp | 是       | 防缓存         |
| \_limit   | 10            | Number    | 是       | 页大小         |
| \_page    | 1             | Number    | 是       | 页号           |
| condition | {}            | String    | 是       | 搜索条件, 见上 |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
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
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /供应商 API

```text
暂无描述
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /供应商 API/获取系统信息(用于首页展示)

````text
响应格式

```ts    {
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
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/support/sysdata?t=213

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | TimeStamp | 是 | 防止缓存
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
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

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /供应商 API/订单相关

```text
暂无描述
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /供应商 API/订单相关/获取订单列表

````text
filter过滤条件
```ts
filter{
     title:String,
     year:Numer,
     state: wait|ship|saved|done|all = 待发货|已发货|已收货|已完成|不限
}
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/support/ordersList?t=213&filter={}&_limit=5&_page=1

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | TimeStamp | 是 | 防止缓存
filter | {} | String | 是 | 过滤条件 见上
_limit | 5 | Number | 是 | 每页长度
_page | 1 | Number | 是 | 页号
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
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

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /供应商 API/订单相关/获取订单详情

````text
Condition参数
```ts
Condition {
      type: string;        // [all, enable, disable, bin] = [全部商品, 上架商品, 下架商品, 商品回收站]
      goodName?: string;
      addTime?: Date;
}
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/support/orderDetail?t=213&orderId=OD1231321423

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | TimeStamp | 是 | 防止缓存
orderId | OD1231321423 | String | 是 | 订单ID
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
	"code": 0,
	"data": {
		"getTime": "2022-01-01 11:12:22",
		"shipTime": "2022-01-22 11:12:22",
		"orderState": " 卖家已分批发货, 等待买家收货",
		"userName": "张三",
		"payMethod": "到付",
		"orderAddress": "张三，15212346651，重庆市 北碚区 天生路2号西南大学 第一教学楼",
		"shipInfo": [
			{
				"id": 1,
				"expDate": "2022-11-11",
				"shipComp": "顺丰冷链",
				"shipNumber": "9620067407253",
				"deliveryTime": "2022-02-11"
			},
			{
				"id": 2,
				"expDate": "2022-11-12",
				"shipComp": "德邦物流",
				"shipNumber": "9620067227253",
				"deliveryTime": "2022-02-12"
			},
			{
				"id": 3,
				"expDate": "2022-11-13",
				"shipComp": "暂无",
				"shipNumber": "暂无",
				"deliveryTime": "暂无"
			}
		],
		"orderBatch": [
			{
				"id": 1,
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
				"totlePrice": 2222
			},
			{
				"id": 2,
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
				"totlePrice": 1111
			},
			{
				"id": 3,
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
				"totlePrice": 2222
			}
		],
		"totleDiscount": 12,
		"totleGoodsPrice": 22222,
		"shipPrice": 22,
		"finalPrice": 1111
	}
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "无权访问"
}
```

## /供应商 API/订单相关/获取快递公司名

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/support/shipCompList?t=213

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名 | 示例值 | 参数类型  | 是否必填 | 参数描述 |
| ------ | ------ | --------- | -------- | -------- |
| t      | 213    | TimeStamp | 是       | 防止缓存 |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
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
		{
			"id": 3,
			"name": "EMS"
		},
		{
			"id": 4,
			"name": "中通快读"
		},
		{
			"id": 5,
			"name": "圆通快递"
		}
	]
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "无权访问"
}
```

## /供应商 API/订单相关/获取物流信息

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/support/shipDetail?t=213&shipNumber=SF2313142142312

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名     | 示例值          | 参数类型  | 是否必填 | 参数描述 |
| ---------- | --------------- | --------- | -------- | -------- |
| t          | 213             | TimeStamp | 是       | 防止缓存 |
| shipNumber | SF2313142142312 | Text      | 是       | 物流单号 |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
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
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "无权访问"
}
```

## /供应商 API/订单相关/发货

````text
shipInfo	参数
```ts
shipInfo{
 orderId: string;    // 订单号
 batch: string;      // 批次
 company?: string;   // 物流公司
 shipId?: string;    // 运单号
 selfShip: Boolean;  // 自行配送? 为True时候物流公司&运单号无效
}
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/support/addShipId

#### 请求方式
> POST

#### Content-Type
> form-data

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | Text | 是 | 防缓存
shipInfo | {} | Text | 是 | 配送信息, 见上
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /[整合]商品 API

```text
整合自
管理员
供应商用
```

#### 公共 Header 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Query 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 公共 Body 参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |

暂无参数

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

## /[整合]商品 API/获取商品列表

````text
整合自


```ts
Condition {
      type: string;        // [all, enable, disable, bin] = [全部商品, 上架商品, 下架商品, 商品回收站]
      goodName?: string;
      addTime?: Date;
    }
````

````
#### 接口状态
> 开发中

#### 接口URL
> https://lac.liukairui.me/api/goods/goodList?t=213&supportId=SP123&_limit=5&_page=1&condition={}

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
t | 213 | TimeStamp | 是 | 防止缓存
supportId | SP123 | String | 是 | 供应商ID[注意权限管理]
_limit | 5 | Number | 是 | 每页长度
_page | 1 | Number | 是 | 页号
condition | {} | String | 是 | 搜索条件, 见上
#### 预执行脚本
```javascript
暂无预执行脚本
````

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
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
}
```

#### 错误响应示例

```javascript
{
    "code": 1,
    "msg": "无权访问"
}
```

## /[整合]商品 API/添加商品

````text
```ts
config{
    id: string;
    name: string;
    class: string;
    enable: boolean;
    aduit: number;
    goodPrice: {
      unit: string;
      perPrice: number;
      transPerPrice: number;
      transBasePrice: number;
    };
    goodStock: number;
    shipTag: string[];         // 配送类型
    customeType: string[];     // 支持定制类型
    detail: string;            // 商品详情HTML
}
````

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/goods/addgood

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名    | 示例值 | 参数类型 | 是否必填 | 参数描述                |
| --------- | ------ | -------- | -------- | ----------------------- |
| t         | 213    | Text     | 是       | 防缓存                  |
| supportId | SP123  | String   | 是       | 供应商 ID[注意权限管理] |
| config    | {}     | Object   | 是       | 商品信息, 见上          |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /[整合]商品 API/删除商品

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/goods/delgood

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名    | 示例值        | 参数类型 | 是否必填 | 参数描述                 |
| --------- | ------------- | -------- | -------- | ------------------------ |
| supportId | SP123         | String   | 是       | 供应商 ID [注意权限管理] |
| goodIds   | [GD112,GD222] | String   | 是       | [商品 ID 信息]           |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /[整合]商品 API/更新商品

````text
```ts
config{
    id: string;
    name: string;
    class: string;
    enable: boolean;
    aduit: number;
    goodPrice: {
      unit: string;
      perPrice: number;
      transPerPrice: number;
      transBasePrice: number;
    };
    goodStock: number;
    shipTag: string[];         // 配送类型
    customeType: string[];     // 支持定制类型
    detail: string;            // 商品详情HTML
}
````

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/goods/upgoodlist

#### 请求方式

> POST

#### Content-Type

> form-data

#### 请求 Body 参数

| 参数名    | 示例值 | 参数类型 | 是否必填 | 参数描述                |
| --------- | ------ | -------- | -------- | ----------------------- |
| t         | 213    | Text     | 是       | 防缓存                  |
| supportId | SP123  | String   | 是       | 供应商 ID[注意权限管理] |
| config    | {}     | Object   | 是       | 商品信息, 见上          |
| goodId    | GD123  | String   | 是       | 商品 ID                 |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /[整合]商品 API/获取商品详情

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/goods/goodDetail?supportId=&goodId=&t=

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名    | 示例值 | 参数类型 | 是否必填 | 参数描述                |
| --------- | ------ | -------- | -------- | ----------------------- |
| supportId | -      | Text     | 是       | 供应商 ID[注意权限管理] |
| goodId    | -      | Text     | 是       | 商品 ID                 |
| t         | -      | Text     | 是       | 防缓存                  |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
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
		"shipTag": [
			"同城配送",
			"次日达",
			"分批配送"
		],
		"customeType": [
			"性别定制",
			"年龄定制"
		],
		"detail": "<h1 id=\"mq6sv\">你好啊😁</h1><p>欢迎购买机器猫</p>",
		"enable": true,
		"aduit": -1
	}
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```

## /[整合]商品 API/获取商品日志

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口 URL

> https://lac.liukairui.me/api/goods/goodLog?supportId=&goodId=&t=

#### 请求方式

> GET

#### Content-Type

> form-data

#### 请求 Query 参数

| 参数名    | 示例值 | 参数类型 | 是否必填 | 参数描述                |
| --------- | ------ | -------- | -------- | ----------------------- |
| supportId | -      | Text     | 是       | 供应商 ID[注意权限管理] |
| goodId    | -      | Text     | 是       | 商品 ID                 |
| t         | -      | Text     | 是       | 防缓存                  |

#### 预执行脚本

```javascript
暂无预执行脚本;
```

#### 后执行脚本

```javascript
暂无后执行脚本;
```

#### 成功响应示例

```javascript
{
    "code": 0,
    "data":[
	"[2022-1-1]: 创建商品",
	"[2022-1-2]: 上架商品",
	"[2022-1-3]: 下架商品",
	"[2022-1-4]: 删除商品",
	"[2022-1-5]: 上架商品"
    ]
}
```

#### 错误响应示例

```javascript
{
    "code": 1
}
```
