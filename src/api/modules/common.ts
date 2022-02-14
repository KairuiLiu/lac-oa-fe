import ajax from '../ajax';

const BASE_URL = '/api';

const commonApi = {
	reqLogin({ userid, passWord }) {
		return ajax(
			`${BASE_URL}/user/login`,
			{
				userid,
				passWord,
			},
			'POST'
		);
	},
	reqLoginTk(token) {
		return ajax(`${BASE_URL}/user/login`, {}, 'POST', { auth: { token } });
	},
};

export default commonApi;
