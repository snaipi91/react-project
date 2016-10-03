import React from 'react';
import {IndexRoute, Route} from 'react-router';

import {/*SimpleLayout, */AuthorizedLayout} from './components/layout';

// import AuthPage from './components/auth/authPage';

import App from './components/app';
import Shop from './components/app';
// import MainPage from './components/main/mainPage';
// import SummaryPage from './components/summary/summaryPage';
import TransactionsPage from './components/transactions/transactionsPage';
import ReportPage from './components/report/reportPage';

export default function configureRoutes(store) {
	const authTransition = (nextState, replace, cb) => {
		cb();
	};

	return (
		<Route path="/" component={App}>
			<IndexRoute component={AuthorizedLayout(ReportPage, 'Отчет')} onEnter={authTransition}/>
			<Route path="/transactions" component={AuthorizedLayout(TransactionsPage, 'Транзакции')} onEnter={authTransition}/>
			<Route path="/shop" component={Shop}/>
		</Route>
	);
}
