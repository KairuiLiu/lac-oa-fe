<template>
	<div class="manageWapper">
		<a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" class="left-side-bar" style="width: 256px" mode="inline">
			<a-sub-menu v-for="item in state.aduitType" :key="item.name">
				<template #icon>
					<sliders-outlined />
				</template>
				<template #title>{{ item.name }}</template>
				<a-menu-item v-for="item2 in item.subType" :key="`[${item.name}, ${item2.name}]`" @click="handleMenu([item.name, item2.name])">{{ item2.name }}</a-menu-item>
			</a-sub-menu>
		</a-menu>
		<div class="listWapper">
			<div v-if="state.loading" class="loading"><a-spin size="large" /></div>
			<div v-else-if="selectedKeys.length" class="content">
				<div class="toolBar">
					<a-popconfirm title="确定删除分组?" ok-text="确定" cancel-text="取消" @confirm="handleGroupDelete">
						<a-button danger ghost><close-outlined />删除分组</a-button>
					</a-popconfirm>
					<a-button type="primary" style="margin-right: 15px" @click="showGroupAdd"><plus-outlined />新建分组</a-button>
				</div>
				<a-list item-layout="vertical" size="large" :pagination="state.pagination" :data-source="state.aduitList">
					<template #renderItem="{ item }">
						<a-list-item key="item.userName" class="userListItem">
							<template #extra>
								<a-button type="link" @click="showUserEdit(item.userId)">编辑帐号</a-button>
								<a-popconfirm v-if="item.enable" title="确定停用帐号?" ok-text="确定" cancel-text="取消" @confirm="handleUserDisable(item.userId)">
									<a-button type="link">停用帐号</a-button>
								</a-popconfirm>
								<a-popconfirm v-else title="确定启用帐号?" ok-text="确定" cancel-text="取消" @confirm="handleUserEnable(item.userId)">
									<a-button type="link">启用帐号</a-button>
								</a-popconfirm>
								<a-button v-if="state.curType[0] === '供应商'" type="link" @click="toSupportEdit(item.userId)">编辑产品</a-button>
							</template>
							<a-list-item-meta :description="item.description">
								<template #title>
									{{ item.userName }}
								</template>
								<template #avatar><a-avatar :src="item.face" /></template>
							</a-list-item-meta>
							{{ item.content }}
						</a-list-item>
					</template>
				</a-list>
			</div>
		</div>
	</div>
	<a-modal
		v-model:visible="state.groupAddVisible"
		title="新建分组"
		:confirm-loading="state.submitLoading"
		:cancel-button-props="{ disabled: state.submitLoading }"
		:closable="false"
		ok-text="提交"
		cancel-text="取消"
		@ok="handleGroupAdd"
	>
		<a-form :model="state.newGroupStat" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
			<a-form-item label="组名" name="groupName">
				<a-input v-model:value="state.newGroupStat.groupName" />
			</a-form-item>
			<a-form-item label="所属组" name="groupType">
				<a-select ref="select" v-model:value="state.newGroupStat.parentGroup" :options="newGroupOptions" @focus="focus"></a-select>
			</a-form-item>
		</a-form>
	</a-modal>
	<!-- <a-modal
		v-model:visible="state.userEditVisible"
		title="编辑用户"
		:confirm-loading="state.submitLoading"
		:cancel-button-props="{ disabled: state.userEditSubmitLoading }"
		:closable="false"
		ok-text="提交"
		cancel-text="取消"
		@ok="handleUserEdit"
	>
		<a-form :model="state.userEditStat" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
			<a-form-item label="用户编号" name="userId">
				<a-input v-model:value="state.userEditStat.userId" disabled />
			</a-form-item>
			<a-form-item label="用户名" name="userName">
				<a-input v-model:value="state.userEditStat.userName" />
			</a-form-item>
			<a-form-item label="所属组" name="userType">
				<a-cascader ref="select" v-model:value="state.userEditStat.group" :options="userGroup" @focus="focus"></a-cascader>
			</a-form-item>
		</a-form>
	</a-modal> -->
	<UserProfile :visible="state.userEditVisible" :user-id="state.userEditStat.userId" :group-options="getOptions(state.aduitType, true)" @cancel="handleProfileCancel"></UserProfile>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, reactive, computed } from 'vue';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { adminApi } from '../../../api';
