<template>
	<a-card :bordered="false" title="未完成申请" class="card">
		<div class="dataWapper">
			<a-row :gutter="16" class="dataRow">
				<a-col v-for="(item, index) in data" :key="index" :span="8" class="cardItem dataCol">
					<a-card>
						<a-statistic :title="item.type" :value="item.value" :precision="0" suffix="件" style="margin-right: 50px">
							<template #prefix>
								<bell-filled class="bell" />
							</template>
						</a-statistic>
					</a-card>
				</a-col>
			</a-row>
		</div>
	</a-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BellFilled } from '@ant-design/icons-vue';

const props = defineProps<{
	data: any[];
}>();
const data = ref(props.data);
</script>

<script lang="ts">
export default {
	name: 'ListDoingApplyType',
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
		height: 20%;
	}
	:deep(.ant-card-body) {
		flex-shrink: 1;
		height: 80%;
	}
}

.cardItem {
	white-space: nowrap;
	:deep(.ant-statistic-content) {
		color: rgba(0, 0, 0, 0.45);
	}
}

.dataCol:nth-of-type(1) .bell {
	color: #cf1322;
}
.dataCol:nth-of-type(2) .bell {
	color: rgb(189, 189, 2);
}
.dataCol:nth-of-type(3) .bell {
	color: #3f8600;
}
</style>
