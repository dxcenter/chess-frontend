import React from "react";
import { Route, Switch } from "react-router-dom";
import Status from "./views/Status";
import Board from "./views/Board";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir } from './auth'

export default () =>
	<Switch>
		<Route path="/" exact component={userIsAuthenticatedRedir(Status)} />
		<Route path="/board" exact component={userIsAuthenticatedRedir(Board)} />
		<Route path="/login" exact component={userIsNotAuthenticatedRedir(Login)} />
		<Route component={NotFound} status={404} />
	</Switch>;
