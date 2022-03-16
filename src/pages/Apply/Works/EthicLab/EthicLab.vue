<template>
	<div class="wapper">
		<div class="lang-switch">
			<a-switch v-model:checked="state.langcn" checked-children="中文" un-checked-children="EN" />
		</div>
		<div class="content">
			<a-form ref="formRef" name="custom-validation" :label-col="{ style: { width: '100px' } }" label-align="left" :model="state.formState">
				<!-- :rules="rules"
				v-bind="layout"
				@finish="handleFinish"
				@validate="handleValidate"
				@finishFailed="handleFinishFailed" -->
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
						><a-form-item :label="labels.head.apprDate" name="applDate"> <a-input v-model:value="state.formState.head.apprDate" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"
						><a-form-item :label="labels.head.iacucNo" name="applDate"> <a-input v-model:value="state.formState.head.iacucNo" /> </a-form-item
					></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.base.title }}</div></a-col
					>
				</a-row>
				<a-form-item :label="labels.base.name" name="applDate"> <a-input v-model:value="state.formState.base.name" /> </a-form-item>
				<a-form-item :label="labels.base.source" name="applDate"> <a-input v-model:value="state.formState.base.source" /> </a-form-item>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex">
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :label="labels.base.director" name="applDate"><a-input v-model:value="state.formState.base.director" /></a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :label="labels.base.degree" name="applDate"> <a-input v-model:value="state.formState.base.degree" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :label="labels.base.tel" name="applDate"> <a-input v-model:value="state.formState.base.tel" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16"
						><a-form-item :label="labels.base.departmant" name="applDate"> <a-input v-model:value="state.formState.base.departmant" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :label="labels.base.email" name="applDate"> <a-input v-model:value="state.formState.base.email" /> </a-form-item
					></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.expers.title }}</div></a-col
					>
				</a-row>
				<div class="experList" :scroll-y="{ enabled: true }">
					<vxe-table ref="xTable" :scroll-y="{ enabled: false }" border :data="state.formState.expers" :edit-config="{ trigger: 'click', mode: 'cell' }" keep-source>
						<vxe-column type="seq" width="60"></vxe-column>
						<vxe-column field="name" :title="labels.expers.name" width="250">
							<template #default="{ row }">
								<a-select
									v-model:value="row.name"
									show-search
									style="width: 230px"
									:default-active-first-option="false"
									:show-arrow="false"
									:filter-option="false"
									:not-found-content="null"
									:options="dataExperNameOption"
									@search="handleExperNameSearch"
									@change="handleExperNameSearch"
									@select="handleSelectName($event, row)"
									@blur="checkLicenseLocal(row)"
								></a-select>
							</template>
						</vxe-column>
						<vxe-column field="degree" :title="labels.expers.degree">
							<template #default="{ row }">
								<a-input v-model:value="row.degree" @blur="checkLicenseLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="response" :title="labels.expers.response">
							<template #default="{ row }">
								<a-input v-model:value="row.response" @blur="checkLicenseLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="name" :title="labels.expers.experLicense">
							<template #default="{ row }">
								<a-input v-model:value="row.experLicense" @blur="checkLicense(row)" />
							</template>
						</vxe-column>
						<vxe-column field="tel" :title="labels.expers.tel">
							<template #default="{ row }">
								<a-input v-model:value="row.tel" @blur="checkLicenseLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column :title="labels.others.ops">
							<template #default="{ row }">
								<a-button type="primary" shape="circle" @click="addExperRow(row)">
									<template #icon><PlusOutlined /></template>
								</a-button>
								<a-button v-if="state.formState.expers.length !== 1" type="primary" shape="circle" danger @click="delExperRow(row)">
									<template #icon><DeleteOutlined /></template>
								</a-button>
							</template>
						</vxe-column>
						<vxe-column :title="labels.others.check">
							<template #default="{ row }">
								<a-tag v-if="row.loading" color="processing">校验中</a-tag>
								<a-tag v-else-if="row.error.length === 0" color="success">未检出错误</a-tag>
								<a-tag v-for="(item, index) in row.error" v-else :key="index" color="error">{{ item }}</a-tag>
							</template>
						</vxe-column>
					</vxe-table>
				</div>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.animal.title }}</div></a-col
					>
				</a-row>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex">
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :label="labels.animal.animalOrigin" name="applDate"> <a-input v-model:value="state.formState.animal.animalOrigin" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :label="labels.animal.productionNo" name="applDate">
							<a-radio-group v-model:value="state.formState.animal.productionNo" name="radioGroup">
								<a-radio :value="1">{{ labels.others.yes }}</a-radio>
								<a-radio :value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :label="labels.animal.certNo" name="applDate">
							<a-radio-group v-model:value="state.formState.animal.certNo" name="radioGroup">
								<a-radio :value="1">{{ labels.others.yes }}</a-radio>
								<a-radio :value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :label="labels.animal.inspecRepo" name="applDate">
							<a-radio-group v-model:value="state.formState.animal.inspecRepo" name="radioGroup">
								<a-radio :value="1">{{ labels.others.yes }}</a-radio>
								<a-radio :value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
				</a-row>
				<div class="animalList" :scroll-y="{ enabled: true }">
					<vxe-table ref="xTableAnimal" :scroll-y="{ enabled: false }" border :data="state.formState.animal.detail" keep-source>
						<vxe-column type="seq" width="60"></vxe-column>
						<vxe-column field="species" :title="labels.animal.species">
							<template #default="{ row }">
								<a-input v-model:value="row.species" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="strain" :title="labels.animal.strain">
							<template #default="{ row }">
								<a-input v-model:value="row.strain" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="ageWS" :title="labels.animal.ageWS">
							<template #default="{ row }">
								<a-input v-model:value="row.ageWS" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="sexQF" :title="labels.animal.sexQ">
							<template #default="{ row }">
								<a-input v-model:value="row.sexQF" prefix="♀" @blur="checkAnimalLocal(row)" />
								<a-input v-model:value="row.sexQM" prefix="♂" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="bacterio" :title="labels.animal.bacterio">
							<template #default="{ row }">
								<a-input v-model:value="row.bacterio" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="viral" :title="labels.animal.viral">
							<template #default="{ row }">
								<a-input v-model:value="row.viral" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column :title="labels.others.ops">
							<template #default="{ row }">
								<a-button type="primary" shape="circle" @click="addAnimalRow(row)">
									<template #icon><PlusOutlined /></template>
								</a-button>
								<a-button v-if="state.formState.animal.detail.length !== 1" type="primary" shape="circle" danger @click="delAnimalRow(row)">
									<template #icon><DeleteOutlined /></template>
								</a-button>
							</template>
						</vxe-column>
						<vxe-column :title="labels.others.check">
							<template #default="{ row }">
								<a-tag v-if="row.error.length === 0" color="success">未检出错误</a-tag>
								<a-tag v-for="(item, index) in row.error" v-else :key="index" color="error">{{ item }}</a-tag>
							</template>
						</vxe-column>
					</vxe-table>
				</div>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex">
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :label="labels.animal.facilitiesLicense" name="applDate"> <a-input v-model:value="state.formState.animal.facilitiesLicense" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :label="labels.animal.facilityAddress" name="applDate"> <a-input v-model:value="state.formState.animal.facilityAddress" /> </a-form-item
					></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.necessity }}</div></a-col
					>
					<a-textarea v-model:value="state.formState.detail.necessity" allow-clear :rows="7" />
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.reason }}</div></a-col
					>
					<a-textarea v-model:value="state.formState.detail.reason" allow-clear :rows="7" />
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.expDesign }}</div></a-col
					>
					<a-textarea v-model:value="state.formState.detail.expDesign" allow-clear :rows="7" />
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.harms }}</div></a-col
					>
					<a-textarea v-model:value="state.formState.detail.harms" allow-clear :rows="7" />
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.disposal.title }}</div></a-col
					>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.disposal.live }}</div></a-col
					>
					<a-col :span="23"> <a-textarea v-model:value="state.formState.detail.disposal.live" allow-clear :rows="3" /></a-col>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.disposal.death }}</div></a-col
					>
					<a-col :span="23"> <a-textarea v-model:value="state.formState.detail.disposal.death" allow-clear :rows="3" /></a-col>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.disposal.disposal }}</div></a-col
					>
					<a-col :span="23"> <a-textarea v-model:value="state.formState.detail.disposal.disposal" allow-clear :rows="3" /></a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.poisonous.title }}</div></a-col
					>
					<a-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23"
						><a-form-item name="applDate">
							<a-radio-group v-model:value="state.formState.detail.poisonous.state" name="radioGroup">
								<a-radio :value="1">{{ labels.others.yes }}</a-radio>
								<a-radio :value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.poisonous.declear }}</div></a-col
					>
					<a-col :span="23">
						<a-textarea v-model:value="state.formState.detail.poisonous.declear" allow-clear :rows="7" />
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
					<a-col> {{ state.formState.detail.institutionOpinion.date }} </a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.institutionOpinion.title }}</div></a-col
					>
					<a-col :span="23"
						><a-form-item name="applDate">
							<a-radio-group v-model:value="state.formState.detail.institutionOpinion.state" name="radioGroup">
								<a-radio :value="2">{{ labels.detail.institutionOpinion.modify }}</a-radio>
								<a-radio :value="1">{{ labels.others.agree }}</a-radio>
								<a-radio :value="0">{{ labels.others.disagree }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">
						<pre>{{ labels.detail.institutionOpinion.principal }}{{ state.formState.detail.institutionOpinion.principal }}</pre>
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">
						<pre>{{ labels.detail.institutionOpinion.department }}</pre>
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col> {{ state.formState.detail.institutionOpinion.date2 }} </a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.committeeOption.title }}</div></a-col
					>
					<a-col :span="23"
						><a-form-item name="applDate">
							<a-radio-group v-model:value="state.formState.detail.committeeOption.state" name="radioGroup">
								<a-radio :value="3">{{ labels.detail.committeeOption.modifieAgree }}</a-radio>
								<a-radio :value="2">{{ labels.detail.committeeOption.agreeReview }}</a-radio>
								<a-radio :value="1">{{ labels.others.agree }}</a-radio>
								<a-radio :value="0">{{ labels.others.disagree }}</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-col>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.committeeOption.suggest }}</div></a-col
					>
					<a-col :span="23"> <a-textarea v-model:value="state.formState.detail.committeeOption.suggest" allow-clear :rows="3" /></a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">
						{{ labels.detail.committeeOption.institutional }}
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">{{ labels.detail.committeeOption.institutional }}</a-col>
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
							<a-radio-group v-model:value="state.formState.detail.commitTime" name="radioGroup">
								<a-radio :value="1">{{ labels.detail.remark.fst }}</a-radio>
								<a-radio :value="0">{{ labels.detail.remark.nths }}<a-input-number v-model:value="state.formState.detail.commitTime" />{{ labels.detail.remark.nthl }}</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, defineExpose, reactive, computed, onBeforeMount, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { VxeTableInstance } from 'vxe-table';
