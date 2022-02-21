import { SAVE_LOG_IN, CLEAR_LOG_IN } from './mutationType';

import { commonApi } from '../api/index';
import { IAjaxRestlt } from '../types/common';

export default {
	saveLogin({ commit }, userInfo) {
		localStorage.setItem('token', userInfo.token);
		commit(SAVE_LOG_IN, userInfo);
	},

	async tryLoginToken({ commit }) {
		const token = localStorage.getItem('token');
		if (!token) return false;
		const result = (await commonApi.reqLoginTk(token)) as IAjaxRestlt;
		if (result?.code) return false;
		const { userInfo } = result.data;
		localStorage.setItem('token', userInfo.token);
		commit(SAVE_LOG_IN, userInfo);
		return result.data.type;
	},

	clearLogin({ commit }) {
		localStorage.removeItem('token');
		commit(CLEAR_LOG_IN);
	},
};
