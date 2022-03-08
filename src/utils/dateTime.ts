export function getResentDays(pastDays, date = null, str = false) {
	date = date || Date.now();
	let res: string[] = [`${new Date(date).getDate()}`];
	if (pastDays === 0) return res;
	const stp = -pastDays / Math.abs(pastDays);
	for (let i = -Math.abs(pastDays); i < 0; i += 1) {
		res.push(`${new Date((date += stp * 24 * 60 * 60 * 1000)).getMonth() + 1}.${new Date((date += stp * 24 * 60 * 60 * 1000)).getDate()}`);
	}
	if (stp === -1) res.reverse();
	if (str) res = res.map(d => `${d}`);
	return res;
}

export function getResentMonths(pastMonths, date = null, str = false) {
	date = date || Date.now();
	let curMonth = new Date(date).getMonth() - 1;
	let res: number[] | string[] = [curMonth + 1];
	if (pastMonths === 0) return res;
	const stp = -pastMonths / Math.abs(pastMonths);
	for (let i = -Math.abs(pastMonths); i < 0; i += 1) {
		curMonth = (curMonth + stp + 12) % 12;
		res.push(curMonth + 1);
	}
	if (stp === -1) res.reverse();
	if (str) res = res.map(d => `${d}`);
	return res;
}
