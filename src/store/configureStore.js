import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import promiseMiddleware from "redux-promise-middleware";
import logger from 'redux-logger';


export default  createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(promiseMiddleware(),logger)
  );