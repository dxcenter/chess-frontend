import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./SignUp.css";
import { connect } from 'react-redux'
import { signUpUser } from '../actions/user'
import Popup from "./Popup";

export class SignUpView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: "",
			password: "",
			password_confirm: "",
			email: "",
			redirectTo: "/",
		};
	}

	validateForm() {
		return this.state.login.length > 0 && this.state.password.length > 0 && this.state.password_confirm === this.state.password;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		this.signUp();
	}

	signUp() {
		this.props.signUpUser(this.state.login, this.state.password, this.state.email, this.state.redirectTo);
	}

	isDisabled() {
		return !this.validateForm()
	}

	gotoLogin = () => {
		this.props.history.push('/login')
	}

	render() {
		var message = null;
		if (this.state.password.length > 0 && this.state.password_confirm.length > 0 && this.state.password !== this.state.password_confirm) {
			message = "passwords doesn't match";
		}
		return (
			<div className="SignUp">
				<Button
					block
					bsSize="large"
					type="primary"
					onClick={this.gotoLogin}
				>
					Back to the Login form
				</Button>
				<br/>
				<br/>
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="login" bsSize="large">
						<ControlLabel>Login</ControlLabel>
						<FormControl
							autoFocus
							type="login"
							value={this.state.login}
							onChange={this.handleChange}
							required="true"
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
					<FormGroup controlId="password_confirm" bsSize="large">
						<ControlLabel>Password (confirm)</ControlLabel>
						<FormControl
							value={this.state.password_confirm}
							onChange={this.handleChange}
							type="password"
							required="true"
						/>
					</FormGroup>
					<FormGroup controlId="email" bsSize="large">
						<ControlLabel>Email</ControlLabel>
						<FormControl
							value={this.state.email}
							onChange={this.handleChange}
							type="email"
						/>
					</FormGroup>
					<Button
						block
						bsSize="large"
						disabled={this.isDisabled()}
						onClick={this.handleSubmit}
						type="submit"
					>
						Sign up
					</Button>
					<Popup message={message}/>
				</form>
			</div>
		);
	}
}

export default connect(null, { signUpUser })(SignUpView)
