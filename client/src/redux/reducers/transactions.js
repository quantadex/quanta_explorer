import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/transactions';

const initialState = {
	transaction: {
		transaction: {},
		isFetching: false,
		isFetchingOperations: false,
		operations: [],
	},
};

const ACTION_HANDLERS = {
	[Actions.requestTransaction]: state => ({
		...state,
		transaction: {
			...state.transaction,
			transaction: {},
			isFetching: true,
		},
	}),
	[Actions.failTransaction]: state => ({
		...state,
		transaction: {
			...state.transaction,
			transaction: {},
			isFetching: false,
		},
	}),
	[Actions.receiveTransaction]: (state, action) => ({
		...state,
		transaction: {
			...state.transaction,
			transaction: action.payload.transaction,
			isFetching: false,
		},
	}),
	[Actions.requestTransactionOperations]: state => ({
		...state,
		transaction: {
			...state.transaction,
			operations: [],
			isFetchingOperations: true,
		},
	}),
	[Actions.failTransactionOperations]: state => ({
		...state,
		transaction: {
			...state.transaction,
			operations: [],
			isFetchingOperations: false,
		},
	}),
	[Actions.receiveTransactionOperations]: (state, action) => ({
		...state,
		transaction: {
			...state.transaction,
			operations: action.payload.operations,
			isFetchingOperations: false,
		},
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
