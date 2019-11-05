import { fetchTeams } from '../reducers/game'
export const REDUX_WEBSOCKET_MESSAGE = 'REDUX_WEBSOCKET::MESSAGE';

const socketMiddleware = () => {
    return store => next => action => {
        switch (action.type) {
            case REDUX_WEBSOCKET_MESSAGE:
                const message = JSON.parse(action.payload.message);
                switch (message.type) {
                    case 'TEAMCHANGE':
                        console.log(action);
                        store.dispatch(fetchTeams(message.roomkey));
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