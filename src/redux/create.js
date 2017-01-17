import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import reducer from './modules/reducer';
import clientMiddleware from './middleware/clientMiddleware';
import Devtool from '../../utils/devtool';
import { persistState } from 'redux-devtools';
export default (history, client, data)=>{
	const middlewares = [routerMiddleware(history), clientMiddleware(client)];
	let finalCreateStore;
	if(__DEVELOPMENT__ && !__SERVER__){
		finalCreateStore = compose( applyMiddleware(...middlewares),
			Devtool.instrument(),
			persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		)(createStore);
	}else{
		finalCreateStore = applyMiddleware(...middlewares)(createStore);
	}
	const store = finalCreateStore(reducer,data);
	return store;
}