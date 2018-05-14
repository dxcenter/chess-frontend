
export function api(resource, options, parameters, token) {
	if (options == null) {
		options = {};
	}
	if (parameters == null) {
		parameters = {};
	}
	if (options.headers == null) {
		options.headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};
	}
	options.credentials = 'include';
	options.headers.Authorization = `Bearer ${token}`;
	if (options.method != null && options.method.toLowerCase !== 'get' && options.method.toLowerCase !== 'head') {
		options.body = JSON.stringify(parameters);
	}
	//console.log(options);
	return fetch('/'+resource+'.json', options)
		.then(response => response.json());
}
