import * as Redux from 'redux';
import { authenticationReducer } from './authentication';
import { applicationReducer } from './application';
import { gameReducer } from './game';


export default Redux.combineReducers({
    authentication: authenticationReducer,
    application: applicationReducer,
    game: gameReducer
})