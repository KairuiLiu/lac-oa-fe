<template>
	<div class="wapper">
		<div class="lang-switch">
			<a-switch v-model:checked="state.langcn" checked-children="中文" un-checked-children="EN" />
		</div>
		<div class="content">
			<a-form
				ref="formRef"
				name="custom-validation"
				:label-col="{ style: { width: '100px' } }"
				label-align="left"
				:model="formState"
				:rules="rules"
				v-bind="layout"
				@finish="handleFinish"
				@validate="handleValidate"
				@finishFailed="handleFinishFailed"
			>
				<a-row>
					<a-col :span="24"
						><div class="title">{{ labels.head.title }}</div></a-col
					>
				</a-row>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex" justify="center">
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"
						><a-form-item :label="labels.head.applDate" name="applDate"><a-input v-model:value="state.formState.head.applDate" /></a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"
						><a-form-item :label="labels.head.apprDate" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"
						><a-form-item :label="labels.head.iacucNo" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.base.title }}</div></a-col
					>
				</a-row>
				<a-form-item :label="labels.base.name" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item>
				<a-form-item :label="labels.base.source" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex">
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :label="labels.base.director" name="applDate"><a-input v-model:value="state.formState.head.applDate" /></a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :label="labels.base.degree" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :label="labels.base.tel" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16"
						><a-form-item :label="labels.base.departmant" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :label="labels.base.email" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.expers.title }}</div></a-col
					>
				</a-row>
				<a-row> 不拉布拉 </a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.animal.title }}</div></a-col
					>
				</a-row>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex">
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :label="labels.animal.animalOrigin" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :label="labels.animal.productionNo" name="applDate">
							<a-radio-group v-model:value="value" name="radioGroup">
								<a-radio value="1">{{ labels.others.yes }}</a-radio>
								<a-radio value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :label="labels.animal.certNo" name="applDate">
							<a-radio-group v-model:value="value" name="radioGroup">
								<a-radio value="1">{{ labels.others.yes }}</a-radio>
								<a-radio value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :label="labels.animal.inspecRepo" name="applDate">
							<a-radio-group v-model:value="value" name="radioGroup">
								<a-radio value="1">{{ labels.others.yes }}</a-radio>
								<a-radio value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
				</a-row>
				<a-row> 不拉布拉 </a-row>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex">
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :label="labels.animal.facilitiesLicense" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :label="labels.animal.facilityAddress" name="applDate"> <a-input v-model:value="state.formState.head.applDate" /> </a-form-item
					></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.necessity }}</div></a-col
					>
					<a-textarea v-model:value="value2" allow-clear :rows="7" />
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.reason }}</div></a-col
					>
					<a-textarea v-model:value="value2" allow-clear :rows="7" />
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.expDesign }}</div></a-col
					>
					<a-textarea v-model:value="value2" allow-clear :rows="7" />
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.harms }}</div></a-col
					>
					<a-textarea v-model:value="value2" allow-clear :rows="7" />
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.disposal.title }}</div></a-col
					>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.disposal.live }}</div></a-col
					>
					<a-col :span="23"> <a-textarea v-model:value="value2" allow-clear :rows="3" /></a-col>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.disposal.death }}</div></a-col
					>
					<a-col :span="23"> <a-textarea v-model:value="value2" allow-clear :rows="3" /></a-col>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.disposal.disposal }}</div></a-col
					>
					<a-col :span="23"> <a-textarea v-model:value="value2" allow-clear :rows="3" /></a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.poisonous.title }}</div></a-col
					>
					<a-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23"
						><a-form-item name="applDate">
							<a-radio-group v-model:value="value" name="radioGroup">
								<a-radio value="1">{{ labels.others.yes }}</a-radio>
								<a-radio value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.poisonous.declear }}</div></a-col
					>
					<a-col :span="23">
						<a-textarea v-model:value="value2" allow-clear :rows="7" />
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.statement.title }}</div></a-col
					>
					<a-col :span="24">
						<pre>{{ labels.detail.statement.content }}</pre>
					</a-col>
					<a-col :span="8">
						<pre>{{ labels.detail.statement.declarant }}</pre>
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col> 2022.2.22 </a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.institutionOpinion.title }}</div></a-col
					>
					<a-col :span="23"
						><a-form-item name="applDate">
							<a-radio-group v-model:value="value" name="radioGroup">
								<a-radio value="2">{{ labels.detail.institutionOpinion.modify }}</a-radio>
								<a-radio value="1">{{ labels.others.agree }}</a-radio>
								<a-radio value="0">{{ labels.others.disagree }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">
						<pre>{{ labels.detail.institutionOpinion.principal }}</pre>
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">
						<pre>{{ labels.detail.institutionOpinion.department }}</pre>
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col> 2022.2.22 </a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.committeeOption.title }}</div></a-col
					>
					<a-col :span="23"
						><a-form-item name="applDate">
							<a-radio-group v-model:value="value" name="radioGroup">
								<a-radio value="3">{{ labels.detail.committeeOption.modifieAgree }}</a-radio>
								<a-radio value="2">{{ labels.detail.committeeOption.agreeReview }}</a-radio>
								<a-radio value="1">{{ labels.others.agree }}</a-radio>
								<a-radio value="0">{{ labels.others.disagree }}</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-col>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.committeeOption.suggest }}</div></a-col
					>
					<a-col :span="23"> <a-textarea v-model:value="value2" allow-clear :rows="3" /></a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">
						{{ labels.detail.committeeOption.institutional }}
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">{{ labels.detail.committeeOption.department }}</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col> 2022.2.22 </a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="23">{{ labels.detail.committeeOption.note }}</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.remark.title }}</div></a-col
					>
					<a-col :span="23">
						<a-form-item name="applDate">
							<a-radio-group v-model:value="value" name="radioGroup">
								<a-radio value="1">{{ labels.detail.remark.fst }}</a-radio>
								<a-radio value="0">{{ labels.detail.remark.nths }}<a-input-number v-model:value="value1" />{{ labels.detail.remark.nthl }}</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-col>
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
</style>
