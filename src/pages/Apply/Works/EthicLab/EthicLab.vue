<template>
	<div class="wapper">
		<div class="lang-switch">
			<a-switch v-model:checked="state.langcn" checked-children="中文" un-checked-children="EN" />
		</div>
		<div class="content">
			<a-form id="formRef" ref="formRef" :label-wrap="true" name="custom-validation" :label-col="{ style: { width: '120px' } }" label-align="left" :model="state.formState">
				<!-- @finish="handleFinish"
				@validate="handleValidate"
				@finishFailed="handleFinishFailed" -->
				<a-row>
					<a-col :span="24"
						><div class="title">{{ labels.head.title }}</div></a-col
					>
				</a-row>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex" justify="center">
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"
						><a-form-item :label="labels.head.applDate" :name="['head', 'applDate']"><a-input v-model:value="state.formState.head.applDate" disabled /></a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"
						><a-form-item :label="labels.head.apprDate" :name="['head', 'apprDate']"> <a-input v-model:value="state.formState.head.apprDate" disabled /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"
						><a-form-item :label="labels.head.iacucNo" :name="['head', 'iacucNo']"> <a-input v-model:value="state.formState.head.iacucNo" disabled /> </a-form-item
					></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.base.title }}</div></a-col
					>
				</a-row>
				<a-form-item :label="labels.base.name" :rules="ruleNN" :name="['base', 'name']">
					<a-input v-model:value="state.formState.base.name" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" />
				</a-form-item>
				<a-form-item v-if="state.langcn" :rules="ruleNN" :label="labels.base.enname" :name="['base', 'enname']">
					<a-input v-model:value="state.formState.base.enname" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" />
				</a-form-item>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex">
					<a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
						<a-form-item :rules="ruleNN" :label="labels.base.source" :name="['base', 'source']">
							<a-input v-model:value="state.formState.base.source" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" />
						</a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :rules="ruleNN" :label="labels.base.pexptime" :name="['base', 'pexptime']">
							<a-range-picker v-model:value="state.formState.base.pexptime" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" :locale="locale" :disabled-date="disabledDate"
						/></a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :rules="ruleNN" :label="labels.base.director" :name="['base', 'director']"
							><a-input v-model:value="state.formState.base.director" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)"
						/></a-form-item>
					</a-col>
					<a-col v-if="state.langcn" :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item v-if="state.langcn" :rules="ruleNN" :label="labels.base.directorEn" :name="['base', 'directorEn']">
							<a-input v-model:value="state.formState.base.directorEn" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :rules="ruleNN" :label="labels.base.degree" :name="['base', 'degree']">
							<a-select v-model:value="state.formState.base.degree" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)">
								<a-select-option value="professor">{{ labels.others.degree.professor }}</a-select-option>
								<a-select-option value="associateProfessor">{{ labels.others.degree.associateProfessor }}</a-select-option>
								<a-select-option value="researcher">{{ labels.others.degree.researcher }}</a-select-option>
								<a-select-option value="associateResearcher">{{ labels.others.degree.associateResearcher }}</a-select-option>
								<a-select-option value="lecturer">{{ labels.others.degree.lecturer }}</a-select-option>
								<a-select-option value="experimenter">{{ labels.others.degree.experimenter }}</a-select-option>
								<a-select-option value="phDStudent">{{ labels.others.degree.phDStudent }}</a-select-option>
								<a-select-option value="Postgraduate">{{ labels.others.degree.Postgraduate }}</a-select-option>
								<a-select-option value="Undergraduate">{{ labels.others.degree.Undergraduate }}</a-select-option>
								<a-select-option value="other">{{ labels.others.degree.other }}</a-select-option>
							</a-select>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :rules="[{ required: true, validator: validateTel, message: labels.base.tel + ' ' + labels.others.hasErr }]" :label="labels.base.tel" :name="['base', 'tel']">
							<a-input v-model:value="state.formState.base.tel" type="tel" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="state.langcn ? 8 : 16" :xl="state.langcn ? 8 : 16"
						><a-form-item :rules="ruleNN" :label="labels.base.departmant" :name="['base', 'departmant']">
							<a-input v-model:value="state.formState.base.departmant" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
						><a-form-item :rules="[{ required: true, validator: validateEmail, message: labels.base.email + labels.others.hasErr }]" :label="labels.base.email" :name="['base', 'email']">
							<a-input v-model:value="state.formState.base.email" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.expers.title }}</div></a-col
					>
				</a-row>
				<div class="experList" :scroll-y="{ enabled: true }">
					<vxe-table ref="xTable" class="vxe-form-scrollbar" :scroll-y="{ enabled: false }" border :data="state.formState.expers" :edit-config="{ trigger: 'click', mode: 'cell' }" keep-source>
						<vxe-column type="seq" width="60"></vxe-column>
						<vxe-column field="name" :title="labels.expers.name" width="120">
							<template #default="{ row }">
								<a-select
									v-model:value="row.name"
									:disabled="['show', 'adminaduit', 'aduit'].includes(props.action)"
									show-search
									style="width: 100px"
									:default-active-first-option="false"
									:show-arrow="false"
									:filter-option="false"
									:not-found-content="null"
									:options="dataExperNameOption"
									:dropdown-match-select-width="230"
									@search="handleExperNameSearch"
									@change="handleExperNameSearch"
									@select="handleSelectName($event, row)"
									@blur="checkLicense(row)"
								></a-select>
							</template>
						</vxe-column>
						<vxe-column field="degree" :title="labels.expers.degree">
							<template #default="{ row }">
								<a-select v-model:value="row.degree" :style="{ width: '100%' }" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkLicense(row)">
									<a-select-option value="professor">{{ labels.others.degree.professor }}</a-select-option>
									<a-select-option value="associateProfessor">{{ labels.others.degree.associateProfessor }}</a-select-option>
									<a-select-option value="researcher">{{ labels.others.degree.researcher }}</a-select-option>
									<a-select-option value="associateResearcher">{{ labels.others.degree.associateResearcher }}</a-select-option>
									<a-select-option value="lecturer">{{ labels.others.degree.lecturer }}</a-select-option>
									<a-select-option value="experimenter">{{ labels.others.degree.experimenter }}</a-select-option>
									<a-select-option value="phDStudent">{{ labels.others.degree.phDStudent }}</a-select-option>
									<a-select-option value="Postgraduate">{{ labels.others.degree.Postgraduate }}</a-select-option>
									<a-select-option value="Undergraduate">{{ labels.others.degree.Undergraduate }}</a-select-option>
									<a-select-option value="other">{{ labels.others.degree.other }}</a-select-option>
								</a-select>
							</template>
						</vxe-column>
						<vxe-column field="response" :title="labels.expers.response">
							<template #default="{ row }">
								<a-input v-model:value="row.response" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkLicense(row)" />
							</template>
						</vxe-column>
						<vxe-column field="name" :title="labels.expers.experLicense" width="170">
							<template #default="{ row }">
								<a-input v-model:value="row.experLicense" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkLicense(row)" />
							</template>
						</vxe-column>
						<vxe-column field="tel" :title="labels.expers.tel" width="130">
							<template #default="{ row }">
								<a-input v-model:value="row.tel" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkLicense(row)" />
							</template>
						</vxe-column>
						<vxe-column :title="labels.others.ops" width="100">
							<template #default="{ row }">
								<a-button class="btnl" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" type="primary" shape="circle" @click="addExperRow(row)">
									<template #icon><PlusOutlined /></template>
								</a-button>
								<a-button v-if="state.formState.expers.length !== 1" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" type="primary" shape="circle" danger @click="delExperRow(row)">
									<template #icon><DeleteOutlined /></template>
								</a-button>
							</template>
						</vxe-column>
						<vxe-column :title="labels.others.check">
							<template #default="{ row }">
								<a-tag v-if="row.loading" color="processing">{{ labels.others.message.loading }}</a-tag>
								<a-tag v-else-if="row.error.length === 0" color="success">{{ labels.others.message.noerr }}</a-tag>
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
						><a-form-item :rules="ruleNN" :label="labels.animal.animalOrigin" :name="['animal', 'animalOrigin']">
							<a-input v-model:value="state.formState.animal.animalOrigin" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :rules="ruleNN" :label="labels.animal.productionNo" :name="['animal', 'productionNo']">
							<a-radio-group v-model:value="state.formState.animal.productionNo" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)">
								<a-radio :value="1">{{ labels.others.yes }}</a-radio>
								<a-radio :value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :rules="ruleNN" :label="labels.animal.certNo" :name="['animal', 'certNo']">
							<a-radio-group v-model:value="state.formState.animal.certNo" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)">
								<a-radio :value="1">{{ labels.others.yes }}</a-radio>
								<a-radio :value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6"
						><a-form-item :rules="ruleNN" :label="labels.animal.inspecRepo" :name="['animal', 'inspecRepo']">
							<a-radio-group v-model:value="state.formState.animal.inspecRepo" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)">
								<a-radio :value="1">{{ labels.others.yes }}</a-radio>
								<a-radio :value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
				</a-row>
				<div class="animalList" :scroll-y="{ enabled: true }">
					<vxe-table ref="xTableAnimal" class="vxe-form-scrollbar" :scroll-y="{ enabled: false }" border :data="state.formState.animal.detail" keep-source>
						<vxe-column type="seq" width="60"></vxe-column>
						<vxe-column field="species" :title="labels.animal.species">
							<template #default="{ row }">
								<a-input v-model:value="row.species" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="strain" :title="labels.animal.strain">
							<template #default="{ row }">
								<a-input v-model:value="row.strain" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="ageWS" :title="labels.animal.ageWS">
							<template #default="{ row }">
								<a-input v-model:value="row.ageWS" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="sexQF" :title="labels.animal.sexQ">
							<template #default="{ row }">
								<a-input v-model:value.number="row.sexQF" type="number" prefix="♀" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkAnimalLocal(row)" />
								<a-input v-model:value.number="row.sexQM" type="number" prefix="♂" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkAnimalLocal(row)" />
							</template>
						</vxe-column>
						<vxe-column field="bacterio" :title="labels.animal.bacterio">
							<template #default="{ row }">
								<a-select v-model:value="row.bacterio" :style="{ width: '100%' }" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkAnimalLocal(row)">
									<a-select-option value="Ordinary">{{ labels.others.bacterio.Ordinary }}</a-select-option>
									<a-select-option value="clean">{{ labels.others.bacterio.clean }}</a-select-option>
									<a-select-option value="spf">{{ labels.others.bacterio.spf }}</a-select-option>
									<a-select-option value="sterile">{{ labels.others.bacterio.sterile }}</a-select-option>
								</a-select>
							</template>
						</vxe-column>
						<vxe-column field="viral" :title="labels.animal.viral">
							<template #default="{ row }">
								<a-select v-model:value="row.viral" :style="{ width: '100%' }" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @blur="checkAnimalLocal(row)">
									<a-select-option value="yes">{{ labels.others.viral.yes }}</a-select-option>
									<a-select-option value="no">{{ labels.others.viral.no }}</a-select-option>
								</a-select>
							</template>
						</vxe-column>
						<vxe-column :title="labels.others.ops" width="100">
							<template #default="{ row }">
								<a-button class="btnl" type="primary" shape="circle" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" @click="addAnimalRow(row)">
									<template #icon><PlusOutlined /></template>
								</a-button>
								<a-button
									v-if="state.formState.animal.detail.length !== 1"
									:disabled="['show', 'adminaduit', 'aduit'].includes(props.action)"
									type="primary"
									shape="circle"
									danger
									@click="delAnimalRow(row)"
								>
									<template #icon><DeleteOutlined /></template>
								</a-button>
							</template>
						</vxe-column>
						<vxe-column :title="labels.others.check">
							<template #default="{ row }">
								<a-tag v-if="row.error.length === 0" color="success">{{ labels.others.message.noerr }}</a-tag>
								<a-tag v-for="(item, index) in row.error" v-else :key="index" color="error">{{ item }}</a-tag>
							</template>
						</vxe-column>
					</vxe-table>
				</div>
				<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex">
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :label-col="{ style: { width: '220px' } }" :rules="ruleNN" :label="labels.animal.facilitiesLicense" :name="['animal', 'facilitiesLicense']">
							<a-input v-model:value="state.formState.animal.facilitiesLicense" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
						><a-form-item :rules="ruleNN" :label="labels.animal.facilityAddress" :name="['animal', 'facilityAddress']">
							<a-input v-model:value="state.formState.animal.facilityAddress" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" /> </a-form-item
					></a-col>
				</a-row>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.necessity }}</div></a-col
					>
				</a-row>
				<a-form-item :rules="ruleNN" :name="['detail', 'necessity']">
					<a-textarea v-model:value="state.formState.detail.necessity" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" allow-clear :rows="7" />
				</a-form-item>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.reason }}</div></a-col
					>
				</a-row>
				<a-form-item :rules="ruleNN" :name="['detail', 'reason']">
					<a-textarea v-model:value="state.formState.detail.reason" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" allow-clear :rows="7" />
				</a-form-item>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.expDesign }}</div></a-col
					>
				</a-row>
				<a-form-item :rules="ruleNN" :name="['detail', 'expDesign']">
					<a-textarea v-model:value="state.formState.detail.expDesign" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" allow-clear :rows="7" />
				</a-form-item>
				<a-row>
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.harms }}</div></a-col
					>
				</a-row>
				<a-form-item :rules="ruleNN" :name="['detail', 'harms']">
					<a-textarea v-model:value="state.formState.detail.harms" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" allow-clear :rows="7" />
				</a-form-item>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.disposal.title }}</div></a-col
					>
					<a-col :span="23"
						><a-form-item :rules="ruleNN" :name="['detail', 'disposal', 'state']">
							<a-checkbox-group v-model:value="state.formState.detail.disposal.state" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)">
								<a-checkbox value="live">{{ labels.detail.disposal.live }}</a-checkbox>
								<a-checkbox value="death">{{ labels.detail.disposal.death }}</a-checkbox>
							</a-checkbox-group>
						</a-form-item></a-col
					>
					<a-col v-if="state.formState.detail.disposal.state.includes('death')" :span="23"
						><div class="subsubtitle">{{ labels.detail.disposal.disposal }}</div></a-col
					>
					<a-col :span="23">
						<a-form-item v-if="state.formState.detail.disposal.state.includes('death')" :rules="ruleNN" :name="['detail', 'disposal', 'disposal']">
							<a-textarea v-model:value="state.formState.detail.disposal.disposal" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" allow-clear :rows="3" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.poisonous.title }}</div></a-col
					>
					<a-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23"
						><a-form-item :rules="ruleNN" :name="['detail', 'poisonous', 'state']">
							<a-radio-group v-model:value="state.formState.detail.poisonous.state" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)">
								<a-radio :value="1">{{ labels.others.yes }}</a-radio>
								<a-radio :value="0">{{ labels.others.no }}</a-radio>
							</a-radio-group>
						</a-form-item></a-col
					>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.poisonous.declear }}</div></a-col
					>
					<a-col :span="23">
						<a-form-item :rules="ruleNN" :name="['detail', 'poisonous', 'declear']">
							<a-textarea v-model:value="state.formState.detail.poisonous.declear" allow-clear :rows="7" :disabled="['show', 'adminaduit', 'aduit'].includes(props.action)" />
						</a-form-item>
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
						><a-form-item :rules="ruleNN" :name="['detail', 'institutionOpinion', 'state']">
							<a-radio-group v-model:value="state.formState.detail.institutionOpinion.state" :disabled="['show', 'new', 'edit', 'adminaduit'].includes(props.action)">
								<a-radio :value="2">{{ labels.detail.institutionOpinion.modify }}</a-radio>
								<a-radio :value="1">{{ labels.others.agree }}</a-radio>
								<a-radio :value="0">{{ labels.others.disagree }}</a-radio>
								<a-radio :value="-1">{{ labels.others.unset }}</a-radio>
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
					<a-col> {{ state.formState.detail.institutionOpinion.date }} </a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.committeeOption.title }}</div></a-col
					>
					<a-col :span="23"
						><a-form-item :rules="ruleNN" :name="['detail', 'committeeOption', 'state']">
							<a-radio-group v-model:value="state.formState.detail.committeeOption.state" :disabled="['show', 'new', 'edit', 'adminaduit'].includes(props.action)">
								<a-radio :value="3">{{ labels.detail.committeeOption.modifieAgree }}</a-radio>
								<a-radio :value="2">{{ labels.detail.committeeOption.agreeReview }}</a-radio>
								<a-radio :value="1">{{ labels.others.agree }}</a-radio>
								<a-radio :value="0">{{ labels.others.disagree }}</a-radio>
								<a-radio :value="-1">{{ labels.others.unset }}</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-col>
					<a-col :span="23"
						><div class="subsubtitle">{{ labels.detail.committeeOption.suggest }}</div></a-col
					>
					<a-col :span="23">
						<a-textarea v-model:value="state.formState.detail.committeeOption.suggest" :disabled="['show', 'new', 'edit', 'adminaduit'].includes(props.action)" allow-clear :rows="3"
					/></a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">
						{{ labels.detail.committeeOption.institutional }}
					</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="8">{{ state.formState.detail.institutionOpinion.date2 }}</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col> </a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="23">{{ labels.detail.committeeOption.note }}</a-col>
				</a-row>
				<a-row type="flex" justify="end">
					<a-col :span="24"
						><div class="subtitle">{{ labels.detail.remark.title }}</div></a-col
					>
					<a-col :span="23">
						<a-form-item :rules="ruleNN" :name="['detail', 'commitTime', 'state']">
							{{ labels.detail.remark.nths
							}}<a-input-number v-model:value.number="state.formState.detail.commitTime.value" :disabled="['show', 'new', 'edit', 'adminaduit'].includes(props.action)" type="number" />{{
								labels.detail.remark.nthl
							}}
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, computed, onBeforeMount, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { VxeTableInstance } from 'vxe-table';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import RuleObject from 'ant-design-vue/es/form';
import { i18n } from '../../../../utils/ethicLab';
import { applicantApi } from '../../../../api';
import { IAjaxRestlt } from '../../../../types/common';
import 'dayjs/locale/zh-cn';
import { checkEmail, checkPhone } from '../../../../utils/formCheck';

