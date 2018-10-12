import { createAction } from 'redux-actions';

export const SET_AVERAGE_BLOCK_LATENCY = 'SET_AVERAGE_BLOCK_LATENCY';
// action creator

export const setAverageBlockLatency = createAction(SET_AVERAGE_BLOCK_LATENCY);
