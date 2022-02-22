import { applicantApi } from '../../api';
import { IAjaxRestlt } from '../../types/common';

const state = () => ({
	applyType: null,
});

// getters
const getters = {};

// actions
const actions = {
	async getApplyType({ commit }, token: string) {
		const result = (await applicantApi.reqApplyType({ token })) as IAjaxRestlt;
		if (result?.code) return false;
		commit('updateApplyType', result.data);
		return true;
	},
};

const mutations = {
	updateApplyType($state, applyType) {
		$state.applyType = applyType;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
