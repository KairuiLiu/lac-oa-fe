<template>
	<div class="manageWapper">
		<a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" class="left-side-bar" style="width: 256px" mode="inline">
			<a-sub-menu v-for="item in state.aduitType" :key="item.type">
				<template #icon>
					<sliders-outlined />
				</template>
				<template #title>{{ item.name }}</template>
				<a-menu-item v-for="item2 in item.subType" :key="item2.type" @click="handleMenu(item2.type)">{{ item2.name }}</a-menu-item>
			</a-sub-menu>
		</a-menu>
		<div class="listWapper">
			<div v-if="state.loading" class="loading"><a-spin size="large" /></div>
			<div v-else class="content"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import { SlidersOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { adminApi } from '../../../api';
import IAjaxRestlt from '../../../types/common';

const openKeys = ref<string[]>(['1']);
const selectedKeys = ref<string[]>(['1']);
const store = useStore();

const state = reactive({
	aduitType: null,
	aduitList: [],
	loading: false,
});

onMounted(async () => {
	if (!store.state.admin?.aduitType) {
		const res = await store.dispatch('admin/getAduitType');
		if (!res) {
			message.error('获取数据失败');
		}
	}
	state.aduitType = store.state.admin.aduitType;
});

async function handleMenu(type) {
	state.loading = true;
	state.aduitList = [];
	const result = (await adminApi.reqAduitList({ token: '123', aduitType: type })) as IAjaxRestlt;
	if (result?.code) return false;
	state.aduitList = result.data;
	state.loading = false;
	return true;
}
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminManage',
});
</script>

<style lang="less" scoped>
.manageWapper {
	flex-grow: 1;
	display: flex;
	border-top: 1px solid #00000040;
	.listWapper {
		flex-grow: 1;
		border-left: 1px solid #00000040;
		background-color: #bfa;
	}
	.left-side-bar {
		background-color: #f0f2f5ff;
		:deep(ul) {
			background-color: #f0f2f5ff;
		}
		:deep(li) {
			background-color: #f0f2f5ff;
		}
	}
}
</style>
