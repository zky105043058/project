import React from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
export default class Html extends React.Component{
	render(){
		const {component, store, assets} = this.props;
		const content = component? ReactDOM.renderToString(component) : '';
		return (
			<html className="no-js" lang="en">
	        <head>
	          <meta charSet="utf-8" />
	          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
	          <title>React Demo</title>
	          <meta name="description" content="react material-ui nodejs" />
	          <meta name="viewport" content="width=device-width, initial-scale=1" />
						<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
						<link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css" rel="stylesheet"/>
	        </head>
	        <body>
	          <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
						<script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
	          <script src={assets.main.js} charSet="UTF-8"/>
	        </body>
	      </html>
		)
	}
}