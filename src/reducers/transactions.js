'use strict';

import {TransactionsConsts} from '../consts';
import {Transactions} from '../state';

export default function transactions(state=Transactions, action) {
	switch(action.type) {
		case TransactionsConsts.GETPAYMENTBYID_COMPLETED:
			return Object.assign({}, state, {transaction: action.result});
		default:
			return state;
	}
}