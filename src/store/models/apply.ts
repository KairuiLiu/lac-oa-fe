import { ref } from 'vue';
import { formInit as formInitEthicLab } from '../../utils/ethicLab';
import { formInit as formInitEthicTech } from '../../utils/ethicTech';

const state = () => ({
	licenses: ref([
		{ animalId: '1', animalName: '鸡', anilicenses: ['重庆生物-87566945'] },
		{ animalId: '2', animalName: '鸭', anilicenses: ['重庆生物-87336945'] },
		{ animalId: '3', animalName: '鱼', anilicenses: [] },
		{ animalId: '4', animalName: '鸟', anilicenses: ['重庆生物-87566445'] },
		{ animalId: '5', animalName: '羊', anilicenses: ['重庆生物-87546945'] },
	]),
	formData: ref({}),
});

// getters
const getters = {};

// actions
const actions = {
	addLicense({ commit }, { animalId, license }) {
		commit('addLicense', { animalId, license });
	},
	delLicense({ commit }, { animalId, idx }) {
		commit('delLicense', { animalId, idx });
	},
	initApply({ commit }, { type, prop, storeSelf }) {
		if (type === 'ethic' && prop === 'lab') {
			commit('updateApply', { formData: formInitEthicLab(storeSelf) });
			return true;
		}
		if (type === 'ethic' && prop === 'tech') {
			commit('updateApply', { formData: formInitEthicTech(storeSelf) });
			return true;
		}
		return false;
	},
	updateApply({ commit }, formData) {
		commit('updateApply', { formData });
	},
};

const mutations = {
	addLicense($state, { animalId, license }) {
		const animal = $state.licenses.find(d => d.animalId === animalId);
		animal.anilicenses.push(license);
	},
	delLicense($state, { animalId, idx }) {
		const animal = $state.licenses.find(d => d.animalId === animalId);
		animal.anilicenses.splice(idx, 1);
	},
	updateApply($state, { formData }) {
		$state.formData = formData;
		return true;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
