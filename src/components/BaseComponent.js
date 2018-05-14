import { Component } from "react";
import { api } from "../actions/api.js";
//import { connect } from 'react-redux';

export class BaseComponent extends Component {
	api(resource, options, parameters) {
		return api(resource, options, parameters, this.props.user.data.token)
	}
}

//export default connect(state => (state))(BaseComponent)
