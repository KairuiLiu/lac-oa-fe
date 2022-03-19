<template>
	<a-card :bordered="false" title="申请总数" class="card">
		<template #extra>
			<a-switch v-model:checked="state.showMonth" checked-children="本月" un-checked-children="本年" />
		</template>
		<div class="dataWapper">
			<ChatText id="text" :text="curData.number" suffix="件"></ChatText>
			<div id="ChartTotleApplyContainer"></div>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { Column } from '@antv/g2plot';
import ChatText from '../../../../components/ChatText.vue';
import { getResentDays, getResentMonths } from '../../../../utils/dateTime';

const props = defineProps<{
	data: { month: any; year: any };
}>();

const state = reactive({
	showMonth: true,
	recentDates: getResentDays(7, null, true),
	recentmonths: getResentMonths(7, null, true),
});

const data = toRaw(props.data);
data.month.trend = data.month.trend.map((d: number, i: number) => ({
	time: state.recentDates[i],
	value: d,
}));
data.year.trend = data.year.trend.map((d: number, i: number) => ({
	time: state.recentmonths[i],
	value: d,
}));
const curData = computed(() => (state.showMonth ? data?.month : data?.year));

let column: Column;
watch(
	() => state.showMonth,
	() => {
		column.changeData(curData.value.trend);
		column.update({
			xAxis: {
				label: {
					formatter: (v: string) => {
						if (state.showMonth) return `${v}`;
						return `${v}月`;
					},
				},
			},
		});
	}
);

onMounted(() => {
	column = new Column('ChartTotleApplyContainer', {
		data: curData.value.trend,
		padding: 'auto',
		xField: 'time',
		yField: 'value',
		xAxis: {
			label: {
				formatter: (v: string) => {
					return `${v}`;
				},
			},
		},
	});
	column.render();
});
</script>

<script lang="ts">
export default {
	name: 'ChartTotleWork',
};
</script>

<style lang="less" scoped>
.ant-card.card {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: auto;
	:deep(.ant-card-head) {
		flex-shrink: 0;
		height: 20%;
	}
	:deep(.ant-card-body) {
		flex-shrink: 1;
		height: 80%;
	}
}

.dataWapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	overflow: hidden;
	#ChartTotleApplyContainer {
		height: 100%;
		flex-shrink: 3;
		// width: 19vw;
	}
	.text {
		flex-shrink: 1;
		width: 10vw;
	}
}
</style>
