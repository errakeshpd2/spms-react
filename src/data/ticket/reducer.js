import * as actionType from './actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TICKET:
      return action.payload;
    case actionType.CLEAR_TICKET:
      return {};
    case actionType.SAVE_TICKET_OPTIONS:
      return Object.assign({}, state, action.payload);
    case actionType.UPDATE_TICKET:
      return {
        ...state,
        data: {
          ...state.data,
          attributes: {
            ...state.data.attributes,
            ...action.payload
          }
        }
      }
    default:
      return state;
  }
};

export default reducer;
