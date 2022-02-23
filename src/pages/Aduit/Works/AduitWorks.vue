<template>
	<div class="applyWapper">
		<ApplySearchBox @search="handleSearch"></ApplySearchBox>
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
					<a-button v-if="row.aduitPassed === '待审核'" type="link" @click="toShowApply(row.applyId)">去审批</a-button>
					<a-button v-else type="link" disabled>无权操作</a-button>
				</template>
			</vxe-grid>
		</div>
	</div>
	<ApplyProcess :visible="state.visible" :applyid="state.applyId" @close="state.visible = false"></ApplyProcess>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VxeGridProps, VxePagerEvents } from 'vxe-table';
import { aduitApi } from '../../../api';
import ApplySearchBox from '../../../components/ApplySearchBox.vue';
import { IAjaxRestlt } from '../../../types/common';
import { applyIdx2Name } from '../../../utils/applyTypes';
import ApplyProcess from '../../../components/ApplyProcess.vue';

const router = useRouter();
const route = useRoute();

const tablePage = reactive({
	total: 0,
	currentPage: 1,
	pageSize: 10,
});
const state = reactive({
	visible: false,
	applyId: null,
	filter: route.query,
});

const gridOptions = reactive<VxeGridProps>({
	border: false,
	resizable: true,
	loading: false,
	data: [],
	columns: [
		{ field: 'applyId', title: '申请编号' },
		{ field: 'applyTitle', title: '申请名称' },
		{ field: 'applyUserName', title: '申请用户' },
		{ field: 'applyDate', title: '申请日期' },
		{ field: 'applyType', title: '申请类型' },
		{ field: 'applyProp', title: '申请用途' },
		{ field: 'aduitPassed', title: '审核状态' },
		{ title: '操作', slots: { default: 'operate' }, fixed: 'right', showOverflow: false, width: 100 },
	],
});

const findList = async (condition = null) => {
	gridOptions.loading = true;
	const res = (await aduitApi.reqAduitList({ token: '123', pageId: tablePage.currentPage, pageSize: tablePage.pageSize, condition, filter: state.filter })) as IAjaxRestlt;
	if (res.code) {
		message.error('数据请求失败');
	} else {
		gridOptions.loading = false;
		tablePage.total = 100; // res.data.totle;
		gridOptions.data = applyIdx2Name(res as unknown as any[]); // .data.data;
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

function toShowApply(applyId) {
	router.push({
		name: 'aduit-apply',
		params: {
			applyId,
		},
	});
}

function handleSearch(condition) {
	searchEvent(condition);
}

searchEvent();
</script>

<script lang="ts">
export default defineComponent({
	name: 'AduitWorks',
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
