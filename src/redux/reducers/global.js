import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/global';

const initialState = {
	averageBlockLatency: 0,
};

const ACTION_HANDLERS = {
	[Actions.setAverageBlockLatency]: (state, action) => ({
		...state,
		averageBlockLatency: action.payload,
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
