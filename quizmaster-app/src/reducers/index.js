import * as Redux from 'redux';
import { authenticationReducer } from './authentication';
import { gameReducer } from './game';

export default Redux.combineReducers({
    authentication: authenticationReducer,
    game: gameReducer
})