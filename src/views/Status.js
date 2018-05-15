import React, { Component } from "react";
import "./Status.css";
import Games from "../components/Games";
import { BaseComponent } from "../components/BaseComponent";
import { connect } from 'react-redux';

class StatusView extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			games: {
				all: null,
				my: [],
			},
			whoami: null,
			players: null,
			playersPairs: null,
		}
	}

	setGames(newGamesRaw) {
		var newGames = [];

		newGames = newGamesRaw;

		this.setState({
			games: {
				all: newGames,
				my: [],
			},
		})

		this.onNewData();
	}

	setWhoami(whoami) {
		this.setState({
			whoami: whoami
		});
		this.onNewData();
	}

	setPlayers(players) {
		this.setState({
			players: players
		});
		this.onNewData();
	}

	setPlayersPairs(playersPairs) {
		this.setState({
			playersPairs: playersPairs
		});
		this.onNewData();
	}

	onNewData() {
		if (this.state.games.all == null || this.state.whoami == null || this.state.players == null || this.state.playersPairs == null) {
			return;
		}

		var isMyPairId = {};
		for (var i=0; i<this.state.playersPairs.length; i++) {
			var playersPair = this.state.playersPairs[i];
			isMyPairId[playersPair.Id] = true;
		}

		var myGames = [];
		for (var i=0; i<this.state.games.all.length; i++) {
			var gameRaw = this.state.games.all[i];
			if (isMyPairId[gameRaw.PlayersPairId] != true) {
				continue;
			}
			myGames.push(gameRaw);
		}

		this.setState({
			games: {
				all: this.state.games.all,
				my: myGames,
			}
		});
	}

	componentDidMount() {
		this.api('whoami').then(data => this.setWhoami(data));
		this.api('games').then(data => this.setGames(data.Games));
		this.api('players').then(data => this.setPlayers(data.Players));
		this.api('players_pairs',{},{'active_only':true,'my_only':true}).then(data => this.setPlayersPairs(data.PlayersPairs));
	}

	render() {
		console.log(this.state);
		return (
			<div className="Games">
				<Games games={this.state.games.my} />
			</div>
		);
	}
}

export default connect(state => (state))(StatusView)
