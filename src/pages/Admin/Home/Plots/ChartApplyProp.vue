<template>
	<a-card :bordered="false" title="使用目的" class="card">
		<template #extra>
			<a-select ref="select" v-model:value="state.showEthic" style="width: 120px" @focus="focus" @change="handleShowEthic">
				<a-select-option :value="false">伦理申请</a-select-option>
				<a-select-option :value="true">采购申请</a-select-option>
			</a-select>
		</template>
		<div class="dataWapper">
			<div id="ChartApplyPropContainer"></div>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed, toRaw } from 'vue';
import { Radar } from '@antv/g2plot';

const props = defineProps<{
	data: { ethic: any[]; buy: any[] };
}>();

const state = reactive({
	showEthic: true,
});

const data = toRaw(props.data);
const curData = computed(() => (state.showEthic ? data?.ethic : data?.buy));

let radar: Radar;

function handleShowEthic() {
	radar.changeData(curData.value);
}

onMounted(() => {
	radar = new Radar('ChartApplyPropContainer', {
		padding: 50,
		data: curData.value,
		xField: 'type',
		yField: 'value',
		meta: {
			value: {
				min: 0,
				nice: true,
			},
		},
		area: {},
	});
	radar.render();
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
	/deep/ #ChartApplyPropContainer {
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
