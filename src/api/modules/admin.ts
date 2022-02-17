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
				condition: JSON.stringify(condition),
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
	reqAllocateAduitList({ token, pageSize = 5, pageId = 1, condition = null, applyId }: { token: string; pageSize?: number; pageId?: number; condition?: ISearchCondition; applyId: string }) {
		return ajax(
			`${BASE_URL}/allocateAduitList`,
			{
				t: Date.now(),
				_limit: pageSize,
				_page: pageId,
				condition: JSON.stringify(condition),
				applyId,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqAdminAllocateWork({ token, userId, applyId }: { token: string; userId: string; applyId: string }) {
		return ajax(
			`${BASE_URL}/allocateWork`,
			{
				t: Date.now(),
				userId,
				applyId,
			},
			'POST',
			{ auth: { token } }
		);
	},
	reqAduitType({ token }: { token: string }) {
		return ajax(
			`${BASE_URL}/aduitType`,
			{
				t: Date.now(),
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqAduitList({ token, aduitType }: { token: string; aduitType: number }) {
		return ajax(
			`${BASE_URL}/aduitList`,
			{
				t: Date.now(),
				aduitType,
			},
			'GET',
			{ auth: { token } }
		);
	},
};

export default adminApi;
