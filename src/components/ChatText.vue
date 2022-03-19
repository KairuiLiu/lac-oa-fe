<template>
	<div class="textBox">
		<div class="text" :class="{ bgc: !nobgc }">{{ props.text }}</div>
		<div class="suffix">{{ props.suffix }}</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	text: number;
	suffix: string;
	nobgc?: boolean;
}>();
</script>

<script lang="ts">
export default {
	name: 'ChatText',
};
</script>

<style lang="less" scoped>
.textBox {
	display: flex;
	align-items: flex-end;
	font-weight: bold;
	.text {
		height: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 36px;
		&.bgc {
			background: center / contain no-repeat url(../assets/paint.png);
		}
	}
	.suffix {
		padding-bottom: 10px;
		font-size: 16px;
		white-space: nowrap;
	}
}
</style>
