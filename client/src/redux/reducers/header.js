import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/header';
import CONFIG from '@quanta/config';

const initialState = {
	searchKey: '',
	environmentType: {
		value: CONFIG.TYPE[0],
		label: CONFIG.TYPE[0],
	},
};

const ACTION_HANDLERS = {
	[Actions.changeEnvironmentType]: (state, action) => ({
		...state,
		environmentType: action.payload,
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
