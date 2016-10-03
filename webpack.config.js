'use strict';

import webpack from 'webpack';
import path from 'path';

export default {
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    noInfo: false,
    target: 'web',
    entry: {
        admin: ['eventsource-polyfill', 'webpack-hot-middleware/client?reload=true', './src/index']
    },
    devServer: {
        contentBase: './src'
    }
}