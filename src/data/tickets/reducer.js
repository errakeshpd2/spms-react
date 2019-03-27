import * as actionType from './actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TICKETS:
      return action.payload;
    case actionType.CLEAR_TICKETS:
      return [];
    case actionType.PUSH_TO_TICKETS:
      state.data.push(action.payload.data)
      return state;
    case actionType.REMOVE_FROM_TICKETS:
      const newState = state.data.filter( val => val.id !== action.payload );
      return{ data: [ ...newState ]}
    default:
      return state;
  }
};

export default reducer;
