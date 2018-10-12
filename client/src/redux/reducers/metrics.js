import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/metrics';

const initialState = {
	metrics: {},
	isFetching: false,
};

const ACTION_HANDLERS = {
	[Actions.requestMetrics]: state => ({
		...state,
		isFetching: true,
		metrics: {},
	}),
	[Actions.failMetrics]: state => ({
		...state,
		isFetching: false,
	}),
	[Actions.receiveMetrics]: (state, action) => ({
		...state,
		metrics: action.payload.metrics,
		isFetching: false,
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
