import {Map} from 'immutable';
import {GET_ALL_QUESTIONS, GET_QUESTION_BY_ID, SUBMIT_QUESTION_ANSWER_SUCCESSFULLY} from '../common/actionTypes';

let initialState = new Map({
	error: null,
	statusSuccess: false,
	questions: {},
	question: null,
});


function updateQuestionsVotes(questions, {qid, answer, authedUser}) {
	return {
		...questions,
		[qid]: {
			...questions[qid],
			[answer]: {
				...questions[qid][answer],
				votes: questions[qid][answer].votes.concat([authedUser])
			}
		}
	};
}

export default function questionsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_QUESTIONS:
			return state.merge({questions: action.response});
		case GET_QUESTION_BY_ID:
			return state.merge({question: state.get('questions')[action['questionId']]});
		case SUBMIT_QUESTION_ANSWER_SUCCESSFULLY:
			const updatedQuestions = updateQuestionsVotes(state.get('questions'), action.response);
			return state.merge({
				questions: updatedQuestions,
				question: updatedQuestions[action.response.qid],
			});
		default:
			return state;
	}
}