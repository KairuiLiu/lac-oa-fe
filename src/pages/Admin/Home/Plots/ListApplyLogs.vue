<template>
	<a-card :bordered="false" title="操作记录" class="card">
		<div class="dataWapper">
			<a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="data">
				<template #renderItem="{ item }">
					<a-list-item key="item.title">
						<a-list-item-meta :description="`${item.userName}@${item.date}`">
							<template #title>
								<a :href="item.applyId">{{ item.title }}</a>
							</template>
							<template #avatar><a-avatar :src="item.title" /></template>
						</a-list-item-meta>
					</a-list-item>
				</template>
			</a-list>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { onMounted, toRaw } from 'vue';

const props = defineProps<{
	data: any[];
}>();

const data = toRaw(props.data);

const pagination = {
	pageSize: 4,
};

onMounted(() => {});
</script>

<script lang="ts">
export default {
	name: 'ListApplyLogs',
};
</script>

<style lang="less" scoped>
.ant-card.card {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: auto;
	:deep(.ant-card-head) {
		flex-shrink: 0;
		height: 10%;
	}
	:deep(.ant-card-body) {
		flex-shrink: 1;
		height: 90%;
	}
}

.dataWapper {
	height: 100%;
	width: 100%;
	:deep(.ant-list) {
		max-height: 100%;
		display: flex;
		flex-direction: column;
		.ant-spin-nested-loading {
			flex-grow: 1;
			flex-shrink: 1;
		}
		.ant-list-pagination {
			margin-top: 0.5vh;
			flex-shrink: 0;
			flex-grow: 0;
		}
	}
}
</style>
