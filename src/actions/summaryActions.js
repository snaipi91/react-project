'use strict';

import SummaryApi from '../api/summaryApi';
import {SummaryConsts} from '../consts';
import Socket from './socket';

export function loadUsersInfo() {
	return dispatch => {
		dispatch(loadInfoBegin('users'));
		return SummaryApi.loadUsersInfo().then(res => {
			dispatch(loadInfoSuccess('users', res.data));
		}).catch(error => {throw(error);});
	};
}

export function getActiveUsersCount() {
	const parameter = 'activeUsers';
	return dispatch => {
		dispatch(loadInfoBegin(parameter));
		Socket.send({method: 'getActiveUsersCount'});
	};
}

export function getRegisteredUsersCount() {
	const parameter = 'registeredUsers';
	return dispatch => {
		dispatch(loadInfoBegin(parameter));
		Socket.send({method: 'getRegisteredUsersCount'});
	};
}

export function getRepeatedUsersCount() {
	const parameter = 'repeatedUsers';
	return dispatch => {
		dispatch(loadInfoBegin(parameter));
		Socket.send({method: 'getRepeatedUsersCount'});
	};
}

export function getEngagedUsersCount() {
	const parameter = 'engagedUsers';
	return dispatch => {
		dispatch(loadInfoBegin(parameter));
		Socket.send({method: 'getEngagedUsersCount'});
	};
}

export function loadInfoBegin(parameter) {
	return {
		type: SummaryConsts.LOADING_BEGIN,
		parameter
	};
}

export function loadInfoSuccess(parameter, data) {
	return {
		type: SummaryConsts.LOADING_SUCCESS,
		parameter,
		data
	};
}

export function loadInfoFail(parameter, message) {
	return {
		type: SummaryConsts.LOADING_FAIL,
		parameter,
		message
	};
}