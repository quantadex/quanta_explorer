import { createAction } from 'redux-actions';
import api from '@quanta/helpers/api';

export const SET_AVERAGE_BLOCK_LATENCY = 'SET_AVERAGE_BLOCK_LATENCY';
export const SET_NODE_COUNT = 'SET_NODE_COUNT';
// action creator

export const setAverageBlockLatency = createAction(SET_AVERAGE_BLOCK_LATENCY);
export const setNodeCount = createAction(SET_NODE_COUNT);

export const fetchNodeCount = () => (dispatch, getState) => {
	const { environmentType } = getState().header;
	api({
		url: `/nodeCount?network=${environmentType.value}`,
		baseUrl: '',
	}).then(response =>
		dispatch(
			setNodeCount({
				nodeCount: response.data.numberOfNodes,
			})
		)
	);
};
