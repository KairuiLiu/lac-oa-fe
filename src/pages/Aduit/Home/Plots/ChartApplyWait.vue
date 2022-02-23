<template>
	<a-card :bordered="false" title="待处理" class="card">
		<div class="dataWapper">
			<ChatText id="text" :text="data.number" suffix="件"></ChatText>
			<div id="ChartApplyWait"></div>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { reactive, onMounted, toRaw } from 'vue';
import { Column } from '@antv/g2plot';
import ChatText from '../../../../components/ChatText.vue';
import { getResentDays } from '../../../../utils/dateTime';

const props = defineProps<{
	data: { number: number; trend: any[] };
}>();

const state = reactive({
	recentDates: getResentDays(7, null, true),
});

const data = toRaw(props.data);
data.trend = data.trend.map((d: number, i: number) => ({
	time: state.recentDates[i],
	value: d,
}));

let column: Column;

onMounted(() => {
	column = new Column('ChartApplyWait', {
		data: data.trend,
		padding: 'auto',
		xField: 'time',
		yField: 'value',
		xAxis: {
			label: {
				formatter: (v: string) => {
					return `${v}日`;
				},
			},
		},
	});
	column.render();
});
</script>

<script lang="ts">
export default {
	name: 'ChartApplyWait',
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
	#ChartApplyWait {
		height: 100%;
		flex-shrink: 3;
		width: 19vw;
	}
	.text {
		flex-shrink: 1;
		width: 10vw;
	}
}
</style>
