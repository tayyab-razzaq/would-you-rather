import {Map} from 'immutable';
import {
	REINITIALIZED_STATE,
	LOGGED_IN,
	FETCH_ALL_USER_SUCCESSFULLY,
	SUBMIT_QUESTION_ANSWER_SUCCESSFULLY
} from '../common/actionTypes';

let initialState = new Map({
	error: null,
	statusSuccess: false,
	isLoggedIn: false,
	user: null,
	allUsers: []
});


function updateUsersVotes(users, {qid, answer, authedUser}) {
	return {
		...users,
		[authedUser]: {
			...users[authedUser],
			answers: {
				...users[authedUser].answers,
				[qid]: answer
			}
		}
	};
}

export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case REINITIALIZED_STATE:
			return initialState;
		case FETCH_ALL_USER_SUCCESSFULLY:
			return state.merge({allUsers: action.response});
		case LOGGED_IN:
			return state.merge({isLoggedIn: true, user: action.response});
		case SUBMIT_QUESTION_ANSWER_SUCCESSFULLY:
			const updatedUsers = updateUsersVotes(state.get('allUsers'), action.response);
			return state.merge({
				allUsers: updatedUsers,
				user: updatedUsers[action.response.authedUser],
			});
		default:
			return state;
	}
}