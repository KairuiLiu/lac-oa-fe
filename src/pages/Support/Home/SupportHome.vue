<template>
	<div class="wapper">
		<div class="searchBox">
			<div class="search">
				<a-form :model="state.search.condition" name="basic" autocomplete="off">
					<a-input-search v-model:value="state.search.condition.title" placeholder="搜索订单" enter-button="搜索" size="large" @search="handleSearch" />
					<a-form-item label="年度" name="year" :style="{ marginTop: '24px' }">
						<a-radio-group v-model:value="state.search.condition.year" option-type="button" :options="state.search.options.year" />
					</a-form-item>
					<a-form-item label="状态" name="state">
						<a-radio-group v-model:value="state.search.condition.state" option-type="button" :options="state.search.options.state" />
					</a-form-item>
				</a-form>
			</div>
			<div class="btns"></div>
		</div>
		<div class="plots">
			<div id="support-plot-1" class="plot-card">
				<ChartGoods v-if="state.plots.totleGoods" :data="state.plots.totleGoods"></ChartGoods>
			</div>
			<div id="support-plot-2" class="plot-card">
				<ChartOrderState v-if="state.plots.orderState" :data="state.plots.orderState"></ChartOrderState>
			</div>
			<div id="support-plot-3" class="plot-card">
				<ChartOrderWait v-if="state.plots.orderWait" :data="state.plots.orderWait"></ChartOrderWait>
			</div>
			<div id="support-plot-4" class="plot-card">
				<ChartOrderGet v-if="state.plots.orderGet" :data="state.plots.orderGet"></ChartOrderGet>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { supportApi } from '../../../api/index';
import router from '../../../router';
import { IAjaxRestlt } from '../../../types/common';
import ChartGoods from './Plots/ChartGoods.vue';
import ChartOrderWait from './Plots/ChartOrderWait.vue';
import ChartOrderState from './Plots/ChartOrderState.vue';
import ChartOrderGet from './Plots/ChartOrderGet.vue';

const state = reactive({
	search: {
		options: {
			year: [{ label: '不限', value: 'all' }],
			state: [
				{ label: '未发货', value: 'wait' },
				{ label: '已发货', value: 'ship' },
				{ label: '已收货', value: 'saved' },
				{ label: '已完成', value: 'end' },
				{ label: '不限', value: 'all' },
			],
		},
		condition: {
			title: '',
			year: 'all',
			state: 'all',
		},
	},
	plots: ref({}),
});

function handleSearch() {
	router.push({
		path: '/support/orders',
		query: {
			...state.search.condition,
		},
	});
}

onMounted(async () => {
	const res = (await supportApi.reqSupportSysDate({ token: '123' })) as IAjaxRestlt;
	if (res.code) {
		message.error('请求筛选列表失败');
	} else {
		state.search.options.year.unshift(...res.data.searchYears.map(d => ({ label: d, value: d })));
		state.plots = res.data.plots;
	}
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'SupportHome',
});
</script>

<style lang="less" scoped>
.wapper {
	// min-width: 1200px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.searchBox {
		display: flex;
		padding: 3vh 5vw;
		background-color: #fff;
		box-shadow: 0 0 0.6vw rgba(0, 0, 0, 0.2);
		border-radius: 20px;
		.search {
			flex-grow: 1;
		}
	}
	.plots {
		padding: 3vh 0vw;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(4, 250px);
		grid-gap: 4vw;
		grid-template-areas:
			'a'
			'b'
			'c'
			'd';
		#support-plot-1 {
			grid-area: a;
		}
		#support-plot-2 {
			grid-area: b;
		}
		#support-plot-3 {
			grid-area: c;
		}
		#support-plot-4 {
			grid-area: d;
		}
		.plot-card {
			background-color: #fff;
			border-radius: 1vw;
			box-shadow: 0 0 0.6vw rgba(0, 0, 0, 0.2);
			overflow: hidden;
		}
	}

	@media only screen and (min-width: 870px) {
		.plots {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 43%);
			grid-template-areas:
				'a b'
				'c d';
		}
	}
}
</style>
