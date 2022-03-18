import type { Dayjs } from 'dayjs';

export interface IformEthicLab {
	head: {
		applDate: Dayjs;
		apprDate: Dayjs;
		iacucNo: string;
	};
	base: {
		name: string;
		source: string;
		enname: string;
		director: string;
		degree: string;
		tel: string;
		departmant: string;
		email: string;
		pexptime: Dayjs;
	};
	expers: { name: string; degree: string; response: string; experLicense: string; tel: string; error: string[]; loading: boolean }[];
	animal: {
		animalOrigin: string;
		productionNo: number;
		certNo: number;
		inspecRepo: number;
		detail: { species: string; strain: string; ageWS: string; sexQF: number; sexQM: number; bacterio: string; viral: string; error: string[] }[];
		facilitiesLicense: string;
		facilityAddress: string;
	};
	detail: {
		necessity: string;
		reason: string;
		expDesign: string;
		harms: string;
		disposal: {
			state: [];
			detail: string;
		};
		poisonous: {
			state: number;
			declear: string;
		};
		institutionOpinion: {
			date: Dayjs;
			state: number;
			principal: string;
			date2: Dayjs;
		};
		committeeOption: {
			state: number;
			suggest: string;
		};
		commitTime: {
			state: number;
			value: number;
		};
	};
}
