<template>
	<a-layout class="layout">
		<a-layout-header>
			<div class="logo" />
			<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
				<a-menu-item key="0">首页</a-menu-item>
				<a-menu-item key="1">申请分配</a-menu-item>
				<a-menu-item key="2">人员管理</a-menu-item>
				<a-menu-item key="3">供应商管理</a-menu-item>
				<a-menu-item key="4">数据处理</a-menu-item>
			</a-menu>
		</a-layout-header>
		<a-layout-content class="content">
			<div class="router-box">
				<router-view></router-view>
			</div>
		</a-layout-content>
	</a-layout>
</template>

<script setup lang="ts"></script>

<script>
import { defineComponent } from 'vue';

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

.content {
	padding: 16px 50px;
	min-width: 1200px;
	.router-box {
		// background: #fff;
		padding: 24px;
		min-height: 280px;
	}
}
</style>
