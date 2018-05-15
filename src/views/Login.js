import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { connect } from 'react-redux'
import { loginUser } from '../actions/user'

export class LoginView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: "",
			password: "",
			redirectTo: "/",
		};
	}

	validateForm() {
		return this.state.login.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		this.login();
	}

	login() {
		this.props.loginUser(this.state.login, this.state.password, this.state.redirectTo);
	}

	isDisabled() {
		return !this.validateForm()
	}

	gotoSignUp = () => {
		this.props.history.push('/signup')
	}
	render() {
		return (
			<div className="Login">
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="login" bsSize="large">
						<ControlLabel>Login</ControlLabel>
						<FormControl
							autoFocus
							type="login"
							required="true"
							value={this.state.login}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup controlId="password" bsSize="large">
						<ControlLabel>Password</ControlLabel>
						<FormControl
							value={this.state.password}
							onChange={this.handleChange}
							type="password"
							required="true"
						/>
					</FormGroup>
					<Button
						block
						bsSize="large"
						disabled={this.isDisabled()}
						onClick={this.handleSubmit}
						type="submit"
					>
						Login
					</Button>
				</form>
				<br/>
				<br/>
				<Button
					block
					bsSize="large"
					type="button"
					onClick={this.gotoSignUp}
				>
					Sign up
				</Button>
			</div>
		);
	}
}

export default connect(null, { loginUser })(LoginView)
