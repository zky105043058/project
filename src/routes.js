import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from './component/App';

export default ()=>{
	return (
		<Route path="/" component={App}></Route>
	)
}