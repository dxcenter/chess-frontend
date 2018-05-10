import React from 'react';
//import { Navbar, ButtonToolbar, Button } from "react-bootstrap";
import { Navbar, ButtonToolbar } from "react-bootstrap";
import logo from './favicon.ico';
import './Page.css';
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import Routes from "./Routes";
import { connect } from 'react-redux'
import { logout } from './actions/user'

import { userIsAuthenticated } from './auth'


const BoardLink = userIsAuthenticated(() => <NavLink exact to="/">Board</NavLink>)
/*const VLANsLink = userIsAuthenticated(() => <NavLink exact to="/vlans">VLANs</NavLink>)
const DNATsLink = userIsAuthenticated(() => <NavLink exact to="/dnats">DNATs</NavLink>)
*/

function Page({ user, logout }) {
	return (
		<Router>
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
	);
}


const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps, { logout })(Page)
