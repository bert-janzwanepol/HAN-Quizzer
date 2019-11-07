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
    setRoundNumber
} from '../reducers/game';
import AnswerList from './AnswerList';

class QuestionDashboardUI extends Component {

    render() {
        let questionList = this.props.questions && this.props.questions.map((question, index) => {
            let checked = index === this.props.selectedQuestionIndex ? 'checked' : false;

            return (
                <div key={question._id}>
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

                            this.props.questions
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
                        (this.props.questionNumber <= 1 || (this.props.questionNumber === 2 && this.props.questionOpen === true)) &&
                        <div className="button-group">
                            <button
                                disabled={this.props.questionOpen || this.props.answers[0] !== undefined}
                                onClick={(e) => {
                                    this.props.openQuestion(this.props.roomkey, this.props.roundNumber, e, this.props.questions[this.props.selectedQuestionIndex]._id);
                                }}
                            >
                                Stellen
                                </button>
                            <button
                                disabled={!this.props.questionOpen}
                                onClick={(e) => { this.props.closeQuestion(this.props.roomkey, this.props.roundNumber, e, this.props.questionNumber) }}
                            >
                                Sluiten
                                </button>
                            <button
                                disabled={!this.props.questionOpen && this.props.answers[0] === undefined}
                                onClick={(e) => { this.props.nextQuestion(this.props.roomkey, this.props.roundNumber, this.props.questionNumber, e) }}
                            >
                                Volgende
                                </button>
                        </div>
                    }

                    {
                        (this.props.questionNumber === 2 && this.props.questionOpen === false) &&
                        <div className="button-group">
                            <button
                                onClick={(e) => {
                                    this.props.resetCategories();
                                    this.props.setRoundNumber((this.props.roundNumber + 1))
                                    this.props.history.push('/game');
                                }}
                            >
                                Doorgaan
                                </button>
                            <button
                                onClick={(e) => { this.props.closeQuestion(this.props.roomkey, this.props.roundNumber, e, this.props.questionNumber) }}
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
            </div>
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
        answers: state.game.answers
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
        setRoundNumber: (number) => dispatch(setRoundNumber(number))
    }
}

const QuestionDashboard = withRouter(ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuestionDashboardUI));

export default QuestionDashboard;