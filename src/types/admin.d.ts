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
