<template>
	<a-modal :closable="false" :visible="props.visible" :title="state.title">
		<template #footer>
			<a-button key="back" :disabled="state.submitLoading" @click="handleCancel">取消</a-button>
			<a-button key="submit" type="primary" :loading="state.submitLoading" @click="goodSubmit">提交</a-button>
		</template>
		<div v-if="state.loading" class="loading">
			<a-spin />
		</div>
		<div v-else class="content">
			<p>{{ formData }}</p>
			<a-form :model="formData" :label-col="{ style: { width: '150px' } }" :wrapper-col="{ span: 14 }">
				<a-form-item label="商品编号">
					<a-input v-model:value="formData.id" />
				</a-form-item>
				<a-form-item label="商品名称">
					<a-input v-model:value="formData.name" />
				</a-form-item>
				<a-form-item label="商品大类">
					<a-input v-model:value="formData.class" />
				</a-form-item>
				<a-form-item label="上架商品">
					<a-switch v-model:checked="formData.enable" />
				</a-form-item>
				<a-form-item label="审核状态">
					<a-select v-model:value="formData.aduit">
						<a-select-option :value="-1">无需审核</a-select-option>
						<a-select-option :value="0">未审核通过</a-select-option>
						<a-select-option :value="1">审核通过</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="销售单位">
					<a-input v-model:value="formData.goodPrice.unit" />
				</a-form-item>
				<a-form-item label="单价">
					<a-input v-model:value="formData.goodPrice.perPrice" :suffix="`元/${formData.goodPrice.unit}`" />
				</a-form-item>
				<a-form-item label="基础运费">
					<a-input v-model:value="formData.goodPrice.transBasePrice" suffix="元" />
				</a-form-item>
				<a-form-item label="单位运费">
					<a-input v-model:value="formData.goodPrice.transPerPrice" :suffix="`元/${formData.goodPrice.unit}`" />
				</a-form-item>
				<a-form-item label="商品库存">
					<a-input v-model:value="formData.goodStock" />
				</a-form-item>
				<a-form-item label="配送标签">
					<a-input v-model:value="formData.goodStock" />
				</a-form-item>
				<a-form-item label="定制标签">
					<a-input v-model:value="formData.goodStock" />
				</a-form-item>
			</a-form>
		</div>
	</a-modal>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { watch, reactive, defineComponent, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { adminApi } from '../../../api';
import { IGoodConfig } from '../../../types/admin';
import IAjaxRestlt from '../../../types/common';

const router = useRouter();

const props = defineProps<{
	visible: boolean;
	goodId: string;
	supportId: string;
}>();

const emits = defineEmits<{
	(e: 'cancel'): void;
}>();

const state = reactive({
	submitLoading: false,
	loading: false,
	title: computed(() => (props.goodId === '-1' ? '新建商品' : '编辑商品')),
});

const dataInit: IGoodConfig = {
	id: props.goodId,
	name: '',
	class: '',
	goodPrice: {
		unit: '只',
		perPrice: 0,
		transPerPrice: 0,
		transBasePrice: 0,
	},
	goodStock: 0,
	shipTag: [],
	customeType: [],
	detail: '',
	enable: false,
	aduit: -1,
};

const formData = ref(JSON.parse(JSON.stringify(dataInit)));

async function goodSubmit() {
	state.submitLoading = true;
	let res;
	if (props.goodId === '-1') {
		res = (await adminApi.reqAddGood({ token: '123', supportId: props.supportId, config: formData.value })) as IAjaxRestlt;
	} else {
		res = (await adminApi.reqUpdGood({ token: '123', goodId: props.goodId, supportId: props.supportId, config: formData.value })) as IAjaxRestlt;
	}
	if (res.code) {
		message.error('请求失败');
		return;
	}
	message.success('请求成功');
	router.go(0);
}

function handleCancel() {
	emits('cancel');
	formData.value = JSON.parse(JSON.stringify(dataInit));
	state.submitLoading = false;
}

watch(
	() => props.visible,
	async () => {
		if (!props.visible || props.supportId === '-1') return;
		state.loading = true;
		const res = (await adminApi.reqGoodDetail({ token: '123', supportId: props.supportId, goodId: props.goodId })) as IAjaxRestlt;
		if (res.code) {
			message.error('数据请求失败');
		} else {
			formData.value = res.data;
		}
		state.loading = false;
	}
);
</script>

<script lang="ts">
export default defineComponent({
	name: 'GoodEditModal',
});
</script>

<style lang="less" scoped></style>
