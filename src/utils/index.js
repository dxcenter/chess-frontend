
export function checkHttpStatus(response) {
	if (response.code >= 200 && response.code < 300) {
		return response
	} else {
		console.log(response);
		var error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

export function parseJSON(response) {
	return response.json()
}

export function b64MaskToInt(b64Mask) {
	return Buffer.from(b64Mask, 'base64').readUIntBE(12, 4);
}

export function b64MaskToPrefixSize(b64Mask) {
	var maskInt = b64MaskToInt(b64Mask);
	var maskBinStr = maskInt.toString(2);
	return maskBinStr.indexOf('0');
}


export function ipportFormat(ipport) {
	var ipportStr = ipport.IP;
	if (ipport.Port != null) {
		ipportStr += ":"+ipport.Port;
	}
	if (ipport.Protocol != null) {
		ipportStr += "/"+ipport.Protocol;
	}
	return ipportStr;
}

export function ipportsFormat(ipports) {
	if (ipports == null) {
		return "";
	}
	var ipportsStr = [];
	for (var i=0; i<ipports.length; i++) {
		console.log(this);
		ipportsStr.push(ipportFormat(ipports[i]));
	};
	return ipportsStr.join(", ");
}
