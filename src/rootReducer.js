import {combineReducers} from 'redux';
import loginReducer from './components/login/loginReducer';
import {homeReducer} from './components/home';

const rootReducer = combineReducers({
	loginReducer,
	homeReducer
});

export default rootReducer