dayjs.locale('zh-cn');

const store = useStore();
const state = reactive({
	langcn: true,
	formState: null,
});

const labels = computed(() => (state.langcn ? i18n.cn : i18n.en));

const xTable = ref({} as VxeTableInstance);
const xTableAnimal = ref({} as VxeTableInstance);

const props = defineProps<{
	action?: string;
}>();

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
	dataExperNameOption.value = [
		{
			value: `${val}@`,
			label: `${val}`,
		},
	];
	if (!res.code) {
		res.data.forEach(d => {
			dataExperNameOption.value.push({
				value: `${d.name}@${d.license}`,
				label: `${d.name}@${d.license}`,
			});
		});
	}
};

function handleSelectName(v, row) {
	row.name = v.split('@')[0] as string;
	row.experLicense = v.split('@')[1] as string;
	state.formState.expers = state.formState.expers.concat();
}

async function checkLicense(row) {
	const res = (await applicantApi.reqEthicLabCheckLicense({ token: '123', row })) as IAjaxRestlt;
	checkLicenseLocal(row);
	if (!res.code) {
		row.error = row.error.concat(res.data);
	}
	state.formState.expers = state.formState.expers.concat();
}

function checkLicenseLocal(row) {
	row.error = [];
	Object.keys(row).forEach(k => {
		if (typeof row[k] !== 'object' && k !== 'loading' && k !== '_X_ROW_KEY' && !row[k]) row.error.push(`${labels.value.expers[k]} ${labels.value.others.nn}`);
	});
	if (!checkPhone(row.tel)) row.error.push(`${labels.value.expers.tel} ${labels.value.others.hasErr}`);
}

