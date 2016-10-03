'use strict';

/*eslint-disable no-console */

import webpack from 'webpack';
import config from '../webpack.config.release';
import colors from 'colors';

process.env.NODE_ENV = 'release';

console.log('Preparing bundle via Webpack. Please wait...'.blue);

webpack(config).run((err, stats) => {
	if (err) {
		console.log(err.bold.red);
		return 1;
	}

	const jsonStats = stats.toJson();
	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(error.red));
	}

	if (jsonStats.hasWarnings) {
		console.log('Webpack generated following warnings...'.bold.yellow);
		jsonStats.warnings.map(warning => console.log(warning.yellow));
	}

	console.log(`Webpack stats: ${stats}`);

	console.log('Admin has been compiled and written to /dist'.green);

	return 0;
});