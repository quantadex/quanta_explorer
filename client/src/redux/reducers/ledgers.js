import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/ledgers';

const initialState = {
	ledgers: [],
	isFetching: false,
	ledger: {
		isFetching: false,
		isFetchingOperations: false,
		ledger: {},
		operations: [],
	},
	allLedgers: {
		ledgers: [],
		links: {},
		isFetching: false,
	},
};

const ACTION_HANDLERS = {
	[Actions.requestLedgers]: state => ({
		...state,
		isFetching: true,
		ledgers: [],
	}),
	[Actions.failLedgers]: state => ({
		...state,
		isFetching: false,
	}),
	[Actions.receiveLedgers]: (state, action) => ({
		...state,
		ledgers: action.payload.ledgers,
		isFetching: false,
	}),
	[Actions.requestAllLedgers]: state => ({
		...state,
		allLedgers: {
			isFetching: true,
			ledgers: [],
			links: {},
		},
	}),
	[Actions.failAllLedgers]: state => ({
		...state,
		allLedgers: {
			...state.allLedgers,
			isFetching: false,
		},
	}),
	[Actions.receiveAllLedgers]: (state, action) => ({
		...state,
		allLedgers: {
			ledgers: action.payload.ledgers,
			links: action.payload.links,
			isFetching: false,
		},
	}),
	[Actions.requestLedger]: state => ({
		...state,
		ledger: {
			...state.ledger,
			isFetching: true,
			ledger: {},
		},
	}),
	[Actions.failLedger]: state => ({
		...state,
		ledger: {
			...state.ledger,
			isFetching: false,
			ledger: {},
		},
	}),
	[Actions.receiveLedger]: (state, action) => ({
		...state,
		ledger: {
			...state.ledger,
			isFetching: false,
			ledger: action.payload.ledger,
		},
	}),
	[Actions.requestLedgerOperations]: state => ({
		...state,
		ledger: {
			...state.ledger,
			operations: [],
			isFetchingOperations: true,
		},
	}),
	[Actions.failLedgerOperations]: state => ({
		...state,
		ledger: {
			...state.ledger,
			operations: [],
			isFetchingOperations: false,
		},
	}),
	[Actions.receiveLedgerOperations]: (state, action) => ({
		...state,
		ledger: {
			...state.ledger,
			operations: action.payload.operations,
			isFetchingOperations: false,
		},
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
