import * as Redux from 'redux';
import { applicationReducer } from './application';
import { gameReducer } from './game';

export default Redux.combineReducers({
    application: applicationReducer,
    game: gameReducer
})