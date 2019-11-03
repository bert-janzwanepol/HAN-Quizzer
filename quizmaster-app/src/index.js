import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import thunk from 'redux-thunk';

import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import mainReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const theStore = Redux.createStore(mainReducer, composeEnhancers(
    Redux.applyMiddleware(thunk)
));

const mainComponent =
    <ReactRedux.Provider store={theStore}>
        <App />
    </ReactRedux.Provider>

ReactDOM.render(mainComponent, document.getElementById('root'));