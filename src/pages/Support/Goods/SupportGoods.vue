<template>
	<a-tabs v-model:activeKey="state.curType" @change="handleTabChange">
		<a-tab-pane key="all">
			<template #tab>
				<span>
					<shop-outlined />
					全部商品
				</span>
			</template>
		</a-tab-pane>
		<a-tab-pane key="enable">
			<template #tab>
				<span>
					<check-circle-outlined />
					上架商品
				</span>
			</template>
		</a-tab-pane>
		<a-tab-pane key="disable">
			<template #tab>
				<span>
					<close-circle-outlined />
					下架商品
				</span>
			</template>
		</a-tab-pane>
		<a-tab-pane key="bin">
			<template #tab>
				<span>
					<delete-outlined />
					商品回收站
				</span>
			</template>
		</a-tab-pane>
	</a-tabs>
	<div class="searchBar">
		<div class="l">
			<a-button type="primary" style="margin-right: 15px" @click="toShowEdit('-1')"><plus-circle-filled />添加商品</a-button>
			<a-popconfirm title="确定删除商品?" ok-text="确定" cancel-text="取消" @confirm="handleDelGood(getGoodsId())">
				<a-button type="primary" danger><delete-filled />批量删除</a-button>
			</a-popconfirm>
		</div>
		<div class="r">
			<a-form :model="state.search" name="goodSearch" autocomplete="off">
				<div class="form-row">
					<a-row>
						<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
							<a-form-item label="商品名称" name="shopName">
								<a-input v-model:value="state.search.shopName" />
							</a-form-item>
						</a-col>
						<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="16">
							<a-form-item label="添加时间" name="addTime">
								<a-range-picker v-model:value="state.search.addTime" show-time :locale="locale" />
							</a-form-item>
						</a-col>
					</a-row>

					<a-form-item :wrapper-col="{ span: 4 }">
						<a-button type="primary" html-type="submit" @click="handleSearch"><search-outlined />搜索</a-button>
					</a-form-item>
				</div>
			</a-form>
		</div>
	</div>
	<div class="goodsList">
		<vxe-grid ref="goodsTable" v-bind="gridOptions" class="table">
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
				<div class="btns">
					<a-button type="primary" @click="toShowEdit(row.goodId)"><edit-filled /></a-button>
					<a-popconfirm title="确定删除商品?" ok-text="确定" cancel-text="取消" @confirm="handleDelGood([row.goodId])">
						<a-button type="primary" danger><delete-filled /></a-button>
					</a-popconfirm>
					<a-button @click="toShowLog(row.goodId)"><profile-filled /></a-button>
				</div>
			</template>
		</vxe-grid>
	</div>
	<a-modal v-model:visible="state.modalLog.visible" title="商品日志" cancel-text="取消">
		<div v-if="state.modalLog.loading" class="loading"><a-spin /></div>
		<div v-else class="logcontent">
			<a-list bordered :data-source="state.modalLog.data" :pagination="5">
				<template #renderItem="{ item }">
					<a-list-item>{{ item }}</a-list-item>
				</template>
			</a-list>
		</div>
		<template #footer>
			<a-button key="back" @click="state.modalLog.visible = false">返回</a-button>
		</template>
	</a-modal>
	<GoodEditModal :support-id="state.supportId" :visible="state.modalEdit.visible" :good-id="state.modalEdit.goodId" @cancel="handleEditCancel"></GoodEditModal>
</template>

<script setup lang="ts">
import { ref, defineComponent, reactive } from 'vue';
import { EditFilled, ProfileFilled, SearchOutlined, CheckCircleOutlined, DeleteOutlined, ShopOutlined, CloseCircleOutlined, DeleteFilled, PlusCircleFilled } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { VxeGridProps, VxePagerEvents, VxeTableInstance } from 'vxe-table';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { supportApi } from '../../../api';
import { IAjaxRestlt } from '../../../types/common';
import { goodFormate } from '../../../utils/goodTypes';
import GoodEditModal from './GoodEditModal.vue';

