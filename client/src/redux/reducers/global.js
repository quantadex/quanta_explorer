import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/global';

const initialState = {
	averageBlockLatency: 0,
	nodeCount: 1,
};

const ACTION_HANDLERS = {
	[Actions.setAverageBlockLatency]: (state, action) => ({
		...state,
		averageBlockLatency: action.payload,
	}),
	[Actions.setNodeCount]: (state, action) => ({
		...state,
		nodeCount: action.payload.nodeCount,
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
