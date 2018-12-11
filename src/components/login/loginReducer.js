import {Map} from 'immutable';
import {REINITIALIZED_STATE, LOGGED_IN, FETCH_ALL_USER_SUCCESSFULLY} from '../../common/actionTypes';

let initialState = new Map({
	error: null,
	statusSuccess: false,
	isLoggedIn: false,
	userId: null,
	username: '',
	allUsers: []
});


export default function loginReducer(state = initialState, action) {
	switch (action.type) {
		case REINITIALIZED_STATE:
			return initialState;
		case FETCH_ALL_USER_SUCCESSFULLY:
			return state.merge({allUsers: action.response});
		case LOGGED_IN:
			return state.merge({
				isLoggedIn: true,
				userId: action.response.id,
				username: action.response.name
			});
		default:
			return state;
	}
}