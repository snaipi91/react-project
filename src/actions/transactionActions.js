'use strict';

import {TransactionsConsts} from '../consts'
import Socket from './socket';

export function loadInfoBegin() {
	return {
		type: TransactionsConsts.LOADING
	};
}

export function getPaymentById(paymentId) {
	return dispatch => {
		dispatch(loadInfoBegin());
		Socket.send({
			method: 'getPaymentById',
			meta: {
				id: paymentId
			}
		});
	};
}

export function getPaymentById_Completed(result) {
	return {
		type: TransactionsConsts.GETPAYMENTBYID_COMPLETED,
		result
	};
}