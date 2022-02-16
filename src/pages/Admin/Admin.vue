<template>
	<a-layout class="layout">
		<a-layout-header>
			<div class="logo" />
			<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" @select="handleMenuChange">
				<a-menu-item key="/admin/home">首页</a-menu-item>
				<a-menu-item key="/admin/allocate">申请分配</a-menu-item>
				<a-menu-item key="/admin/manage">人员管理</a-menu-item>
				<a-menu-item key="/admin/w1">供应商管理</a-menu-item>
				<a-menu-item key="/admin/w2">数据处理</a-menu-item>
			</a-menu>
		</a-layout-header>
		<a-layout-content class="content">
			<a-breadcrumb v-if="selectedKeys[0] !== '/admin/home'">
				<a-breadcrumb-item> <home-filled /> </a-breadcrumb-item>
				<a-breadcrumb-item v-for="item in breadcrumbRoutes" :key="item">{{ item }}</a-breadcrumb-item>
			</a-breadcrumb>
			<div class="router-box router">
				<router-view></router-view>
			</div>
		</a-layout-content>
	</a-layout>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HomeFilled } from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref<Array<string>>([route.path]);

const handleMenuChange = ({ key }: { key: string }) => {
	router.push(key);
};

const breadcrumbRouter = router.options.routes[0].children[0];
const breadcrumbRoutes = computed(() => {
	let res: any = breadcrumbRouter;
	while (res) {
		// res.push(t?.meta?.breadcrumbName);
		const child = res?.children?.find((d: any) => route.name.includes(d.name));
		if (child === undefined) break;
		res = child;
	}
	return res.meta.breadcrumbName.slice(1);
});
</script>
<script lang="ts">
export default defineComponent({
	name: 'AdminPage',
});
</script>

<style lang="less" scoped>
.site-layout-content {
	min-height: 280px;
	padding: 24px;
	// background: #fff;
}
#components-layout-demo-top .logo {
	float: left;
	width: 120px;
	height: 31px;
	margin: 16px 24px 16px 0;
	background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
	float: right;
	margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
	background: #141414;
}

.layout {
	display: flex;
	flex-direction: column;
	.content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding: 16px 50px;
		min-width: 1200px;

		.router-box {
			position: relative;
			// background: #fff;
			display: flex;
			padding: 24px;
			height: 100%;
			flex-grow: 1;
			flex-direction: column;
		}
	}
}
</style>
