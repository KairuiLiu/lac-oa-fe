export interface ISearchCondition {
	applyId?: string | number;
	applyUserName?: string;
	applyDate?: number;
	applyType?: number;
	applyProp?: number;
	applyTitle?: string;
	notFirst?: number;
	completeMatching?: number;
}

export interface IAduitSearchCondition {
	userName?: string;
	type?: string;
	onWork?: number;
	workings?: number;
}

export interface IGoodSearchCondition {
	type: string;
	goodName?: string;
	addTime?: any;
}

export interface IGoodConfig {
	id: number;
	name: string;
	class: string;
	goodPrice: {
		unit: string;
		perPrice: number;
		transPerPrice: number;
		transBasePrice: number;
	};
	goodStock: 1233;
	shipTag: string[];
	customeType: string[];
	detail: string;
}
