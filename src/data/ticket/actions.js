import { createAction } from 'redux-actions';
import * as actionType from './actionTypes';

const addTicket = createAction(actionType.ADD_TICKET);
const clearTicket = createAction(actionType.CLEAR_TICKET);
const saveTicketOption = createAction(actionType.SAVE_TICKET_OPTIONS);
const updateTicket = createAction(actionType.UPDATE_TICKET);

export { addTicket, clearTicket, saveTicketOption, updateTicket };
