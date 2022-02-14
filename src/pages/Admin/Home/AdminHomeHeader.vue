<template>
	<section class="worksArea">
		<div class="left">
			<a-typography-title :level="2">今日,</a-typography-title>
			<a-typography-text strong>{{ welcomeText }}</a-typography-text>
		</div>
		<div class="right">
			<AdminIconCard :value="123" suffix="待分配" @click="router.push('/admin/allocate')">
				<template #icon>
					<file-add-outlined />
				</template>
			</AdminIconCard>
			<AdminIconCard :value="123" suffix="待处理" @click="router.push('/admin/allocate')">
				<template #icon>
					<deployment-unit-outlined />
				</template>
			</AdminIconCard>
			<AdminIconCard :value="123" suffix="已完成" @click="router.push('/admin/allocate')">
				<template #icon>
					<safety-outlined />
				</template>
			</AdminIconCard>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { FileAddOutlined, SafetyOutlined, DeploymentUnitOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import AdminIconCard from '../../../components/AdminIconCard.vue';

const router = useRouter();

const welcomeText = computed(() => {
	const date = new Date();
	return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日星期${date.getDay() + 1}, 欢迎您userName.`;
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
