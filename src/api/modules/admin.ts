import { ISearchCondition } from '../../types/admin';
import ajax from '../ajax';

const BASE_URL = '/api/admin';

const adminApi = {
	reqSysData(token: string) {
		return ajax(
			`${BASE_URL}/systemData`,
			{
				t: Date.now(),
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqAllocateApply({ token, pageSize = 5, pageId = 1, condition = null }: { token: string; pageSize?: number; pageId?: number; condition?: ISearchCondition }) {
		return ajax(
			`${BASE_URL}/allocateApplyList`,
			{
				t: Date.now(),
				_limit: pageSize,
				_page: pageId,
				condition,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplyProcess({ token, applyId }: { token: string; applyId: string }) {
		return ajax(
			`${BASE_URL}/applyProcess`,
			{
				t: Date.now(),
				applyId,
			},
			'GET',
			{ auth: { token } }
		);
	},
};

export default adminApi;
