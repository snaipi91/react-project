/*eslint-disable import/default*/

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import configureStore from './store/configureStore';
import configureRoutes from './routes';

const store = configureStore();
const routes = configureRoutes(store);

import 'react-select/scss/default.scss';
import './style/index.scss';

// import socketActions from './actions/socketActions';

// socketActions(store);

console.log(ReactDOM);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>,
	document.getElementById('shop')
);