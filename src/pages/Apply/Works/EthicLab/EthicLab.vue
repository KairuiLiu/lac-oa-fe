<template>
	<div class="wapper">
		<div class="content">
			<div class="lang-switch">
				<a-switch v-model:checked="state.langcn" checked-children="中文" un-checked-children="EN" />
			</div>
			<a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout" @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed">
				<a-row>
					<a-col :span="24"
						><div class="title">{{ labels.head.title }}</div></a-col
					>
				</a-row>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 100 }" :width="80">
					<a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
						><a-form-item :label="labels.head.applDate" name="applDate"><a-input v-model:value="state.formState.head.applDate" /></a-form-item>
					</a-col>
					<a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
						><a-form-item :label="labels.head.apprDate" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
						><a-form-item :label="labels.head.iacucNo" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
				</a-row>
			</a-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, defineExpose, reactive, computed } from 'vue';
import i18n from '../../../../utils/ethicLabI18n';

const state = reactive({
	langcn: true,
	formState: {
		head: {
			applDate: '',
		},
	},
});

const labels = computed(() => (state.langcn ? i18n.cn : i18n.en));

defineExpose({});
</script>
<script lang="ts">
export default defineComponent({
	name: 'EthicLab',
});
</script>

<style lang="less" scoped>
.title {
	font-size: 2.5rem;
	text-align: center;
}

.lang-switch {
	position: fixed;
	right: 24px;
}
</style>
