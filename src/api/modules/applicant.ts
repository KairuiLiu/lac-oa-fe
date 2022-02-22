import ajax from '../ajax';

const BASE_URL = '/api/applicant';

const adminApi = {
	reqApplyType({ token }: { token: string }) {
		return ajax(
			`${BASE_URL}/applytypes`,
			{
				t: Date.now(),
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplyList({ token, pageSize = 10, pageId = 1, type, sort = { pos: 1, data: [] } }: { token: string; pageSize?: number; pageId?: number; type: string[]; sort?: any }) {
		return ajax(
			`${BASE_URL}/applyList`,
			{
				t: Date.now(),
				_limit: pageSize,
				_page: pageId,
				type,
				sort,
			},
			'GET',
			{ auth: { token } }
		);
	},
};

export default adminApi;
