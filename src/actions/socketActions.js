'use strict';

import Socket from './socket';
import * as summaryActions from './summaryActions';
import * as transactionActions from './transactionActions';

export default function (store) {
	Socket.onMessage(msg => {
		let jsonResponse = JSON.parse(msg.data);

		switch (jsonResponse.method) {
			case 'getRegisteredUsersCount':
				store.dispatch(summaryActions.loadInfoSuccess('registeredUsers', jsonResponse));
				break;
			case 'getActiveUsersCount':
				store.dispatch(summaryActions.loadInfoSuccess('activeUsers', jsonResponse));
				break;
			case 'getRepeatedUsersCount':
				store.dispatch(summaryActions.loadInfoSuccess('repeatedUsers', jsonResponse));
				break;
			case 'getEngagedUsersCount':
				store.dispatch(summaryActions.loadInfoSuccess('engagedUsers', jsonResponse));
				break;
			case 'getPaymentById':
				store.dispatch(transactionActions.getPaymentById_Completed(jsonResponse));
				break;
		}
	});
}