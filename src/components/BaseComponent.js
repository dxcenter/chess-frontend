import { Component } from "react";
//import { connect } from 'react-redux';

export class BaseComponent extends Component {
	api(resource, options, parameters, callback) {
		options.credentials = 'include';
		options.headers = { 'Authorization': `Bearer ${this.props.user.data.token}` };
		if (options.method != null && options.method.toLowerCase !== 'get' && options.method.toLowerCase !== 'head') {
			options.body = JSON.stringify(parameters);
		}
		return fetch('/'+resource+'.json', options)
			.then(response => response.json())
			.then(data => callback(data));
	}
}

//export default connect(state => (state))(BaseComponent)
