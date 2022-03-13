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
							<a-button v-else type="link" @click="showAddShip(row.id)">去发货</a-button>
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
					<vxe-table border :column-config="{ resizable: true }" :scroll-y="{ enabled: false }" :merge-cells="mergeRows" :data="orderBatch">
						<vxe-column field="id" title="批次"></vxe-column>
						<vxe-column title="商品">
							<template #default="{ row }">
								<p>{{ row.name }}</p>
								<p class="describ">规格: {{ row.number }}*{{ row.specification }} 定制化: {{ row.custome }}</p>
							</template>
						</vxe-column>
						<vxe-column title="单价(元)*数量">
							<template #default="{ row }">
								<p>{{ row.price }}*{{ row.number }}</p>
							</template></vxe-column
						>
						<vxe-column field="bchPrice" title="小计(元)"></vxe-column>
						<vxe-column field="totleDiscount" title="优惠(元)"></vxe-column>
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
	<a-modal v-model:visible="state.toShip.visible" title="发货信息">
		<template #footer>
			<a-button key="back" :disabled="state.toShip.loading" @click="handleClose">返回</a-button>
			<a-button key="submit" type="primary" :loading="state.toShip.loading" @click="handleSubmit">提交</a-button>
		</template>
		<a-form :model="state.toShip.data" name="shipInfo" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
			<a-form-item label="配送方式" name="methods">
				<a-radio-group v-model:value="state.toShip.data.selfShip">
					<a-radio-button :value="false">物流公司配送</a-radio-button>
					<a-radio-button :value="true">自行配送</a-radio-button>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="运输公司" name="company">
				<a-select v-model:value="state.toShip.data.company" :disabled="state.toShip.data.selfShip" :options="state.toShip.comps"> </a-select>
			</a-form-item>
			<a-form-item label="运单号" name="shipId">
				<a-input v-model:value="state.toShip.data.shipId" :disabled="state.toShip.data.selfShip" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { ref, defineComponent, onBeforeMount, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { supportApi } from '../../../api';
import router from '../../../router';
import { IAjaxRestlt } from '../../../types/common';

const route = useRoute();
const store = useStore();

const state = reactive({
	orderId: route.params.orderId as string,
	orderInfo: {},
	shipDetail: null,
	toShip: {
		visible: false,
		loading: false,
		comps: computed(() => {
			return store.state.support.shipComps ? store.state.support.shipComps.map(d => ({ value: d.id, label: d.name })) : [];
		}),
		data: {
			batch: '',
			shipId: '',
			company: '',
			selfShip: true,
		},
	},
});

const orderBatch = computed(() => {
	if (!state.orderInfo?.orderBatch) return [];
	const res = [];
	let cnt = 0;
	state.orderInfo.orderBatch.forEach(bch => {
		const t = bch.goods.map(d => ({
			...d,
			id: bch.id,
			bchPrice: bch.totlePrice,
			totleDiscount: state.orderInfo.totleDiscount,
			// eslint-disable-next-line
			merge: { row: cnt++, rowspan: 0 },
		}));
		t[0].merge.rowspan = t.length;
		res.push(...t);
	});
	return res;
});

const mergeRows = computed(() => {
	const res = [];
	// eslint-disable-next-line
	for (let i = orderBatch.value.length - 1; i >= 0; i--) {
		res.push({ ...orderBatch.value[i].merge, colspan: 1, col: 0 });
		res.push({ ...orderBatch.value[i].merge, colspan: 1, col: 3 });
		res.push({ ...orderBatch.value[i].merge, rowspan: 0, colspan: 1, col: 4 });
	}
	res.push({ row: 0, rowspan: orderBatch.value.length, colspan: 1, col: 4 });
	return res;
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

function showAddShip(id) {
	state.toShip.data.batch = id;
	state.toShip.visible = true;
}

function handleClose() {
	state.toShip.data.company = '';
	state.toShip.data.shipId = '';
	state.toShip.visible = false;
}

async function handleSubmit() {
	if (!state.toShip.data.selfShip && (state.toShip.data.shipId.trim() === '' || state.toShip.data.company === '')) {
		message.error('请选择配送公司并输入运单号');
		return;
	}
	state.toShip.loading = true;
	const res = (await supportApi.reqAddShipId({
		token: '123',
		shipInfo: {
			orderId: state.orderId,
			...state.toShip.data,
		},
	})) as IAjaxRestlt;
	state.toShip.loading = false;
	if (!res.code) {
		message.success('添加成功');
		router.go(0);
	} else {
		message.error('添加失败');
	}
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
	// min-width: 960px;
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

.ship-info .content {
	overflow-x: auto;
	width: 100%;
}
</style>
