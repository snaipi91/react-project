'use strict';

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import autoprefixer from 'autoprefixer';
import precss from 'precss';

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('release')
};

export default {
	context: path.join(__dirname, 'src'),
	debug: true,
	devtool: null,
	noInfo: false,
	entry: {
		admin: ['./index']
	},
	target: 'web',
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin(GLOBALS),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel']
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
			},
			{
				test: /\.jpg$/,
				loader: 'url?limit=10000&mimetype=image/jpeg'
			},
			{
				test: /\.png$/,
				loader: 'url?limit=10000&mimetype=image/png'
			}
		]
	},
	postcss: function() {
		return [autoprefixer({browsers: ['last 2 versions']}), precss];
	}
};
