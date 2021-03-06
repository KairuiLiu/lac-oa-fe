import { createStore } from 'vuex';

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import admin from './models/admin';
import support from './models/support';
import applicant from './models/applicant';
import apply from './models/apply';

export default createStore({
	state,
	mutations,
	actions,
	getters,
	modules: {
		admin,
		applicant,
		support,
		apply,
	},
});
