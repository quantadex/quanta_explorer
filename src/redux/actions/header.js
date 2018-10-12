import { createAction } from 'redux-actions';

export const CHANGE_ENVRIONMENT_TYPE = 'CHANGE_ENVRIONMENT_TYPE';
// action creator

export const changeEnvironmentType = createAction(CHANGE_ENVRIONMENT_TYPE);
