import {Map} from 'immutable';
import {GET_ALL_QUESTIONS} from '../../common/actionTypes';

let initialState = new Map({
	error: null,
	statusSuccess: false,
	questions: [],
});


export default function homeReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_QUESTIONS:
			return state.merge({questions: action.response});
		default:
			return state;
	}
}