<template>
	<div class="wapper">
		<div v-if="state.loaded" class="content">
			<EthicLab v-if="state.applyType === 'ethic' && state.applyProps == 'lab'" ref="formRefWapper" action="adminaduit"></EthicLab>
			<EthicTech v-if="state.applyType === 'ethic' && state.applyProps == 'tech'" ref="formRefWapper" action="adminaduit"></EthicTech>
		</div>
		<div class="toolbar">
			<a-button @click="toBack()">返回</a-button>
			<a-button danger @click="toReject()">拒绝申请</a-button>
			<a-button type="primary" @click="toAllow()">通过申请</a-button>
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

async function toReject() {
	const res = (await applyApi.reqApplyAduitAdmin({ token: '123', id: state.id, data: false })) as IAjaxRestlt;
	if (res.code) {
		message.error('审批失败');
	} else {
		message.success('审批成功');
		router.go(-1);
	}
}

async function toAllow() {
	const res = (await applyApi.reqApplyAduitAdmin({ token: '123', id: state.id, data: true })) as IAjaxRestlt;
	if (res.code) {
		message.error('审批失败');
	} else {
		message.success('审批成功, 跳转分配');
		router.push({
			name: 'admin-aduit',
			params: {
				applyId: state.id,
			},
		});
	}
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
	name: 'AduitAdminApply',
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
