import React from "react";
import { BaseComponent } from "./BaseComponent";
import { connect } from 'react-redux';
import { ButtonToolbar } from 'react-bootstrap';
import Button from 'react-confirm-button';
import Chess from 'react-chess'

function getPieces(gameStatus) {
	// R N B Q K B N R
	// P P P P P P P P
	var pieceIdLetterMap = {
		 1: 'K',
		 2: 'Q',
		 3: 'R',
		 4: 'B',
		 5: 'N',
		 6: 'P',
		 7: 'k',
		 8: 'q',
		 9: 'r',
		10: 'b',
		11: 'n',
		12: 'p',
	}
	var pieces = [];
	var piecesRaw = gameStatus.SquareMap;
	for (var squareId in piecesRaw) {
		var pieceId = piecesRaw[squareId];
		var pieceLetter = pieceIdLetterMap[pieceId];
		var squareName = (String.fromCharCode('a'.charCodeAt(0) + squareId % 8)) + (parseInt(squareId / 8, 10) + 1);
		//console.log(squareId, pieceId, pieceLetter, squareName);
		pieces.push(pieceLetter+'@'+squareName);

	}
	//console.log(Chess, Chess.getDefaultLineup(), gameStatus, pieces);
	return pieces;
}

class Board extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			statusText: "",
			gameStatus: {},
			pieces: [],
			actionId: 0,
		};

		//this.setGameStatus = this.setGameStatus.bind(this);
		//this.onMovePiece = this.onMovePiece.bind(this);
		this.onBoardClick = this.onBoardClick.bind(this);
	}

	setGameStatus(newGameStatus) {
		var newPieces = getPieces(newGameStatus);

		var newStatusText = '';

		if (newGameStatus.MoveError != null) {
			newStatusText = newGameStatus.MoveError;
		}

		this.setState({
			statusText: newStatusText,
			gameStatus: newGameStatus,
			pieces: newPieces,
			actionId: this.state.actionId+1,
			isVisibleCancelGameButton:  newGameStatus.IsMyGame && ( newGameStatus.InvitedPlayerId !== null && newGameStatus.InvitedPlayerId !== this.props.me.PlayerId ),
			isVisibleDeclineGameButton: newGameStatus.IsMyGame && newGameStatus.InvitedPlayerId === this.props.me.PlayerId,
			isVisibleResignGameButton:  newGameStatus.IsMyGame && newGameStatus.InvitedPlayerId === null,
		});

		console.log("new state", newGameStatus, this, this.state, newPieces);
	}

	componentDidMount() {
		//console.log(this.state, this.props);
		this.api('games/'+encodeURIComponent(this.props.game.Id)+'/status').then(data => this.setGameStatus(data.GameStatus));
	}

	/*onNewGame() {
		this.api('games', {method: "POST"},   {gameId: this.props.game.Id}).then(data => this.setGameStatus(data.GameStatus));
	}*/
	onCancelGame() {
		this.api('games', {method: "DELETE"}, {gameId: this.props.game.Id}).then(data => this.setGameStatus(data.GameStatus));
	}
	onDeclineGame() {
		this.api('games', {method: "DELETE"}, {gameId: this.props.game.Id}).then(data => this.setGameStatus(data.GameStatus));
	}
	onResignGame() {
		this.api('games', {method: "DELETE"}, {gameId: this.props.game.Id}).then(data => this.setGameStatus(data.GameStatus));
	}

	onMovePiece(piece, fromSquare, toSquare) {
		if (fromSquare === undefined) {
			fromSquare = piece.position;
		}
		//console.log("onMovePiece", piece, fromSquare, toSquare);
		this.api('move', {method: "POST"}, {'move': fromSquare+toSquare}).then(data => this.setGameStatus(data.GameStatus));
	}

	onBoardClick() {
		if (this.props.onBoardClick == null) {
			return;
		}
		return this.props.onBoardClick(this.props.game.Id);
	}

	render() {
		console.log('render()', this.props, this.state);

		return (
			<div className='chessBoardContainer'>
				<div onClick={this.onBoardClick} className='chessBoard'>
					<Chess drawLabels={this.props.drawLabels} pieces={this.state.pieces} onMovePiece={this.onMovePiece.bind(this)} onDragStart={this.props.onDragStart} />
				</div>
				<span>{this.state.statusText}</span>
				<ButtonToolbar>
					{this.state.isVisibleCancelGameButton  && <Button onConfirm={this.onCancelGame.bind(this)}>cancel game</Button>}
					{this.state.isVisibleDeclineGameButton && <Button onConfirm={this.onDeclineGame.bind(this)}>decline</Button>}
					{this.state.isVisibleResignGameButton  && <Button onConfirm={this.onResignGame.bind(this)}>resign</Button>}
				</ButtonToolbar>
			</div>
		)
	}
}

export default connect(state => (state))(Board)
