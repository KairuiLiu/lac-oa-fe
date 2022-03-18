<template>
	<div class="wapper">
		<div v-if="state.loaded" class="content">
			<EthicLab v-if="state.applyType === 'ethic' && state.applyProps == 'lab'" ref="formRef"></EthicLab>
			<EthicTech v-if="state.applyType === 'ethic' && state.applyProps == 'tech'" ref="formRef"></EthicTech>
		</div>
		<div class="toolbar">
			<a-button @click="toBack()">返回</a-button>
			<a-button @click="toSave()">保存草稿</a-button>
			<a-button danger @click="toReset()">重置</a-button>
			<a-button type="primary" @click="toSubmit()">提交</a-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import EthicLab from '../../Works/EthicLab/EthicLab.vue';
import EthicTech from '../../Works/EthicTech/EthicTech.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const [applyType, applyProps] = (route.params.type as string).split('-');

const state = reactive({
	applyProps,
	applyType,
	loaded: false,
});

function toBack() {
	router.go(-1);
}

// async function toSubmit() {
// 	const res = await formRef.value.applicantSubmit();
// 	if (res) router.go(-1);
// 	else message.error('提交失败');
// }

// async function toSave() {
// 	const res = await formRef.value.applicantSave();
// 	if (res) message.success('草稿保存成功');
// 	else message.error('草稿保存失败');
// }

// function toReset() {
// 	formRef.value.applicantReset();
// }

onBeforeMount(async () => {
	state.loaded = await store.dispatch('apply/initApply', { type: state.applyType, prop: state.applyProps, storeSelf: store });
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'NewApply',
});
</script>

<style scoped lang="less">
.wapper {
	padding: 24px;
	.toolbar {
		padding: 14px 0;
		background-color: #f0f2f5;
		position: sticky;
		bottom: 0px;
		display: flex;
		gap: 14px;
	}
}
</style>
