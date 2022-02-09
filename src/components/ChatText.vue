<template>
	<div class="textBox">
		<div class="text">{{ props.text }}</div>
		<div class="suffix">{{ props.suffix }}</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	text: number;
	suffix: string;
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
		background: center / contain no-repeat url(../assets/paint.jpg);
		height: 80px;
		width: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 36px;
	}
	.suffix {
		padding-bottom: 10px;
		font-size: 16px;
	}
}
</style>
