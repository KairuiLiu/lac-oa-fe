<template>
	<div class="wapper">
		<div class="searchBar">
			<div class="l">
				<a-button type="primary" @click="toBack"> <rollback-outlined />返回 </a-button>
			</div>
			<div class="r">
				<a-form :model="state.search" name="goodSearch" autocomplete="off">
					<div class="form-row">
						<a-form-item label="商品名称" name="shopName">
							<a-input v-model:value="state.search.shopName" />
						</a-form-item>
						<a-form-item label="商家名称" name="sellerName">
							<a-input v-model:value="state.search.compName" />
						</a-form-item>
						<a-form-item :wrapper-col="{ span: 4 }">
							<a-button type="primary" html-type="submit" @click="handleSearch"><search-outlined />搜索</a-button>
						</a-form-item>
					</div>
				</a-form>
			</div>
		</div>
		<div class="goodsList" :scroll-y="{ enabled: true }">
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
						<a-button type="primary" @click="useLicense(row.goodLicense)"><check-outlined />使用许可证</a-button>
					</div>
				</template>
				<template #detail="{ row }">
					<div class="btns">
						<a-button type="link" @click="toDetail(row.goodId)">{{ row.goodName }}</a-button>
					</div>
				</template>
			</vxe-grid>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, defineComponent, reactive } from 'vue';
import { RollbackOutlined, CheckOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { VxeGridProps, VxePagerEvents, VxeTableInstance } from 'vxe-table';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { applicantApi } from '../../../../api';
import { IAjaxRestlt } from '../../../../types/common';
import { goodFormate } from '../../../../utils/goodTypes';
import store from '../../../../store';

const router = useRouter();
const route = useRoute();

const state = reactive({
	search: {
		shopName: '',
		compName: '',
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
		{ field: 'goodId', title: '商品编号' },
		{ title: '商品名称', slots: { default: 'detail' } },
		{ field: 'compName', title: '公司名称' },
		{ field: 'goodPrice', title: '价格与运费', formatter: goodFormate.formatPrice },
		{ field: 'goodStock', title: '库存状态' },
		{ field: 'goodLicense', title: '许可证号' },
		{ field: 'goodStock', title: '库存状态' },
		{ title: '操作', slots: { default: 'operate' }, fixed: 'right' },
	],
});

const findList = async (condition = null) => {
	if (!condition) condition = {};
	gridOptions.loading = true;
	const res = (await applicantApi.reqGoodList({ token: '123', pageId: tablePage.currentPage, pageSize: tablePage.pageSize, condition })) as IAjaxRestlt;
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

function handleSearch() {
	searchEvent(state.search);
}

function toBack() {
	router.back();
}

function useLicense(license) {
	store.dispatch('apply/addLicense', { animalId: route.params.animalId, license });
	router.back();
}

function toDetail(id) {}

searchEvent();
</script>

<script lang="ts">
export default defineComponent({
	name: 'GoodChoose',
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

.wapper {
	padding: 3vh 5vw;
}

.goodsList {
	overflow-x: auto;
	width: 100%;
}
</style>
