<template>
	<div class="card">
		<div class="iconwapper">
			<slot name="icon"></slot>
		</div>
		<div class="content">
			<span class="content-value">{{ props.value }}</span>
			<span class="suffix">{{ props.suffix }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

const props = defineProps<{
	value: number;
	suffix: string;
}>();
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminIconCard',
});
</script>

<style scoped lang="less">
.card {
	display: flex;
	align-items: center;
	padding: 12px;
	gap: 5px;
	cursor: pointer;
	.iconwapper {
		width: 50px;
		height: 50px;
		border: 1px solid rgba(0, 0, 0, 0.45);
		border-radius: 50%;
		font-size: 24px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.content {
		display: flex;
		flex-direction: column;
		.content-value {
			font-size: 24px;
		}
	}
}
</style>
