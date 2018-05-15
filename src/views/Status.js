import React, { Component } from "react";
import "./Status.css";
import Games from "../components/Games";

export default class StatusView extends Component {
	render() {
		return (
			<div className="Games">
				<Games />
			</div>
		);
	}
}