import { i18n } from '../../../../utils/ethicLab';
import { applicantApi } from '../../../../api';
import { IAjaxRestlt } from '../../../../types/common';

const store = useStore();
const state = reactive({
	langcn: true,
	formState: null,
});

const labels = computed(() => (state.langcn ? i18n.cn : i18n.en));

const xTable = ref({} as VxeTableInstance);
const xTableAnimal = ref({} as VxeTableInstance);

const addExperRow = async (row: any) => {
	// eslint-disable-next-line
	const idx = state.formState.expers.findIndex(d => d._X_ROW_KEY === row._X_ROW_KEY);
	const newRow = { name: '', degree: '', response: '', experLicense: '', tel: '', error: [], loading: false };
	checkLicenseLocal(newRow);
	state.formState.expers.splice(idx + 1, 0, newRow);
	state.formState.expers = state.formState.expers.concat();
};

const delExperRow = async (row: any) => {
	// eslint-disable-next-line
	const idx = state.formState.expers.findIndex(d => d._X_ROW_KEY === row._X_ROW_KEY);
	const newRow = { name: '', degree: '', response: '', experLicense: '', tel: '', error: [], loading: false };
	state.formState.expers.splice(idx, 1);
	state.formState.expers = state.formState.expers.concat();
};

const handleExperNameSearch = async (val: string) => {
	const res = (await applicantApi.reqEthicLabLicense({ token: '213', keyword: val })) as unknown as IAjaxRestlt;
	dataExperNameOption.value = [];
	if (!res.code) {
		res.data.forEach(d => {
			dataExperNameOption.value.push({
				value: `${d.name}-${d.license}`,
				label: `${d.name}-${d.license}`,
			});
		});
	}
};

