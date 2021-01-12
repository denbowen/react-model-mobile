import {combineReducers, createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {reducer as testStore} from './modules/test';

const middleware = [reduxThunk];

const reducer = combineReducers({
  testStore,
});

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
