import { createAction } from 'redux-actions';
import * as actionType from './actionTypes';

const addDashboardStatistics = createAction(actionType.ADD_STATISTICS);

export { addDashboardStatistics };
