import { VxeColumnPropTypes } from 'vxe-table';

export const aduitStat = ['未审核通过', '审核通过', '无需审核'];

export const goodFormate: {
	formatPrice: VxeColumnPropTypes.Formatter;
	formatEnable: VxeColumnPropTypes.Formatter;
	formatAduit: VxeColumnPropTypes.Formatter;
} = {
	formatPrice: ({ cellValue }) => {
		return `单价: ${cellValue.perPrice}元/${cellValue.unit} \n 基础运费: ${cellValue.transBasePrice}元 \n 单只运费: ${cellValue.transPerPrice}元/${cellValue.unit}`;
	},

	formatEnable: ({ cellValue }) => {
		return cellValue ? '已上架' : '未上架';
	},

	formatAduit: ({ cellValue }) => {
		return aduitStat[(cellValue + aduitStat.length) % aduitStat.length];
	},
};
