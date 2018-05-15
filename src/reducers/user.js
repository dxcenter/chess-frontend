import constants from '../constants'

const initialState = {
	data: null,
	isLoading: false,
	message: null,
}

export default function userUpdate(state = initialState, { type, payload }) {
	switch (type) {
		case constants.USER_LOGGING_IN:
		case constants.LOGIN_USER_REQUEST:
			return { ...initialState, isLoading: true }
		case constants.LOGIN_USER_SUCCESS:
			return { data: payload, isLoading: false }
		case constants.LOGIN_USER_FAILURE:
			return { ...initialState, message: payload.message }
		case constants.LOGOUT_USER:
			return initialState
		default:
			return state
	}
}
