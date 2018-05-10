import { checkHttpStatus, parseJSON } from '../utils';
import constants from '../constants';
//import { pushState } from 'redux-router';
import jwtDecode from 'jwt-decode';

export function loginUserSuccess(token) {
  let decoded = jwtDecode(token);
  console.log("loginUserSuccess", decoded);
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
  localStorage.removeItem('token');
  return {
    type: constants.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: constants.LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: constants.LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        //dispatch(pushState(null, '/login'));
    }
}

export function loginUser(login, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch('/auth.json', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: login, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.result.token));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}
/*
export function receiveProtectedData(data) {
    return {
        type: constants.RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: constants.FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {

    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return fetch('/getData/', {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.data));
            })
            .catch(error => {
                if(error.response.status === 401) {
                  dispatch(loginUserFailure(error));
                  //dispatch(pushState(null, '/login'));
                }
            })
       }
}
*/
