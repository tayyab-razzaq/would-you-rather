import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Login} from './components/login';
import {Home} from './components/home';
import {Question} from './components/question';
import AuthenticatedComponent from "./AuthenticatedComponent";

export default (
	<Switch>
		<AuthenticatedComponent exact path={'/'} component={Home}/>
		<Route exact path="/login" component={Login}/>
		<Route exact path="/home" component={Home}/>
		<Route exact path="/questions/:questionId" component={Question}/>
	</Switch>
);