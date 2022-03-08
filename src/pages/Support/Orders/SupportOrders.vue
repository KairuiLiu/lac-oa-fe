<template>
	<div class="wapper">
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
			<template #goods="{ row }">
				<div v-html="row.goodsDetail"></div>
			</template>
			<template #operate="{ row }">
				{{ row.orderStat }}
				<a-button type="link" @click="toDetail(row.oid)">订单详情</a-button>
			</template>
		</vxe-grid>
	</div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { VxeGridProps, VxePagerEvents } from 'vxe-table';
import { supportApi } from '../../../api';
import { IAjaxRestlt } from '../../../types/common';

const router = useRouter();
const route = useRoute();

const state = reactive({
	orderData: [],
});

const tablePage = reactive({
	total: 0,
	currentPage: 1,
	pageSize: 3,
});

const orderDataFormate = computed(() => {
	const res = [];
	let cnt = 0;
	state.orderData.forEach(ord => {
		res.push({
			id: `订单编号:${ord.id} 下单时间:${ord.getTime}`,
			// eslint-disable-next-line
			merge: { row: cnt++, rowspan: 1, colspan: 7, col: 0 },
		});
		ord.orderBatch.forEach((bch, idx) => {
			res.push({
				id: bch.id,
				oid: ord.id,
				goodsDetail: bch.goods.reduce((pre, cur) => `${pre} ${cur.name}${cur.custome ? '[定]' : ''}*${cur.number}*${cur.specification} <br/>`, ''),
				shipState: bch.shipState,
				expDate: bch.expDate,
				orderAddress: ord.orderAddress,
				finalPrice: ord.finalPrice,
				orderStat: ord.orderState,
				// eslint-disable-next-line
				merge: { row: cnt++, rowspan: idx === 0 ? ord.orderBatch.length : 0, colspan: 1 },
			});
		});
	});
	return res;
});

const mergeRows = computed(() => {
	const res = [];
	// eslint-disable-next-line
	for (let i = orderDataFormate.value.length - 1; i >= 0; i--) {
		if (orderDataFormate.value[i].oid === undefined) {
			res.push(orderDataFormate.value[i].merge);
		} else {
			res.push({ ...orderDataFormate.value[i].merge, col: 4 });
			res.push({ ...orderDataFormate.value[i].merge, col: 5 });
			res.push({ ...orderDataFormate.value[i].merge, col: 6 });
		}
	}
	return res;
});

function cellStyle({ row, rowIndex, column, columnIndex }: any) {
	if (row.oid === undefined)
		return {
			backgroundColor: '#e8eaec',
		};
	return {};
}

const gridOptions = reactive<VxeGridProps>({
	border: true,
	resizable: true,
	loading: false,
	data: orderDataFormate as unknown as any[],
	mergeCells: mergeRows as unknown as any[],
	cellStyle,
	columns: [
		{ field: 'id', title: '批次号' },
		{ title: '商品详情', slots: { default: 'goods' } },
		{ field: 'shipState', title: '物流状态' },
		{ field: 'expDate', title: '期望到货日期' },
		{ field: 'orderAddress', title: '收件地址' },
		{ field: 'finalPrice', title: '价格(元)' },
		{ title: '订单状态', slots: { default: 'operate' }, fixed: 'right', showOverflow: false, width: 300 },
	],
});

const findList = async () => {
	gridOptions.loading = true;
	const filter = route.query;
	const res = (await supportApi.reqOrderList({ token: '123', pageId: tablePage.currentPage, pageSize: tablePage.pageSize, filter })) as IAjaxRestlt;
	if (res.code) {
		message.error('数据请求失败');
	} else {
		gridOptions.loading = false;
		tablePage.total = 100; // res.data.totle;
		state.orderData = res as unknown as any[]; // .data.data;
	}
};

const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
	tablePage.currentPage = currentPage;
	tablePage.pageSize = pageSize;
	findList();
};

function toDetail(id) {
	router.push({
		name: 'support-detail',
		params: {
			orderId: id,
		},
	});
}

findList();
</script>

<script lang="ts">
export default defineComponent({
	name: 'SupportOrders',
});
</script>
