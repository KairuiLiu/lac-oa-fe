<template>
	<div class="wapper">
		<div class="content">
			<a-form ref="formRef" label-wrap="true" name="custom-validation" :label-col="{ style: { width: '120px' } }" label-align="left" :model="state.formState">
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
						<a-form-item :name="['base', 'department']" :rules="ruleNN" label="院系（单位）"
							><a-input v-model:value="state.formState.base.department" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)"
						/></a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :name="['base', 'tel']" :rules="[{ required: true, validator: validateTel, message: '电话有误' }]" label="电话">
							<a-input v-model:value="state.formState.base.tel" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :name="['base', 'major']" :rules="ruleNN" label="专业">
							<a-input v-model:value="state.formState.base.major" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :name="['base', 'class']" :rules="ruleNN" label="年级/班级">
							<a-input v-model:value="state.formState.base.class" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
						><a-form-item :name="['base', 'study']" :rules="ruleNN" label="教学课程名称">
							<a-input v-model:value="state.formState.base.study" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
						><a-form-item :name="['base', 'animals']" :rules="ruleNN" label="动物品种">
							<a-checkbox-group v-model:value="state.formState.base.animals" name="animals" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)">
								<a-row>
									<a-col :span="8"> <a-checkbox :value="0">鸡</a-checkbox> </a-col><a-col :span="8"> <a-checkbox :value="1">鸽</a-checkbox> </a-col
									><a-col :span="8"> <a-checkbox :value="2">鸭</a-checkbox> </a-col><a-col :span="8"> <a-checkbox :value="3">鹅</a-checkbox> </a-col
									><a-col :span="8"> <a-checkbox :value="4">小鼠</a-checkbox> </a-col><a-col :span="8"> <a-checkbox :value="5">大鼠</a-checkbox> </a-col
									><a-col :span="8"> <a-checkbox :value="6">兔</a-checkbox> </a-col><a-col :span="8"> <a-checkbox :value="7">犬</a-checkbox> </a-col
									><a-col :span="8"> <a-checkbox :value="8">牛</a-checkbox> </a-col><a-col :span="8"> <a-checkbox :value="9">羊</a-checkbox> </a-col
									><a-col :span="8"> <a-checkbox :value="10">猪</a-checkbox> </a-col><a-col :span="8"> <a-checkbox :value="11">犬</a-checkbox> </a-col
									><a-col>
										<a-checkbox :value="12">其他</a-checkbox>
									</a-col>
									<a-col :span="16">
										<a-input v-model:value="state.formState.base.animalsOthers" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action) || !state.formState.base.animals.includes(12)" />
									</a-col>
								</a-row>
							</a-checkbox-group> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
						><a-form-item :name="['base', 'mOrganism', 'state']" :rules="ruleNN" label="动物微生物级别">
							<a-radio-group v-model:value="state.formState.base.mOrganism.state" name="radioGroup">
								<a-radio :value="0">普通级</a-radio>
								<a-radio :value="1">清洁级</a-radio>
								<a-radio :value="2">SPF级</a-radio>
								<a-radio :value="3"
									>其他（请说明）<a-input
										v-model:value="state.formState.base.mOrganism.detial"
										:disabled="['show', 'adminaduit', 'aduit'].includes(props.action) || state.formState.base.mOrganism.state !== 3"
								/></a-radio>
							</a-radio-group> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :name="['base', 'source']" :rules="ruleNN" label="动物来源">
							<a-input v-model:value="state.formState.base.source" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :name="['base', 'producNo']" :rules="ruleNN" label="生产许可证有无">
							<a-radio-group v-model:value="state.formState.base.producNo" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" name="radioGroup">
								<a-radio :value="1">有</a-radio>
								<a-radio :value="0">无</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :name="['base', 'certNo']" :rules="ruleNN" label="质量合格证明">
							<a-radio-group v-model:value="state.formState.base.certNo" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" name="radioGroup">
								<a-radio :value="1">有</a-radio>
								<a-radio :value="0">无</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :name="['base', 'checkNo']" :rules="ruleNN" label="检疫合格证明">
							<a-radio-group v-model:value="state.formState.base.checkNo" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" name="radioGroup">
								<a-radio :value="1">有</a-radio>
								<a-radio :value="0">无</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
						><a-form-item :name="['base', 'expType', 'state']" :rules="ruleNN" label="动物实验类别">
							<a-radio-group v-model:value="state.formState.base.expType.state" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" name="radioGroup">
								<a-radio :value="1">常规（不具备感染性、放射性、化学危害或其他生物危害性）</a-radio>
								<a-radio :value="0"
									>非常规（请注明）<a-input
										v-model:value="state.formState.base.expType.detial"
										:disabled="['show', 'adminaduit', 'aduit'].includes(props.action) || state.formState.base.expType.state"
								/></a-radio> </a-radio-group></a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
						><a-form-item label="数量及性别">
							<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
								<a-col :span="8"><a-input :value="state.formState.base.aniQF + state.formState.base.aniQM" disabled prefix="总计" suffix="只" /></a-col>
								<a-col :span="8">
									<a-form-item :name="['base', 'aniQF']" :rules="ruleNNP">
										<a-input v-model:value.number="state.formState.base.aniQF" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" prefix="♀" suffix="只" />
									</a-form-item>
								</a-col>
								<a-col :span="8">
									<a-form-item :name="['base', 'aniQM']" :rules="ruleNNP">
										<a-input v-model:value.number="state.formState.base.aniQM" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" prefix="♂" suffix="只" />
									</a-form-item>
								</a-col>
							</a-row> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :rules="ruleNN" :name="['base', 'directorName']" label="实验负责人姓名">
							<a-input v-model:value="state.formState.base.directorName" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item></a-col
					><a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :rules="[{ required: true, validator: validateTel, message: '电话有误' }]" label="移动电话" :name="['base', 'directorTel']">
							<a-input v-model:value="state.formState.base.directorTel" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" type="tel" /> </a-form-item></a-col
					><a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :rules="[{ required: true, validator: validateEmail, message: '邮箱有误' }]" :name="['base', 'directorEmail']" label="邮箱E-mail">
							<a-input v-model:value="state.formState.base.directorEmail" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"><div class="subtitle">二、动物实验概况</div></a-col>
					<a-col :span="23"><div class="subsubtitle">动物实验必要性、实验操作步骤、3R主要措施、实验终末点及动物处置方式、是否使用毒（害）物质：</div></a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="23">
						<a-form-item :name="['overview']" :rules="ruleNN">
							<a-textarea v-model:value="state.formState.overview" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" allow-clear :rows="7" />
						</a-form-item>
					</a-col>
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
import { defineComponent, defineExpose, reactive, onBeforeMount, ref, defineProps } from 'vue';
import { useStore } from 'vuex';
import RuleObject from 'ant-design-vue/es/form';
import { checkEmail, checkPhone } from '../../../../utils/formCheck';

