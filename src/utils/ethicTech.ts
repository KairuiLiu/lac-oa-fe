import { IformEthicTech } from '../types/ethicTech';

export const i18n = {
	base: {
		department: '院系（单位）',
		tel: '电话',
		major: '专业',
		class: '年级/班级',
		study: '教学课程名称',
		animals: '动物品种',
		mOrganism: '动物微生物级别',
		source: '动物来源',
		producNo: '生产许可证有无',
		certNo: '质量合格证明',
		checkNo: '检疫合格证明',
		expType: '数量及性别',
		directorTel: '实验负责人姓名',
		directorName: '移动电话',
		directorEmail: '邮箱E-mail',
	},
};

export function formInit(store): IformEthicTech {
	return {
		base: {
			department: store.state.userInfo.department,
			tel: store.state.userInfo.phone,
			major: '',
			class: '',
			study: '',
			animals: [],
			animalsOthers: '',
			mOrganism: {
				state: 0,
				detial: '',
			},
			source: '',
			producNo: 0,
			certNo: 0,
			checkNo: 0,
			expType: {
				state: 0,
				detial: '',
			},
			aniQM: 0,
			aniQF: 0,
			directorTel: store.state.userInfo.phone,
			directorName: store.state.userInfo.username,
			directorEmail: store.state.userInfo.email,
		},
		overview: '',
		promiseDate: null,
		facApprDate: null,
		illApprDate: null,
		illApprState: 0,
	};
}
