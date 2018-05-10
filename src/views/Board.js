import React, { Component } from "react";
import "./Board.css";
import ChessBoard from "../components/ChessBoard";

export default class BoardView extends Component {
	render() {
		return (
			<div className="Board">
				<ChessBoard />
			</div>
		);
	}
}
