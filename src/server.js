const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const compression = require('compression');

import React from 'react';
import getRoutes from './routes';
import ReactDOM from 'react-dom/server';
import {Router} from 'react-router';
import {match} from 'react-router';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import {Provider} from 'react-redux';
import Html from '../utils/html';
import createStore from './redux/create';
import ApiClient from '../utils/ApiClient';
import assets from '../webpack-assets';
import httpProxy from 'http-proxy';


const proxy = httpProxy.createProxyServer({target: 'http://localhost:8000'});
const app = new express();
app.use(compression());

app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/graphql',(req,res) => proxy.web(req,res));
app.use(session({
	secret: 'react',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(multer({dest: '/uploads/'}).single());
app.use((req,res)=>{
	global.navigator = {userAgent: req.headers['user-agent']};
	let history = createMemoryHistory(req.url);
	const routes = getRoutes();
	const store = createStore(history, new ApiClient());
	match({history,routes,location: req.url},(error, redirectLocation, renderProps)=>{
		if(error){
			console.log('match出错了');
			res.send(error);
		}else if(redirectLocation){
			res.redirect(redirectLocation.pathname + redirectLocation.search);
		}else if(renderProps){
			loadOnServer({...renderProps, store}).then(()=>{
				const component = (
					<Provider store={store} key="provider">
						<ReduxAsyncConnect {...renderProps}/>
					</Provider>
				);
				res.status(200);
				res.send('<!doctype html>\n' + ReactDOM.renderToString(<Html store={store} assets={assets} component={component}/>));
			});

		}else{
			res.sendStatus(404);
		}
	});
})
app.listen(80,()=>console.log('服务器正监听80端口'));