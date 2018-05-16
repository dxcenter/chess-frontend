import React, { Component } from "react";
import "./Board.css";
import ChessBoard from "../components/ChessBoard";
import { BaseComponent } from "../components/BaseComponent";
import { connect } from 'react-redux';

export class BoardView extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			me: null,
		};

		this.api('whoami').then(data => this.setWhoami(data));
	}

	setWhoami(whoami) {
		this.setState({
			me: whoami,
		});
	}

	render() {
		//console.log(this.params, this.state, this.props);
		return (
			<div className="Board">
				<ChessBoard me={this.state.me} game={{Id: this.props.match.params.game_id}} />
			</div>
		);
	}
}

export default connect(state => (state))(BoardView)
