import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';

import { getQuestion } from '../reducers/score'

class QuestionUI extends Component {

    componentDidMount() {
        this.props.getQuestion(this.props.questionId, this.props.roundNumber, this.props.roundNumber)
    }

    render() {
        return (
            <div>
                {
                    this.props.question.question
                }
                <div>
                    {(this.props.questionClosed === true) ? this.props.question.question : ''}
                </div>
            </div>


        )
    }

}

const mapStateToProps = (state) => {
    return {
        question: state.score.question,
        questionId: state.score.questionId,
        roundNumber: state.score.roundNumber,
        questionNumber: state.score.questionNumber,
        questionClosed: state.score.questionClosed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQuestion: (questionId, roundNumber, questionNumber) => dispatch(getQuestion(questionId, roundNumber, questionNumber)),
    }
}

const Question = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuestionUI);

export default Question;