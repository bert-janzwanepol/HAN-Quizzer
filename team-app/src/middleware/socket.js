import { setWaitStatusAction, approveTeamAction } from '../reducers/application';
import { startGameAction, getQuestion } from '../reducers/game';
export const REDUX_WEBSOCKET_MESSAGE = 'REDUX_WEBSOCKET::MESSAGE';

const socketMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case REDUX_WEBSOCKET_MESSAGE:
                const message = JSON.parse(action.payload.message).type;
                console.log(action);
                switch (message) {
                    case 'TEAMCHANGE':
                        store.dispatch(setWaitStatusAction(false));
                        store.dispatch(approveTeamAction(true));
                        break;

                    case 'STARTGAME':
                        store.dispatch(startGameAction(false));
                        break;

                    case 'QUESTIONASKED':
                        let payload = JSON.parse(action.payload.message)
                        let roomkey = store.getState().application.roomkey;
                        let roundNumber = payload.roundNumber;
                        let questionNumber = payload.questionNumber;

                        store.dispatch(getQuestion(roomkey, roundNumber, questionNumber));
                        break;
                    default:
                        break;
                }
                break;

            default:
                return next(action);
        }
    };
};

export default socketMiddleware();