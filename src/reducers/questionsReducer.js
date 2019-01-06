import {Map} from 'immutable';
import {
	GET_ALL_QUESTIONS,
	GET_ALL_UPDATED_QUESTIONS,
	GET_QUESTION_BY_ID
} from '../common/actionTypes';

let initialState = new Map({
	error: null,
	statusSuccess: false,
	questions: {},
	question: null,
});

export default function questionsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_QUESTIONS:
			return state.merge({questions: action.response});
		case GET_ALL_UPDATED_QUESTIONS:
			return state.merge({
				questions: action.response,
				question: state.get('question') ? action.response[state.get('question').id] : null
			});
		case GET_QUESTION_BY_ID:
			return state.merge({question: state.get('questions')[action.questionId]});
		default:
			return state;
	}
}