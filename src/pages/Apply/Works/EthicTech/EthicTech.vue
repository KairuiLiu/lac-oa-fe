<template>
	{{ labels }}
	<div class="wapper">
		<div class="content">
			<a-form ref="formRef" name="custom-validation" label-col="{ style: { width: '100px' } }" label-align="left" :model="state.formState">
				<!-- :rules="rules"
				v-bind="layout"
				@finish="handleFinish"
				@validate="handleValidate"
				@finishFailed="handleFinishFailed" -->
				<a-row>
					<a-col :span="24"><div class="title">西南大学教学实验用动物用伦理审查申请表</div></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"><div class="subtitle">一、教学基本信息（每个教学课程一个申请）</div></a-col>
				</a-row>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex">
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
						<a-form-item :label="132" name="applDate"><a-input v-model:value="state.formState.base.departmant" /></a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.tel" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.major" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.class" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.study" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.animals" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.source" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.producNo" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.certNo" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.checkNo" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.expType.state" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.expType" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.directorName" /> </a-form-item></a-col
					><a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.directorTel" /> </a-form-item></a-col
					><a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item name="applDate"> <a-input v-model:value="state.formState.base.directorEmail" /> </a-form-item
					></a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"><div class="subtitle">二、动物实验概况</div></a-col>
					<a-col :span="23"><div class="subsubtitle">动物实验必要性、实验操作步骤、3R主要措施、实验终末点及动物处置方式、是否使用毒（害）物质：</div></a-col>
					<a-col :span="23"><a-textarea v-model:value="state.formState.overview" allow-clear :rows="7" /></a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"><div class="subtitle">三、实验负责人承诺：</div></a-col>
					<a-col :span="23">
						<pre>
  1、我将自觉遵守实验动物福利伦理相关法规和各项规定，同意接受动物伦理委员会的监督与检查，如违反定规定，自愿接受处罚。
  2、本人保证本申请表中所填内容真实、详尽和易懂。</pre
						>
					</a-col>
				</a-row>
				<a-row type="flex" justify="end"><a-col :span="8"> 承诺人签名: </a-col></a-row>
				<a-row
					><a-col :span="8"> {{ state.formState.promiseDate }} </a-col></a-row
				>
				<a-row type="flex" justify="end">
					<a-col :span="24"><div class="subtitle">申请人所在单位教学管理部门意见（请教学管理部门对申请人所提交的审查申请表等材料进行审核确认）</div></a-col>
					<a-col :span="23">
						<pre>材料属实，准予报送伦理审查。</pre>
					</a-col>
				</a-row>
				<a-row type="flex" justify="end"><a-col :span="8"> 所在院系负责人:（盖章）</a-col></a-row>
				<a-row
					><a-col :span="8"> {{ state.formState.facApprDate }} </a-col></a-row
				>
				<a-row type="flex" justify="end">
					<a-col :span="24"><div class="subtitle">实验动物伦理审查委员会审批意见</div></a-col>
					<a-col :span="23">
						<pre>材料属实，准予报送伦理审查。</pre>
					</a-col>
					<a-row
						><a-col :span="8"> {{ state.formState.illApprDate }} </a-col></a-row
					>
				</a-row>
			</a-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, defineExpose, reactive, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { i18n } from '../../../../utils/ethicTech';

const store = useStore();
const state = reactive({
	langcn: true,
	formState: null,
});

onBeforeMount(() => {
	state.formState = store.state.apply.formData;
});

const labels = computed(() => i18n);

defineExpose({});
</script>
<script lang="ts">
export default defineComponent({
	name: 'EthicTech',
});
</script>

<style lang="less" scoped>
.content {
	background-color: #fff;
	padding: 14px;
}

.title {
	font-size: 2rem;
	text-align: center;
	margin-bottom: 24px;
}

.subtitle {
	font-size: 1.3rem;
	margin: 24px 0;
}

.subsubtitle {
	font-size: 1.15rem;
	margin: 12px 0;
}

.lang-switch {
	position: absolute;
	z-index: 999;
}

.content {
	max-width: 1200px;
	margin: 0 auto;
}

.animalList {
	margin-bottom: 14px;
}
</style>
