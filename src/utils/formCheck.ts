export function checkEmail(v) {
	return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v);
}

export function checkPhone(v) {
	return /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(v) || /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(v);
}
