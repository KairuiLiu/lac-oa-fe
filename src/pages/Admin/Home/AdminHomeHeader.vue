<template>
	<section class="worksArea">
		<div class="left">
			<a-typography-title :level="2">今日,</a-typography-title>
			<a-typography-text strong>{{ welcomeText }}</a-typography-text>
		</div>
		<div class="right">
			<AdminIconCard :value="state.works.sysAllocate" suffix="待分配" @click="router.push('/admin/allocate')">
				<template #icon>
					<file-add-outlined />
				</template>
			</AdminIconCard>
			<AdminIconCard :value="state.works.sysProcess" suffix="待处理" @click="router.push('/admin/allocate')">
				<template #icon>
					<deployment-unit-outlined />
				</template>
			</AdminIconCard>
			<AdminIconCard :value="state.works.sysDone" suffix="已完成" @click="router.push('/admin/allocate')">
				<template #icon>
					<safety-outlined />
				</template>
			</AdminIconCard>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { FileAddOutlined, SafetyOutlined, DeploymentUnitOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AdminIconCard from '../../../components/AdminIconCard.vue';

const router = useRouter();
const store = useStore();

const state = reactive({
	works: computed(() => store.state.admin.sysData),
});

const welcomeText = computed(() => {
	const date = new Date();
	return store?.state?.userInfo ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日星期${date.getDay()}, 欢迎您${store?.state?.userInfo?.username}.` : '';
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminHomeHeader',
});
</script>

<style scoped lang="less">
.worksArea {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.right {
		gap: 1vw;
		display: flex;
	}
}
</style>
