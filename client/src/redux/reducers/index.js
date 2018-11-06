import { combineReducers } from 'redux';

import headerReducer from './header';
import operationsReducer from './operations';
import ledgersReducer from './ledgers';
import metricsReducer from './metrics';
import globalReducer from './global';
import transactionReducer from './transactions';
import accountReducer from './account';
import toolsReducer from './tools';

const reducers = combineReducers({
	account: accountReducer,
	operations: operationsReducer,
	ledgers: ledgersReducer,
	header: headerReducer,
	metrics: metricsReducer,
	global: globalReducer,
	transactions: transactionReducer,
	tools: toolsReducer,
});

export default reducers;
