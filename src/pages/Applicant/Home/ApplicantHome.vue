<template>
	<a-layout>
		<a-layout-sider width="200" style="background: #fff">
			<a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" :style="{ borderRight: 0, padding: '24px 0' }">
				<a-sub-menu v-for="item in state.applyType" :key="item.name">
					<template #title>
						<span>
							<file-text-outlined />
							{{ item.name }}
						</span>
					</template>
					<a-menu-item v-for="item2 in item.subType" :key="`[${item.name}, ${item2.name}]`" @click="handleMenu([item.name, item2.name])"
						><calendar-outlined />
						{{ item2.name }}
					</a-menu-item>
				</a-sub-menu>
			</a-menu>
		</a-layout-sider>
		<a-layout v-show="state.curType.length" style="padding: 24px">
			<a-breadcrumb>
				<a-breadcrumb-item><home-filled /></a-breadcrumb-item>
				<a-breadcrumb-item v-for="item in state.curType" :key="item">{{ item }}</a-breadcrumb-item>
			</a-breadcrumb>
			<div class="btns">
				<a-cascader v-model:value="state.newApply" :options="state.applyOptions" @change="toNewApply">
					<a-button><edit-outlined />创建申请</a-button>
				</a-cascader>
				<a-button @click="toShowSort"><sort-ascending-outlined />排序</a-button>
				<a-button @click="toExportData"><download-outlined />数据导出</a-button>
			</div>
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
					<a-button v-if="[1, 3, 4].includes(row.applyState)" type="link" @click="toShowApply(row.applyId)">查看申请</a-button>
					<a-button v-if="[0, 2].includes(row.applyState)" type="link" @click="toEditApply(row.applyId)">修改申请</a-button>
					<a-button v-if="[0, 2].includes(row.applyState)" type="link" @click="toSubmitApply(row.applyId)">提交申请</a-button>
					<a-button v-if="[1, 2, 3, 4].includes(row.applyState)" type="link" @click="toShowFollow(row.applyId)">流转过程</a-button>
					<a-button v-if="[0, 2, 4].includes(row.applyState)" type="link" @click="toDelApply(row.applyId)">删除申请</a-button>
					<a-popover v-if="[3].includes(row.applyState)" placement="left">
						<template #content>
							<a-button type="link" @click="toDownload(row.applyId, 'docx')">下载DOCX</a-button><br />
							<a-button type="link" @click="toDownload(row.applyId, 'pdf')">下载PDF</a-button>
						</template>
						<a-button type="link" @click="toDelApply(row.applyId)">下载文档</a-button>
					</a-popover>
				</template>
			</vxe-grid>
		</a-layout>
	</a-layout>
	<ApplyProcess :visible="state.followVisible" :applyid="state.applyId" @close="state.followVisible = false"></ApplyProcess>
	<a-modal v-model:visible="state.sort.sortVisible" title="自定义排序" @ok="handleSort">
		<a-steps :current="-1" direction="vertical">
			<a-step title="排序方式">
				<template #description>
					<a-radio-group
						v-model:value="state.sort.condition.pos"
						:options="[
							{ label: '正序', value: 1 },
							{ label: '倒序', value: 0 },
						]"
					/>
				</template>
			</a-step>

			<a-step title="排序字段">
				<template #description>
					<a-checkbox-group v-model:value="state.sort.condition.data" :options="state.sort.options" />
				</template>
			</a-step>
		</a-steps>
	</a-modal>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { FileTextOutlined, CalendarOutlined, HomeFilled, EditOutlined, SortAscendingOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { VxeGridProps, VxePagerEvents } from 'vxe-table';
import { useRouter } from 'vue-router';
import { applicantApi, commonApi } from '../../../api';
import { applyFormate } from '../../../utils/applyTypes';
import { IAjaxRestlt } from '../../../types/common';

const store = useStore();
const router = useRouter();

const state = reactive({
	applyType: ref([]),
	curType: ref([]),
	followVisible: false,
	applyId: '',
	newApply: ref([]),
	sort: {
		condition: {
			pos: 1,
			data: ['applyId'],
		},
		sortVisible: false,
		options: [
			{ value: 'applyId', label: '编号', disabled: false },
			{ value: 'applyTitle', label: '标题', disabled: false },
			{ value: 'applyType', label: '申请类型', disabled: false },
			{ value: 'applyProp', label: '申请用途', disabled: false },
			{ value: 'applyDate', label: '申请日期', disabled: false },
			{ value: 'applyState', label: '审核状态', disabled: false },
		],
		sortCurStep: ref(0),
	},
	applyOptions: [
		{
			value: 'ethic',
			label: '伦理审核申请',
			children: [
				{
					value: 'tech',
					label: '教学用',
				},
				{
					value: 'project',
					label: '科研项目',
				},
				{
					value: 'lab',
					label: '科研实验',
				},
			],
		},
		{
			value: 'buy',
			label: '采购申请',
			children: [
				{
					value: 'tech',
					label: '教学用',
				},
				{
					value: 'project',
					label: '科研项目',
				},
				{
					value: 'lab',
					label: '科研实验',
				},
			],
		},
	],
});

const tablePage = reactive({
	total: 0,
	currentPage: 1,
	pageSize: 10,
});

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

async function handleMenu(type) {
	state.curType = type;
	tablePage.currentPage = 1;
	findList(state.curType);
}

const gridOptions = reactive<VxeGridProps>({
	border: false,
	resizable: true,
	loading: false,
	data: [],
	columns: [
		{ field: 'applyId', title: '编号' },
		{ field: 'applyTitle', title: '标题' },
		{ field: 'applyType', title: '申请类型', formatter: applyFormate.formatType },
		{ field: 'applyProp', title: '申请用途', formatter: applyFormate.formatProp },
		{ field: 'applyDate', title: '申请日期' },
		{ field: 'applyState', title: '审核状态', formatter: applyFormate.formatState },
		{ title: '操作', slots: { default: 'operate' }, fixed: 'right', showOverflow: false, width: 400 },
	],
});

const findList = async () => {
	gridOptions.loading = true;
	const res = (await applicantApi.reqApplyList({ token: '123', pageId: tablePage.currentPage, pageSize: tablePage.pageSize, type: state.curType, sort: state.sort.condition })) as IAjaxRestlt;
	if (res.code) {
		message.error('数据请求失败');
	} else {
		gridOptions.loading = false;
		tablePage.total = 100; // res.data.totle;
		gridOptions.data = res as unknown as any[]; // .data.data;
	}
};

const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
	tablePage.currentPage = currentPage;
	tablePage.pageSize = pageSize;
	findList(state.curType);
};

