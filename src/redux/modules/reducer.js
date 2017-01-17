import { combineReducers } from 'redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { routerReducer } from 'react-router-redux';
import userReducer from './user';

export default combineReducers({
	reduxAsyncConnect,
	routing: routerReducer,
	users: userReducer
});