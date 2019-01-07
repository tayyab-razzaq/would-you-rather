import {
	FETCH_ALL_UPDATED_USER_SUCCESSFULLY,
	FETCH_ALL_USER_SUCCESSFULLY,
	LOGGED_IN,
	SIGN_UP,
	LOGOUT
} from '../common/actionTypes';
import * as API from '../utils/_DATA';

function usersFetchSuccessfully(response) {
	return {response, type: FETCH_ALL_USER_SUCCESSFULLY}
}

export function getAllUsers() {
	return dispatch => API._getUsers().then(response => dispatch(usersFetchSuccessfully(response)));
}

function loggedOutSuccessfully() {
	return {type: LOGOUT}
}

export function logout() {
	return dispatch => dispatch(loggedOutSuccessfully());
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

function signUpSuccessfully(user, allUsers) {
	return {user, allUsers, type: SIGN_UP}
}

export function signUp(user) {
	return dispatch =>
		API._saveUser(user).then(allUsers => {
			return dispatch(signUpSuccessfully(user, allUsers));
		});
}