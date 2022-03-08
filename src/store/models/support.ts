import { supportApi } from '../../api/index';
import { IAjaxRestlt } from '../../types/common';

const state = () => ({
	shipComps: [],
});

// getters
const getters = {};

// actions
const actions = {
	async getShipCompList({ commit }, token: string) {
		const result = (await supportApi.reqShipCompList({ token })) as IAjaxRestlt;
		if (result?.code) return false;
		commit('updateShipCompList', result.data);
		return true;
	},
};

const mutations = {
	updateShipCompList($state, data) {
		$state.shipComps = data;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
