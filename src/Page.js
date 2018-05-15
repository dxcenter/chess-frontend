import React, { Component } from 'react';
//import { Navbar, ButtonToolbar, Button } from "react-bootstrap";
import { Navbar, ButtonToolbar } from "react-bootstrap";
import logo from './favicon.ico';
import './Page.css';
import { Router, NavLink } from 'react-router-dom'
import { createBrowserHistory as createHistory } from "history";
import Routes from "./Routes";
import { connect } from 'react-redux'
import { tryToken, loginUserSuccess, loginUserFailure } from './actions/user'

import { userIsAuthenticated } from './auth'

import Popup from "./views/Popup";

import "../node_modules/react-select-search/style.css"


const NewGameLink = userIsAuthenticated(() => <NavLink exact to="/games/new">New game</NavLink>)
/*const VLANsLink = userIsAuthenticated(() => <NavLink exact to="/vlans">VLANs</NavLink>)
const DNATsLink = userIsAuthenticated(() => <NavLink exact to="/dnats">DNATs</NavLink>)
*/
class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: createHistory(),
		};
		this.tryToken();
	}

	tryToken() {
		var oldToken = localStorage.getItem('token');
		if (oldToken != null) {
			this.props.tryToken(oldToken, this);
		}
	}

	onAuthed(token) {
		//this.state.history.push("/");
		//console.log(this.state, this.props);
		this.props.loginUserSuccess(token);
	}

	onAuthFailed(error) {
		this.props.loginUserFailure(error)
	}

	render() {
		return (
			<Router history={this.state.history}>
				<div className="Page">
					<Navbar fluid collapseOnSelect>
						<Navbar.Header>
							<Navbar.Collapse>
								<Navbar.Brand>
									<NewGameLink />
								</Navbar.Brand>
							</Navbar.Collapse>
							<Navbar.Toggle />
						</Navbar.Header>
					</Navbar>
					<Popup message={this.props.user.message}/>
					<Routes />
					<ButtonToolbar>
					</ButtonToolbar>
					<img src={logo} className="Page-logo" alt="logo" />
				</div>
			</Router>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
})

export default connect(mapStateToProps, { tryToken, loginUserSuccess, loginUserFailure })(Page);
