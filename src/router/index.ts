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
				component: () => import('../pages/Admin/Admin.vue'),
				redirect: '/admin/home',
				children: [
					{
						path: '/admin/allocate',
						name: 'admin-allocate',
						component: () => import('../pages/Admin/Allocate/AdminAllocate.vue'),
					},
					{
						path: '/admin/apply',
						name: 'admin-apply',
						component: () => import('../pages/Admin/Apply/AdminApply.vue'),
					},

					{
						path: '/admin/home',
						name: 'admin-home',
						component: () => import('../pages/Admin/Home/AdminHome.vue'),
					},

					{
						path: '/admin/manage',
						name: 'admin-manage',
						component: () => import('../pages/Admin/Manage/AdminManage.vue'),
					},

					{
						path: '/admin/profile',
						name: 'admin-profile',
						component: () => import('../pages/Admin/Profile/AdminProfile.vue'),
					},
				],
			},
			{
				path: '/aduit',
				name: 'aduit',
				component: () => import('../pages/Aduit/Aduit.vue'),
				children: [
					{
						path: '/adult/apply',
						name: 'adult-apply',
						component: () => import('../pages/Aduit/Apply/AduitApply.vue'),
					},
					{
						path: '/adult/home',
						name: 'adult-home',
						component: () => import('../pages/Aduit/Home/AduitHome.vue'),
					},

					{
						path: '/adult/profile',
						name: 'adult-profile',
						component: () => import('../pages/Aduit/Profile/AduitProfile.vue'),
					},

					{
						path: '/adult/works',
						name: 'adult-works',
						component: () => import('../pages/Aduit/Works/AduitWorks.vue'),
					},
				],
			},
			{
				path: '/applicant',
				name: 'applicant',
				component: () => import('../pages/Applicant/Applicant.vue'),
				children: [
					{
						path: '/applicant/apply',
						name: 'applicant-apply',
						component: () => import('../pages/Applicant/Apply/ApplicantApply.vue'),
						children: [
							{
								path: '/applicant/apply/new',
								name: 'applicant-apply-new',
								component: () => import('../pages/Applicant/Apply/New/ApplicantApplyNew.vue'),
							},
							{
								path: '/applicant/apply/edit',
								name: 'applicant-apply-edit',
								component: () => import('../pages/Applicant/Apply/Edit/ApplicantApplyEdit.vue'),
							},
						],
					},
					{
						path: '/applicant/home',
						name: 'applicant-home',
						component: () => import('../pages/Applicant/Home/ApplicantHome.vue'),
					},
					{
						path: '/applicant/profile',
						name: 'applicant-profile',
						component: () => import('../pages/Applicant/Profile/ApplicantProfile.vue'),
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
						children: [
							{
								path: '/support/orders/detail',
								name: 'support-orders-detail',
								component: () => import('../pages/Support/Orders/Detail/SupportOrdersDetail.vue'),
							},
						],
					},

					{
						path: '/support/profile',
						name: 'support-profile',
						component: () => import('../pages/Support/Profile/SupportProfile.vue'),
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
