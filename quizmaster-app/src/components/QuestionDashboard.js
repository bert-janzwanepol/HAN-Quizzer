import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { withRouter } from "react-router";

import {
    fetchRoundQuestions,
    setNewRoundAction,
    setRoundQuestionAction,
    openQuestion,
    closeQuestion,
    nextQuestion,
    resetSelectedCategoriesAction,
    resetQuestionNumberAction,
    toggleNextDisabled,
    setRoundNumber,
    stopGame
} from '../reducers/game';
import AnswerList from './AnswerList';

class QuestionDashboardUI extends Component {

    render() {
        let questionList = this.props.questions && this.props.questions.map((question, index) => {
            let checked = index === this.props.selectedQuestionIndex ? 'checked' : false;

            return (
                <div key={question._id} className="question-list-item">
                    <input type="radio" value={question._id} id={question._id} name={question._id} onChange={() => { this.props.selectQuestion(index, (!this.props.questionOpen && this.props.questionNumber !== 13)) }} checked={checked} />
                    <label htmlFor={question._id}>
                        {question.question} ({question.category})
                    </label>
                </div>
            )

        })

        return (
            <div className="dashboard">
                <aside>
                    <h2>Kies de vraag voor deze ronde</h2>
                    <div>
                        {

                            this.props.questions[0] !== undefined
                                ?
                                <form>
                                    {this.props.questions !== undefined && questionList}
                                </form>
                                :
                                <small>Loading questions...</small>
                        }
                    </div>

                    <div>
                        <h2>Juiste antwoord</h2>
                        {this.props.questions.length > 0 ? this.props.questions[this.props.selectedQuestionIndex].answer : ''}
                    </div>

                    {
                        (this.props.questionNumber <= 11 || (this.props.questionNumber === 12 && this.props.questionOpen === true)) &&
                        <div className="button-group">
                            <button
                                disabled={this.props.questions[0] === undefined || (this.props.questionOpen === true) || (this.props.answers[0] !== undefined && this.props.questionOpen === false) || !this.props.nextDisabled}
                                onClick={(e) => {
                                    this.props.openQuestion(this.props.roomkey, this.props.roundNumber, e, this.props.questions[this.props.selectedQuestionIndex]._id);
                                }}
                            >
                                Stellen
                                </button>
                            <button
                                disabled={!this.props.questionOpen}
                                onClick={(e) => {
                                    this.props.closeQuestion(this.props.roomkey, this.props.roundNumber, e, this.props.questionNumber)
                                    this.props.toggleNextDisabled();
                                }}
                            >
                                Sluiten
                            </button>


                            <button
                                disabled={this.props.nextDisabled}
                                onClick={(e) => {
                                    this.props.toggleNextDisabled();
                                    this.props.nextQuestion(this.props.roomkey, this.props.roundNumber, this.props.questionNumber, e);
                                }}
                            >
                                Volgende
                            </button>
                        </div>
                    }

                    {
                        (this.props.questionNumber === 12 && this.props.questionOpen === false) &&
                        <div className="button-group">
                            <button
                                onClick={(e) => {
                                    this.props.resetCategories();
                                    this.props.resetQuestionNumber();
                                    this.props.setRoundNumber((this.props.roundNumber + 1))
                                    this.props.history.push('/game');
                                }}
                            >
                                Doorgaan
                                </button>
                            <button
                                onClick={(e) => { this.props.stopGame(this.props.roomkey, e) }}
                            >
                                Stoppen
                                </button>
                        </div>
                    }


                </aside>
                <main>
                    <div className="team-answers">
                        <h2>Antwoorden</h2>
                        <AnswerList />
                    </div>
                </main>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.game.questions,
        roomkey: state.game.game.password,
        roundNumber: state.game.roundNumber,
        questionNumber: state.game.questionNumber,
        selectedQuestionIndex: state.game.selectedQuestionIndex,
        questionOpen: state.game.questionOpen,
        answers: state.game.answers,
        nextDisabled: state.game.nextDisabled
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQuestions: (roomkey, roundnumber) => dispatch(fetchRoundQuestions(roomkey, roundnumber)),
        selectQuestion: (id, isClosed) => dispatch(setRoundQuestionAction(id, isClosed)),
        openQuestion: (roomkey, roundnumber, event, questionId) => dispatch(openQuestion(roomkey, roundnumber, event, questionId)),
        closeQuestion: (roomkey, roundnumber, event, questionId) => dispatch(closeQuestion(roomkey, roundnumber, event, questionId)),
        nextQuestion: (roomkey, roundnumber, questionNumber, event) => dispatch(nextQuestion(roomkey, roundnumber, questionNumber, event)),
        nextRound: () => {
            dispatch(setNewRoundAction())
        },
        resetCategories: () => dispatch(resetSelectedCategoriesAction()),
        resetQuestionNumber: () => dispatch(resetQuestionNumberAction()),
        setRoundNumber: (number) => dispatch(setRoundNumber(number)),
        stopGame: (roomkey, e) => dispatch(stopGame(roomkey, e)),
        toggleNextDisabled: () => dispatch(toggleNextDisabled())
    }
}

const QuestionDashboard = withRouter(ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuestionDashboardUI));

export default QuestionDashboard;