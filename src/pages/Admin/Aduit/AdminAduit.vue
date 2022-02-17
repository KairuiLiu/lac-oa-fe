<template>
	<div class="applyWapper">
		<AdultSearchBox @search="handleSearch"></AdultSearchBox>
		当前还需要{{ state.aduitNeed }}位审核人
		<div class="applyList" :scroll-y="{ enabled: true }">
			<vxe-grid v-bind="gridOptions" class="table">
				<template #pager>
					<vxe-pager
						v-model:current-page="tablePage.currentPage"
						v-model:page-size="tablePage.pageSize"
						:layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
						:total="tablePage.total"
						@page-change="handlePageChange"
					>
					</vxe-pager>
				</template>

				<template #operate="{ row }">
					<a-button type="link" @click="toAllocateWork(row.userId)">分配</a-button>
				</template>
			</vxe-grid>
		</div>
	</div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { VxeGridProps, VxePagerEvents, VxeColumnPropTypes } from 'vxe-table';
import { adminApi } from '../../../api';
import AdultSearchBox from '../../../components/AdultSearchBox.vue';
import IAjaxRestlt from '../../../types/common';

const route = useRoute();

const tablePage = reactive({
	total: 0,
	currentPage: 1,
	pageSize: 10,
});
const state = reactive({
	visible: false,
	applyId: route.params.applyId as string,
	aduitNeed: 0,
});

const formatOnWork: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
	return cellValue ? '是' : '否';
};

const gridOptions = reactive<VxeGridProps>({
	border: false,
	resizable: true,
	loading: false,
	data: [],
	columns: [
		{ field: 'userId', title: '用户编号' },
		{ field: 'userName', title: '姓名' },
		{ field: 'type', title: '分类' },
		{ field: 'onWork', title: '五分钟内是否在线', formatter: formatOnWork },
		{ field: 'workings', title: '待处理工作' },
		{ title: '操作', slots: { default: 'operate' }, fixed: 'right', showOverflow: false },
	],
});

const findList = async (condition = null) => {
	gridOptions.loading = true;
	const res = (await adminApi.reqAllocateAduitList({ token: '123', applyId: state.applyId, pageId: tablePage.currentPage, pageSize: tablePage.pageSize, condition })) as IAjaxRestlt;
	if (res.code) {
		message.error('数据请求失败');
	} else {
		gridOptions.loading = false;
		tablePage.total = 100; // res.data.totle;
		gridOptions.data = res as unknown as any[]; // .data.data;
		// state.aduitNeed = res.data.aduitNeed;
	}
};

const searchEvent = (condition = null) => {
	tablePage.currentPage = 1;
	findList(condition);
};

const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
	tablePage.currentPage = currentPage;
	tablePage.pageSize = pageSize;
	findList();
};

async function toAllocateWork(userId) {
	const res = (await adminApi.reqAdminAllocateWork({ token: '123', userId, applyId: state.applyId })) as IAjaxRestlt;
	if (res.code) {
		message.error('分配失败');
		return;
	}
	message.info('分配成功');
	handleSearch({});
}

function handleSearch(condition) {
	searchEvent(condition);
}

searchEvent();
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminAllocate',
});
</script>

<style lang="less" scoped>
.applyWapper {
	width: 100%;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	gap: 32px;
	.applyList {
		flex-grow: 1;
		.table {
			box-shadow: 0 0 0.6vw rgba(0, 0, 0, 0.2);
		}
	}
	.linkContent {
		white-space: nowrap;
	}
}
</style>
