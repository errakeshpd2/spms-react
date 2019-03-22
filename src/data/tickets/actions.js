import { createAction } from 'redux-actions';
import * as actionType from './actionTypes';

const addTickets = createAction(actionType.ADD_TICKETS);
const clearTickets = createAction(actionType.CLEAR_TICKETS);

export { addTickets, clearTickets };
