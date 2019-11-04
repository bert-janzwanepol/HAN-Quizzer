import { setWaitStatusAction, approveTeamAction } from '../reducers/application'
export const REDUX_WEBSOCKET_MESSAGE = 'REDUX_WEBSOCKET::MESSAGE';

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