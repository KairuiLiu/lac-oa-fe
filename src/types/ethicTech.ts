import type { Dayjs } from 'dayjs';

export interface IformEthicTech {
	base: {
		department: string;
		tel: string;
		major: string;
		class: string;
		study: string;
		animals: string[];
		mOrganism: {
			state: number;
			detial: string;
		};
		source: string;
		producNo: number;
		certNo: number;
		checkNo: number;
		expType: {
			state: number;
			detial: string;
		};
		aniQM: number;
		aniQF: number;
		directorTel: string;
		directorName: string;
		directorEmail: string;
		animalsOthers: string;
	};
	overview: string;
	promiseDate: Dayjs;
	facApprDate: Dayjs;
	illApprDate: Dayjs;
	illApprState: number;
}
