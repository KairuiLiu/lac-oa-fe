import { measureTextWidth } from '@antv/g2plot';

export function renderStatistic(containerWidth: any, text: any, style: any) {
	const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
	const R = containerWidth / 2;
	// r^2 = (w / 2)^2 + (h - offsetY)^2
	let scale = 1;
	if (containerWidth < textWidth) {
		scale = Math.min(Math.sqrt(Math.abs(R ** 2 / ((textWidth / 2) ** 2 + textHeight ** 2))), 1);
	}
	const textStyleStr = `width:${containerWidth}px;`;
	return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
}
