import * as actionType from './actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return action.payload;
    case actionType.CLEAR_USER:
      return {};
    case actionType.UPDATE_USER:
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
    case actionType.SAVE_OPTIONS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default reducer;
