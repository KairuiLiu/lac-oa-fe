<template>
	<router-view class="routerBox"> </router-view>
	<a-layout-footer style="text-align: center"> 西南大学动物中心 ©2022 渝 ICP 备 xxxxxxxxx号 </a-layout-footer>
</template>

<script setup lang="ts">
import { onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
onMounted(async () => {
	const logined = (await store.dispatch('tryLoginToken')) as string;
	router.push({ name: logined || 'login' });
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'IndexPage',
});
</script>

<style lang="less" scoped>
.routerBox {
	min-height: 100%;
}
</style>
