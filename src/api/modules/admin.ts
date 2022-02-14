import ajax from '../ajax';

const BASE_URL = '/api/admin';

const adminApi = {
	reqSysData: (token: string) =>
		ajax(
			`${BASE_URL}/systemData`,
			{
				t: Date.now(),
			},
			'GET',
			{ auth: { token } }
		),
};

export default adminApi;
