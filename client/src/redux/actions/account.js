import { createAction } from 'redux-actions';
import api from '@quanta/helpers/api';

export const REQUEST_ACCOUNT = 'REQUEST_GET_ACCOUNT';
export const RECEIVE_ACCOUNT = 'RECEIVE_GET_ACCOUNT';
export const FAIL_ACCOUNT = 'FAIL_GET_ACCOUNT';

export const REQUEST_ACCOUNT_OPERATIONS = 'REQUEST_GET_ACCOUNT_OPERATIONS';
export const RECEIVE_ACCOUNT_OPERATIONS = 'RECEIVE_GET_ACCOUNT_OPERATIONS';
export const FAIL_ACCOUNT_OPERATIONS = 'FAIL_GET_ACCOUNT_OPERATIONS';

// action creator

export const requestAccount = createAction(REQUEST_ACCOUNT);
export const failAccount = createAction(FAIL_ACCOUNT);
export const receiveAccount = createAction(RECEIVE_ACCOUNT);

export const requestAccountOperations = createAction(REQUEST_ACCOUNT_OPERATIONS);
export const failAccountOperations = createAction(FAIL_ACCOUNT_OPERATIONS);
export const receiveAccountOperations = createAction(RECEIVE_ACCOUNT_OPERATIONS);

export const fetchAccountOperations = ({ id, searchParams }) => dispatch => {
	dispatch(requestAccountOperations());
	api({ url: `accounts/${id}/operations`, params: searchParams })
		.then(response => {
			dispatch(
				receiveAccountOperations({
					operations: response.data._embedded.records,
				})
			);
		})
		.catch(() => dispatch(failAccountOperations()));
};

export const fetchAccount = ({ id }) => dispatch => {
	dispatch(requestAccount());
	api({ url: `accounts/${id}` })
		.then(response => {
			dispatch(
				receiveAccount({
					account: response.data,
				})
			);
		})
		.catch(() => dispatch(failAccount()));
};
