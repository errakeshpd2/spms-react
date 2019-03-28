import * as actionType from './actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_STATISTICS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
