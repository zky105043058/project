const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const rootPath = path.resolve(__dirname, '..');
module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
            path.resolve(rootPath, './src/client.js')
        ]
    },
    output: {
        path: path.join(rootPath, 'public'),
        filename: '[name].js',
        publicPath: 'http://localhost:3000/public/'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.scss$/, loader: 'style!css?modules!sass'}
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __SERVER__: false,
            __DEVELOPMENT__: true
        }),
        new AssetsPlugin({
            path: rootPath,
            filename: 'webpack-assets.js',
            processOutput: x => `module.exports = ${JSON.stringify(x, null, 2)};`
    })]
}