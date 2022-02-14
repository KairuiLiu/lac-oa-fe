<template>
	<a-card :bordered="false" title="伦理审核动物统计" class="card">
		<template #extra>
			<a-switch v-model:checked="state.showMonth" checked-children="本月" un-checked-children="本年" />
		</template>
		<div class="dataWapper">
			<ChatText id="text" :text="curData.totle" :nobgc="true" suffix="动物总数"></ChatText>
			<div id="ChartAnimalEthicContianer"></div>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { Pie, measureTextWidth, G2 } from '@antv/g2plot';
import ChatText from '../../../../components/ChatText.vue';

const G = G2.getEngine('canvas');

const props = defineProps<{
	data: { month: any; year: any };
}>();

const state = reactive({
	showMonth: true,
});

const data = toRaw(props.data);

const curData = computed(() => (state.showMonth ? data?.month : data?.year));

let pie: Pie;
watch(
	() => state.showMonth,
	() => {
		pie.changeData(curData.value.detail);
	}
);

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
	pie = new Pie('ChartAnimalEthicContianer', {
		appendPadding: 10,
		data: curData.value.detail,
		angleField: 'value',
		colorField: 'type',
		radius: 1,
		// innerRadius: 0.6,
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
		label: {
			type: 'spider',
			labelHeight: 40,
			formatter: (data, mappingData) => {
				const group = new G.Group({});
				group.addShape({
					type: 'circle',
					attrs: {
						x: 0,
						y: 0,
						width: 40,
						height: 50,
						r: 5,
						fill: mappingData.color,
					},
				});
				group.addShape({
					type: 'text',
					attrs: {
						x: 10,
						y: 8,
						text: `${data.type}`,
						fill: mappingData.color,
					},
				});
				group.addShape({
					type: 'text',
					attrs: {
						x: 0,
						y: 25,
						text: `${data.value}只`,
						fill: 'rgba(0, 0, 0, 0.65)',
						fontWeight: 700,
					},
				});
				return group;
			},
		},
	});
	pie.render();
});
</script>

<script lang="ts">
export default {
	name: 'ChartAnimalEthic',
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
		height: 10%;
	}
	/deep/ .ant-card-body {
		flex-shrink: 1;
		height: 90%;
	}
}

.dataWapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	overflow: hidden;
	flex-direction: column;
	/deep/ #ChartAnimalEthicContianer {
		height: 100%;
		flex-shrink: 3;
		width: 100%;
	}
	/deep/ .textBox {
		flex-shrink: 1;
		width: 10vw;
		align-self: flex-start;
		margin-top: -12px;
	}
}
</style>
