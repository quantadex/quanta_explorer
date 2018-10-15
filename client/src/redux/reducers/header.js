import { handleActions } from 'redux-actions';
import * as Actions from '@quanta/redux/actions/header';
import CONFIG from '@quanta/config';

const initialState = {
	searchKey: '',
	environmentType: {
		value: CONFIG.ENVIRONMENT.TYPE[0],
		label: CONFIG.ENVIRONMENT.TYPE[0] === 'testnet' ? 'Testnet' : 'Betanet',
	},
};

const ACTION_HANDLERS = {
	[Actions.changeEnvironmentType]: (state, action) => ({
		...state,
		environmentType: action.payload,
	}),
};

export default handleActions(ACTION_HANDLERS, initialState);
