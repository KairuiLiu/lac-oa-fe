<template>
	<div>
		<a-popover placement="bottomLeft">
			<template #content>
				<a-button type="link" @click="state.visible = true">编辑信息</a-button><br />
				<a-button type="link" @click="toLogout">退出登录</a-button>
			</template>
			<a-avatar size="large" :src="props.face" />
		</a-popover>
		<UserProfile :visible="state.visible" @cancel="handleCancel"></UserProfile>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import UserProfile from './UserProfile.vue';

const store = useStore();
const router = useRouter();
const props = defineProps<{
	face: string;
}>();

const state = reactive({
	visible: false,
});

function handleCancel() {
	state.visible = false;
}

function toLogout() {
	store.dispatch('clearLogin');
	router.replace({ path: '/login' });
}
</script>

<script lang="ts">
export default {
	name: 'UserIcon',
};
</script>

<style lang="less" scoped></style>
