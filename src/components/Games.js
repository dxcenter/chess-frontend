import React from "react";
import { BaseComponent } from "./BaseComponent";
import { connect } from 'react-redux';
import ChessBoard from "../components/ChessBoard";
import "./Games.css";

class Games extends BaseComponent {
	constructor(props) {
		super(props);
		this.onBoardClick = this.onBoardClick.bind(this);
	}

	onBoardClick(gameId) {
		console.log(this.props, gameId);
		this.props.history.push("/games/"+gameId);
	}

	render() {
		console.log('props', this.props);

		const gamesList = this.props.games.map((game) =>
			<li key={"game"+game.Id}><ChessBoard drawLabels={false} me={this.props.me} game={game} onDragStart={function(){return false}} onMovePiece={function(){return false}} onBoardClick={this.onBoardClick} /></li>
		);
		return (
			<div className='gamesContainer'>
				<ul>
					{gamesList}
				</ul>
			</div>
		)
	}
}

export default connect(state => (state))(Games)
