import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignUp from './components/Signup';
import Scoreboard from './components/ScoreBoard';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/game" component={Scoreboard} />
          {/* <Route exact path="/game/end" component={QuestionDashboard} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
