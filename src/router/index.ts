import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'index',
		component: () => import('../pages/index.vue'),
		children: [
			{
				path: '/admin',
				name: 'admin',
				meta: {
					breadcrumbName: ['管理员'],
				},
				component: () => import('../pages/Admin/Admin.vue'),
				redirect: '/admin/home',
				children: [
					{
						path: '/admin/allocate',
						name: 'admin-allocate',
						meta: {
							breadcrumbName: ['管理员', '申请分配', '待分配申请'],
						},
						component: () => import('../pages/Admin/Allocate/AdminAllocate.vue'),
					},
					{
						path: '/admin/aduit/:applyId',
						name: 'admin-aduit',
						meta: {
							breadcrumbName: ['管理员', '申请分配', '选择审核人'],
							toMenu: '/admin/allocate',
						},
						component: () => import('../pages/Admin/Aduit/AdminAduit.vue'),
					},
					{
						path: '/admin/apply/:applyId',
						name: 'admin-apply',
						meta: {
							breadcrumbName: ['管理员', '申请分配', '申请管理'],
							toMenu: '/admin/allocate',
						},
						component: () => import('../pages/Admin/Apply/AdminApply.vue'),
					},
					{
						path: '/admin/home',
						name: 'admin-home',
						meta: {
							breadcrumbName: ['管理员', '主页'],
						},
						component: () => import('../pages/Admin/Home/AdminHome.vue'),
					},

					{
						path: '/admin/manage/',
						name: 'admin-manage',
						meta: {
							breadcrumbName: ['管理员', '人员管理'],
						},
						component: () => import('../pages/Admin/Manage/AdminManage.vue'),
					},
					{
						path: '/admin/support/:supportId',
						name: 'admin-support',
						meta: {
							breadcrumbName: ['管理员', '人员管理', '供应商管理'],
							toMenu: '/admin/manage',
						},
						component: () => import('../pages/Admin/Support/AdminSupport.vue'),
					},
					{
						path: '/admin/data',
						name: 'admin-data',
						meta: {
							breadcrumbName: ['管理员', '数据管理'],
						},
						component: () => import('../pages/Admin/Data/AdminData.vue'),
					},
				],
			},
			{
				path: '/aduit',
				name: 'aduit',
				redirect: '/aduit/home',
				component: () => import('../pages/Aduit/Aduit.vue'),
				children: [
					{
						path: '/aduit/apply',
						name: 'aduit-apply',
						component: () => import('../pages/Aduit/Apply/AduitApply.vue'),
					},
					{
						path: '/aduit/home',
						name: 'aduit-home',
						component: () => import('../pages/Aduit/Home/AduitHome.vue'),
					},
					{
						path: '/aduit/works',
						name: 'aduit-works',
						component: () => import('../pages/Aduit/Works/AduitWorks.vue'),
					},
				],
			},
			{
				path: '/applicant',
				name: 'applicant',
				component: () => import('../pages/Applicant/Applicant.vue'),
				redirect: '/applicant/home',
				children: [
					{
						path: '/applicant/home',
						name: 'applicant-home',
						component: () => import('../pages/Applicant/Home/ApplicantHome.vue'),
					},
					{
						path: '/applicant/apply/:applyId',
						name: 'applicant-apply',
						component: () => import('../pages/Applicant/Apply/ApplicantApply.vue'),
					},
				],
			},
			{
				path: '/login',
				name: 'login',
				component: () => import('../pages/Login/Login.vue'),
			},
			{
				path: '/support',
				name: 'support',
				redirect: '/support/home',
				component: () => import('../pages/Support/Support.vue'),
				children: [
					{
						path: '/support/goods',
						name: 'support-goods',
						component: () => import('../pages/Support/Goods/SupportGoods.vue'),
					},
					{
						path: '/support/home',
						name: 'support-home',
						component: () => import('../pages/Support/Home/SupportHome.vue'),
					},
					{
						path: '/support/orders',
						name: 'support-orders',
						component: () => import('../pages/Support/Orders/SupportOrders.vue'),
					},
					{
						path: '/support/detail/:orderId',
						name: 'support-detail',
						component: () => import('../pages/Support/Detail/SupportDetail.vue'),
						meta: {
							toMenu: '/support/orders',
						},
					},
				],
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
