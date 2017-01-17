const express = require('express');
const config = require('./webpack/dev.config');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const compiler = webpack(config);
const app = express();
app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    quiet: true,
    inline: true,
    hot: true,
    lazy: false,
    headers: {'Access-Control-Allow-Origin': '*'}
}));
app.use(hotMiddleware(compiler));
app.listen(3000,()=>console.log('webpack监视器已在3000端口启动'));