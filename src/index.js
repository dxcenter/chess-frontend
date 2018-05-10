import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './Page';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { routerReducer } from 'react-router-redux'

import userReducer from './reducers/user'

const reducer = combineReducers({
	routing: routerReducer,
	user: userReducer,
})

const DevTools = createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h"
			changePositionKey="ctrl-q">
		<LogMonitor theme="tomorrow" />
	</DockMonitor>
)

const enhancer = compose(
	// Middleware you want to use in development:
	applyMiddleware(thunkMiddleware),
	DevTools.instrument()
)

// Note: passing enhancer as the last argument requires redux@>=3.1.0
const store = createStore(reducer, enhancer)

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Page />
			{/* <DevTools /> */}
		</div>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
