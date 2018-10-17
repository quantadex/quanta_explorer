import { createAction } from 'redux-actions';
import api from '@quanta/helpers/api';

export const REQUEST_LEDGERS = 'REQUEST_GET_LEDGERS';
export const RECEIVE_LEDGERS = 'RECEIVE_GET_LEDGERS';
export const FAIL_LEDGERS = 'FAIL_GET_LEDGERS';

export const REQUEST_ALL_LEDGERS = 'REQUEST_GET_ALL_LEDGERS';
export const RECEIVE_ALL_LEDGERS = 'RECEIVE_GET_ALL_LEDGERS';
export const FAIL_ALL_LEDGERS = 'FAIL_GET_ALL_LEDGERS';

export const REQUEST_LEDGER = 'REQUEST_GET_LEDGER';
export const RECEIVE_LEDGER = 'RECEIVE_GET_LEDGER';
export const FAIL_LEDGER = 'FAIL_LEDGER';

export const REQUEST_LEDGER_OPERATIONS = 'REQUEST_GET_LEDGER_OPERATIONS';
export const RECEIVE_LEDGER_OPERATIONS = 'RECEIVE_GET_LEDGER_OPERATIONS';
export const FAIL_LEDGER_OPERATIONS = 'FAIL_GET_LEDGER_OPERATIONS';

// action creator

export const requestLedgers = createAction(REQUEST_LEDGERS);
export const failLedgers = createAction(FAIL_LEDGERS);
export const receiveLedgers = createAction(RECEIVE_LEDGERS);

export const requestAllLedgers = createAction(REQUEST_ALL_LEDGERS);
export const failAllLedgers = createAction(FAIL_ALL_LEDGERS);
export const receiveAllLedgers = createAction(RECEIVE_ALL_LEDGERS);

export const requestLedger = createAction(REQUEST_LEDGER);
export const failLedger = createAction(FAIL_LEDGER);
export const receiveLedger = createAction(RECEIVE_LEDGER);

export const requestLedgerOperations = createAction(REQUEST_LEDGER_OPERATIONS);
export const failLedgerOperations = createAction(FAIL_LEDGER_OPERATIONS);
export const receiveLedgerOperations = createAction(RECEIVE_LEDGER_OPERATIONS);

export const fetchLedgerOperations = ({ id, searchParams }) => dispatch => {
	dispatch(requestLedgerOperations());
	api({ url: `ledgers/${id}/operations`, params: searchParams })
		.then(response => {
			dispatch(
				receiveLedgerOperations({
					operations: response.data._embedded.records,
				})
			);
		})
		.catch(() => dispatch(failLedgerOperations()));
};

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

export const fetchLedger = ({ id }) => dispatch => {
	dispatch(requestLedger());
	api({ url: `ledgers/${id}` })
		.then(response => {
			dispatch(
				receiveLedger({
					ledger: response.data,
				})
			);
		})
		.catch(() => dispatch(failLedger()));
};

export const fetchAllLedgers = ({ url, ...params }) => dispatch => {
	dispatch(requestAllLedgers());
	const apiBody = { url: url ? url : 'ledgers', params };
	if (url) {
		apiBody.baseUrl = '';
	}

	api(apiBody)
		.then(response =>
			dispatch(
				receiveAllLedgers({
					ledgers: response.data._embedded.records,
					links: response.data._links,
				})
			)
		)
		.catch(() => dispatch(failAllLedgers()));
};
