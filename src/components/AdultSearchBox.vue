<template>
	<div class="searchWapper">
		<div class="easySearch">
			<a-input-search v-model:value="dataTitle" enter-button="搜索" size="large" @search="handleSearch(0)" />
		</div>
		<div class="searechMore" :class="{ active: !state.easySeach }">
			<a-form ref="formRef" :label-col="{ style: { width: '100px' } }" name="advanced_search" class="ant-advanced-search-form">
				<a-row :gutter="24">
					<a-col :span="6">
						<a-form-item name="userName" label="用户名">
							<a-input v-model:value="data.userName" :disabled="state.disable.includes('userName')"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="type" label="用户类型">
							<a-input v-model:value="data.type" :disabled="state.disable.includes('type')"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="onWork" label="五分钟内在线">
							<a-select ref="select" v-model:value="data.onWork" style="width: 120px" :disabled="state.disable.includes('onWork')">
								<a-select-option :value="-1">不限</a-select-option>
								<a-select-option :value="0">否</a-select-option>
								<a-select-option :value="1">是</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="workings" label="处理中工作">
							<a-slider v-model:value="data.workings" range :marks="marks" :step="10" class="slide-picker" />
							<!-- <a-range-picker v-model:value="data.onWork" :locale="locale" :disabled="state.disable.includes('workings')" /> -->
						</a-form-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="24" style="text-align: right">
						<a-button type="primary" html-type="submit" @click="handleSearch(1)">搜索</a-button>
						<a-button style="margin: 0 8px" @click="clearSearch">清空</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<div class="searchOption">
			<a-button v-if="state.easySeach" type="link" @click="state.easySeach = !state.easySeach"><down-outlined />更多选项</a-button>
			<a-button v-else type="link" @click="state.easySeach = !state.easySeach"><up-outlined />简略搜索</a-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { UpOutlined, DownOutlined } from '@ant-design/icons-vue';
import { IAduitSearchCondition } from '../types/admin';

const props = defineProps<{
	disable?: string[];
}>();

const emit = defineEmits<{
	(e: 'search', condition: IAduitSearchCondition): void;
}>();

const state = reactive({
	easySeach: true,
	disable: props?.disable || [],
});

const searchInit = {
	userName: '',
	type: '',
	onWork: -1,
	workings: [0, 100],
};

const data = ref(JSON.parse(JSON.stringify(searchInit)));

const dataTitle = ref('');

const marks = ref<Record<number, any>>({
	0: '0件',
	100: '100+件',
});

function handleSearch(type) {
	if (state.easySeach || type === 0) emit('search', { userName: dataTitle.value });
	else {
		emit('search', data.value);
	}
}

function clearSearch() {
	data.value = JSON.parse(JSON.stringify(searchInit));
}
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdultSearchBox',
});
</script>

<style lang="less" scoped>
.searchWapper {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 0.6vw rgba(0, 0, 0, 0.2);
	border: rgba(217, 217, 217) 1px solid;
	border-radius: 2px;
	:deep(.easySearch input) {
		border-top: none !important;
		border-left: none !important;
		border-right: none !important;
	}
}

.searechMore {
	height: 0;
	overflow: hidden;
	&.active {
		height: unset;
		padding: 16px 1vw;
	}
}

.searchOption {
	align-self: flex-start;
}

.slide-picker {
	width: 80%;
}
</style>
