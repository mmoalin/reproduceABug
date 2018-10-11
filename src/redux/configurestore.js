import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { companies as reducer } from './reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
console.log("thunk " + thunk);
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(  applyMiddleware(thunk) ));
//var store = createStore(reducer, applyMiddleware(thunk));
export default store;
