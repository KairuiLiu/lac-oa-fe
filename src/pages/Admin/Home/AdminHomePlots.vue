<template>
	<section class="PlotsArea">
		<div id="plot-1" class="plot-card totle-apply">
			<ChartTotleApply v-if="sysData.tottleApply" :data="sysData.tottleApply"></ChartTotleApply>
		</div>
		<div id="plot-2" class="plot-card task-type">
			<ChartTaskType v-if="sysData.taskType" :data="sysData.taskType"></ChartTaskType>
		</div>
		<div id="plot-3" class="plot-card totle-worked">
			<ChartTotleWork v-if="sysData.totleWork" :data="sysData.totleWork"></ChartTotleWork>
		</div>
		<div id="plot-4" class="plot-card animal-ethic">
			<ChartAnimalEthic v-if="sysData.ethicsAnimal" :data="sysData.ethicsAnimal"></ChartAnimalEthic>
		</div>
		<div id="plot-5" class="plot-card animal-buy">
			<ChartAnimalBuy v-if="sysData.buyAnimal" :data="sysData.buyAnimal"></ChartAnimalBuy>
		</div>
		<div id="plot-6" class="plot-card animal-lib">
			<ChartAnimalLib v-if="sysData.expAnimal" :data="sysData.expAnimal"></ChartAnimalLib>
		</div>
		<div id="plot-7" class="plot-card apply-tend">
			<ChartApplyTend v-if="sysData.newApply" :data="sysData.newApply"></ChartApplyTend>
		</div>
		<div id="plot-8" class="plot-card reply-list">
			<ListApplyNotify v-if="sysData.applyNotify" :data="sysData.applyNotify"></ListApplyNotify>
		</div>
		<div id="plot-9" class="plot-card apply-type">
			<ChartApplyType v-if="sysData.applyType" :data="sysData.applyType"></ChartApplyType>
		</div>
		<div id="plot-10" class="plot-card apply-prop">
			<ChartApplyProp v-if="sysData.applyProp" :data="sysData.applyProp"></ChartApplyProp>
		</div>
		<div id="plot-11" class="plot-card apply-undo">
			<ListDoingApplyType v-if="sysData.doingApplyType" :data="sysData.doingApplyType"></ListDoingApplyType>
		</div>
		<div id="plot-12" class="plot-card apply-logs">
			<ListApplyLogs v-if="sysData.operateInfo" :data="sysData.operateInfo"></ListApplyLogs>
		</div>
		<div id="plot-13" class="plot-card people-stat">
			<ChartUserInfo v-if="sysData.userInfo" :data="sysData.userInfo"></ChartUserInfo>
		</div>
	</section>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import ChartTotleApply from './Plots/ChartTotleApply.vue';
import ChartTaskType from './Plots/ChartTaskType.vue';
import ChartTotleWork from './Plots/ChartTotleWork.vue';
import ChartAnimalEthic from './Plots/ChartAnimalEthic.vue';
import ChartAnimalBuy from './Plots/ChartAnimalBuy.vue';
import ChartAnimalLib from './Plots/ChartAnimalLib.vue';
import ChartApplyTend from './Plots/ChartApplyTend.vue';
import ListApplyNotify from './Plots/ListApplyNotify.vue';
import ChartApplyType from './Plots/ChartApplyType.vue';
import ChartApplyProp from './Plots/ChartApplyProp.vue';
import ListDoingApplyType from './Plots/ListDoingApplyType.vue';
import ListApplyLogs from './Plots/ListApplyLogs.vue';
import ChartUserInfo from './Plots/ChartUserInfo.vue';

const store = useStore();

const sysData = ref({});
onMounted(async () => {
	const res = await store.dispatch('admin/getSysData');
	if (res) {
		sysData.value = store.state.admin.sysData;
	} else {
		message.error('获取数据失败');
	}
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminHomePlots',
});
</script>

<style scoped lang="less">
.PlotsArea {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(8, 20vh);
	grid-gap: 2vw;
	grid-auto-rows: 10vw;
	grid-auto-columns: 1fr;
	grid-template-areas:
		'a b c'
		'd e f'
		'd e f'
		'g g h'
		'g g h'
		'i j k'
		'i j l'
		'm m l';
}

.cell {
	background-color: #bfa;
	width: 100%;
	height: 10vw;
}
#plot-1 {
	grid-area: a;
}
#plot-2 {
	grid-area: b;
}
#plot-3 {
	grid-area: c;
}
#plot-4 {
	grid-area: d;
}
#plot-5 {
	grid-area: e;
}
#plot-6 {
	grid-area: f;
}
#plot-7 {
	grid-area: g;
}
#plot-8 {
	grid-area: h;
}
#plot-9 {
	grid-area: i;
}
#plot-10 {
	grid-area: j;
}
#plot-11 {
	grid-area: k;
}
#plot-12 {
	grid-area: l;
}
#plot-13 {
	grid-area: m;
}

.plot-card {
	background-color: #fff;
	border-radius: 1vw;
	box-shadow: 0 0 0.6vw rgba(0, 0, 0, 0.2);
	overflow: hidden;
}
</style>
