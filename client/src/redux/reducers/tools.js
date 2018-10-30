import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/tools';

const initialState = {
	keys: null,
};

const ACTION_HANDLERS = {
	[Actions.generateKeys]: (state, action) => ({
		...state,
		keys: action.payload,
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
