import { combineReducers } from 'redux';

import userReducer from './user/reducer';
import ticketsReducer from './tickets/reducer';
import ticketActivityLogsReducer from './ticket_activity_logs/reducer';
import ticketActivityLogReducer from './ticket_activity_log/reducer';
import spinnerReducer from './spinner/reducer';
import ticketReducer from './ticket/reducer';
import dashboardReducer from './dashboard/reducer';

const reducer = combineReducers({
  user: userReducer,
  tickets: ticketsReducer,
  ticket_activity_logs: ticketActivityLogsReducer,
  ticket_activity_log: ticketActivityLogReducer,
  spinner: spinnerReducer,
  ticket : ticketReducer,
  dashboard_statistics: dashboardReducer
});

export default reducer;
