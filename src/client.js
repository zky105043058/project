import {Router, Route, browserHistory} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import {syncHistoryWithStore} from 'react-router-redux';
import {ReduxAsyncConnect} from 'redux-async-connect';
import ApiClient from '../utils/ApiClient';
import {Provider} from 'react-redux';
import Devtool from '../utils/devtool';

let getRoutes = require('./routes').default;
const store = createStore(browserHistory, new ApiClient(), window.__data);
const history = syncHistoryWithStore(browserHistory, store);

let component = (
    <Router history = {history} render={(props) => 
        <ReduxAsyncConnect {...props}/>
    }>
        {getRoutes()}
    </Router>
)


ReactDOM.render(<Provider store={store} key="provider" >
    {component}
</Provider>,
 document.getElementById('app'));

 if(__DEVELOPMENT__){
     ReactDOM.render(<Provider store={store} key="provider" >
        <div>
            {component}
            <Devtool />
        </div>
    </Provider>,
    document.getElementById('app'));
 }


if(module.hot){
    module.hot.accept('./component/App', () => {

        console.log('==========client');

        /*require('./component/App');

        getRoutes = require('./routes').default;
        component = (
            <Router history = {history} render={(props) => 
                <ReduxAsyncConnect {...props}/>
            }>
                {getRoutes()}
            </Router>
        )

        if(__DEVELOPMENT__){
            ReactDOM.render(<Provider store={store} key="provider" >
                <div>
                    {component}
                    <Devtool />
                </div>
            </Provider>,
            document.getElementById('app'));
        }else{
            ReactDOM.render(<Provider store={store} key="provider" >
                {component}
            </Provider>,
            document.getElementById('app'));
        }*/

    })
}