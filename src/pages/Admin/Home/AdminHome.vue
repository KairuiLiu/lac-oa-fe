<template>
	<section class="worksArea">
		<div class="left">
			<a-typography-title :level="2">今日,</a-typography-title>
			<a-typography-text strong>{{ welcomeText }}</a-typography-text>
		</div>
		<div class="right"></div>
	</section>
	<section class="plots"></section>
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

// eslint-disable-next-line
const store = useStore();
const welcomeText = computed(() => {
	const date = new Date();
	return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日星期${date.getDay()}, 欢迎您userName.`;
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminHome',
});
</script>
