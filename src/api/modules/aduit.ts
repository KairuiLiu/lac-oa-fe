import { ISearchCondition } from '../../types/admin.d';
import ajax from '../ajax';

const BASE_URL = '/api/aduit';

const aduitApi = {
	reqAduitSysDate({ token }: { token: string }) {
		return ajax(
			`${BASE_URL}/sysdata`,
			{
				t: Date.now(),
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqAduitList({ token, filter, condition, pageSize = 5, pageId = 1 }: { token: string; filter?: any; condition?: ISearchCondition; pageSize?: number; pageId?: number }) {
		return ajax(
			`${BASE_URL}/applylist`,
			{
				t: Date.now(),
				filter,
				condition,
				_limit: pageSize,
				_page: pageId,
			},
			'GET',
			{ auth: { token } }
		);
	},
};

export default aduitApi;
