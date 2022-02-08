<template>
	<router-view> </router-view>
	<a-layout-footer style="text-align: center"> 西南大学动物中心 ©2022 渝 ICP 备 xxxxxxxxx号 </a-layout-footer>
</template>

<script setup lang="ts"></script>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'IndexPage',
});
</script>
