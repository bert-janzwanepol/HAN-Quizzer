import React, { useState } from 'react';
import '../App.css';
import Logo from './Logo';
import SignupForm from './Signup';
import TitleMessage from './TitleMessage';
import LoadingIndicator from './LoadingIndicator';
import Question from './Question';
import Result from './Result';

function App() {
  const [status, setStatus] = useState(true);

  return (
    <>
      <div className="app">
        <header>
          <Logo />
          <TitleMessage title="Please enter a teamname :)" />
        </header>
        <SignupForm />
      </div>
      <div className="app">
        <header>
          <Logo />
          <TitleMessage title="Waiting for the Quizz Master to approve your teamname." />
        </header>
        <LoadingIndicator />
      </div>
      <div className="app">
        <header>
          <Logo />
          <TitleMessage title="Waiting for next question." />
        </header>
        <LoadingIndicator />
      </div>
      <div className="app">
        <header>
          <div className="logo-symbol">Q</div>
        </header>
        <Question question="Who wrote the poem 'The Owl and the Pussycat'?" />
      </div>
      <div className="app">
        <Result answer={status} />
      </div>
      <button onClick={() => setStatus(!status)}>change answer status</button>
    </>
  );
}

export default App;