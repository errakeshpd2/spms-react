import * as actionType from './actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TICKETS:
      return action.payload;
    case actionType.CLEAR_TICKETS:
      return [];
    default:
      return state;
  }
};

export default reducer;
