import { IformEthicLab } from '../types/ethicLab';

export const i18n = {
	cn: {
		head: {
			title: '西南大学实验动物伦理审查表',
			applDate: '申请时间',
			apprDate: '批准时间',
			iacucNo: '批准编号',
		},
		base: {
			title: '课题基本信息',
			name: '课题名称',
			enname: 'Study Name',
			source: '课题来源',
			director: '课题负责人',
			degree: '职称/学位',
			tel: '联系电话',
			departmant: '院系（单位）',
			email: '邮箱',
			pexptime: '拟实验时间',
		},
		expers: {
			title: '参与实验人员信息',
			name: '姓名',
			degree: '职称/学位',
			response: '分工责任',
			experLicense: '动物实验从业证书编号',
			tel: '联系电话',
		},
		animal: {
			title: '拟使用动物及设施信息',
			animalOrigin: '动物来源',
			productionNo: '生产许可证',
			certNo: '质量合格证明',
			inspecRepo: '检疫合格证明',
			species: '物种',
			strain: '品系/亚种/品种',
			ageWS: '大致年龄/体重',
			sexQ: '性别/数量',
			bacterio: '细菌学状态',
			viral: '病毒状态',
			facilitiesLicense: '动物实验设施许可证编号',
			facilityAddress: '设施地址',
		},
		detail: {
			necessity: '动物实验项目的目的、必要性和意义',
			reason: '阐述使用动物的原理（包括不能使用非动物模型的原因，以及所选用的动物物种/品系和使用数量是否恰当）',
			expDesign: '阐述实验设计和动物操作程序（包括动物标识、动物运输、保定装置的应用、给药后的护理和观察、是否需要非标准饲养等）',
			harms: '详细列出操作程序中预期可能对动物造成的伤害或不适，以及拟采取的将痛苦减至最低的措施',
			disposal: {
				title: '实验终末点及动物处置方式',
				live: '存活',
				death: '处死',
				disposal: '动物尸体处理',
			},
			poisonous: {
				title: '是否使用有毒（害）物质（感染、放射、化学毒、其他）',
				declear: '具体说明',
			},
			statement: {
				title: '声明',
				content: `
        1.我将自觉遵守实验动物福利伦理相关法规和各项规定，同意接受伦理审委会的监督与检查。
        2.本人保证本申请表中所填内容真实、详尽和易懂。`,
				declarant: '声明人：课题负责人签',
			},
			institutionOpinion: {
				title: '申报单位意见',
				modify: '作必要修改后同意',
				principal: '单位负责人',
				department: '申报单位（公章）',
			},
			committeeOption: {
				title: '实验动物伦理审查委员会审批意见',

				modifieAgree: '作必要修改后同意',
				agreeReview: '作必要修改后重审',

				suggest: '修改建议',
				institutional: '西南大学实验动物伦理审查委员会（章）',
				note: '申报说明：申报时，请提交本表一式两份及电子版.受理编号和批准编号由审委会填写.',
			},
			remark: {
				title: '备注',
				fst: '初审',
				nths: '第',
				nthl: '次审查',
			},
		},
		others: {
			agree: '同意',
			disagree: '不同意',
			yes: '有',
			no: '无',
			ops: '操作',
			check: '数据检查',
			nn: '不能为空',
			hasErr: '存在错误',
			degree: {
				professor: '教授',
				associateProfessor: '副教授',
				researcher: '研究员',
				associateResearcher: '副研究员',
				lecturer: '讲师',
				experimenter: '实验员',
				phDStudent: '博士研究生',
				Postgraduate: '硕士研究生',
				Undergraduate: '本科生',
				other: '其他',
			},
			bacterio: {
				Ordinary: '普通级',
				clean: '清洁级',
				spf: 'SPF级',
				sterile: '无菌级',
			},
			viral: {
				yes: '有',
				no: '无',
			},
			nnItem: '此项目不得为空',
		},
	},
	en: {
		head: {
			title: 'Review Form for Laboratory Animal Welfare and Ethics (Southwest University)',
			applDate: 'Appl. Date',
			apprDate: 'Appr. Date',
			iacucNo: 'IACUC Issue No',
		},
		base: {
			title: 'Study data',
			name: 'Study Name',
			enname: 'Study Name',
			source: 'Source of Study',
			director: 'Study Director',
			degree: 'Titles/Degree',
			tel: 'TEL',
			departmant: 'Department',
			email: 'E-mail',
			pexptime: 'Experiment time',
		},
		expers: {
			title: 'Experimenter information',
			name: 'Name',
			degree: 'Titles/Degree',
			response: 'Responsibilities',
			experLicense: 'No. of License',
			tel: 'TEL',
		},
		animal: {
			title: 'Animals and Facilities information',
			animalOrigin: 'Animal origin',
			productionNo: 'Production No.',
			certNo: 'Certificate No.',
			inspecRepo: 'Inspection Report',
			species: 'Species',
			strain: 'Strain, Subspecies, or Breed',
			ageWS: 'Age, Weight and Size',
			sexQ: 'Sex/Quantity',
			bacterio: 'Bacteriological Status',
			viral: 'Viral Status',
			facilitiesLicense: 'Experimental Facilities License No.',
			facilityAddress: 'Facility Address',
		},
		detail: {
			necessity: 'Objectives, Necessity and Significance of the Animal Experiment.',
			reason:
				'Explain your reason for animal use. It should include reasons why non-animal models cannot be used and the appropriateness of the species/strain selected and the number of animals to be used.',
			expDesign:
				'Explain the experimental design and specify all animal procedures, including the animal identification, the animal transportation, the application of physical restraint, the post-treatment care and observation as well as whether non-standard housing is used.',
			harms: 'Description of the harms or discomfort expected to be experienced by animals and the measures to be taken to minimize the pain',
			disposal: {
				title: 'Experimental endpoint and animal disposal methods.',
				live: 'Continue to live',
				death: 'Death conduct',
				disposal: 'Disposal of animal remains',
			},
			poisonous: {
				title: 'Poisonous (harmful) material (infection, radiate, chemical poison and other) used',
				declear: 'Declare',
			},
			statement: {
				title: 'Declaration',
				content: `
        1. I will abide by the law and regulation stipulation, and accept the supervision and inspection by the committee.
        2. The information I have given is accurate, detailed and comprehensive.`,
				declarant: 'Declarant: Signature of PI',
			},
			institutionOpinion: {
				title: 'Approval opinion of department of institution',
				modify: 'Agree to make necessary modifications',
				principal: 'Signature of the Department principal',
				department: 'Department of institution',
			},
			committeeOption: {
				title: 'Approval opinion of Committee',

				modifieAgree: 'Agree to make necessary modifications',
				agreeReview: 'Review after necessary modifications',

				suggest: 'Suggestions for revision',
				institutional: 'Institutional Animal Care and Use Committee of Southwest University',
				note: 'Notice：Submit soft copy of this form in duplicate and electronic edition. The Appl. No. and IACUC Issue No. are made out by Jury.',
			},
			remark: {
				title: 'Remarks',
				fst: 'first trial',
				nths: 'reexamine No. ',
				nthl: '',
			},
		},
		others: {
			agree: 'Agree',
			disagree: 'Disagree',
			yes: 'YES',
			no: 'NO',
			ops: 'operate',
			check: 'check',
			nn: 'can not be empty',
			hasErr: 'has errors',
			degree: {
				professor: 'professor',
				associateProfessor: 'Associate Professor',
				researcher: 'researcher',
				associateResearcher: 'associate researcher',
				lecturer: 'lecturer',
				experimenter: 'experimenter',
				phDStudent: 'PhD student',
				Postgraduate: 'Postgraduate',
				Undergraduate: 'Undergraduate',
				other: 'other',
			},
			bacterio: {
				Ordinary: 'Ordinary grade',
				clean: 'clean grade',
				spf: 'SPF grade',
				sterile: 'sterile grade',
			},

			viral: {
				yes: 'have',
				no: 'without',
			},
			nnItem: '此项目不得为空',
		},
	},
};