const dataExperNameOption = ref<any[]>([]);

const formRef = ref(null);

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
		if (typeof row[k] !== 'object' && k !== '_X_ROW_KEY' && k !== 'sexQF' && k !== 'sexQM' && !row[k]) row.error.push(`${labels.value.animal[k]} ${labels.value.others.nn}`);
		else if ((k === 'sexQF' || k === 'sexQM') && (row[k] === '' || row[k] < 0)) row.error.push(`${labels.value.animal.sexQ}${labels.value.others.hasErr}`);
	});
}

watch(
	() => state.langcn,
	() => {
		state.formState.expers.forEach(element => {
			checkLicenseLocal(element);
		});
		state.formState.animal.detail.forEach(element => {
			checkAnimalLocal(element);
		});
		state.formState = JSON.parse(JSON.stringify(state.formState));
	}
);

const disabledDate = (current: Dayjs) => {
	return current && current < dayjs().add(1, 'month');
};

const ruleNN = [{ required: true, message: labels.value.others.nnItem }];

async function validateEmail(_rule: InstanceType<typeof RuleObject>, value: string) {
	if (checkEmail(value)) return Promise.resolve();
	// eslint-disable-next-line
	return Promise.reject(labels.value.base.email + labels.value.others.hasErr);
}

async function validateTel(_rule: InstanceType<typeof RuleObject>, value: string) {
	if (checkPhone(value)) return Promise.resolve();
	// eslint-disable-next-line
	return Promise.reject(labels.value.base.tel + labels.value.others.hasErr);
}

