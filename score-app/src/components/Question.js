import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';

import { getQuestion } from '../reducers/score'

class QuestionUI extends Component {

    render() {
        console.log(this.props.question)
        return (
            <div>
                <h2>Ronde {this.props.roundNumber} | Vraag {this.props.questionNumber}</h2>
                <h2><i>{this.props.question.category}</i></h2>
                <h3>{this.props.question.question}</h3>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        question: state.score.question,
        roundNumber: state.score.roundNumber,
        questionNumber: state.score.questionNumber,
        questionClosed: state.score.questionClosed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQuestion: (questionId) => dispatch(getQuestion(questionId))
    }
}

const Question = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuestionUI);

export default Question;