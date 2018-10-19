import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/operations';

const initialState = {
	operations: [],
	links: {},
	isFetching: false,
};

const ACTION_HANDLERS = {
	[Actions.requestOperations]: state => ({
		...state,
		isFetching: true,
		operations: [],
		links: {},
	}),
	[Actions.failOperations]: state => ({
		...state,
		isFetching: false,
	}),
	[Actions.receiveOperations]: (state, action) => ({
		...state,
		operations: action.payload.operations,
		links: action.payload.links,
		isFetching: false,
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
