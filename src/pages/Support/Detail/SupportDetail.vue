<template>
	<div class="wapper">
		<div v-if="state.orderInfo.getTime" class="order-date">
			<div class="get">
				<span>下单时间</span><br />
				<span>{{ state.orderInfo?.getTime }}</span>
			</div>
			<div class="ship">
				<span>发货时间</span><br />
				<span>{{ state.orderInfo?.shipTime }}</span>
			</div>
		</div>
		<div class="state">当前订单状态: {{ state.orderInfo?.orderState }}</div>
		<div class="infocontent">
			<div class="customer-info">
				<div class="title">买家信息</div>
				<div class="content">
					<div class="user-name">用户昵称: {{ state.orderInfo?.userName }}</div>
					<div class="pay-method">支付方式: {{ state.orderInfo?.payMethod }}</div>
					<div class="address">收货地址: {{ state.orderInfo?.orderAddress }}</div>
				</div>
			</div>
			<div class="ship-info">
				<div class="title">物流信息</div>
				<div class="content">
					<vxe-grid v-bind="shipInfoColumns" class="table">
						<template #operate="{ row }">
							<a-button v-if="row.shipNumber !== '暂无'" type="link" @click="showShipDetai(row.shipNumber)">查看详情</a-button>
							<a-button v-else type="link">去发货</a-button>
						</template>
					</vxe-grid>
				</div>
			</div>
			<div class="ship-detail">
				<div class="title">物流动态</div>
				<div class="content">
					<p v-if="!state.shipDetail">{{ state.orderInfo.orderState }}</p>
					<p v-for="(item, index) in state.shipDetail" v-else :key="index">{{ item }}</p>
				</div>
			</div>
			<div class="order-info">
				<div class="title">订单信息</div>
				<div class="content">
					<vxe-table border height="300" :column-config="{ resizable: true }" :scroll-y="{ enabled: false }" :span-method="mergeRowMethod" :data="state.orderInfo.orderBatch">
						<vxe-column type="seq"></vxe-column>
						<vxe-column field="key" title="Key"></vxe-column>
						<vxe-column field="content" title="Translate"></vxe-column>
					</vxe-table>
				</div>
			</div>
			<div class="price-info">
				<span>订单商品金额: {{ state.orderInfo?.totleGoodsPrice }}元</span>
				<span>订单配送费: {{ state.orderInfo?.shipPrice }}元</span>
				<span>订单优惠金额: {{ state.orderInfo?.totleDiscount }}元</span>
				<span>订单总价: {{ state.orderInfo?.finalPrice }}元</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { ref, defineComponent, onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { VxeTablePropTypes } from 'vxe-table';
import { supportApi } from '../../../api';
import { IAjaxRestlt } from '../../../types/common';

const route = useRoute();

const state = reactive({
	orderId: route.params.orderId as string,
	orderInfo: {},
	shipDetail: null,
});

const shipInfoColumns = reactive({
	border: false,
	resizable: true,
	loading: false,
	data: ref([]),
	columns: [
		{ title: '批次', field: 'id' },
		{ title: '客户期望送达时间', field: 'expDate' },
		{ title: '承运商', field: 'shipComp' },
		{ title: '单号', field: 'shipNumber' },
		{ title: '发货时间', field: 'deliveryTime' },
		{ title: '操作', slots: { default: 'operate' }, fixed: 'right', showOverflow: false },
	],
});

async function showShipDetai(id) {
	const res = (await supportApi.reqShipDetail({ token: '123', shipNumber: id })) as IAjaxRestlt;
	if (res.code) {
		message.error('物流信息请求失败');
	} else {
		state.shipDetail = res.data;
	}
}

function mergeRowMethod({ row, _rowIndex, column, visibleData }): VxeTablePropTypes.SpanMethod {
	// const fields = ['key'];
	// const cellValue = row[column.property];
	// if (cellValue && fields.includes(column.property)) {
	// 	const prevRow = visibleData[_rowIndex - 1];
	// 	let nextRow = visibleData[_rowIndex + 1];
	// 	if (prevRow && prevRow[column.property] === cellValue) {
	// 		return { rowspan: 0, colspan: 0 };
	// 	}
	// 	let countRowspan = 1;
	// 	while (nextRow && nextRow[column.property] === cellValue) {
	// 		nextRow = visibleData[++countRowspan + _rowIndex];
	// 	}
	// 	if (countRowspan > 1) {
	// 		return { rowspan: countRowspan, colspan: 1 };
	// 	}
	// }
}

onBeforeMount(async () => {
	const res = (await supportApi.reqOrderDetail({ token: '123', orderId: state.orderId })) as IAjaxRestlt;
	if (res.code) {
		message.error('获取订单信息失败');
	} else {
		state.orderInfo = res.data;
		shipInfoColumns.data = res.data.shipInfo;
	}
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'SupportDetail',
});
</script>

<style lang="less" scoped>
.wapper {
	min-width: 960px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	.order-date {
		display: flex;
		gap: 24px;
	}
	.state {
		padding: 16px;
		border: #dfdfdf 2px solid;
		background-color: #fff;
	}
	.infocontent {
		padding: 16px;
		border: #dfdfdf 2px solid;
		background-color: #fff;
		.title {
			border-bottom: #dfdfdf 2px solid;
		}
		.content {
			padding: 16px;
		}
		.price-info {
			display: flex;
			flex-direction: column;
			text-align: right;
		}
		.ship-detail .content {
			margin: 14px;
			border: #dfdfdf 2px solid;
			background-color: #f0f2f5;
		}
	}
}
</style>
