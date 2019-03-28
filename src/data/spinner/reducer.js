import * as actionType from './actionTypes';

const initialState = { loading: false};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.START_SPINNER:
      return { loading: true }
    case actionType.STOP_SPINNER:
      return { loading: false };
    default:
      return state;
  }
};

export default reducer;
