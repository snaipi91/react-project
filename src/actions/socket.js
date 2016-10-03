'use strict';

let instance = null;

class Socket {
	constructor() {
		if (!instance)
			instance = this;

		this._queue = [];
		if (process.env.NODE_ENV === 'release')
			this._socket = new WebSocket('ws://8887.umarov.titan.paymo.ru/ws');
		else
			this._socket = new WebSocket('ws://localhost:5050/ws');

		return instance;
	}

	onMessage(handler) {
		this._socket.onmessage = handler;
	}

	send(data) {
		if (this._socket.readyState !== 1) {
			this._queue = this._queue.concat(data);
		} else
			this._socket.send(JSON.stringify(data));
	}
}

setInterval(() => {
	if (!instance || instance._queue.length === 0) return;

	let data = instance._queue.splice(0, 1);

	if (instance._socket.readyState === 1)
		instance.send(data[0]);
	else
		instance._queue = instance._queue.concat(data);
}, 1000);

const socket = new Socket();

export default socket;