function handleSelectName(v, row) {
	row.name = v.split('-')[0] as string;
	row.experLicense = v.split('-')[1] as string;
	state.formState.expers = state.formState.expers.concat();
}

async function checkLicense(row) {
	row.loading = true;
	const res = (await applicantApi.reqEthicLabCheckLicense({ token: '123', row })) as IAjaxRestlt;
	checkLicenseLocal(row);
	if (!res.code) {
		row.loading = false;
		row.error = row.error.concat(res.data);
	}
	state.formState.expers = state.formState.expers.concat();
}

function checkLicenseLocal(row) {
	row.error = [];
	Object.keys(row).forEach(k => {
		if (typeof row[k] !== 'object' && k !== 'loading' && k !== '_X_ROW_KEY' && !row[k]) row.error.push(`${labels.value.expers[k]}不能为空`);
	});
}

const dataExperNameOption = ref<any[]>([]);

const addAnimalRow = async (row: any) => {
	// eslint-disable-next-line
	const idx = state.formState.animal.detail.findIndex(d => d._X_ROW_KEY === row._X_ROW_KEY);
	const newRow = { species: '', strain: '', ageWS: '', sexQF: 0, sexQM: 0, bacterio: '', viral: '', error: [] };
	checkAnimalLocal(newRow);
	state.formState.animal.detail.splice(idx + 1, 0, newRow);
	state.formState.animal.detail = state.formState.animal.detail.concat();
};

const delAnimalRow = async (row: any) => {
	// eslint-disable-next-line
	const idx = state.formState.animal.detail.findIndex(d => d._X_ROW_KEY === row._X_ROW_KEY);
	state.formState.animal.detail.splice(idx, 1);
	state.formState.animal.detail = state.formState.animal.detail.concat();
};

function checkAnimalLocal(row) {
	row.error = [];
	Object.keys(row).forEach(k => {
		if (typeof row[k] !== 'object' && k !== '_X_ROW_KEY' && k !== 'sexQF' && k !== 'sexQM' && !row[k]) row.error.push(`${labels.value.animal[k]}不能为空`);
		else if ((k === 'sexQF' || k === 'sexQM') && !(row[k] >= 0)) row.error.push('性别/数量有误');
	});
}

watch(
	() => state.langcn,
	() => {
		state.formState = JSON.parse(JSON.stringify(state.formState));
	}
);

onBeforeMount(() => {
	state.formState = store.state.apply.formData;
	checkLicenseLocal(state.formState.expers[0]);
	checkAnimalLocal(state.formState.animal.detail[0]);
});

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

.animalList {
	margin-bottom: 14px;
}
</style>
