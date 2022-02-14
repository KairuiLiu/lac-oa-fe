import { createStore } from 'vuex';

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import admin from './models/admin';

export default createStore({
	state,
	mutations,
	actions,
	getters,
	modules: {
		admin,
	},
});
