import React from "react";
import { BaseComponent } from "./BaseComponent";
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';

class Games extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			games: [],
		};
	}

	render() {
		return (
			<div className='gamesContainer'>
				<BootstrapTable
					data={this.games}
					striped
					hover
					condensed
					pagination
					insertRow
					deleteRow
					search
				/>
			</div>
		)
	}
}

export default connect(state => (state))(Games)
