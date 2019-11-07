import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';

import { } from '../reducers/score'

class AnswersUI extends Component {

    render() {
        return (
            <ul>
                {this.props.answers.map(a => {
                    return (
                        <li key={a.teamName}>{a.teamName}: {a.answer} - {a.correct === null ? 'Beroodelen...' : a.correct ? 'Goed' : 'Fout'}</li>
                    )
                })}
            </ul>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        answers: state.score.answers,
        questionClosed: state.score.questionClosed
    }
}

const Answers = ReactRedux.connect(mapStateToProps)(AnswersUI);

export default Answers;