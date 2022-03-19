import { IformEthicTech } from '../../types/ethicTech';
import { IformEthicLab } from '../../types/ethicLab';
import ajax from '../ajax';

const BASE_URL = '/api/apply';
type IApply = IformEthicLab | IformEthicTech;

const applyApi = {
	reqApplySubmit({ token, data, id, type, prop }: { token: string; id?: string; data?: IApply; type?: string; prop?: string }) {
		return ajax(
			`${BASE_URL}/newsubmitapply`,
			{
				t: Date.now(),
				type,
				prop,
				data,
				id,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplySave({ token, data, id, type, prop }: { token: string; id?: string; data?: IApply; type?: string; prop?: string }) {
		return ajax(
			`${BASE_URL}/saveapply`,
			{
				t: Date.now(),
				type,
				prop,
				data,
				id,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplyDel({ token, id, type, prop }: { token: string; id: string; type?: string; prop?: string }) {
		return ajax(
			`${BASE_URL}/delapply`,
			{
				t: Date.now(),
				type,
				prop,
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
	reqApplyAduit({ token, data, type, prop, id }: { token: string; id: string; data: any; type?: string; prop?: string }) {
		return ajax(
			`${BASE_URL}/aduitapply`,
			{
				t: Date.now(),
				type,
				prop,
				data,
				id,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqApplyAduitAdmin({ token, data, type, prop, id }: { token: string; id: string; data: boolean; type?: string; prop?: string }) {
		return ajax(
			`${BASE_URL}/aduitadminapply`,
			{
				t: Date.now(),
				type,
				prop,
				data,
				id,
			},
			'GET',
			{ auth: { token } }
		);
	},
};

export default applyApi;
