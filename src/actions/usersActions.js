import {
    FETCH_ALL_UPDATED_USER_SUCCESSFULLY,
    FETCH_ALL_USER_SUCCESSFULLY,
    LOGGED_IN,
    SIGN_UP,
    LOGOUT,
} from '../common/actionTypes';
import * as API from '../utils/_DATA';

const usersFetchSuccessfully = response => ({ response, type: FETCH_ALL_USER_SUCCESSFULLY });

export const getAllUsers = () => dispatch =>
    // eslint-disable-next-line no-underscore-dangle
    API._getUsers().then(response => dispatch(usersFetchSuccessfully(response)));


const loggedOutSuccessfully = () => ({ type: LOGOUT });

export const logout = () => dispatch => dispatch(loggedOutSuccessfully());


const updatedUsersFetchSuccessfully = response => ({ response, type: FETCH_ALL_UPDATED_USER_SUCCESSFULLY });

export const getAllUpdatedUsers = () => dispatch =>
    // eslint-disable-next-line no-underscore-dangle
    API._getUsers().then(response => dispatch(updatedUsersFetchSuccessfully(response)));


const loginSuccessfully = response => ({ response, type: LOGGED_IN });

// eslint-disable-next-line no-underscore-dangle
export const login = userObj => dispatch => API._getUsers().then(response => {
    // eslint-disable-next-line no-prototype-builtins
    if (response.hasOwnProperty(userObj.id)) {
        dispatch(loginSuccessfully(userObj));
    }
});


const signUpSuccessfully = (user, allUsers) => ({ user, allUsers, type: SIGN_UP });

export const signUp = user => dispatch =>
    // eslint-disable-next-line no-underscore-dangle
    API._saveUser(user).then(allUsers => dispatch(signUpSuccessfully(user, allUsers)));