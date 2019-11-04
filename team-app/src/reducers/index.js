import * as Redux from 'redux';
import { applicationReducer } from './application';

export default Redux.combineReducers({
    application: applicationReducer
})