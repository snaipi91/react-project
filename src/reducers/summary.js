'use strict';

import {Summary} from '../state';
import {SummaryConsts} from '../consts';


export default function summary(state = Summary, action) {
	switch (action.type) {
		case SummaryConsts.LOADING_BEGIN: {
			let loadingData = {
				loading: false,
				data: {},
				success: false,
				errors: {
					code: 0,
					message: ""
				}
			};
			let result = {};
			result[action.parameter] = Object.assign(loadingData, {loading: true});
			return Object.assign({}, state, result);
		}

		case SummaryConsts.LOADING_SUCCESS: {
			let loadingData = {
				loading: false,
				data: {},
				success: false,
				errors: {
					code: 0,
					message: ""
				}
			};
			let result = {};

			result[action.parameter] = Object.assign(loadingData, {
				loading: false,
				error: false,
				data: action.data.data,
				success: action.data.success,
				errors: action.data.errors
			});
			return Object.assign({}, state, result);
		}

		case SummaryConsts.LOADING_FAIL: {
			let loadingData = {
				loading: false,
				data: {},
				success: false,
				errors: {
					code: 0,
					message: ""
				}
			};

			let result = {};
			result[action.parameter] = Object.assign(loadingData, {loading: false, error: true, errorMessage: action.message});
			return Object.assign({}, state, result);
		}

		default:
			return state;
	}
}