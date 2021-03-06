import { fetchTeams, newRoundStartAction, getAnswers, fetchRoundQuestions, toggleNextDisabled, } from '../reducers/game'
export const REDUX_WEBSOCKET_MESSAGE = 'REDUX_WEBSOCKET::MESSAGE';
export const REDUX_WEBSOCKET_CLOSED = 'REDUX_WEBSOCKET::CLOSED';

const socketMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case REDUX_WEBSOCKET_MESSAGE:
                const message = JSON.parse(action.payload.message);
                console.log(action);
                switch (message.type) {
                    case 'TEAMCHANGE':
                        store.dispatch(fetchTeams(message.roomkey));
                        break;

                    case 'STARTGAME':
                        store.dispatch(newRoundStartAction(true));
                        break;

                    case 'NEWANSWER':
                        const { roundNumber, questionNumber } = store.getState().game;
                        const { password } = store.getState().game.game;

                        store.dispatch(getAnswers(password, roundNumber, questionNumber));
                        break;

                    case 'STARTROUND':
                        const questionNr = store.getState().game.roundNumber;
                        const pw = store.getState().game.game.password;
                        store.dispatch(toggleNextDisabled());
                        store.dispatch(fetchRoundQuestions(pw, questionNr));
                        break;
                    case 'CLOSEGAME':
                        sessionStorage.clear()
                        window.location.href = '/';
                        break;
                    default:
                        break;
                }
                break;

            case REDUX_WEBSOCKET_CLOSED:
                sessionStorage.clear()
                window.location.href = '/';
                break
            default:
                return next(action);
        }
    };
};

export default socketMiddleware();