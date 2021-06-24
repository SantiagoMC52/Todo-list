/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const composeEnhancers = (typeof window !== 'undefined'
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_)
|| compose;

const configureStore = (initialState) => createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default configureStore;