dayjs.locale('zh-cn');
type RangeValue = [Dayjs, Dayjs];

const route = useRoute();
const router = useRouter();

const state = reactive({
	curType: 'all',
	search: {
		shopName: '',
		addTime: ref<RangeValue>(),
	},
	supportId: route.params.supportId as string,
	modalEdit: {
		visible: false,
		goodId: '',
	},
	modalLog: {
		visible: false,
		loading: false,
		data: '',
	},
});

const tablePage = reactive({
	total: 0,
	currentPage: 1,
	pageSize: 10,
});

const goodsTable = ref({} as VxeTableInstance);

const gridOptions = reactive<VxeGridProps>({
	border: false,
	resizable: true,
	loading: false,
	data: [],
	columns: [
		{ type: 'checkbox', width: 40 },
		{ field: 'goodId', title: '商品编号' },
		{ field: 'goodName', title: '商品名称' },
		{ field: 'goodPrice', title: '价格与运费', formatter: goodFormate.formatPrice },
		{ field: 'goodAduit', title: '审核状态', formatter: goodFormate.formatAduit },
		{ field: 'goodEnable', title: '上架', formatter: goodFormate.formatEnable },
		{ field: 'goodStock', title: '库存状态' },
		{ field: 'goodAddTime', title: '加入时间' },
		{ title: '操作', slots: { default: 'operate' }, width: 300 },
	],
});

const findList = async (condition = null) => {
	if (!condition) condition = {};
	condition = { ...condition, type: state.curType };
	gridOptions.loading = true;
	const res = (await supportApi.reqGoodList({ token: '123', pageId: tablePage.currentPage, pageSize: tablePage.pageSize, condition, supportId: state.supportId })) as IAjaxRestlt;
	if (res.code) {
		message.error('数据请求失败');
	} else {
		gridOptions.loading = false;
		tablePage.total = 100; // res.data.totle;
		gridOptions.data = res as unknown as any[]; // .data.data;
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

function getGoodsId() {
	const $table = goodsTable.value;
	const selectRecords = $table.getCheckboxRecords();
	return selectRecords.map(d => d.goodId);
}

function handleSearch() {
	searchEvent(state.search);
}

function handleTabChange(a) {
	searchEvent();
}

searchEvent();

async function handleDelGood(goodIds) {
	if (goodIds.length === 0) {
		message.error('请选择要删除的商品');
		return;
	}
	const res = (await supportApi.reqDelGood({ token: '213', supportId: state.supportId, goodIds })) as IAjaxRestlt;
	if (res.code) {
		message.error('删除失败');
		return;
	}
	message.success('删除成功');
	router.go(0);
}

function toShowEdit(goodId) {
	state.modalEdit.goodId = goodId;
	state.modalEdit.visible = true;
}

function toShowLog(goodId) {
	state.modalLog.loading = true;
	state.modalLog.visible = true;
	handleLog(goodId);
}

async function handleLog(goodId) {
	const res = (await supportApi.reqGoodLog({ token: '213', supportId: state.supportId, goodId })) as IAjaxRestlt;
	if (res.code) {
		message.error('数据请求失败');
	}
	state.modalLog.loading = false;
	state.modalLog.data = res as unknown as string; // .data;
}

function handleEditCancel() {
	state.modalEdit.visible = false;
}
</script>

<script lang="ts">
export default defineComponent({
	name: 'SupportGoods',
});
</script>

<style lang="less" scoped>
.searchBar {
	display: flex;
	justify-content: space-between;
	.form-row {
		display: flex;
		gap: 12px;
	}
}
.btns {
	display: flex;
	gap: 14px;
}

.loading {
	display: flex;
	justify-content: center;
}

.goodsList {
	overflow-x: auto;
	width: 100%;
}
</style>
