import {ReportFilter} from '../state';
import {ReportFilterConst} from '../consts';


export default function reportsFilter(state = ReportFilter, action) {
	switch (action.type) {
		case ReportFilterConst.IS_TEST: {
			return Object.assign({}, state, {testingPays: action.payload});
		}


		case ReportFilterConst.SET_ALL_PAYMENTS: {
			return Object.assign({}, state, {paymentsList: action.payload});
		}


		case ReportFilterConst.SET_PAYMENTS_COUNT: {
			return Object.assign({}, state, {paymentsCount: action.payload});
		}


		case ReportFilterConst.REPORT_LINK: {
			return Object.assign({}, state, {reportLink: action.payload}, {reportLinkDownload: action.payload});
		}


		case ReportFilterConst.SET_CLEAR_DOWNLOAD: {
			return Object.assign({}, state, {reportLinkDownload: action.payload});
		}


		case ReportFilterConst.SHOW_HIDE_LOADER: {
			return Object.assign({}, state, {[action.payload.who]: action.payload.data});
		}


		case ReportFilterConst.FILTER_REQUEST: {
			let result = {};

			Object.assign(result, state.filterRequest, {[action.payload.who]: action.payload.data});

			return Object.assign({}, state, {filterRequest: result});
		}


		case ReportFilterConst.SELECT_SELECTED: {
			let result = {};

			Object.assign(result, state[action.payload.who], {selected: action.payload.data});

			return Object.assign({}, state, {[action.payload.who]: result});
		}


		case ReportFilterConst.UPDATE_SELECTS: {
			let result = {};

			Object.assign(result, state[action.payload.who], {options: action.payload.data});

			return Object.assign({}, state, {[action.payload.who]: result});
		}


		case ReportFilterConst.SELECT_LOADED: {
			let result = {};

			Object.assign(result, state[action.payload.who], {loaded: action.payload.data});

			return Object.assign({}, state, {[action.payload.who]: result});
		}


		case ReportFilterConst.MERCHANT_SORT: {
			let result = {};

			if ( action.payload ) {
				Object.assign(result, state.merchant,
					{
						sort: state.merchant.options.filter((item) => {
							return item[action.payload.on] == action.payload.onData
						})
					});
			} else {
				Object.assign(result, state.merchant, {sort: []});
			}

			return Object.assign({}, state, {merchant: result});
		}


		case ReportFilterConst.MERCHANT_POINT_SORT: {
			let result = {};

			if ( action.payload ) {
				Object.assign(result, state.merchantPoints,
					{
						sort: state.merchantPoints.options.filter((item) => {
							return item[action.payload.on] == action.payload.onData
						})
					});
			} else {
				Object.assign(result, state.merchantPoints, {sort: []});
			}

			return Object.assign({}, state, {merchantPoints: result});
		}


		default:
			return state;
	}
}