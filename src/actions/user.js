import { checkHttpStatus } from '../utils';
import constants from '../constants';
//import { pushState } from 'redux-router';
import jwtDecode from 'jwt-decode';
import { api } from './api.js';

export function tryToken(token, initiator) {
	console.log("tryToken");
	api('whoami', {}, {}, token)
		.then(function(data){
			if (data.PlayerId == null) {
				console.log("tryToken: failed");
				initiator.onAuthFailed();
				return
			}
			console.log("tryToken: success");
			initiator.onAuthed(token);
		});
	return {
		type: constants.LOGIN_USER_REQUEST
	}
}

export function loginUserSuccess(token) {
	let decoded = jwtDecode(token);
	//console.log("loginUserSuccess: decoded ==", decoded);
	localStorage.setItem('token', token);
	return {
		type: constants.LOGIN_USER_SUCCESS,
		payload: {
			user:  decoded.user,
			token: token
		}
	}
}

export function loginUserFailure(error) {
	console.log("loginUserFailure", error);
	localStorage.removeItem('token');
	if (error.response == null) {
		error.response = {};
	}
	return {
		type: constants.LOGIN_USER_FAILURE,
		payload: {
			status:	 error.response.status,
			statusText: error.response.statusText,
			message:	error.response.message
		}
	}
}

export function loginUserRequest() {
	console.log("loginUserRequest");
	return {
		type: constants.LOGIN_USER_REQUEST
	}
}

export function logout() {
	console.log("logout");
	localStorage.removeItem('token');
	return {
		type: constants.LOGOUT_USER
	}
}

export function logoutAndRedirect() {
	console.log("logoutAndRedirect");
	return (dispatch, state) => {
		dispatch(logout());
		//dispatch(pushState(null, '/login'));
	}
}

export function loginUser(login, password, redirect="/") {
	return function(dispatch) {
		dispatch(loginUserRequest());
		return api('auth', {method: 'post'}, {username: login, password: password})
			.then(checkHttpStatus)
			.then(response => {
				try {
					console.log("loginUser: success");
					dispatch(loginUserSuccess(response.token));
				} catch (e) {
					console.log("loginUser: got an exception:", e);
					dispatch(loginUserFailure({
						response: {
							status: 403,
							statusText: 'Invalid token'
						}
					}));
				}
			})
			.catch(error => {
				console.log("loginUser: got an exception (case 2):", error);
				dispatch(loginUserFailure(error));
			})
	}
}

export function signUpUser(login, password, email, redirect="/") {
	return function(dispatch) {
		dispatch(loginUserRequest());
		return api('sign_up', {method: 'post'}, {username: login, password: password, email: email})
			.then(checkHttpStatus)
			.then(response => {
				try {
					console.log("signUpUser: success");
					dispatch(loginUserSuccess(response.token));
				} catch (e) {
					console.log("signUpUser: got an exception:", e);
					dispatch(loginUserFailure({
						response: {
							status: 403,
							statusText: 'Invalid token'
						}
					}));
				}
			})
			.catch(error => {
				console.log("signUpUser: got an exception (case 2):", error);
				dispatch(loginUserFailure(error));
			})
	}
}

