<template>
	<a-layout>
		<a-layout-header>动物伦理审核与采购系统(2022-03-21 20:44 版)</a-layout-header>
		<a-layout-content>
			<div class="login">
				<a-form :model="formState" name="login" class="login-form" @finish="handleSubmit">
					<a-form-item label="帐号" name="username" :rules="[{ required: true, message: '请输入帐号!' }]">
						<a-input v-model:value="formState.username" placeholder="请输入帐号">
							<template #prefix>
								<UserOutlined class="site-form-item-icon" />
							</template>
						</a-input>
					</a-form-item>

					<a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
						<a-input-password v-model:value="formState.password" placeholder="请输入密码">
							<template #prefix>
								<LockOutlined class="site-form-item-icon" />
							</template>
						</a-input-password>
					</a-form-item>

					<a-form-item>
						<a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
					</a-form-item>
				</a-form>
			</div>
		</a-layout-content>
	</a-layout>
</template>

<script setup lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { commonApi } from '../../api';
import { IAjaxRestlt } from '../../types/common';

const store = useStore();
const router = useRouter();
const formState = reactive({
	username: '',
	password: '',
});

async function handleSubmit(v) {
	const res = (await commonApi.reqLogin({ userid: v.username, passWord: v.password })) as IAjaxRestlt;
	if (res.code) {
		message.error('登录失败');
	} else {
		message.success('登录成功');
		store.dispatch('saveLogin', res.data.userInfo);
		router.replace({ name: res.data.type });
	}
}

const disabled = computed(() => {
	return !(formState.username && formState.password);
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'LoginPage',
});
</script>

<style lang="less" scoped>
#components-form-demo-normal-login .login-form {
	max-width: 300px;
}
#components-form-demo-normal-login .login-form-wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
#components-form-demo-normal-login .login-form-forgot {
	margin-bottom: 24px;
}
#components-form-demo-normal-login .login-form-button {
	width: 100%;
}

.login {
	padding: 7vh 2vw;
	background-color: #fff;
	border-radius: 40px;
}

.ant-layout-header {
	background-color: #f0f2f5;
	font-size: 30px;
	line-height: 60px;
	font-weight: bold;
	color: #3a62d7;
}

.ant-layout-content {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background-color: #d6e9ff;
}

.login-form-button {
	width: 100%;
}
</style>
