import { createAction } from 'redux-actions';

export const CHANGE_ENVRIONMENT_TYPE = 'CHANGE_ENVRIONMENT_TYPE';
export const CHANGE_SEARCH_KEY = 'CHANGE_SEARCH_KEY';
// action creator

export const changeEnvironmentType = createAction(CHANGE_ENVRIONMENT_TYPE);
export const changeSearchKey = createAction(CHANGE_SEARCH_KEY);
