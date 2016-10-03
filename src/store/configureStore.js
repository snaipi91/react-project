'use strict';

if (process.env.NODE_ENV === 'release')
	module.exports = require('./configureStore.release');
else
	module.exports = require('./configureStore.develop');

