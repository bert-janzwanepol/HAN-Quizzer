import * as Redux from 'redux';
import { applicationReducer } from './application';
import { scoreReducer } from './score';

export default Redux.combineReducers({
    application: applicationReducer,
    score: scoreReducer
})