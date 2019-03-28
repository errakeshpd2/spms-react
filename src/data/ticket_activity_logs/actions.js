import { createAction } from 'redux-actions';
import * as actionType from './actionTypes';

const addTicketActivityLogs = createAction(actionType.ADD_TICKET_ACTIVITY_LOGS);
const clearTicketActivityLogs = createAction(actionType.CLEAR_TICKET_ACTIVITY_LOGS);
const pushToTicketActivityLogs = createAction(actionType.PUSH_TO_TICKET_ACTIVITY_LOGS)
const removeFromTicketActivityLogs = createAction(actionType.REMOVE_FROM_TICKET_ACTIVITY_LOGS)
const refreshTicketActivityLogs = createAction(actionType.REFRESH_TICKET_ACTIVITY_LOGS)
export { addTicketActivityLogs, clearTicketActivityLogs, pushToTicketActivityLogs, removeFromTicketActivityLogs, refreshTicketActivityLogs };
