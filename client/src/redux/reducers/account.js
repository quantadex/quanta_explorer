import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/account';

const initialState = {
	account: {},
	isFetching: false,
	hasError: false,
	isFetchingOperations: false,
	operations: [],
};

const ACTION_HANDLERS = {
	[Actions.requestAccount]: state => ({
		...state,
		account: {},
		isFetching: true,
		hasError: false,
	}),
	[Actions.failAccount]: state => ({
		...state,
		account: {},
		isFetching: false,
		hasError: true,
	}),
	[Actions.receiveAccount]: (state, action) => ({
		...state,
		account: action.payload.account,
		isFetching: false,
		hasError: false,
	}),
	[Actions.requestAccountOperations]: state => ({
		...state,
		operations: [],
		isFetchingOperations: true,
	}),
	[Actions.failAccountOperations]: state => ({
		...state,
		operations: [],
		isFetchingOperations: false,
	}),
	[Actions.receiveAccountOperations]: (state, action) => ({
		...state,
		operations: action.payload.operations,
		isFetchingOperations: false,
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
