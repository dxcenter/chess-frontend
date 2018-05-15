import React, { Component } from "react";
import "./Board.css";
import ChessBoard from "../components/ChessBoard";

export default class BoardView extends Component {
	render() {
		//console.log(this.params, this.state, this.props);
		return (
			<div className="Board">
				<ChessBoard gameId={this.props.match.params.game_id} />
			</div>
		);
	}
}
