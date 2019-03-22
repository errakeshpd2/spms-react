import * as actionType from './actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TICKET_ACTIVITY_LOGS:
      return action.payload;
    case actionType.CLEAR_TICKET_ACTIVITY_LOGS:
      return [];
    default:
      return state;
  }
};

export default reducer;
