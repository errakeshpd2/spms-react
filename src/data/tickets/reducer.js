import * as actionType from './actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TICKETS:
      return action.payload;
    case actionType.CLEAR_TICKETS:
      return [];
    case actionType.PUSH_TO_TICKETS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      }
    default:
      return state;
  }
};

export default reducer;
