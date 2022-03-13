<template>
	<a-modal :closable="false" :visible="props.visible" :title="state.title" wrap-class-name="full-modal">
		<template #footer>
			<a-button key="back" :disabled="state.submitLoading" @click="handleCancel">取消</a-button>
			<a-button key="submit" type="primary" :loading="state.submitLoading" @click="goodSubmit">提交</a-button>
		</template>
		<div v-if="state.loading" class="loading">
			<a-spin />
		</div>
		<div v-else class="content">
			<a-form :model="formData" :label-col="{ style: { width: '150px' } }" :wrapper-col="{ span: 14 }">
				<a-row :gutter="24">
					<a-col :span="6">
						<a-form-item label="商品编号">
							<a-input v-if="props.goodId !== '-1'" v-model:value="formData.id" disabled />
							<a-input v-else value="自动生成" disabled />
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="商品名称">
							<a-input v-model:value="formData.name" />
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="商品大类">
							<a-input v-model:value="formData.class" />
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="上架商品">
							<a-switch v-model:checked="formData.enable" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="24">
					<a-col :span="6">
						<a-form-item label="审核状态">
							<a-select v-model:value="formData.aduit">
								<a-select-option :value="-1">无需审核</a-select-option>
								<a-select-option :value="0">未审核通过</a-select-option>
								<a-select-option :value="1">审核通过</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="销售单位">
							<a-input v-model:value="formData.goodPrice.unit" />
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="单价">
							<a-input v-model:value.number="formData.goodPrice.perPrice" type="number" step="0.01" :suffix="`元/${formData.goodPrice.unit}`" />
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="基础运费">
							<a-input v-model:value.number="formData.goodPrice.transBasePrice" type="number" step="0.01" suffix="元" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="24">
					<a-col :span="6">
						<a-form-item label="单位运费"> <a-input v-model:value.number="formData.goodPrice.transPerPrice" type="number" step="0.01" :suffix="`元/${formData.goodPrice.unit}`" /> </a-form-item
					></a-col>
					<a-col :span="6">
						<a-form-item label="商品库存"> <a-input v-model:value.number="formData.goodStock" type="number" step="0.01" :suffix="`${formData.goodPrice.unit}`" /> </a-form-item
					></a-col>
					<a-col :span="6">
						<a-form-item label="配送标签">
							<template v-for="tag in formData.shipTag" :key="tag">
								<a-tag :closable="true" @close="handleClose(tag, formData.shipTag)">
									{{ tag }}
								</a-tag>
							</template>
							<a-input
								v-if="state.shipTag.inputVisible"
								id="shipTag"
								v-model:value="state.shipTag.inputValue"
								type="text"
								size="small"
								:style="{ width: '78px' }"
								@blur="handleInputConfirm(state.shipTag, formData.shipTag)"
								@keyup.enter="handleInputConfirm(state.shipTag, formData.shipTag)"
							/>
							<a-tag v-else style="background: #fff; border-style: dashed" @click="showInput(state.shipTag, 'shipTag')">
								<plus-outlined />
								新建标签
							</a-tag>
						</a-form-item></a-col
					>
					<a-col :span="6">
						<a-form-item label="定制标签">
							<template v-for="tag in formData.customeType" :key="tag">
								<a-tag :closable="true" @close="handleClose(tag, formData.customeType)">
									{{ tag }}
								</a-tag>
							</template>
							<a-input
								v-if="state.customeType.inputVisible"
								id="customeType"
								v-model:value="state.customeType.inputValue"
								type="text"
								size="small"
								:style="{ width: '78px' }"
								@blur="handleInputConfirm(state.customeType, formData.customeType)"
								@keyup.enter="handleInputConfirm(state.customeType, formData.customeType)"
							/>
							<a-tag v-else style="background: #fff; border-style: dashed" @click="showInput(state.customeType, 'customeType')">
								<plus-outlined />
								新建标签
							</a-tag>
						</a-form-item></a-col
					>
				</a-row>
				<a-form-item label="商品详情">
					<div id="editContent">
						<a-button v-if="!state.showEdit" type="primary" @click="showText">编辑内容</a-button>
						<a-button v-else type="primary" @click="showHTML">显示预览</a-button>
						<div v-show="state.showEdit" id="REditor"></div>
						<div v-show="!state.showEdit" :innerHTML="state.formEdit.content.html"></div>
					</div>
				</a-form-item>
			</a-form>
		</div>
	</a-modal>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { watch, reactive, defineComponent, computed, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import WangEditor from 'wangeditor';
import { adminApi } from '../../../api';
import { IGoodConfig } from '../../../types/admin';
import { IAjaxRestlt } from '../../../types/common';

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
	formEdit: {
		REditor: null,
		content: {
			html: '',
			text: '',
		},
		instance: null,
	},
	showEdit: true,
	shipTag: {
		inputVisible: false,
		inputValue: '',
		ele: null,
	},
	customeType: {
		inputVisible: false,
		inputValue: '',
		ele: null,
	},
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
	formData.value.detail = state.formEdit.instance.txt.html();
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
	state.formEdit.instance.destroy();
	state.formEdit.instance = null;
}

