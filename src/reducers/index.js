import {combineReducers} from 'redux';
import usersReducer from './usersReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
	usersReducer: usersReducer,
	questionsReducer: questionsReducer
});

export default rootReducer