import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import TeamList from './TeamList'
import Question from './Question'
import Answers from './Answers';
import { stat } from 'fs';


class ScoreboardUI extends Component {

    render() {
        let content = this.props.closed ?
            {/* <h1>Winner is {winner.teamname}</h1> */ }
            :
            <div>
                <h1>Room key: {this.props.roomkey}</h1>
                <Question />
                <Answers />
                <TeamList />
            </div>
        return content
    }


}

const mapStateToProps = (state) => {
    return {
        roundNumber: state.score.roundNumber,
        questionNumber: state.score.questionNumber,
        question: state.score.question,
        answer: state.score.answer,
        team: state.score.teams,
        roomkey: state.application.roomkey,
        closed: state.score.gameclosed,
        winner: state.score.standings[0]
    }
}

const Scoreboard = ReactRedux.connect(mapStateToProps)(ScoreboardUI);

export default Scoreboard;