watch(
	() => props.visible,
	async () => {
		state.loading = true;
		if (props.visible && props.goodId !== '-1') {
			const res = (await adminApi.reqGoodDetail({ token: '123', supportId: props.supportId, goodId: props.goodId })) as IAjaxRestlt;
			if (res.code) {
				message.error('数据请求失败');
			} else {
				formData.value = res.data;
			}
		}
		setTimeout(() => {
			state.formEdit.REditor = document.getElementById('REditor');
			state.formEdit.content.html = '';
			state.formEdit.content.text = '';
			state.showEdit = true;
			state.formEdit.instance = new WangEditor(state.formEdit.REditor);
			state.formEdit.instance.config.pasteIgnoreImg = true;
			state.formEdit.instance.config.uploadImgServer = '/upload-img';
			state.formEdit.instance.create();
			state.formEdit.instance.txt.html(formData.value.detail);
		});
		state.loading = false;
	}
);

const syncHTML = () => {
	state.formEdit.content.html = state.formEdit.instance.txt.html();
};

function showHTML() {
	syncHTML();
	state.showEdit = false;
}

function showText() {
	state.showEdit = true;
}

function handleInputConfirm(tag, tagArr) {
	if (tag.inputValue && tagArr.indexOf(tag.inputValue) === -1) {
		tagArr.push(tag.inputValue);
	}
	tag.inputValue = '';
	tag.inputVisible = false;
}
function handleClose(tag, tagArr) {
	const tags = tagArr.filter(d => d !== tag);
	tagArr = tags;
}
function showInput(tag, id) {
	tag.inputVisible = true;
	nextTick(() => {
		const ele = document.getElementById(id);
		ele.focus();
	});
}
</script>

<script lang="ts">
export default defineComponent({
	name: 'GoodEditModal',
});
</script>

<style lang="less">
.full-modal {
	width: 100vw;
	height: 100vh;
	// min-width: 1200px;
	.ant-modal {
		top: 0;
		padding-bottom: 0;
		margin: 0;
	}
	.ant-modal-content {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		height: calc(100vh);
		// min-width: 1200px;
	}
	.ant-modal-body {
		flex: 1;
	}
	.ant-form-horizontal {
		display: flex;
		flex-direction: column;
	}
}
</style>

<style scoped lang="less">
.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	& > .ant-form {
		height: 100%;
		flex-grow: 1;
		& > .ant-row:last-of-type {
			flex-grow: 1;
			height: 0;
			flex-direction: row;
			overflow: auto;
		}
	}
}
#editContent {
	height: 100%;
	flex-grow: 1;
	overflow: auto;
}
</style>
