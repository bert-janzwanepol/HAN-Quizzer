import { setWaitStatusAction, approveTeamAction, rejectTeamAction } from '../reducers/application';
import { startGameAction, getQuestion, setNewQuestionAction, setAnswerAction, startNewRoundAction } from '../reducers/game';
export const REDUX_WEBSOCKET_MESSAGE = 'REDUX_WEBSOCKET::MESSAGE';
export const REDUX_WEBSOCKET_CLOSED = 'REDUX_WEBSOCKET::CLOSED';

const socketMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case REDUX_WEBSOCKET_MESSAGE:
                const message = JSON.parse(action.payload.message).type;

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
                        let questionId = payload.questionId;

                        store.dispatch(getQuestion(questionId));
                        break;
                    case 'QUESTIONCLOSED':
                        store.dispatch(setNewQuestionAction(''));
                        store.dispatch(setAnswerAction(''));
                        break;

                    case 'STARTROUND':
                        store.dispatch(startNewRoundAction())
                        break;
                    default:
                        break;
                }
                break;
            case REDUX_WEBSOCKET_CLOSED:
                sessionStorage.clear()
                store.dispatch(rejectTeamAction('Naam niet geaccepteerd'))
                store.dispatch(setWaitStatusAction(false))
                break

            default:
                return next(action);
        }
    };
};

export default socketMiddleware();