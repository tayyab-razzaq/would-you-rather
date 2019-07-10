import { Map } from 'immutable';

import {
    LOGGED_IN,
    SIGN_UP,
    LOGOUT,
    FETCH_ALL_USER_SUCCESSFULLY,
    FETCH_ALL_UPDATED_USER_SUCCESSFULLY,
} from '../common/actionTypes';

const initialState = new Map({
    error: null,
    statusSuccess: false,
    isLoggedIn: false,
    user: {},
    allUsers: {},
});

export default (state = initialState, action) => {
    switch (action.type) {
    case LOGOUT:
        return state.merge({ user: {}, isLoggedIn: false });
    case FETCH_ALL_USER_SUCCESSFULLY:
        return state.merge({ allUsers: action.response });
    case FETCH_ALL_UPDATED_USER_SUCCESSFULLY:
        return state.merge({
            allUsers: action.response,
            user: action.response[state.get('user').id],
        });
    case LOGGED_IN:
        return state.merge({ isLoggedIn: true, user: action.response });
    case SIGN_UP:
        return state.merge({ isLoggedIn: true, user: action.user, allUsers: action.allUsers });
    default:
        return state;
    }
};