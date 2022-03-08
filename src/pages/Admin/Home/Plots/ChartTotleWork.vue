<template>
	<a-card :bordered="false" title="工作量" class="card">
		<template #extra>
			<a-switch v-model:checked="state.showMonth" checked-children="本月" un-checked-children="本年" />
		</template>
		<div class="dataWapper">
			<div id="ChartTotleApply"></div>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { Area } from '@antv/g2plot';
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

let area: Area;
watch(
	() => state.showMonth,
	() => {
		area.changeData(curData.value.trend);
		area.update({
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
	area = new Area('ChartTotleApply', {
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
		yAxis: {
			title: { text: '单位(件)' },
		},
		areaStyle: () => {
			return {
				fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
			};
		},
		smooth: true,
	});
	area.render();
});
</script>

<script lang="ts">
export default {
	name: 'ChartTotleApply',
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
	#ChartTotleApply {
		height: 100%;
		width: 100%;
	}
}
</style>