const store = useStore();
const state = reactive({
	langcn: true,
	formState: null,
});

const props = defineProps<{
	action?: string;
}>();

async function validatePos(_rule: InstanceType<typeof RuleObject>, value: string | number) {
	// eslint-disable-next-line
	if (value === '') return Promise.reject('此项不得为空');
	if (value >= 0) return Promise.resolve();
	// eslint-disable-next-line
	return Promise.reject('请输入非负数');
}

async function validateEmail(_rule: InstanceType<typeof RuleObject>, value: string) {
	if (checkEmail(value)) return Promise.resolve();
	// eslint-disable-next-line
	return Promise.reject('邮箱有误');
}

async function validateTel(_rule: InstanceType<typeof RuleObject>, value: string) {
	if (checkPhone(value)) return Promise.resolve();
	// eslint-disable-next-line
	return Promise.reject('电话有误');
}

const ruleNN = [{ required: true, message: '此项目不得为空' }];
const ruleNNP = [{ required: true, validator: validatePos, message: '您需要填入正整数' }];

const formRef = ref(null);

function getFormData() {
	return formRef.value.validate().then(
		() => {
			return Promise.resolve(JSON.parse(JSON.stringify(state.formState)));
		},
		() => {
			throw new Error('表单中存在错误数据');
		}
	);
}

onBeforeMount(async () => {
	state.formState = store.state.apply.formData;
});

defineExpose({ getFormData });
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

:deep(.vxe-header--column) {
	text-align: center;
}

#formRef :deep(.ant-calendar-picker-input.ant-input.ant-input-disabled),
#formRef :deep(*[disabled]),
#formRef :deep(.ant-select-disabled .ant-select-selector),
#formRef :deep(.ant-input-affix-wrapper-disabled),
#formRef :deep(.ant-checkbox-disabled + span),
#formRef :deep(.ant-radio-disabled + span) {
	color: rgba(0, 0, 0, 0.85) !important;
	background-color: #fff !important;
	cursor: not-allowed !important;
	opacity: 1 !important;
}
</style>
