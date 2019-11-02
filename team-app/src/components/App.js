import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import '../App.css';
import Logo from './Logo';
import SignupForm from './Signup';
import TitleMessage from './TitleMessage';
// import LoadingIndicator from './LoadingIndicator';
// import Question from './Question';
// import Result from './Result';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <header>
              <Logo />
              <TitleMessage title="Please enter a teamname :)" />
            </header>
            <SignupForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;