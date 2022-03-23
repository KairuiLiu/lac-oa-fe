<template>
	<div>
		<a-modal v-model:visible="visible" title="流转过程" :closable="false" width="1100px">
			<template #footer>
				<a-button key="back" @click="close">确定</a-button>
			</template>
			<div v-if="state.loading" class="loadCircleWapper"><a-spin /></div>
			<div v-else class="peocessBox">
				<div class="percent">
					<a-progress :percent="percent" />
				</div>
				<!-- <a-steps>
					<a-step v-for="(item, index) in processes" :key="`${index}-${item.type}`" :title="item.title" :status="item.status">
						<template #description>
							<a-comment v-for="(item2, index2) in item.processes" :key="`${index}-${item.type}-${index2}`">
								<template #author>{{ item2.userName }}</template>
								<template #avatar>
									<a-avatar :src="item2.face" :alt="item2.userName" />
								</template>
								<template #content>
									<p>备注: {{ item2.note }}</p>
								</template>
								<template #datetime> {{ item2.dateTime }} </template>
							</a-comment>
						</template>
					</a-step>
				</a-steps> -->
				<div v-for="(itemarr, index) in processes2" :key="index" class="stepsWapper">
					<a-steps>
						<a-step v-for="(item, index2) in itemarr" :key="`${index2}-${item.type}`" :title="item.title" :status="item.status">
							<template #description>
								<a-comment v-for="(item2, index3) in item.processes" :key="`${index2}-${item.type}-${index3}`">
									<template #author>{{ item2.userName }}</template>
									<template #avatar>
										<a-avatar :src="item2.face" :alt="item2.userName" />
									</template>
									<template #content>
										<p>备注: {{ item2.note }}</p>
									</template>
									<template #datetime> {{ item2.dateTime }} </template>
								</a-comment>
							</template>
						</a-step>
					</a-steps>
					<a-divider style="height: 2px; background-color: #1890ff" />
				</div>
			</div>
		</a-modal>
	</div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, reactive, watch, computed } from 'vue';
import { applyApi } from '../api';
import { getProcessTitle } from '../utils/applyTypes';
import { IAjaxRestlt } from '../types/common';

const props = defineProps<{
	visible: boolean;
	applyid: string;
}>();

const emits = defineEmits<{
	(e: 'close'): void;
}>();

const state = reactive({
	loading: true,
	process: [],
});

const processes = computed(() => {
	const stages = [...new Set(state.process.map(d => d.stage))];
	const processest = stages.map(d => {
		const res = state.process.filter(dd => dd.stage === d);
		res.sort((l, r) => +new Date(l.dateTime) - +new Date(r.dateTime));
		let status = 'process';
		if (res.findIndex(d => d.end) + 1) status = 'finish';
		if (res.findIndex(d => d.error) + 1) status = 'error';
		return {
			type: d % 10,
			title: getProcessTitle(d % 10),
			status,
			processes: res,
		};
	});
	return processest;
});

const processes2 = computed(() => {
	const stages = [...new Set(state.process.map(d => d.stage))];
	const processest = stages.map(d => {
		const res = state.process.filter(dd => dd.stage === d);
		res.sort((l, r) => +new Date(l.dateTime) - +new Date(r.dateTime));
		let status = 'process';
		if (res.findIndex(d => d.end) + 1) status = 'finish';
		if (res.findIndex(d => d.error) + 1) status = 'error';
		return {
			type: d % 10,
			title: getProcessTitle(d % 10),
			status,
			processes: res,
		};
	});
	const processest2 = [];
	let t = [];
	processest.forEach(d => {
		if (t.length === 0) t.push(d);
		else if (t.at(-1).type >= d.type) {
			processest2.push(t.concat());
			t = [d];
		} else {
			t.push(d);
		}
	});
	if (t.length) processest2.push(t);
	return processest2;
});

const percent = computed(() => processes.value.at(-1).type * 25 + 25);

function close() {
	emits('close');
}

const visible = computed(() => props.visible);

watch(
	() => props.visible,
	async () => {
		state.loading = true;
		if (!props.visible) return;
		const res = (await applyApi.reqApplyProcess({ token: '123', applyId: props.applyid })) as IAjaxRestlt;
		if (res.code) {
			message.error('加载失败');
			return;
		}
		state.process = res.data.process;
		state.loading = false;
	}
);
</script>

<script lang="ts">
export default defineComponent({
	name: 'ApplyProcess',
});
</script>

<style lang="less" scoped>
.loadCircleWapper {
	display: flex;
	justify-content: space-around;
}

.peocessBox {
	max-height: calc(80vh - 100px);
	overflow: auto;
}

.percent {
	margin-bottom: 24px;
}

.workProcess {
	width: 800px;
}

.ant-steps-item {
	min-width: 250px;
	max-width: 250px;
}

.stepsWapper {
	overflow-x: hidden;
}
</style>
