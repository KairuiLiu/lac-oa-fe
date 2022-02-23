<template>
	<a-card :bordered="false" title="订单状态" class="card">
		<div class="dataWapper">
			<ChatText id="text" :text="data.totle" suffix="单"></ChatText>
			<div id="ChartOrderState"></div>
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
	pie = new Pie('ChartOrderState', {
		appendPadding: 10,
		data: data.detail,
		angleField: 'value',
		colorField: 'type',
		radius: 1,
		innerRadius: 0.6,
		interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }],
		statistic: {
			title: {
				offsetY: -4,
				customHtml: (container, view, datum) => {
					const { width, height } = container.getBoundingClientRect();
					const d = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2) * 4;
					const text = datum ? datum.type : '总计';
					return renderStatistic(d, text, { fontSize: 16 });
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
	name: 'ChartOrderState',
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
	#ChartOrderState {
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
