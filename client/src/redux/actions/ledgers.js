import { createAction } from 'redux-actions';
import api from '@quanta/helpers/api';

export const REQUEST_LEDGERS = 'REQUEST_GET_LEDGERS';
export const RECEIVE_LEDGERS = 'RECEIVE_GET_LEDGERS';
export const FAIL_LEDGERS = 'FAIL_GET_LEDGERS';

// action creator

export const requestLedgers = createAction(REQUEST_LEDGERS);
export const failLedgers = createAction(FAIL_LEDGERS);
export const receiveLedgers = createAction(RECEIVE_LEDGERS);

export const fetchLedgers = params => dispatch => {
	dispatch(requestLedgers());
	api({ url: 'ledgers', params })
		.then(response =>
			dispatch(
				receiveLedgers({
					ledgers: response.data._embedded.records,
				})
			)
		)
		.catch(() => dispatch(failLedgers()));
};
