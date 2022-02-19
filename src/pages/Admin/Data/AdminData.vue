<template>
	<div style="background-color: #ececec; padding: 20px">
		<a-row :gutter="16">
			<a-col :span="12">
				<a-card title="导出数据" :bordered="false">
					<a-button type="primary">导出</a-button>
				</a-card>
			</a-col>
			<a-col :span="12">
				<a-card title="导入数据" :bordered="false">
					<a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange">
						<p class="ant-upload-drag-icon">
							<inbox-outlined></inbox-outlined>
						</p>
						<p class="ant-upload-text">Click or drag file to this area to upload</p>
						<p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
					</a-upload-dragger>
					<a-button type="primary">导入</a-button>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

// const state = reactive({
// 	exportForm: {},
// 	importForm: {},
// });
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminData',
});
</script>
