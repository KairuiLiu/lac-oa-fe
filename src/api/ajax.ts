import axios from 'axios';

export default function ajax(url, data = {}, type = 'GET', conf = {}) {
	return new Promise(resolve => {
		let promise;
		if (type === 'GET') {
			let dataStr = '';
			Object.keys(data).forEach(key => {
				dataStr += `${key}=${data[key]}&`;
			});
			if (dataStr) {
				dataStr = dataStr.slice(0, -1);
				url = `${url}?${dataStr}`;
			}
			promise = axios.get(url, conf);
		} else {
			promise = axios.post(url, data, conf);
		}
		promise
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				resolve({ code: 1, msg: error.message });
			});
	});
}
