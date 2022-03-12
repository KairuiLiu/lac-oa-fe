<template>{{ state }}</template>

<script setup lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const [applyType, applyProps] = route.params.type.split('-');

const state = reactive({
	applyProps,
	applyType,
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'ApplicantApplyNew',
});
</script>
