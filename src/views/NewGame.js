import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { connect } from 'react-redux'
import { loginUser } from '../actions/user'
import SelectSearch from 'react-select-search'
import { BaseComponent } from "../components/BaseComponent";

export class NewGameView extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			invitePlayerId: null,
			availablePlayers: [],
		};
	}

	componentDidMount() {
		this.api('players').then(data => this.setPlayers(data.Players));
	}

	setPlayers(newPlayers) {
		var newAvailablePlayers = [];

		console.log(newPlayers);

		for (var i=0; i<newPlayers.length; i++) {
			var newPlayer = newPlayers[i];
			newAvailablePlayers.push({
				name: newPlayer.Nickname,
				value: newPlayer.Id,
			})
		}

		this.setState({
			availablePlayers: newAvailablePlayers,
		});
	}

	validateForm() {
		return this.state.invitePlayerId>0;
	}

	handleChange = target => {
		this.setState({
			'invitePlayerId': target.value,
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		this.api('games', {method:'post'}, {invited_player_id: this.state.invitePlayerId})
			.then(response => {
				if (response.GameId == null) {
					alert('an error occured');
					return
				}
				this.props.history.push("/games/"+response.GameId);
			})
	}

	isDisabled() {
		return !this.validateForm()
	}

	render() {
		return (
			<div className="Login">
				<form onSubmit={this.handleSubmit}>
					<SelectSearch id="invitePlayerId" options={this.state.availablePlayers} name="invitePlayerId" placeholder="Invite player to a game" onChange={this.handleChange.bind(this)} />
					<Button
						block
						bsSize="large"
						disabled={this.isDisabled()}
						onClick={this.handleSubmit}
						type="submit"
					>
						New game
					</Button>
				</form>
			</div>
		);
	}
}

export default connect(state => (state))(NewGameView)

