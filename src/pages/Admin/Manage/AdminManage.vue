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
			<div v-else class="content">
				<div class="toolBar">
					<a-button danger ghost><close-outlined />删除分组</a-button>
					<a-button type="primary" style="margin-right: 15px"><plus-outlined />新建分组</a-button>
				</div>
				<div class="userList">
					<a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="dataList">
						<!-- <template #loadMore>
							<div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
								<a-spin v-if="loadingMore" />
								<a-button v-else @click="loadMore">loading more</a-button>
							</div>
						</template> -->
						<template #renderItem="{ item }">
							<a-list-item>
								<template #actions>
									<a>edit</a>
									<a>more</a>
								</template>
								<a-list-item-meta description="Ant Design, a design language for background applications, is refined by Ant UED Team">
									<template #title>
										<a href="https://www.antdv.com/">{{ item.name.last }}</a>
									</template>
									<template #avatar>
										<a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
									</template>
								</a-list-item-meta>
								<div>content</div>
							</a-list-item>
						</template>
					</a-list>
				</div>
				{{ state.aduitList }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue';
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
		padding: 20px;
		.loading {
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			.toolBar {
				width: 100%;
				display: flex;
				flex-direction: row-reverse;
			}
		}
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
