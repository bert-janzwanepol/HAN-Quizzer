import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';

import { getAnswers, approveAnswer } from '../reducers/game'

class AnswerListUI extends Component {

    render() {
        const answerList = this.props.answers[0] !== undefined && this.props.answers.map(answer => {
            return (
                <li key={answer.teamName}>
                    <strong>{answer.answer}</strong>: {answer.teamName}

                    {/* repeat conditional render so we don't need a wrapping jsx element */}
                    {
                        // accept button
                        !this.props.questionOpen &&

                        <button
                            className={(answer.correct ? 'active' : 'inactive') + " icon-button accept"}
                            onClick={() => this.props.setAnswerStatus(true, answer.teamName, this.props.roomkey, this.props.roundNumber, this.props.questionNumber)}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check">
                                <polyline fill="none" stroke="#000" strokeWidth="1.1" points="4,10 8,15 17,4"></polyline>
                            </svg>
                        </button>
                    }
                    {
                        // reject button
                        !this.props.questionOpen &&
                        <button className={(!answer.correct ? 'active' : 'inactive') + " icon-button reject"} onClick={() => this.props.setAnswerStatus(false, answer.teamName, this.props.roomkey, this.props.roundNumber, this.props.questionNumber)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close"><path fill="none" stroke="#000" strokeWidth="1.06" d="M16,16 L4,4">
                            </path><path fill="none" stroke="#000" strokeWidth="1.06" d="M16,4 L4,16"></path>
                            </svg>
                        </button>
                    }
                </li>
            )
        });

        return (
            <ul>
                {answerList}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        answers: state.game.answers,
        roomkey: state.game.game.password,
        roundNumber: state.game.roundNumber,
        questionNumber: state.game.questionNumber,
        questionOpen: state.game.questionOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAnswers: () => dispatch(getAnswers()),
        setAnswerStatus: (correct, teamname, roomkey, roundNumber, questionNumber) => dispatch(approveAnswer(correct, teamname, roomkey, roundNumber, questionNumber))
    }
}

const AnswerList = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AnswerListUI);

export default AnswerList;