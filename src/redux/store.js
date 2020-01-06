import { createStore, applyMiddleware } from 'redux';
import reduxMiddleware from 'redux-promise-middleware';

export default createStore(reducer, applyMiddleware(reduxMiddleware));