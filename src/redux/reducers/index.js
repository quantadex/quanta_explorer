import { combineReducers } from 'redux';

import operationsReducer from './operations';

const reducers = combineReducers({
	operations: operationsReducer,
});

export default reducers;
