'use strict';

/* eslint-disable no-console */

import bodyParser from 'body-parser';
import express from 'express';
// import expressWs from 'express-ws';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.develop';
import open from 'open';

const fs = require('fs');
const url = require('url');
const request = require('request');

const port = 5050;
/*const appWs = expressWs(express());
const app = appWs.app;*/
const app = express();
const compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const WebSocketClient  = require('websocket').w3cwebsocket;
// const client = new WebSocketClient('ws://8887.umarov.titan.paymo.ru/ws');

// const ss = true;


app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res, next)=>{res.sendFile(path.join(__dirname, '../src/index.html')); });
app.get('/transactions', (req, res, next)=>{res.sendFile(path.join(__dirname, '../src/index.html')); });

app.post('/api', function(req, res) {
	res.header('Content-Type', 'application/json;charset=utf-8');

	const cont = req.body.cont;
	const url = req.body.url;

	const parseResponse = (error, response, body) => {
		console.log(response);

		res.send(response);
	};

	request({
		method: 'POST',
		uri: 'http://8887.umarov.titan.paymo.ru/rest',
		headers: {'content-type' : 'application/x-www-form-urlencoded'},
		json: cont
	}, parseResponse.bind(this));
});

/*app.ws('/ws', ws => {
	ws.on('message', (msg) => {
		console.log(msg);
		client.send(msg);
	});
});*/

// const seedData = (methodName, data, delay) => {
// 	setInterval(() => {
// 		registeredUsersWs.clients.forEach(client => {
// 			client.send(JSON.stringify({
// 				success: 'True',
// 				method: methodName,
// 				data: data()
// 			}));
// 		});
// 	}, delay);
// };

// seedData('getRegisteredUsersCount', () => { return {count: parseInt(Math.random() * 1000).toString()}; }, 5000);
// seedData('getActiveUsersCount', () => {return {count: parseInt(Math.random() * 100).toString()}; }, 2000);
// seedData('getRepeatedUsersCount', () => { return {count: parseInt(Math.random() * 50).toString()}; }, 8000);
// seedData('getEngagedUsersCount', () => {return {count: parseInt(Math.random() * 28).toString()}; }, 10000);


app.listen(port, err=> {
	if (err)
		console.log(err);
	else
		open(`http://localhost:${port}`);
});

/*
client.onerror = (error) => console.log(error);
client.onopen = () => console.log('a');

client.onmessage = msg => {
	appWs.getWss('/ws').clients.forEach(c => {
		c.send(msg.data);
	});
};
*/
