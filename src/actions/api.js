
function objToQueryString(obj) {
	const keyValuePairs = [];
	for (const key in obj) {
		keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	}
	return keyValuePairs.join('&');
}

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
	if (options.method == null) {
		options.method = 'GET';
	}
	options.credentials = 'include';
	options.headers.Authorization = `Bearer ${token}`;
	var queryString = "";
	if (options.method.toLowerCase() === 'get' || options.method.toLowerCase() === 'head') {
		queryString = objToQueryString(parameters);
	} else {
		options.body = JSON.stringify(parameters);
	}
	return fetch('/'+resource+'.json?'+queryString, options)
		.then(response => response.json());
}
