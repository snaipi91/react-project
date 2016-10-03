'use strict';

import delay from './delay';

export default class SummaryApi {
	static loadUsersInfo() {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve({data: {count: 15}}), delay);
		});
	}

	static getActiveUsersCount() {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve({data: {count: 2}}), delay);
		});
	}

	static getRepeatedUsersCount() {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve({data: {count: 1}}), delay);
		});
	}

	static getEngagedUsersCount() {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve({data: {count: -1}}), delay);
		});
	}
}