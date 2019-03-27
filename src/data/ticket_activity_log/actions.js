import { createAction } from 'redux-actions';
import * as actionType from './actionTypes';

const addTicketActivityLog = createAction(actionType.ADD_TICKET_ACTIVITY_LOG);
const clearTicketActivityLog = createAction(actionType.CLEAR_TICKET_ACTIVITY_LOG);
const saveTicketActivityLogOption = createAction(actionType.SAVE_TICKET_ACTIVITY_LOG_OPTIONS);
const updateTicketActivityLog = createAction(actionType.UPDATE_TICKET_ACTIVITY_LOG);

export { addTicketActivityLog, clearTicketActivityLog, saveTicketActivityLogOption, updateTicketActivityLog };
