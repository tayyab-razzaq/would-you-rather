import {Map} from 'immutable';
import {USERS} from '../common/constants';
import {
	REINITIALIZED_STATE,
	LOGGED_IN,
	FETCH_ALL_USER_SUCCESSFULLY,
	FETCH_ALL_UPDATED_USER_SUCCESSFULLY
} from '../common/actionTypes';

let initialState = new Map({
	error: null,
	statusSuccess: false,
	isLoggedIn: false,
	user: {
		id: 'tylermcginnis',
		name: 'Tyler McGinnis',
		avatarURL: 'https://image.flaticon.com/icons/svg/138/138682.svg',
		answers: {
			"vthrdm985a262al8qx3do": 'optionOne',
			"xj352vofupe1dqz9emx13r": 'optionTwo',
		},
		questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
	},
	allUsers: USERS
});

export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case REINITIALIZED_STATE:
			return initialState;
		case FETCH_ALL_USER_SUCCESSFULLY:
			return state.merge({allUsers: action.response});
		case FETCH_ALL_UPDATED_USER_SUCCESSFULLY:
			return state.merge({
				allUsers: action.response,
				user: action.response[state.get('user').id]
			});
		case LOGGED_IN:
			return state.merge({isLoggedIn: true, user: action.response});
		default:
			return state;
	}
}