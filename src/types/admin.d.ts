export interface ISearchCondition {
	applyId?: string | number;
	applyUserName?: string;
	applyDate?: number;
	applyType?: number;
	applyProp?: number;
	applyTitle?: string;
	notFirst?: boolean;
	completeMatching?: number;
}
