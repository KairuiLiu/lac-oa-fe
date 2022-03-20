<template>
	<div class="wapper">
		<div class="searchBox">
			<div class="search">
				<a-form :model="state.search.condition" name="basic" autocomplete="off">
					<a-input-search v-model:value="state.search.condition.title" placeholder="搜索内容" enter-button="搜索" size="large" @search="handleSearch" />
					<a-form-item label="年度" name="year" :style="{ marginTop: '24px' }">
						<a-radio-group v-model:value="state.search.condition.year" option-type="button" :options="state.search.options.year" />
					</a-form-item>
					<a-form-item label="类型" name="type">
						<a-radio-group v-model:value="state.search.condition.type" option-type="button" :options="state.search.options.type" />
					</a-form-item>
					<a-form-item label="状态" name="state">
						<a-radio-group v-model:value="state.search.condition.state" option-type="button" :options="state.search.options.state" />
					</a-form-item>
				</a-form>
			</div>
			<div class="btns"></div>
		</div>

		<div class="plots">
			<div id="aduit-plot-1" class="plot-card">
				<ChartApply v-if="state.plots.totleApply" :data="state.plots.totleApply"></ChartApply>
			</div>
			<div id="aduit-plot-2" class="plot-card">
				<ChartApplyRes v-if="state.plots.applyRes" :data="state.plots.applyRes"></ChartApplyRes>
			</div>
			<div id="aduit-plot-3" class="plot-card">
				<ChartApplyWait v-if="state.plots.applyWait" :data="state.plots.applyWait"></ChartApplyWait>
			</div>
			<div id="aduit-plot-4" class="plot-card">
				<ChartWorkRank v-if="state.plots.workRank" :data="state.plots.workRank"></ChartWorkRank>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { aduitApi } from '../../../api/index';
import router from '../../../router';
import { IAjaxRestlt } from '../../../types/common';
import ChartApply from './Plots/ChartApply.vue';
import ChartApplyWait from './Plots/ChartApplyWait.vue';
import ChartWorkRank from './Plots/ChartWorkRank.vue';
import ChartApplyRes from './Plots/ChartApplyRes.vue';

const state = reactive({
	search: {
		options: {
			year: [{ label: '不限', value: 'all' }],
			type: [
				{ label: '伦理审核', value: 'ethic' },
				{ label: '采购申请', value: 'buy' },
				{ label: '不限', value: 'all' },
			],
			state: [
				{ label: '通过', value: 'pass' },
				{ label: '不通过', value: 'notpass' },
				{ label: '待审核', value: 'wait' },
				{ label: '不限', value: 'all' },
			],
		},
		condition: {
			title: '',
			year: 'all',
			type: 'all',
			state: 'all',
		},
	},
	plots: ref({}),
});

function handleSearch() {
	router.push({
		path: '/aduit/works',
		query: {
			...state.search.condition,
		},
	});
}

onMounted(async () => {
	const res = (await aduitApi.reqAduitSysDate({ token: '123' })) as IAjaxRestlt;
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
	name: 'AduitHome',
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
		grid-gap: 4vw;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(4, 250px);
		grid-template-areas:
			'a'
			'b'
			'c'
			'd';
		#aduit-plot-1 {
			grid-area: a;
		}
		#aduit-plot-2 {
			grid-area: b;
		}
		#aduit-plot-3 {
			grid-area: c;
		}
		#aduit-plot-4 {
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
