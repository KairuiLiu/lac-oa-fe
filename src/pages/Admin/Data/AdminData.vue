<template>
	<div style="background-color: #ececec; padding: 20px">
		<a-row :gutter="16">
			<a-col :span="12">
				<a-card title="导出数据" :bordered="false">
					<a-range-picker v-model:value="state.exportForm.dateRange" :locale="locale" />
					<a-button type="primary" @click="handleExport">导出</a-button>
				</a-card>
			</a-col>
			<a-col :span="12">
				<a-card title="导入数据" :bordered="false">
					<a-upload-dragger v-model:fileList="state.importForm.fileList" name="file" :multiple="false" action="/api/import" @change="handleChange">
						<p class="ant-upload-drag-icon">
							<inbox-outlined></inbox-outlined>
						</p>
						<p class="ant-upload-text">点击或拖拽上传文件</p>
					</a-upload-dragger>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import { InboxOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';

dayjs.locale('zh-cn');
type RangeValue = [Dayjs, Dayjs];

const store = useStore();
const state = reactive({
	exportForm: { dateRange: ref<RangeValue>() },
	importForm: { fileList: ref([]), loading: false },
});

function handleExport() {
	if (!state.exportForm.dateRange) {
		message.error('请选择时间区间');
		return;
	}
	window.open(`/api/export?from=${state.exportForm.dateRange[0]}&to=${state.exportForm.dateRange[0]}&token=${store.state.userInfo.token}`);
}

const handleChange = (info: UploadChangeParam) => {
	if (info.file.status === 'done') {
		message.success('数据导入成功');
	} else if (info.file.status === 'error') {
		message.error('数据导入失败');
	}
	state.importForm.fileList = [];
};
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminData',
});
</script>
