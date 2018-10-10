import { combineReducers } from 'redux';

import operationsReducer from './operations';
import ledgersReducer from './ledgers';

const reducers = combineReducers({
	operations: operationsReducer,
	ledgers: ledgersReducer,
});

export default reducers;
