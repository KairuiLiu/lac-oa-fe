import { IformEthicTech } from '../../types/ethicTech';
import { IformEthicLab } from '../../types/ethicLab';
import ajax from '../ajax';

const BASE_URL = '/api/apply';
type IApply = IformEthicLab | IformEthicTech;

const applyApi = {
	reqApplySubmit({ token, data, id }: { token: string; id?: string; data?: IApply }) {
		return ajax(
			`${BASE_URL}/newsubmitapply`,
			{
				t: Date.now(),
				data,
				id,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplySave({ token, data, id }: { token: string; id?: string; data?: IApply }) {
		return ajax(
			`${BASE_URL}/saveapply`,
			{
				t: Date.now(),
				data,
				id,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplyDel({ token, id }: { token: string; id: string }) {
		return ajax(
			`${BASE_URL}/delapply`,
			{
				t: Date.now(),
				id,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplyGet({ token, id }: { token: string; id: string }) {
		return ajax(
			`${BASE_URL}/getapply`,
			{
				t: Date.now(),
				id,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplyAduit({ token, data, id }: { token: string; id: string; data: any }) {
		return ajax(
			`${BASE_URL}/aduitapply`,
			{
				t: Date.now(),
				data,
				id,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplyAduitAdmin({ token, data, id }: { token: string; id: string; data: boolean }) {
		return ajax(
			`${BASE_URL}/aduitadminapply`,
			{
				t: Date.now(),
				data,
				id,
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

export default applyApi;
