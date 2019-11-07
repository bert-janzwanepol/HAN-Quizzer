import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import '../App.css';
import SignupForm from './Signup';
import Logo from './Logo';
import GameDashboard from './GameDashboard';
import QuestionDashboard from './QuestionDashboard'

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/" render={routeProps => {
                        return <div className="login">
                            <Logo />
                            <SignupForm {...routeProps} />
                        </div>
                    }} />
                    <Route exact path="/game" component={GameDashboard} />
                    <Route exact path="/game/round" component={QuestionDashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;