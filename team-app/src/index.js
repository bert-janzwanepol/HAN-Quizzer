import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import mainReducer from './reducers';

import App from './components/App';

import reduxWebsocket from '@giantmachines/redux-websocket';
import socketMiddleware from './middleware/socket'

// send the first message on open to authenticate the websocket
const websocketOptions = {
    onOpen: (socket) => {

        let initMessage = {
            initial: true,
            password: theStore.getState().application.roomkey,
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