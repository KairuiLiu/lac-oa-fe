<template>
	<div class="wapper">
		<div class="order-date">
			<div class="get">123</div>
			<div class="ship">234</div>
		</div>
		<div class="state">213</div>
		<div class="content">
			<div class="customer-info"></div>
			<div class="ship-info"></div>
			<div class="ship-detail"></div>
			<div class="order-info"></div>
			<div class="price-info"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';

onMounted(() => {});
</script>

<script lang="ts">
export default defineComponent({
	name: 'SupportDetail',
});
</script>

<style lang="less" scoped>
.wapper {
	min-width: 960px;
}
</style>
