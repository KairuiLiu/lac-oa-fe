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
import { Pie, measureTextWidth } from '@antv/g2plot';
import ChatText from '../../../../components/ChatText.vue';

const props = defineProps<{
	data: { totle: number; detail: any[] };
}>();

const data = toRaw(props.data);

let pie: Pie;

function renderStatistic(containerWidth: any, text: any, style: any) {
	const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
	const R = containerWidth / 2;
	// r^2 = (w / 2)^2 + (h - offsetY)^2
	let scale = 1;
	if (containerWidth < textWidth) {
		scale = Math.min(Math.sqrt(Math.abs(R ** 2 / ((textWidth / 2) ** 2 + textHeight ** 2))), 1);
	}
	const textStyleStr = `width:${containerWidth}px;`;
	return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
}

onMounted(() => {
	pie = new Pie('ChartTaskTypeContainer', {
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
	name: 'ChartTaskType',
};
</script>

<style lang="less" scoped>
.ant-card.card {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: auto;
	/deep/ .ant-card-head {
		flex-shrink: 0;
		height: 20%;
	}
	/deep/ .ant-card-body {
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
		flex-shrink: 3;
		width: 19vw;
	}
	.text {
		flex-shrink: 1;
		width: 10vw;
	}
}
</style>
