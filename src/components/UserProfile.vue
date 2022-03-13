<template>
	<a-modal :visible="props.visible" title="编辑信息" :closable="false" wrap-class-name="full-modal">
		<template #footer>
			<a-button key="back" :disabled="state.profileSubmitLoading" @click="handleClose">返回</a-button>
			<a-button key="submit" type="primary" :loading="state.profileSubmitLoading" @click="handleSubmit">提交</a-button>
		</template>
		<div v-if="state.loading" class="loading"><a-spin size="large" /></div>
		<div v-else class="content">
			<div class="face-row">
				<a-upload v-model:file-list="state.face" name="file" :multiple="false" action="/api/face-up-load" @change="handleChange">
					<a-avatar :size="128" :src="formData.face" />
				</a-upload>
			</div>
			<a-form :model="formData" name="profile" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off" :rules="rules">
				<a-row :gutter="24">
					<a-col :span="12">
						<a-form-item label="帐号" name="userId">
							<a-input v-model:value="formData.userId" disabled />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="密码" name="password">
							<a-input-password v-model:value="formData.password" @change="state.pwd = true" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="24">
					<a-col :span="12">
						<a-form-item label="用户名" name="username">
							<a-input v-model:value="formData.username" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="单位" name="department">
							<a-input v-model:value="formData.department" />
						</a-form-item>
					</a-col>
				</a-row>

				<a-row :gutter="24">
					<a-col :span="12">
						<a-form-item label="邮箱" name="email">
							<a-input v-model:value="formData.email" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="手机号码" name="phone">
							<a-input v-model:value="formData.phone" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row v-if="props.groupOptions" :gutter="24">
					<a-col :span="12">
						<a-form-item label="用户组" name="group">
							<a-cascader v-model:value="formData.group" :allow-clear="false" :options="props.groupOptions" placeholder="请选择用户组" />
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</div>
	</a-modal>
</template>

<script setup lang="ts">
import { ref, watch, defineComponent, reactive, toRaw } from 'vue';
import { useStore } from 'vuex';
import { Form, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import type { RuleObject } from 'ant-design-vue/es/form';
import type { UploadChangeParam } from 'ant-design-vue';
import { adminApi, commonApi } from '../api';
import { IAjaxRestlt, IUserInfo } from '../types/common';

const props = defineProps<{
	userId?: string;
	groupOptions?: any[];
	visible: boolean;
}>();

const emits = defineEmits<{
	(e: 'cancel'): void;
}>();

const router = useRouter();
const store = useStore();
const state = reactive({
	profileSubmitLoading: false,
	loading: false,
	pwd: false,
	formCheck: {
		checkname: async (_rule: RuleObject, value: string) => {
			// eslint-disable-next-line
			if (!value || !value.trim().length) return Promise.reject('请输入姓名');
			return Promise.resolve();
		},
		checkDep: async (_rule: RuleObject, value: string) => {
			// eslint-disable-next-line
			if (!value || !value.trim().length) return Promise.reject('请输入单位');
			return Promise.resolve();
		},
		checkEmail: async (_rule: RuleObject, value: string) => {
			// eslint-disable-next-line
			if (!value || !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value.trim())) return Promise.reject('请输入正确邮箱');
			return Promise.resolve();
		},
		checkPhone: async (_rule: RuleObject, value: string) => {
			// eslint-disable-next-line
			if (!value || !/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value.trim())) return Promise.reject('请输入合法手机号');
			return Promise.resolve();
		},
	},
	face: ref([]),
});

const rules = ref({
	username: [{ required: true, validator: state.formCheck.checkname, trigger: 'change' }],
	department: [{ required: true, validator: state.formCheck.checkDep, trigger: 'change' }],
	email: [{ required: true, validator: state.formCheck.checkEmail, trigger: 'change' }],
	phone: [{ required: true, validator: state.formCheck.checkPhone, trigger: 'change' }],
});

const formData = ref<IUserInfo>({});

const { useForm } = Form;
const { validate } = useForm(formData, rules);

function handleSubmit() {
	state.profileSubmitLoading = true;
	// check
	validate()
		.then(async () => {
			const config = (({ userId, username, phone, department, email }) => ({ userId, username, phone, department, email }))(toRaw(formData.value)) as IUserInfo;
			if (state.pwd) config.password = formData.value.password;
			if (props.groupOptions) config.group = formData.value.group;
			const res = (await commonApi.reqUpdUserInfo({ token: '123', config })) as IAjaxRestlt;
			if (res.code) {
				message.error('修改失败');
			} else {
				handleClose();
				store.dispatch('tryLoginToken');
				router.go(0);
			}
		})
		.catch(err => {
			message.error('请检查后再提交');
			state.profileSubmitLoading = false;
		});
}

function handleClose() {
	state.loading = false;
	state.pwd = false;
	emits('cancel');
}

const handleChange = (info: UploadChangeParam) => {
	if (info.file.status === 'done') {
		message.success('头像上传成功');
		store.dispatch('tryLoginToken');
	} else if (info.file.status === 'error') {
		message.error('头像上传失败');
		state.face = [];
	}
};

watch(
	() => props.visible,
	async () => {
		if (props.visible === true) {
			state.face = [];
			state.loading = true;
			if (props.userId) {
				const res = (await adminApi.reqUserDetail({ token: '123', userId: props.userId })) as IAjaxRestlt;
				if (res.code) message.error('数据请求失败');
				else formData.value = res.data;
			} else {
				formData.value = JSON.parse(JSON.stringify(store.state.userInfo));
			}
			formData.value.password = '';
			state.loading = false;
		}
	}
);
</script>

<script lang="ts">
export default defineComponent({
	name: 'UserProfile',
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.ant-form-horizontal {
		display: flex;
		flex-direction: column;
	}
}
</style>

<style lang="less" scoped>
.content {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	.face-row {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 256px;
	}
}
</style>
