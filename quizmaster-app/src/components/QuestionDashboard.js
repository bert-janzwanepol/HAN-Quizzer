import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { withRouter } from "react-router";

import { fetchRoundQuestions, setRoundQuestionAction, openQuestion, getAnswers } from '../reducers/game';

class QuestionDashboardUI extends Component {

    componentDidMount() {
        this.props.getQuestions(this.props.roomkey, this.props.roundNumber);
    }

    render() {
        let questionList = this.props.questions.map((question, index) => {
            let checked = index === this.props.selectedQuestionIndex ? 'checked' : false;
            return (
                <div key={question._id}>
                    <input type="radio" value={question._id} id={question._id} name={question._id} onChange={() => { this.props.selectQuestion(index) }} checked={checked} />
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
                            this.props.questions.length !== 0
                                ?
                                <form>
                                    {questionList}

                                </form>
                                :
                                <small>Loading questions...</small>
                        }
                    </div>

                    <div>
                        <h2>Juiste antwoord</h2>
                        {this.props.questions.length !== 0 && this.props.questions[this.props.selectedQuestionIndex].answer}
                    </div>

                    <div className="button-group">
                        <button onClick={(e) => this.props.openQuestion(this.props.roomkey, this.props.roundNumber, e, this.props.questions[this.props.selectedQuestionIndex]._id)}>Stellen</button>
                        <button disabled>Sluiten</button>
                        <button disabled>Volgende</button>
                    </div>
                </aside>
                <main>
                    <div className="team-answers">
                        <h2>Antwoorden</h2>
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
        selectedQuestionIndex: state.game.selectedQuestionIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQuestions: (roomkey, roundnumber) => dispatch(fetchRoundQuestions(roomkey, roundnumber)),
        selectQuestion: (id) => dispatch(setRoundQuestionAction(id)),
        openQuestion: (roomkey, roundnumber, event, questionId) => dispatch(openQuestion(roomkey, roundnumber, event, questionId)),
        getAnswers: () => { dispatch(getAnswers()) }
    }
}

const QuestionDashboard = withRouter(ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuestionDashboardUI));

export default QuestionDashboard;