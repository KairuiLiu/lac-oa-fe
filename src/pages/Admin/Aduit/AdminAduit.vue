<template>
	<div class="applyWapper">
		<AdultSearchBox @search="handleSearch"></AdultSearchBox>
		<div class="applyList">
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
					<div class="linkContent">
						<a-button type="link" @click="toShowApply(row.applyId)">查看申请</a-button>
						<a-button type="link" @click="toShowFollow(row.applyId)">流转过程</a-button>
						<a-button v-if="row.adminPassed" type="link" @click="toShowAduit(row.applyId)">分配审核</a-button>
					</div>
				</template>
			</vxe-grid>
		</div>
	</div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { VxeGridProps, VxePagerEvents } from 'vxe-table';
import { adminApi } from '../../../api';
import AdultSearchBox from '../../../components/ApplySearchBox.vue';
import IAjaxRestlt from '../../../types/common';
import { applyIdx2Name } from '../../../utils/applyTypes';

const router = useRouter();
const tablePage = reactive({
	total: 0,
	currentPage: 1,
	pageSize: 10,
});
const state = reactive({
	visible: false,
	applyId: null,
});

const gridOptions = reactive<VxeGridProps>({
	border: false,
	resizable: true,
	loading: false,
	data: [],
	columns: [
		{ field: 'applyId', title: '申请编号', showOverflow: true },
		{ field: 'applyTitle', title: '申请名称', showOverflow: true },
		{ field: 'applyUserName', title: '申请用户', showOverflow: true },
		{ field: 'applyDate', title: '申请日期', showOverflow: true },
		{ field: 'applyType', title: '申请类型', showOverflow: true },
		{ field: 'applyProp', title: '申请用途', showOverflow: true },
		{ field: 'allocated', title: '分配人数', showOverflow: true },
		{ field: 'adminPassed', title: '管理员审核', showOverflow: true },
		{ title: '操作', slots: { default: 'operate' }, showOverflow: true },
	],
});

const findList = async (condition = null) => {
	gridOptions.loading = true;
	const res = (await adminApi.reqAllocateApply({ token: '123', pageId: tablePage.currentPage, pageSize: tablePage.pageSize, condition })) as IAjaxRestlt;
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
		name: 'admin-apply',
		params: {
			applyId,
		},
	});
}

function toShowFollow(applyId) {
	state.applyId = applyId;
	state.visible = true;
}

function toShowAduit(applyId) {
	router.push({
		name: 'admin-aduit',
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
	name: 'AdminAduit',
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
