import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import TeamList from './TeamList'
import Question from './Question'


class ScoreboardUI extends Component {

    render() {
        return (
            <div>
                <h1>Room key: {this.props.roomkey}</h1>
                <h2>Huidige vraag:</h2>
                <Question />
                <TeamList />

            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        roundNumber: state.score.roundNumber,
        questionNumber: state.score.questionNumber,
        question: state.score.question,
        answer: state.score.answer,
        team: state.score.teams,
        roomkey: state.application.roomkey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const Scoreboard = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ScoreboardUI);

export default Scoreboard;