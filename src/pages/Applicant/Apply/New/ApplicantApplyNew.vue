<template>
	选择许可证
	<ul>
		<li v-for="item in store.state.apply.licenses" :key="item.animalId">
			{{ item.animalName }}:
			<a-tag v-for="(tag, index) in item.anilicenses" :key="`${index}-${tag}-${Date.now()}`" :closable="true" @close="handleDelLicense(item.animalId, index)">
				{{ tag }}
			</a-tag>
			<a-select
				v-if="state.form.licenses.active === item.animalId"
				v-model:value="state.form.licenses.optionSelect"
				size="small"
				style="width: 100px; height: 22px"
				:options="state.form.licenses.options"
				@blur="handleLicenseInputConfirm(item.animalId)"
				@change="handleLicenseInputConfirm(item.animalId)"
			></a-select>
			<a-tag v-else style="background: #fff; border-style: dashed" @click="showLicenseInput(item.animalId)">
				<plus-outlined />
				添加许可证
			</a-tag>
		</li>
	</ul>
	<a-modal v-model:visible="state.newLicense.visible" title="新建许可证">
		<template #footer>
			<a-button key="back" :disabled="state.newLicense.loading" @click="handleClose">返回</a-button>
			<a-button key="submit" type="primary" :loading="state.newLicense.loading" @click="handleSubmit">提交</a-button>
		</template>
		<a-form :model="state.newLicense.data" name="shipInfo" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
			<a-form-item label="公司名" name="comp">
				<a-input v-model:value="state.newLicense.data.comp" />
			</a-form-item>
			<a-form-item label="许可证号" name="licenseId">
				<a-input v-model:value="state.newLicense.data.id" />
			</a-form-item>
			<a-form-item label="上传许可证" name="upload">
				<a-upload v-model:file-list="state.newLicense.data.imgs" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture" class="upload-list-inline">
					<a-button>
						<upload-outlined></upload-outlined>
						上传
					</a-button>
				</a-upload>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import type { UploadProps } from 'ant-design-vue';
import { applicantApi } from '../../../../api';
import { IAjaxRestlt } from '../../../../types/common';

const store = useStore();
const router = useRouter();
const state = reactive({
	form: {
		licenses: {
			active: -1,
			optionSelect: null,
			options: [
				{
					value: 0,
					label: '无需许可证',
				},
				{
					value: 1,
					label: '上传许可证',
				},
				{
					value: 2,
					label: '选取许可证',
				},
			],
		},
	},
	newLicense: {
		visible: false,
		loading: false,
		animalId: '',
		data: {
			comp: '',
			id: '',
			imgs: ref<UploadProps['fileList']>([]),
		},
	},
});

function handleLicenseInputConfirm(animalId, v = null) {
	state.form.licenses.active = -1;
	if (state.form.licenses.optionSelect === null) return;
	if (state.form.licenses.optionSelect === 0) {
		store.dispatch('apply/addLicense', { animalId, anilicenses: '无需许可证' });
	} else if (state.form.licenses.optionSelect === 1) {
		toNewLicense(animalId);
	} else {
		toSelectLicense(animalId);
	}
	state.form.licenses.optionSelect = null;
}

function showLicenseInput(id) {
	state.form.licenses.optionSelect = null;
	state.form.licenses.active = id;
}

function handleDelLicense(animalId, idx) {
	nextTick(() => {
		store.dispatch('apply/delLicense', { animalId, idx });
	});
}

function toNewLicense(animalId) {
	state.newLicense.data.comp = '';
	state.newLicense.data.id = '';
	state.newLicense.data.imgs = [];
	state.newLicense.visible = true;
}

function toSelectLicense(animalId) {
	router.push({
		name: 'applicant-apply-license',
		params: {
			animalId,
		},
	});
}

function handleClose() {
	state.newLicense.data.comp = '';
	state.newLicense.data.id = '';
	state.newLicense.data.imgs = [];
	state.newLicense.visible = false;
}

async function handleSubmit() {
	if (state.newLicense.data.comp.trim().length === 0 || state.newLicense.data.id.trim().length === 0 || state.newLicense.data.imgs.length === 0) {
		message.error('请补全信息');
		return;
	}
	state.newLicense.loading = true;
	const res = (await applicantApi.reqAddLicense({
		token: '123',
		license: state.newLicense.data,
	})) as IAjaxRestlt;
	state.newLicense.loading = false;
	if (!res.code) {
		message.success('添加成功');
		store.dispatch('apply/addLicense', { animalId: state.newLicense.animalId, anilicenses: res.data });
	} else {
		message.error('添加失败');
	}
}
</script>

<script lang="ts">
export default defineComponent({
	name: 'ApplicantApplyNew',
});
</script>
