import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {Login} from './components/login';
import {Home} from './components/home';
import {Question} from './components/question';
import {NewQuestion} from './components/newQuestion';
import {LeaderBoard} from './components/leaderBoard';
import Page404 from './components/Page404';
import AuthenticatedComponent from './AuthenticatedComponent';
import {URL} from './common/constants';

export default (
	<Switch>
		<Redirect exact path='/' to={URL}/>
		<Redirect exact path={URL} to={`${URL}/home`}/>
		<Route exact path={`${URL}/login`} component={Login}/>
		<AuthenticatedComponent exact path={`${URL}/home`} component={Home}/>
		<AuthenticatedComponent exact path={`${URL}/questions/:questionId`} component={Question}/>
		<AuthenticatedComponent exact path={`${URL}/add`} component={NewQuestion}/>
		<AuthenticatedComponent exact path={`${URL}/leaderboard`} component={LeaderBoard}/>
		<Route component={Page404}/>
	</Switch>
);