import { createAction } from 'redux-actions';
import api from '@quanta/helpers/api';

export const REQUEST_OPERATIONS = 'REQUEST_GET_OPERATIONS';
export const RECEIVE_OPERATIONS = 'RECEIVE_GET_OPERATIONS';
export const FAIL_OPERATIONS = 'FAIL_GET_OPERATIONS';

// action creator

export const requestOperations = createAction(REQUEST_OPERATIONS);
export const failOperations = createAction(FAIL_OPERATIONS);
export const receiveOperations = createAction(RECEIVE_OPERATIONS);

export const fetchOperations = ({ url, ...params }) => dispatch => {
	dispatch(requestOperations());
	const apiBody = { url: url ? url : 'operations', params };
	if (url) {
		apiBody.baseUrl = '';
	}

	api(apiBody)
		.then(response =>
			dispatch(
				receiveOperations({
					operations: response.data._embedded.records,
					links: response.data._links,
				})
			)
		)
		.catch(() => dispatch(failOperations()));
};
