import {LOGGED_IN, FETCH_ALL_USER_SUCCESSFULLY, REINITIALIZED_STATE} from '../../common/actionTypes';
import * as API from '../../utils/_DATA';

export function reinitializedState() {
	return {type: REINITIALIZED_STATE};
}

function fetchUsersSuccess(response) {
	return {response, type: FETCH_ALL_USER_SUCCESSFULLY}
}

function fetchUsers() {
	return function (dispatch) {
		return API._getUsers().then(function (response) {
			return dispatch(fetchUsersSuccess(response));
		});
	};
}

export function getAllUsers() {
	return function (dispatch) {
		return dispatch(fetchUsers(dispatch));
	};
}

function loginSuccess(response) {
	return {response, type: LOGGED_IN}
}

function loginRequest(userObj) {
	return function (dispatch) {
		return API._getUsers().then(function (response) {
			if (userObj['id'] in response){
				return dispatch(loginSuccess(userObj));
			}
		});
	};
}

export function login(userObj) {
	return function(dispatch) {
		return dispatch(loginRequest(userObj, dispatch));
	};
}