function toShowApply(id) {
	router.push({
		name: 'applicant-apply',
		params: {
			applyId: id,
		},
	});
}

function toEditApply(id) {
	router.push({
		name: 'applicant-apply',
		params: {
			applyId: id,
		},
	});
}

function toDownload(id, type) {
	window.open(`/apply/exportapply?id=${id}&type=${type}&token=${store.state.userInfo.token}`);
}

function toExportData() {
	window.open(`/apply/export?token=${store.state.userInfo.token}`);
}

function toShowSort() {
	state.sort.sortCurStep = 0;
	state.sort.sortVisible = true;
}

async function toSubmitApply(id) {
	const res = (await commonApi.reqApplySubmit({ token: '123', applyId: id })) as IAjaxRestlt;
	if (res.code) {
		message.error('提交失败');
		return;
	}
	message.success('提交成功');
	router.go(0);
}

async function toDelApply(id) {
	const res = (await commonApi.reqApplyDel({ token: '123', applyId: id })) as IAjaxRestlt;
	if (res.code) {
		message.error('删除失败');
		return;
	}
	message.success('删除成功');
	router.go(0);
}

function toShowFollow(id) {
	state.applyId = id;
	state.followVisible = true;
}

function toNewApply(v) {
	router.push({
		name: 'applicant-apply',
		params: {
			type: `${v[0]}-${v[1]}`,
		},
	});
}

function handleSort() {
	findList();
}

onMounted(async () => {
	if (!store.state.applicant?.applyType) {
		const res = await store.dispatch('applicant/getApplyType');
		if (!res) {
			message.error('获取数据失败');
		}
	}
	state.applyType = store.state.applicant.applyType;
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'ApplicantHome',
});
</script>

<style lang="less" scoped>
.btns {
	margin: 24px 0;
	display: flex;
	gap: 12px;
}
</style>
