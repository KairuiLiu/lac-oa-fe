<template>
	<a-card :bordered="false" title="申请总数" class="card">
		<template #extra>
			<a-switch v-model:checked="stat.showMonth" checked-children="本月" un-checked-children="本年" />
		</template>
		<ChatText :text="12" suffix="件"></ChatText>
		<div id="container"></div>
	</a-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Line } from '@antv/g2plot';
import ChatText from '../../../../components/ChatText.vue';

const stat = reactive({
	showMonth: true,
});

const line = new Line('container', {
	data: [
		{ year: '1991', value: 3 },
		{ year: '1992', value: 4 },
		{ year: '1993', value: 3.5 },
		{ year: '1994', value: 5 },
		{ year: '1995', value: 4.9 },
		{ year: '1996', value: 6 },
		{ year: '1997', value: 7 },
		{ year: '1998', value: 9 },
		{ year: '1999', value: 13 },
	],
	xField: 'year',
	yField: 'value',
});

line.render();
</script>

<script lang="ts">
export default {
	name: 'ChartTotleApply',
};
</script>

<style lang="less" scoped>
.card {
	height: 100%;
}
</style>
