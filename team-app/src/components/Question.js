import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import LoadingIndicator from './LoadingIndicator';
import TitleMessage from './TitleMessage';
import { setAnswerAction } from '../reducers/game';
import { submitAnswer } from '../reducers/game';

class QuestionUI extends Component {

    render() {
        let message = this.props.gameStarted ? this.props.waitingForQuestionMsg : this.props.waitingForStartMsg;
        let buttonText = this.props.submitted === true ? 'change answer' : 'submit answer';

        return (

            this.props.question !== ''
                ?
                <>
                    <h2 className="center">{this.props.question.question}</h2>
                    <p>{this.props.question.category}</p>
                    <form>
                        <input value={this.props.answer} onChange={e => this.props.setAnswer(e.target.value)} type="text" name="answer" required />
                        <button
                            type="submit"
                            onClick={(e) => this.props.submitAnswer(e, this.props.roomkey, this.props.roundNumber, this.props.questionNumber, this.props.answer)}
                        >
                            {buttonText}
                        </button>
                    </form>
                </>
                :
                <div>
                    <TitleMessage title={message} />
                    <LoadingIndicator />
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question: state.game.question,
        gameStarted: state.game.gameStarted,
        roundStarted: state.game.roundStarted,
        waitingForQuestionMsg: state.game.waitingForQuestionMsg,
        waitingForStartMsg: state.game.waitingForStartMsg,
        answer: state.game.answer,
        roomkey: state.application.roomkey,
        roundNumber: state.game.roundNumber,
        questionNumber: state.game.questionNumber,
        submitted: state.game.submitted
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAnswer: answer => dispatch(setAnswerAction(answer)),
        submitAnswer: (event, roomkey, roundNumber, questionNumber, answer) => dispatch(submitAnswer(event, roomkey, roundNumber, questionNumber, answer))
    }
}

const Question = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuestionUI);

export default Question;