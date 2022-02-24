import { IGoodConfig, IGoodSearchCondition, ISearchCondition } from '../../types/admin';
import ajax from '../ajax';

const BASE_URL = '/api/support';

const supportApi = {
	reqSupportSysDate({ token }: { token: string }) {
		return ajax(
			`${BASE_URL}/sysdata`,
			{
				t: Date.now(),
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqOrderList({ token, filter, condition, pageSize = 5, pageId = 1 }: { token: string; filter?: any; condition?: ISearchCondition; pageSize?: number; pageId?: number }) {
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
	reqAddGood({ token, supportId, config }: { token: string; supportId: string; config: IGoodConfig }) {
		return ajax(
			`${BASE_URL}/addgood`,
			{
				t: Date.now(),
				supportId,
				config,
			},
			'POST',
			{ auth: { token } }
		);
	},
	reqDelGood({ token, supportId, goodIds }: { token: string; supportId: string; goodIds: string[] }) {
		return ajax(
			`${BASE_URL}/delgood`,
			{
				t: Date.now(),
				supportId,
				goodIds,
			},
			'POST',
			{ auth: { token } }
		);
	},
	reqUpdGood({ token, supportId, goodId, config }: { token: string; supportId: string; goodId: string; config: IGoodConfig }) {
		return ajax(
			`${BASE_URL}/upgoodlist`,
			{
				t: Date.now(),
				supportId,
				goodId,
				config,
			},
			'POST',
			{ auth: { token } }
		);
	},
	reqGoodLog({ token, supportId, goodId }: { token: string; supportId: string; goodId: string }) {
		return ajax(
			`${BASE_URL}/goodLog`,
			{
				t: Date.now(),
				supportId,
				goodId,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqGoodDetail({ token, supportId, goodId }: { token: string; supportId: string; goodId: string }) {
		return ajax(
			`${BASE_URL}/goodDetail`,
			{
				t: Date.now(),
				supportId,
				goodId,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqGoodList({ token, supportId, condition, pageSize = 5, pageId = 1 }: { token: string; supportId: string; condition: IGoodSearchCondition; pageSize: number; pageId: number }) {
		return ajax(
			`${BASE_URL}/goodList`,
			{
				t: Date.now(),
				supportId,
				condition,
				_limit: pageSize,
				_page: pageId,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqOrderDetail({ token, orderId }: { token: string; orderId: string }) {
		return ajax(
			`${BASE_URL}/orderDetail`,
			{
				t: Date.now(),
				orderId,
			},
			'GET',
			{ auth: { token } }
		);
	},
	reqShipDetail({ token, shipNumber }: { token: string; shipNumber: string }) {
		return ajax(
			`${BASE_URL}/shipDetail`,
			{
				t: Date.now(),
				shipNumber,
			},
			'GET',
			{ auth: { token } }
		);
	},
};

export default supportApi;
