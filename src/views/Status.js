import React, { Component } from "react";
import "./Status.css";
import Games from "../components/Games";
import { BaseComponent } from "../components/BaseComponent";
import { connect } from 'react-redux';

class StatusView extends BaseComponent {
	setGames(games) {
		console.log(games);
	}

	componentDidMount() {
		this.api('games').then(data => this.setGames(data.Games));
	}

	render() {
		return (
			<div className="Games">
			</div>
		);
	}
}

export default connect(state => (state))(StatusView)
