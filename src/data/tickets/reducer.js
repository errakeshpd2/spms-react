import * as actionType from './actionTypes';
import { find } from 'loadsh'

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
    case actionType.REFRESH_TICKETS:
      let index = state.data.indexOf(find(state.data, ['id', action.payload.data.id]));
      state.data.splice(index, 1, action.payload.data);
      return state;
    default:
      return state;
  }
};

export default reducer;
