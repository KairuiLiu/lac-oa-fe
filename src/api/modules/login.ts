import ajax from '../ajax';

const BASE_URL = '/api';

const commonApi = {
	reqSignin: () =>
		ajax(
			`${BASE_URL}/login`,
			{
				/* userid, passOrigin */
			},
			'POST'
		),
};

export default commonApi;
