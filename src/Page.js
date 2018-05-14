import React, { Component } from 'react';
//import { Navbar, ButtonToolbar, Button } from "react-bootstrap";
import { Navbar, ButtonToolbar } from "react-bootstrap";
import logo from './favicon.ico';
import './Page.css';
import { Router, NavLink } from 'react-router-dom'
import { createBrowserHistory as createHistory } from "history";
import Routes from "./Routes";
import { connect } from 'react-redux'
import { tryToken, loginUserSuccess } from './actions/user'

import { userIsAuthenticated } from './auth'


const BoardLink = userIsAuthenticated(() => <NavLink exact to="/">Board</NavLink>)
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
		this.state.history.push("/");
		console.log(this.state, this.props);
		this.props.loginUserSuccess(token);
	}

	render() {
		return (
			<Router history={this.state.history}>
				<div className="Page">
					<Navbar fluid collapseOnSelect>
						<Navbar.Header>
							<Navbar.Collapse>
								<Navbar.Brand>
									<BoardLink />
								</Navbar.Brand>
							</Navbar.Collapse>
							<Navbar.Toggle />
						</Navbar.Header>
					</Navbar>
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
	user: state.user
})

export default connect(mapStateToProps, { tryToken, loginUserSuccess })(Page);
