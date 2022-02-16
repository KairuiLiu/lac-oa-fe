<template>
	<a-card :bordered="false" title="申请类型" class="card">
		<template #extra>
			<a-switch v-model:checked="state.showDone" checked-children="已完成" un-checked-children="未完成" />
		</template>
		<div class="dataWapper">
			<div id="ChartApplyTypeContainer"></div>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { Pie, G2 } from '@antv/g2plot';

import { renderStatistic } from '../../../../utils/pieChartRender';

const G = G2.getEngine('canvas');

const props = defineProps<{
	data: { done: any[]; doing: any[] };
}>();

const state = reactive({
	showDone: true,
});

const data = toRaw(props.data);

const curData = computed(() => (state.showDone ? data?.done : data?.doing));

let pie: Pie;
watch(
	() => state.showDone,
	() => {
		pie.changeData(curData.value);
	}
);

onMounted(() => {
	pie = new Pie('ChartApplyTypeContainer', {
		appendPadding: 20,
		data: curData.value,
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
						text: `${data.value}件`,
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
	name: 'ChartApplyType',
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
	/deep/ #ChartApplyTypeContainer {
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
