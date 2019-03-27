import { createAction } from 'redux-actions';
import * as actionType from './actionTypes';

const addTickets = createAction(actionType.ADD_TICKETS);
const clearTickets = createAction(actionType.CLEAR_TICKETS);
const pushToTickets = createAction(actionType.PUSH_TO_TICKETS)
const removeFromTickets = createAction(actionType.REMOVE_FROM_TICKETS)
export { addTickets, clearTickets, pushToTickets, removeFromTickets };
