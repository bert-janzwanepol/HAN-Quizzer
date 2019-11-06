import { fetchTeams, newRoundStartAction, getAnswers } from '../reducers/game'
export const REDUX_WEBSOCKET_MESSAGE = 'REDUX_WEBSOCKET::MESSAGE';

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
                        // store.dispatch(getAnswers(store.getState().game.game.password, ));
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