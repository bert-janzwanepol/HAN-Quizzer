import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { mainReducer } from './reducers/application';

import App from './components/App';

// const logger = (store) => (next) => (action) => {
//     console.log('ACTION:', action.type, action);
//     let result = next(action);
//     console.log('STATE AFTER ACTION:', action.type, store.getState());
//     return result;
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const theStore = Redux.createStore(mainReducer, composeEnhancers(
    Redux.applyMiddleware(thunk)
));

const mainComponent =
    <ReactRedux.Provider store={theStore}>
        <App />
    </ReactRedux.Provider>

ReactDOM.render(mainComponent, document.getElementById('root'));