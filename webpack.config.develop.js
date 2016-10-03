'use strict';

import webpack from 'webpack';
import path from 'path';

export default {
	debug: true,
	devtool: 'cheap-module-eval-source-map',
	noInfo: false,
	target: 'web',
	entry: {
		admin: ['eventsource-polyfill',	'webpack-hot-middleware/client?reload=true', './src/index']
	},
	devServer: {
		contentBase: './src'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'src'),
				exclude: /node_modules/,
				loaders: ['babel']
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.jpg$/,
				loader: 'url?limit=10000&mimetype=image/jpeg'
			},
			{
				test: /\.png$/,
				loader: 'url?limit=10000&mimetype=image/png'
			},
			{
                test: /\.svg$/,
				loader: 'svg-url-loader'
			}
		]
	}
};