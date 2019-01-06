import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {Login} from './components/login';
import {Home} from './components/home';
import {Question} from './components/question';
import {NewQuestion} from './components/newQuestion';
import {LeaderBoard} from './components/leaderBoard';
import Page404 from './components/Page404';
import AuthenticatedComponent from "./AuthenticatedComponent";

export default (
	<Switch>
		<Redirect exact path='/' to='/home'/>
		<Route exact path="/login" component={Login}/>
		<AuthenticatedComponent exact path="/home" component={Home}/>
		<AuthenticatedComponent exact path="/questions/:questionId" component={Question}/>
		<AuthenticatedComponent exact path="/add" component={NewQuestion}/>
		<AuthenticatedComponent exact path="/leaderboard" component={LeaderBoard}/>
		<Route component={Page404}/>
	</Switch>
);
