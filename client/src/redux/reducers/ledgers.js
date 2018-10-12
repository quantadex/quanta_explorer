import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/ledgers';

const initialState = {
	ledgers: [],
	isFetching: false,
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
};

export default handleActions(ACTION_HANDLERS, initialState);
