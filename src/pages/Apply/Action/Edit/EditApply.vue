<template>
	<div class="wapper">
		<div v-if="state.loaded" class="content">
			<EthicLab v-if="state.applyType === 'ethic' && state.applyProps == 'lab'" ref="formRefWapper" action="edit"></EthicLab>
			<EthicTech v-if="state.applyType === 'ethic' && state.applyProps == 'tech'" ref="formRefWapper" action="edit"></EthicTech>
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
import { message } from 'ant-design-vue';
import { defineComponent, reactive, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import EthicLab from '../../Works/EthicLab/EthicLab.vue';
import EthicTech from '../../Works/EthicTech/EthicTech.vue';
import { applyApi } from '../../../../api';
import { IAjaxRestlt } from '../../../../types/common';

const route = useRoute();
const router = useRouter();
const store = useStore();

const formRefWapper = ref(null);

const state = reactive({
	id: route.params.applyId as string,
	loaded: false,
	applyType: null,
	applyProps: null,
});

function toBack() {
	router.go(-1);
}

async function toSubmit() {
	formRefWapper.value
		.getFormData()
		.then(async data => {
			const res = (await applyApi.reqApplySubmit({ token: '123', id: state.id, data, prop: state.applyProps, type: state.applyType })) as IAjaxRestlt;
			if (!res.code) {
				message.success('提交成功');
				router.go(-1);
			} else {
				message.error('提交失败');
			}
		})
		.catch(reason => {
			message.error(reason.message);
		});
}

async function toSave() {
	formRefWapper.value
		.getFormData()
		.then(async data => {
			const res = (await applyApi.reqApplySave({ token: '123', id: state.id, data, prop: state.applyProps, type: state.applyType })) as IAjaxRestlt;
			if (!res.code) {
				message.success('草稿保存成功');
				router.go(-1);
			} else {
				message.error('草稿保存失败');
			}
		})
		.catch(reason => {
			message.error(reason.message);
		});
}

async function toReset() {
	state.loaded = false;
	state.loaded = await store.dispatch('apply/initApply', { type: state.applyType, prop: state.applyProps, storeSelf: store });
	if (state.loaded) message.success('重置成功');
	else message.error('重置失败');
}

onBeforeMount(async () => {
	const res = (await applyApi.reqApplyGet({ token: '123', id: state.id })) as IAjaxRestlt;
	if (res.code) {
		state.loaded = false;
	} else {
		state.loaded = await store.dispatch('apply/updateApply', { formData: res.data.formData });
	}
	if (!state.loaded) {
		message.error('加载失败');
	} else {
		state.applyType = res.data.applyType;
		state.applyProps = res.data.applyProps;
		message.success('加载成功');
	}
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'EditApply',
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
