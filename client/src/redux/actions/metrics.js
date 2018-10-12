import { createAction } from 'redux-actions';
import api from '@quanta/helpers/api';

export const REQUEST_METRICS = 'REQUEST_GET_METRICS';
export const RECEIVE_METRICS = 'RECEIVE_GET_METRICS';
export const FAIL_METRICS = 'FAIL_GET_METRICS';

// action creator

export const requestMetrics = createAction(REQUEST_METRICS);
export const failMetrics = createAction(FAIL_METRICS);
export const receiveMetrics = createAction(RECEIVE_METRICS);

export const fetchMetrics = () => dispatch => {
	dispatch(requestMetrics());
	api({ url: 'metrics' })
		.then(response => {
			dispatch(
				receiveMetrics({
					metrics: response.data,
				})
			);
		})
		.catch(() => dispatch(failMetrics()));
};
