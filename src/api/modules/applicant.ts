import ajax from '../ajax';

const BASE_URL = '/api/applicant';

const applicantApi = {
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
	reqGoodList({ token, pageSize = 10, pageId = 1, condition }: { token: string; pageSize?: number; pageId?: number; condition: any }) {
		return ajax(
			`${BASE_URL}/goodList`,
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
	reqAddLicense({ token, license }: { token: string; license: any }) {
		return ajax(
			`${BASE_URL}/addLicense`,
			{
				t: Date.now(),
				license,
			},
			'POST',
			{ auth: { token } }
		);
	},
	reqEthicLabLicense({ token, keyword }: { token: string; keyword: any }) {
		return ajax(
			`${BASE_URL}/ethicLabLicenseSuggest`,
			{
				t: Date.now(),
				keyword,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqEthicLabCheckLicense({ token, row }: { token: string; row: any }) {
		return ajax(
			`${BASE_URL}/ethicLabCheckLicense`,
			{
				t: Date.now(),
				row,
			},
			'GET',
			{ auth: { token } }
		);
	},
};

export default applicantApi;
