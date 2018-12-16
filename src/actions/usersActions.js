import {LOGGED_IN, FETCH_ALL_USER_SUCCESSFULLY, REINITIALIZED_STATE} from '../common/actionTypes';
import * as API from '../utils/_DATA';

export function reinitializedState() {
	return {type: REINITIALIZED_STATE};
}

function usersFetchSuccessfully(response) {
	return {response, type: FETCH_ALL_USER_SUCCESSFULLY}
}

export function getAllUsers() {
	return function (dispatch) {
		return API._getUsers().then(function (response) {
			return dispatch(usersFetchSuccessfully(response));
		});
	};
}

function loginSuccessfully(response) {
	return {response, type: LOGGED_IN}
}

export function login(userObj) {
	return function (dispatch) {
		return API._getUsers().then(function (response) {
			if (userObj['id'] in response){
				return dispatch(loginSuccessfully(userObj));
			}
		});
	};
}