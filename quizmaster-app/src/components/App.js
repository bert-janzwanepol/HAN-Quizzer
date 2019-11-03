import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import '../App.css';
import SignupForm from './Signup';
import TitleMessage from './TitleMessage';
import GameDashboard from './GameDashboard';

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/" render={routeProps => {
                        return <div className="login">
                            <TitleMessage title="Quizzer, admin login" />
                            <SignupForm {...routeProps} />
                        </div>
                    }} />
                    <Route path="/game" component={GameDashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;