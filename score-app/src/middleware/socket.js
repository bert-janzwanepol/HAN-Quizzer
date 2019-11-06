import { getStandings, fetchTeams, getQuestion, closeQuestion } from '../reducers/score';

export const REDUX_WEBSOCKET_MESSAGE = 'REDUX_WEBSOCKET::MESSAGE';
export const REDUX_WEBSOCKET_CLOSED = 'REDUX_WEBSOCKET::CLOSED';

const socketMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case REDUX_WEBSOCKET_MESSAGE:
                const message = JSON.parse(action.payload.message).type;
                console.log(message);
                switch (message) {
                    case 'TEAMCHANGE':
                        store.dispatch(fetchTeams(store.getState().application.roomkey))
                        break;

                    case 'STARTGAME':
                    case 'NEWSTANDINGS':
                    case 'ROUNDCLOSED':
                        store.dispatch(getStandings(store.getState().application.roomkey))
                        break;

                    case 'QUESTIONASKED':
                        let payload = JSON.parse(action.payload.message)
                        let questionId = payload.questionId;

                        store.dispatch(getQuestion(questionId));
                        break;

                    case 'QUESTIONCLOSED':
                        store.dispatch(closeQuestion(store.getState().application.roomkey));
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