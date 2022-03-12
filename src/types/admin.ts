export interface ISearchCondition {
	applyId?: string | number;
	applyUserName?: string;
	applyDate?: number;
	applyType?: number;
	applyAduitState?: number;
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
	id: string;
	name: string;
	class: string;
	enable: boolean;
	aduit: number;
	goodPrice: {
		unit: string;
		perPrice: number;
		transPerPrice: number;
		transBasePrice: number;
	};
	goodStock: number;
	shipTag: string[];
	customeType: string[];
	detail: string;
}
