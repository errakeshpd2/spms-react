import { combineReducers } from 'redux';

import userReducer from './user/reducer';
import ticketsReducer from './tickets/reducer';
import ticketActivityLogsReducer from './ticket_activity_logs/reducer';

const reducer = combineReducers({
  user: userReducer,
  tickets: ticketsReducer,
  ticket_activity_logs: ticketActivityLogsReducer
});

export default reducer;
