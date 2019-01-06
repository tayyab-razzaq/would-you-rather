import {
	FETCH_ALL_UPDATED_USER_SUCCESSFULLY,
	FETCH_ALL_USER_SUCCESSFULLY,
	LOGGED_IN,
	REINITIALIZED_STATE
} from '../common/actionTypes';
import * as API from '../utils/_DATA';

export function reinitializedState() {
	return {type: REINITIALIZED_STATE};
}

function usersFetchSuccessfully(response) {
	return {response, type: FETCH_ALL_USER_SUCCESSFULLY}
}

export function getAllUsers() {
	return dispatch => API._getUsers().then(response => dispatch(usersFetchSuccessfully(response)));
}

function updatedUsersFetchSuccessfully(response) {
	return {response, type: FETCH_ALL_UPDATED_USER_SUCCESSFULLY}
}

export function getAllUpdatedUsers() {
	return dispatch => API._getUsers().then(response => dispatch(updatedUsersFetchSuccessfully(response)));
}

function loginSuccessfully(response) {
	return {response, type: LOGGED_IN}
}

export function login(userObj) {
	return dispatch =>
		API._getUsers().then(response => {
			if (response.hasOwnProperty(userObj['id'])) {
				return dispatch(loginSuccessfully(userObj));
			}
		});
}