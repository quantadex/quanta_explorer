import { combineReducers } from 'redux';

import headerReducer from './header';
import operationsReducer from './operations';
import ledgersReducer from './ledgers';
import metricsReducer from './metrics';
import globalReducer from './global';
import transactionReducer from './transactions';

const reducers = combineReducers({
	operations: operationsReducer,
	ledgers: ledgersReducer,
	header: headerReducer,
	metrics: metricsReducer,
	global: globalReducer,
	transactions: transactionReducer,
});

export default reducers;
