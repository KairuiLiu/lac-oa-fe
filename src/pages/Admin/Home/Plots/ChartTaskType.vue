<template>
	<a-card :bordered="false" title="任务类型" class="card">
		<div class="dataWapper">
			<ChatText id="text" :text="data.totle" suffix="件"></ChatText>
			<div id="ChartTaskTypeContainer"></div>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { onMounted, toRaw } from 'vue';
import { Pie } from '@antv/g2plot';
import ChatText from '../../../../components/ChatText.vue';

import { renderStatistic } from '../../../../utils/pieChartRender';

const props = defineProps<{
	data: { totle: number; detail: any[] };
}>();

const data = toRaw(props.data);

let pie: Pie;

onMounted(() => {
	pie = new Pie('ChartTaskTypeContainer', {
		appendPadding: 0,
		data: data.detail,
		angleField: 'value',
		colorField: 'type',
		radius: 1,
		innerRadius: 0.65,
		interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }],
		statistic: {
			title: {
				offsetY: -4,
				style: {
					fontSize: '16px',
				},
				customHtml: (container, view, datum) => {
					const { width, height } = container.getBoundingClientRect();
					const d = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2) * 4;
					const text = datum ? datum.type : '总计';
					return renderStatistic(d, text, { fontSize: 20 });
				},
			},
			content: {
				offsetY: 4,
				style: {
					fontSize: '14px',
				},
				customHtml: (container, view, datum, data) => {
					const { width } = container.getBoundingClientRect();

					const text = datum ? `${datum.value}件` : `${data?.reduce((r, d) => r + d.value, 0)}件`;
					return renderStatistic(width, text, { fontSize: 14 });
				},
			},
		},
	});
	pie.render();
});
</script>

<script lang="ts">
export default {
	name: 'ChartTaskType',
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
	#ChartTaskTypeContainer {
		height: 100%;
	}
	.text {
		flex-shrink: 1;
		width: 10vw;
	}
}
</style>
