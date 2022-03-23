import { IUserInfo } from '../../types/common.d';
import ajax from '../ajax';

const BASE_URL = '/api';

const commonApi = {
	// 记得上下线改成post
	reqLogin({ userid, passWord }) {
		return ajax(
			`${BASE_URL}/user/login`,
			{
				userid,
				passWord,
			},
			'GET'
		);
	},
	reqLoginTk(token) {
		return ajax(`${BASE_URL}/user/login`, {}, 'GET', { auth: { token } });
	},
	reqUpdUserInfo({ token, config }: { token: string; config: IUserInfo }) {
		return ajax(
			`${BASE_URL}/user/updateuserinfo`,
			{
				config,
			},
			'POST',
			{ auth: { token } }
		);
	},
};

export default commonApi;
