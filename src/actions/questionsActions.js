import {
	GET_ALL_QUESTIONS,
	GET_ALL_UPDATED_QUESTIONS,
	GET_QUESTION_BY_ID,
	SUBMIT_QUESTION_ANSWER_SUCCESSFULLY,
	SUBMIT_QUESTION_SUCCESSFULLY
} from "../common/actionTypes";
import * as API from "../utils/_DATA";

function questionsFetchedSuccessfully(response) {
	return {response, type: GET_ALL_QUESTIONS}
}

export function getAllQuestions() {
	return dispatch => API._getQuestions().then(response =>
		dispatch(questionsFetchedSuccessfully(response))
	);
}

function updatedQuestionsFetchedSuccessfully(response) {
	return {response, type: GET_ALL_UPDATED_QUESTIONS}
}

export function getAllUpdatedQuestions() {
	return dispatch => API._getQuestions().then(response =>
		dispatch(updatedQuestionsFetchedSuccessfully(response))
	);
}


function fetchQuestionByIdSuccessfully(questionId, response) {
	return {response, questionId, type: GET_QUESTION_BY_ID}
}

export function getQuestionById(questionId) {
	return dispatch => new Promise(res => {
		dispatch(fetchQuestionByIdSuccessfully(questionId, {}));
		res();
	});
}


function submitQuestionAnswerSuccessfully(response) {
	return {response, type: SUBMIT_QUESTION_ANSWER_SUCCESSFULLY}
}

export function submitQuestionAnswer(authedUser, qid, answer) {
	return dispatch => API._saveQuestionAnswer({authedUser, qid, answer}).then(() =>
		dispatch(submitQuestionAnswerSuccessfully({authedUser, qid, answer}))
	);
}


function submitNewQuestionSuccessfully(response) {
	return {response, type: SUBMIT_QUESTION_SUCCESSFULLY}
}

export function submitNewQuestion(question) {
	return dispatch => API._saveQuestion(question).then(formattedQuestion =>
		dispatch(submitNewQuestionSuccessfully(formattedQuestion))
	);
}