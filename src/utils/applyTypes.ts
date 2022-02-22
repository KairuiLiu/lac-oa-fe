import { VxeColumnPropTypes } from 'vxe-table';

export const applyTypes = ['伦理审核', '采购申请'];
export const applyProps = ['教学用', '科研实验', '科研项目'];
export const applyStage = ['发起申请', '管理员审核', '审核人审核', '存档完成', '其他'];
export const applyState = ['草稿', '已提交', '待修改', '已通过', '已取消'];

export function applyIdx2Name(data) {
	return data.map(d => {
		if (Object.keys(d).includes('applyType')) d.applyType = applyTypes[d.applyType];
		if (Object.keys(d).includes('applyProp')) d.applyProp = applyProps[d.applyProp];
		if (Object.keys(d).includes('adminPassed')) d.adminPassed = d.adminPassed ? '已通过' : '未审核';
		return d;
	});
}
export function applyName2Idx(data) {
	return data.map(d => {
		if (Object.keys(d).includes('applyType')) d.applyType = applyTypes.findIndex(dd => dd === d.applyType);
		if (Object.keys(d).includes('applyProp')) d.applyProp = applyProps.findIndex(dd => dd === d.applyProp);
		return d;
	});
}

export function getProcessTitle(idx) {
	const index = Math.min(applyStage.length - 1, idx);
	return applyStage[index];
}

export const applyFormate: {
	formatType: VxeColumnPropTypes.Formatter;
	formatProp: VxeColumnPropTypes.Formatter;
	formatState: VxeColumnPropTypes.Formatter;
} = {
	formatType: ({ cellValue }) => {
		return applyTypes[cellValue];
	},

	formatProp: ({ cellValue }) => {
		return applyProps[cellValue];
	},

	formatState: ({ cellValue }) => {
		return applyState[cellValue];
	},
};
