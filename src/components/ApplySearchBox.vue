<template>
	<div class="searchWapper">
		<div class="easySearch">
			<a-input-search v-model:value="dataTitle" enter-button="搜索" size="large" @search="handleSearch(0)" />
		</div>
		<div class="searechMore" :class="{ active: !state.easySeach }">
			<a-form ref="formRef" :label-col="{ style: { width: '100px' } }" name="advanced_search" class="ant-advanced-search-form">
				<a-row :gutter="24">
					<a-col :span="6">
						<a-form-item name="applyId" label="申请编号">
							<a-input v-model:value="data.applyId" :disabled="state.disable.includes('applyId')"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="applyUserName" label="申请人">
							<a-input v-model:value="data.applyUserName" :disabled="state.disable.includes('applyUserName')"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="applyDate" label="申请日期">
							<a-range-picker v-model:value="data.applyDate" :locale="locale" :disabled="state.disable.includes('applyDate')" :allow-empty="[true, true]" @ok="handleok" />
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="applyAduitState" label="审核状态">
							<a-select ref="select" v-model:value="data.applyAduitState" style="width: 120px" :disabled="state.disable.includes('applyAduitState')">
								<a-select-option :value="-1">不限</a-select-option>
								<a-select-option :value="0">待审核</a-select-option>
								<a-select-option :value="1">已通过</a-select-option>
								<a-select-option :value="2">已拒绝</a-select-option>
								<a-select-option v-if="state.admin" :value="3">待分配</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="applyTitle" label="申请名">
							<a-input v-model:value="data.applyTitle" :disabled="state.disable.includes('applyTitle')"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="applyProp" label="申请用途">
							<a-select ref="select" v-model:value="data.applyProp" style="width: 120px" :disabled="state.disable.includes('applyProp')">
								<a-select-option :value="-1">不限</a-select-option>
								<a-select-option :value="0">教学用</a-select-option>
								<a-select-option :value="1">科研项目</a-select-option>
								<a-select-option :value="1">科研实验</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="notFirst" label="申请次数">
							<a-select ref="select" v-model:value="data.notFirst" style="width: 120px" :disabled="state.disable.includes('notFirst')">
								<a-select-option :value="-1">不限</a-select-option>
								<a-select-option :value="0">非首次申请</a-select-option>
								<a-select-option :value="1">首次申请</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item name="completeMatching" label="匹配模式">
							<a-select ref="select" v-model:value="data.completeMatching" style="width: 120px" :disabled="state.disable.includes('completeMatching')">
								<a-select-option :value="0">模糊匹配</a-select-option>
								<a-select-option :value="1">全字匹配</a-select-option>
							</a-select>
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
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { UpOutlined, DownOutlined } from '@ant-design/icons-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { ISearchCondition } from '../types/admin';

dayjs.locale('zh-cn');
type RangeValue = [Dayjs, Dayjs];

const props = defineProps<{
	disable?: string[];
	easySeach?: boolean;
	admin?: boolean;
}>();

const emit = defineEmits<{
	(e: 'search', condition: ISearchCondition): void;
}>();

const state = reactive({
	easySeach: props.easySeach === undefined ? true : props.easySeach,
	disable: props?.disable || [],
	admin: props?.admin || false,
});

const searchInit = {
	applyId: '',
	applyUserName: '',
	applyDate: ref<RangeValue>(),
	applyAduitState: -1,
	applyProp: -1,
	applyTitle: '',
	notFirst: -1,
	completeMatching: 0,
};

const data = ref(JSON.parse(JSON.stringify(searchInit)));

const dataTitle = ref('');

function handleSearch(type) {
	if (state.easySeach || type === 0) emit('search', { applyTitle: dataTitle.value });
	else {
		emit('search', data.value);
	}
}

function clearSearch() {
	data.value = JSON.parse(JSON.stringify(searchInit));
}

function handleok(dates) {
	console.log(dates);
}
</script>

<script lang="ts">
export default defineComponent({
	name: 'ApplySearchBox',
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
		border-top: #fff;
		border-left: #fff;
		border-right: #fff;
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
</style>
