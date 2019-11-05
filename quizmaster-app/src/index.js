import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import thunk from 'redux-thunk';

import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import mainReducer from './reducers';
import socketMiddleware from './middleware/socket';

import reduxWebsocket from '@giantmachines/redux-websocket';
// send the first message on open to authenticate the websocket
const websocketOptions = {
    onOpen: (socket) => {

        let initMessage = {
            initial: true,
            password: theStore.getState().game.game.password,
            token: sessionStorage.getItem('token')
        }

        socket.send(JSON.stringify(initMessage))
    }
}
const reduxWebsocketMiddleware = reduxWebsocket(websocketOptions);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const theStore = Redux.createStore(mainReducer, composeEnhancers(
    Redux.applyMiddleware(thunk, reduxWebsocketMiddleware, socketMiddleware)
));

const mainComponent =
    <ReactRedux.Provider store={theStore}>
        <App />
    </ReactRedux.Provider>

ReactDOM.render(mainComponent, document.getElementById('root'));