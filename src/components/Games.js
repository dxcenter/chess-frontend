import React from "react";
import { BaseComponent } from "./BaseComponent";
import { connect } from 'react-redux';

class Games extends BaseComponent {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		return (
			<div className='gamesContainer'>
				{this.props.games.length}
			</div>
		)
	}
}

export default connect(state => (state))(Games)
