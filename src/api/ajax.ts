import axios from 'axios';

export default function ajax(url, data = {}, type = 'GET') {
	return new Promise((resolve, reject) => {
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

			promise = axios.get(url);
		} else {
			promise = axios.post(url, data);
		}
		promise
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
}
