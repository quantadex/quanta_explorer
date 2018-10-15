import { createAction } from 'redux-actions';
import api from '@quanta/helpers/api';

export const REQUEST_TRANSACTION = 'REQUEST_GET_TRANSACTION';
export const RECEIVE_TRANSACTION = 'RECEIVE_GET_TRANSACTION';
export const FAIL_TRANSACTION = 'FAIL_GET_TRANSACTION';

export const REQUEST_TRANSACTION_OPERATIONS = 'REQUEST_GET_TRANSACTION_OPERATIONS';
export const RECEIVE_TRANSACTION_OPERATIONS = 'RECEIVE_GET_TRANSACTION_OPERATIONS';
export const FAIL_TRANSACTION_OPERATIONS = 'FAIL_GET_TRANSACTION_OPERATIONS';

// action creator

export const requestTransaction = createAction(REQUEST_TRANSACTION);
export const failTransaction = createAction(FAIL_TRANSACTION);
export const receiveTransaction = createAction(RECEIVE_TRANSACTION);

export const requestTransactionOperations = createAction(REQUEST_TRANSACTION_OPERATIONS);
export const failTransactionOperations = createAction(FAIL_TRANSACTION_OPERATIONS);
export const receiveTransactionOperations = createAction(RECEIVE_TRANSACTION_OPERATIONS);

export const fetchTransactionOperations = ({ id, searchParams }) => dispatch => {
	dispatch(requestTransactionOperations());
	api({ url: `transactions/${id}/operations`, params: searchParams })
		.then(response => {
			dispatch(
				receiveTransactionOperations({
					operations: response.data._embedded.records,
				})
			);
		})
		.catch(() => dispatch(failTransactionOperations()));
};

export const fetchTransaction = ({ id }) => dispatch => {
	dispatch(requestTransaction());
	api({ url: `transactions/${id}` })
		.then(response => {
			dispatch(
				receiveTransaction({
					transaction: response.data,
				})
			);
		})
		.catch(() => dispatch(failTransaction()));
};