function getFormData() {
	return formRef.value.validate().then(
		() => {
			const f1 = state.formState.expers.reduce((pre, v) => pre || v.error.length, false);
			const f2 = state.formState.animal.detail.reduce((pre, v) => pre || v.error.length, false);
			if (!f1 && !f2) {
				return Promise.resolve(JSON.parse(JSON.stringify(state.formState)));
			}
			throw new Error('表格中存在错误数据');
		},
		() => {
			throw new Error('表单中存在错误数据');
		}
	);
}

onBeforeMount(async () => {
	state.formState = store.state.apply.formData;
	checkLicenseLocal(state.formState.expers[0]);
	checkAnimalLocal(state.formState.animal.detail[0]);
});

defineExpose({
	getFormData,
});
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
	margin: 20px 0;
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

.btnl {
	margin-right: 7px;
}

/*滚动条整体部分*/
.vxe-form-scrollbar ::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
/*滚动条的轨道*/
.vxe-form-scrollbar ::-webkit-scrollbar-track {
	background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.vxe-form-scrollbar ::-webkit-scrollbar-thumb {
	background-color: #bfbfbf;
	border-radius: 5px;
	border: 1px solid #f1f1f1;
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.vxe-form-scrollbar ::-webkit-scrollbar-thumb:hover {
	background-color: #a8a8a8;
}
.vxe-form-scrollbar ::-webkit-scrollbar-thumb:active {
	background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.vxe-form-scrollbar ::-webkit-scrollbar-corner {
	background-color: #ffffff;
}

// news
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
