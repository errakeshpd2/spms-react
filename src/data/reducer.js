import { combineReducers } from 'redux';

import userReducer from './user/reducer';
import ticketsReducer from './tickets/reducer';
import ticketActivityLogsReducer from './ticket_activity_logs/reducer';
import spinnerReducer from './spinner/reducer';
import ticketReducer from './ticket/reducer';

const reducer = combineReducers({
  user: userReducer,
  tickets: ticketsReducer,
  ticket_activity_logs: ticketActivityLogsReducer,
  spinner: spinnerReducer,
  ticket : ticketReducer
});

export default reducer;
