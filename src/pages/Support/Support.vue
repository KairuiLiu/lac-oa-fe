<template>
	<a-layout class="layout">
		<a-layout-header class="header">
			<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" @select="handleMenuChange">
				<a-menu-item key="/support/home">首页</a-menu-item>
				<a-menu-item key="/support/goods">店铺商品</a-menu-item>
				<a-menu-item key="/support/orders">我的订单</a-menu-item>
			</a-menu>
			<UserIcon :face="store.state?.userInfo?.face || ''"></UserIcon>
		</a-layout-header>
		<a-layout-content class="content">
			<div class="router-box router">
				<router-view></router-view>
			</div>
		</a-layout-content>
	</a-layout>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { computed, defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import UserIcon from '../../components/UserIcon.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const selectedKeys = computed((): string[] => {
	if (route?.meta?.toMenu) return [route?.meta?.toMenu as string];
	return [route.path];
});

const handleMenuChange = ({ key }: { key: string }) => {
	router.push(key);
};

onMounted(async () => {
	const res = await store.dispatch('support/getShipCompList');
	if (!res) {
		message.error('获取数据失败');
	}
});
</script>
<script lang="ts">
export default defineComponent({
	name: 'SupportPage',
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

.header {
	display: flex;
	justify-content: space-between;
}
</style>
