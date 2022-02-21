import { SAVE_LOG_IN, CLEAR_LOG_IN } from './mutationType';

export default {
	[SAVE_LOG_IN](state, userInfo) {
		state.userInfo = userInfo;
	},
	[CLEAR_LOG_IN](state) {
		state.userInfo = null;
	},
};
