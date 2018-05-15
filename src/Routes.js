import React from "react";
import { Route, Switch } from "react-router-dom";
import Status from "./views/Status";
import Board from "./views/Board";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import NotFound from "./views/NotFound";
import NewGame from "./views/NewGame"
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir } from './auth'

export default () =>
	<Switch>
		<Route path="/" exact component={userIsAuthenticatedRedir(Status)} />
		<Route path="/board" exact component={userIsAuthenticatedRedir(Board)} />
		<Route path="/games/new" exact component={userIsAuthenticatedRedir(NewGame)} />
		<Route path="/games/:game_id" component={userIsAuthenticatedRedir(Board)} />
		<Route path="/login" exact component={userIsNotAuthenticatedRedir(Login)} />
		<Route path="/signup" exact component={userIsNotAuthenticatedRedir(SignUp)} />
		<Route component={NotFound} status={404} />
	</Switch>;
