<template>
	<a-layout class="layout">
		<a-layout-header class="header">
			<a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" @select="handleMenuChange"> </a-menu>
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
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
</script>
<script lang="ts">
export default defineComponent({
	name: 'ApplicantHome',
});
</script>

<style lang="less" scoped>
#components-layout-demo-top .logo {
	float: left;
	width: 120px;
	height: 31px;
	margin: 16px 24px 16px 0;
	background: rgba(255, 255, 255, 0.3);
}

.layout {
	display: flex;
	flex-direction: column;
	.content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		// min-width: 1200px;

		.router-box {
			position: relative;
			display: flex;
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