export function formInit(store): IformEthicLab {
	return {
		head: {
			applDate: null,
			apprDate: null,
			iacucNo: null,
		},
		base: {
			name: '',
			source: '',
			enname: '',
			director: store.state.userInfo.username,
			degree: '',
			tel: store.state.userInfo.phone,
			departmant: store.state.userInfo.department,
			email: store.state.userInfo.email,
			pexptime: null,
		},
		expers: [{ name: store.state.userInfo.username, degree: '', response: '', experLicense: '', tel: store.state.userInfo.phone, error: [], loading: false }],
		animal: {
			animalOrigin: '',
			productionNo: 0,
			certNo: 0,
			inspecRepo: 0,
			detail: [{ species: '', strain: '', ageWS: '', sexQF: 0, sexQM: 0, bacterio: '', viral: '', error: [] }],
			facilitiesLicense: '',
			facilityAddress: '',
		},
		detail: {
			necessity: '',
			reason: '',
			expDesign: '',
			harms: '',
			disposal: {
				state: [],
				detail: '',
			},
			poisonous: {
				state: 0,
				declear: '',
			},
			institutionOpinion: {
				date: null,
				state: 0,
				principal: '',
				date2: null,
			},
			committeeOption: {
				state: 0,
				suggest: '',
			},
			commitTime: {
				state: 0,
				value: 1,
			},
		},
	};
}