import { IAjaxRestlt } from '../../../types/common';
import UserProfile from '../../../components/UserProfile.vue';

const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
const store = useStore();
const router = useRouter();

const state = reactive({
	aduitType: [],
	aduitList: [],
	curType: ref(''),
	loading: false,
	pagination: {
		pageSize: 10,
	},
	groupAddVisible: false,
	submitLoading: false,
	newGroupStat: {
		groupName: '',
		parentGroup: null,
	},
	userEditVisible: false,
	userEditStat: {
		userId: null,
	},
});

function getOptions(arr, deep) {
	return arr.map(d => {
		if (!deep || !Object.keys(d).includes('subType')) return { value: d.name, label: d.name };
		return { value: d.name, label: d.name, children: getOptions(d.subType, deep) };
	});
}

const newGroupOptions = computed(() => getOptions(state.aduitType, false));

onMounted(async () => {
	if (!store.state.admin?.aduitType) {
		const res = await store.dispatch('admin/getAduitType');
		if (!res) {
			message.error('获取数据失败');
		}
	}
	state.aduitType = store.state.admin.aduitType;
});

async function handleMenu(type) {
	state.loading = true;
	state.aduitList = [];
	state.curType = '';
	const result = (await adminApi.reqAduitList({ token: '123', aduitType: type })) as IAjaxRestlt;
	state.loading = false;
	if (result?.code) return false;
	state.curType = type;
	state.aduitList = result.data;
	return true;
}

async function handleGroupDelete() {
	if (state.aduitList.length) {
		message.error('无法删除非空分组');
		return false;
	}
	const res = (await adminApi.reqDeleteAduitGroup({ token: '123', aduitType: state.aduitType })) as IAjaxRestlt;
	if (res.code) {
		message.error('删除失败');
	} else {
		router.go(0);
	}
	return true;
}

function showGroupAdd() {
	state.newGroupStat.parentGroup = state.curType;
	state.newGroupStat.groupName = '';
	state.groupAddVisible = true;
}

async function handleGroupAdd() {
	if (state.newGroupStat.groupName.trim().length === 0) {
		message.error('组名不得为空');
		return false;
	}
	state.submitLoading = true;
	const result = (await adminApi.reqAddAduitGroup({ token: '213', aduitType: state.newGroupStat.parentGroup, groupName: state.newGroupStat.groupName.trim() })) as IAjaxRestlt;
	state.submitLoading = false;
	if (result.code) {
		message.error('添加失败');
		return false;
	}
	message.success('添加成功');
	state.groupAddVisible = false;
	router.go(0);
	return true;
}

async function handleUserDisable(userId) {
	const result = (await adminApi.reqUserDisable({ token: '123', userId })) as IAjaxRestlt;
	if (result.code) {
		message.error('停用失败');
		return false;
	}
	message.success('停用成功');
	router.go(0);
	return true;
}

async function handleUserEnable(userId) {
	const result = (await adminApi.reqUserEnable({ token: '123', userId })) as IAjaxRestlt;
	if (result.code) {
		message.error('启用失败');
		return false;
	}
	message.success('启用成功');
	router.go(0);
	return true;
}

function showUserEdit(userId) {
	state.userEditStat.userId = userId;
	state.userEditVisible = true;
}

function handleProfileCancel() {
	state.userEditVisible = false;
}

function toSupportEdit(supportId) {
	router.push({
		name: 'admin-support',
		params: {
			supportId,
		},
	});
}
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminManage',
});
</script>

<style lang="less" scoped>
.manageWapper {
	flex-grow: 1;
	display: flex;
	border-top: 1px solid #00000040;
	.listWapper {
		flex-grow: 1;
		border-left: 1px solid #00000040;
		padding: 20px;
		.loading {
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			.toolBar {
				width: 100%;
				display: flex;
				flex-direction: row-reverse;
			}
		}
	}
	.left-side-bar {
		background-color: #f0f2f5ff;
		:deep(ul) {
			background-color: #f0f2f5ff;
		}
		:deep(li) {
			background-color: #f0f2f5ff;
		}
	}
}

.userListItem {
	border-bottom: 1px solid #00000040;
}
</style>
