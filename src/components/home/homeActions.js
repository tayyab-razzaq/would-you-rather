import {GET_ALL_QUESTIONS} from "../../common/actionTypes";
import * as API from "../../utils/_DATA";

function fetchQuestionsSuccess(response) {
	return {response, type: GET_ALL_QUESTIONS}
}

function fetchQuestions() {
	return function (dispatch) {
		return API._getQuestions().then(function (response) {
			return dispatch(fetchQuestionsSuccess(response));
		});
	};
}

export function getAllQuestions() {
	return function (dispatch) {
		return dispatch(fetchQuestions(dispatch));
	};
}
