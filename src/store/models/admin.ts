import { adminApi } from '../../api/index';
import IAjaxRestlt from '../../types/common';

const state = () => ({
	sysData: {},
});

// getters
const getters = {};

// actions
const actions = {
	async getSysData({ commit }, token: string) {
		const result = (await adminApi.reqSysData(token)) as IAjaxRestlt;
		if (result?.code) return false;
		commit('updateSysData', result.data);
		return true;
	},
};

const mutations = {
	updateSysData($state, sysData) {
		$state.sysData = sysData;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
