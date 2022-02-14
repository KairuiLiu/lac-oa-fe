<template>
	<a-card :bordered="false" title="人员概况" class="card">
		<div class="dataWapper">
			<div id="ChartApplyTendContainer1"></div>
			<div id="ChartApplyTendContainer2"></div>
			<div id="ChartApplyTendContainer3"></div>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Bar, Column, Pie } from '@antv/g2plot';

const props = defineProps<{
	data: { userType: any[]; aduitType: any[]; userStat: any };
}>();

const data = ref(props.data);

onMounted(() => {
	const piePlot = new Pie('ChartApplyTendContainer1', {
		data: data.value.userType,
		angleField: 'value',
		colorField: 'type',
	});

	piePlot.render();

	const column = new Column('ChartApplyTendContainer2', {
		data: data.value.aduitType,
		padding: 'auto',
		xField: 'type',
		yField: 'value',
	});
	column.render();

	const bar = new Bar('ChartApplyTendContainer3', {
		data: data.value.userStat,
		padding: 'auto',
		yField: 'type',
		xField: 'value',
	});
	bar.render();
});
</script>

<script lang="ts">
export default {
	name: 'ChartUserInfo',
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
	height: 100%;
	width: 100%;
	display: flex;
	gap: 5%;
	#ChartApplyTendContainer1 {
		width: 18%;
	}
	#ChartApplyTendContainer2 {
		width: 54%;
	}
	#ChartApplyTendContainer3 {
		width: 18%;
	}
}
</style>
