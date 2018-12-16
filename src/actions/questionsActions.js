import {GET_ALL_QUESTIONS, GET_QUESTION_BY_ID, SUBMIT_QUESTION_ANSWER_SUCCESSFULLY} from "../common/actionTypes";
import * as API from "../utils/_DATA";

function questionsFetchedSuccessfully(response) {
	return {response, type: GET_ALL_QUESTIONS}
}

export function getAllQuestions() {
	return function (dispatch) {
		return API._getQuestions().then(function (response) {
			return dispatch(questionsFetchedSuccessfully(response));
		});
	};
}


function fetchQuestionByIdSuccessfully(questionId, response) {
	return {response, questionId, type: GET_QUESTION_BY_ID}
}

export function getQuestionById(questionId) {
	return function (dispatch) {
		return dispatch(fetchQuestionByIdSuccessfully(questionId, {}));
	};
}


function submitQuestionAnswerSuccessfully(response) {
	return {response, type: SUBMIT_QUESTION_ANSWER_SUCCESSFULLY}
}

export function submitQuestionAnswer(authedUser, qid, answer) {
	return function (dispatch) {
		return API._saveQuestionAnswer({authedUser, qid, answer}).then(function () {
			return dispatch(submitQuestionAnswerSuccessfully({authedUser, qid, answer}));
		});
	};
}
