import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/login/Login';

export default (
	<Switch>
		<Route exact path="/" render={() => <div/>}/>
		<Route exact path="/login" component={Login}/>
	</Switch>
);