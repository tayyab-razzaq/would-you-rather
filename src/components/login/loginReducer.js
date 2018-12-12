import {Map} from 'immutable';
import {REINITIALIZED_STATE, LOGGED_IN, FETCH_ALL_USER_SUCCESSFULLY} from '../../common/actionTypes';

let initialState = new Map({
	error: null,
	statusSuccess: false,
	isLoggedIn: false,
	user: null,
	allUsers: []
});


export default function loginReducer(state = initialState, action) {
	switch (action.type) {
		case REINITIALIZED_STATE:
			return initialState;
		case FETCH_ALL_USER_SUCCESSFULLY:
			return state.merge({allUsers: action.response});
		case LOGGED_IN:
			return state.merge({isLoggedIn: true, user: action.response});
		default:
			return state;
	}
}