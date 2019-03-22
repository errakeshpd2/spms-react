import { createAction } from 'redux-actions';
import * as actionType from './actionTypes';

const addTicketActivityLogs = createAction(actionType.ADD_TICKET_ACTIVITY_LOGS);
const clearTicketActivityLogs = createAction(actionType.CLEAR_TICKET_ACTIVITY_LOGS);

export { addTicketActivityLogs, clearTicketActivityLogs };
