import { createAction } from 'redux-actions';
import * as actionType from './actionTypes';

const setUser = createAction(actionType.SET_USER);
const clearUser = createAction(actionType.CLEAR_USER);
const updateUser = createAction(actionType.UPDATE_USER);
const saveOptions = createAction(actionType.SAVE_OPTIONS);

export { setUser, clearUser, updateUser, saveOptions };
