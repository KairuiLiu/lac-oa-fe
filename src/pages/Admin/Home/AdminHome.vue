<template>
	<div class="adminHome">
		<AdminHomeHeader></AdminHomeHeader>
		<AdminHomePlots></AdminHomePlots>
	</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import AdminHomeHeader from './AdminHomeHeader.vue';
import AdminHomePlots from './AdminHomePlots.vue';
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminHome',
});
</script>

<style lang="less" scoped>
.adminHome {
	display: flex;
	flex-direction: column;
	gap: 30px;
}
</style>
