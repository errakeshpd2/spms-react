import { createStore, combineReducers, compose } from 'redux';

import dataReducer from './data/reducer';

const initialState = {};

const appReducer = combineReducers({
  data: dataReducer,
});

let enhancer = compose(window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(appReducer, initialState, enhancer);

export default store;