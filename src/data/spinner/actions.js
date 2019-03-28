import { createAction } from 'redux-actions';
import * as actionType from './actionTypes';

const startSpinner = createAction(actionType.START_SPINNER);
const stopSpinner = createAction(actionType.STOP_SPINNER);

export { startSpinner, stopSpinner };
