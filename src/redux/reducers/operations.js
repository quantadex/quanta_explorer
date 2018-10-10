import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/operations';

const initialState = {
	operations: [],
	isFetching: false,
};

const ACTION_HANDLERS = {
	[Actions.requestOperations]: state => ({
		...state,
		isFetching: true,
	}),
	[Actions.failOperations]: state => ({
		...state,
		isFetching: false,
	}),
	[Actions.receiveOperations]: (state, action) => ({
		...state,
		operations: action.payload.operations,
		isFetching: false,
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
