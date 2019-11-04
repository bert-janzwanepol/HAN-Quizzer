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
import Question from './Question';

// import LoadingIndicator from './LoadingIndicator';
// import Question from './Question';
// import Result from './Result';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          {/* signup */}
          <Route exact path="/" render={() => {
            return <div>
              <header>
                <Logo />
              </header>
              <SignupForm />
            </div>
          }} />

          {/* awaiting confirmation */}
          <Route exact path="/question" component={Question} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;